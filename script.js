const foods = [
    {
        id: 'ravitoto',
        price: 5000,
        title: 'Ravitoto',
        spicy: true,
        vegetarian: false,
    },
    {
        id: 'pasta',
        price: 4000,
        title: 'Pasta',
        spicy: true,
        vegetarian: true,
    },
    {
        id: 'burger',
        price: 5000,
        title: 'Burger',
        spicy: false,
        vegetarian: false,
    },
    {
        id: 'rice',
        price: 2000,
        title: 'Rice and Leaves',
        spicy: false,
        vegetarian: true,
    },
    {
        id: 'mofogasy',
        price: 500,
        title: 'Mofogasy',
        spicy: false,
        vegetarian: false,
    },
];

const oderListFood = document.querySelector('.food-ls');
const spicyCheckbox = document.querySelector('#spicy');
const vegetarianCheckbox = document.querySelector('#vegetarian');
const allCheckboxes = document.querySelectorAll('.input-category');
const confirmBtn = document.querySelector('.confirm-btn');
const innerModal = document.querySelector('.inner-modal');
const outerModal = document.querySelector('.outer-modal');
const order = document.querySelector('.order');

/*
To generate any list of element (for example, the list of food), Map is really useful.
To get the full price of list of items, Reduce is the perfect use case.
To count how many times an item is in a list, you could Filter the list and see the length of the result, or use a Reduce to count all of the instances.
*/
// Showing the list of food in the card

const orderFood = foods.map(food => {
    const html = `   
        <li class="food-item">
            <div class="food" id="${food.id}">
                <div>${food.title}</div>
                <span class="price">${food.price} Ar</span>
                <button class="addToOrder">Add</button>
            </div>
        </li>
    `;
    oderListFood.insertAdjacentHTML("beforeend", html);
});


// Handling the spicy and vegetarian 
allCheckboxes.forEach(checkbox => checkbox.addEventListener('change', () => {
    // If the spicy checkbox is checked, show the spicy food
    if (spicyCheckbox.checked === true) {
        const spicyFood = foods
            .filter(food => food.spicy === true)
            .map(spicy => 
                `
                <li value="${spicy.id}">
                    <div class="food" id="${spicy.id}">
                        <span>${spicy.title}</span>
                        <span>${spicy.price}</span>
                        <button class="addToOrder">add</button>
                    </div>
                </li>`).join('');
        oderListFood.innerHTML = spicyFood;
    }

    // If the vegetarian checkbox is checked, show the vegetarian food
    if (vegetarianCheckbox.checked === true) {
        const vegetarianFood = foods
            .filter(food => food.vegetarian)
            .map(vegetarian => `   
                <li>
                    <div class="food" id="${vegetarian.id}">
                        <div>${vegetarian.title}</div>
                        <span class="price">${vegetarian.price} Ar</span>
                        <button class="addToOrder">Add</button>
                    </div>
                </li>
                `).join('');
        oderListFood.innerHTML = vegetarianFood;
    }

    // // If the all checkboxes are checked, show the spicy and vegetarian food
    if (spicyCheckbox.checked ===true && vegetarianCheckbox.checked ===true) {
        const allCategories = foods
            .filter(food => food.spicy && food.vegetarian)
            .map(foodCategory => `
                <li>
                    <div class="food" id="${foodCategory.id}">
                        <div>${foodCategory.title}</div>
                        <span class="price">${foodCategory.price} Ar</span>
                        <button class="addToOrder">Add</button>
                    </div>
                </li>
            `).join('');
         oderListFood.innerHTML = allCategories;
    } 
    
    // Showing the list if none of the checkboxes is checked
    if (spicyCheckbox.checked ===false && vegetarianCheckbox.checked ===false) {
        const orderFood = foods.map(food =>
            `   
                <li class="food-item">
                    <div class="food" id="${food.id}">
                        <div>${food.title}</div>
                        <span class="price">${food.price} Ar</span>
                        <button class="addToOrder">Add</button>
                    </div>
                </li>
            `).join('');
            oderListFood.innerHTML = orderFood;
    }
    
}));

// Creating a new array object
const orders = [];

// Handling the add button
window.addEventListener('click', (e) => {
    if (e.target.matches('button.addToOrder')) {   
        // A new object
        const anOrder = {}
        anOrder.id = foods['id'],
        anOrder.title = foods['id'],
        anOrder.price = foods['price']
        orders.push(anOrder);
        
        // Adding the html to the oreder list
        const orderHtml = orders.map(order =>
            `
             <li>
                 <div class="food" id="${order.id}">
                     <span>${order.title}</span>
                     <span>x1</span>
                     <span>${order.price}</span>
                 </div>
             </li>
             `).join('');
        order.innerHTML = orderHtml;
    }

    order.dispatchEvent(new CustomEvent('orderUpdated'));
});


// Showing the modal 
confirmBtn.addEventListener('click', () => {
    const html = `
        <div>
            <h2>Thank you!</h2>
            <p>
                Your order is confirm.<br>
                We will prepare your food, and deliver it to you when it's ready.
            </p>
            <div>The total amount is </div>
            <button>Close</button>
        </div>
    `;
    innerModal.innerHTML = html;
    outerModal.classList.add('open');
})

// Removing modal
outerModal.addEventListener('click', (event) => {
    const isOutdide = !event.target.closest('.modal-inner');
    console.log(isOutdide);
    if (isOutdide) {
        outerModal.classList.remove('open');
    }
});

window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeModal();
    }
})