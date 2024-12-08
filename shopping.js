//shopping list array
let shoppingList = [];

//DOM Manipulation
const itemInput = document.getElementById('itemInput');
const addButton = document.getElementById('addButton');
const clearButton = document.getElementById('clearButton');
const shoppingListContainer = document.getElementById('shoppingList');

//persistence to help load from storage
window.onload = () => {
    const savedList = localStorage.getItem('shoppingList');
    if (savedList) {
        shoppingList = JSON.parse(savedList);
        renderList();
    }
};

//shopping list
function renderList() {
    shoppingListContainer.innerHTML = '';
    shoppingList.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.className = item.purchased ? 'purchased' : '';

        // Add the checkbox for marking as purchased
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = item.purchased; 
        checkbox.addEventListener('change', () => togglePurchased(index));

        //span
        const itemText = document.createElement('span');
        itemText.textContent = item.name;

        //add the edit button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => editItem(index);

        listItem.appendChild(checkbox);
        listItem.appendChild(itemText);
        listItem.appendChild(editButton);
        shoppingListContainer.appendChild(listItem);
    });

    //saving to the local storage
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}

//adding items to the list
addButton.addEventListener('click', () => {
    //console.log("Add button clicked!");
    const newItem = itemInput.value.trim();
    if (newItem) {
        shoppingList.push({ name: newItem, purchased: false});
        itemInput.value = '';
        renderList();
    }
});

//mark as purchased
function togglePurchased(index) {
    shoppingList[index].purchased = !shoppingList[index].purchased;
    renderList();
}

//edit items already in the list
function editItem(index) {
    const newName = prompt('Edit item name: ', shoppingList[index].name);
    if (newName) {
        shoppingList[index].name = newName;
        renderList();
    }
}

//clear the list if need be
clearButton.addEventListener('click', () => {
    shoppingList = [];
    renderList();
});