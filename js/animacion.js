const createForm = document.getElementById('create-form');
const nameInput = document.getElementById('name-input');
const descriptionInput = document.getElementById('description-input');
const itemList = document.getElementById('item-list');

let items = [];
let editingItemId = null;

function createItem(event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  const description = descriptionInput.value.trim();

  if (name === '' || description === '') {
    alert('Por favor, ingresa un nombre y una descripción para el elemento.');
    return;
  }

  if (editingItemId) {
    // Editar el elemento existente
    items = items.map(item => {
      if (item.id === editingItemId) {
        return { id: item.id, name, description };
      }
      return item;
    });

    editingItemId = null;
  } else {
    // Crear un nuevo elemento
    const item = {
      id: Date.now(),
      name,
      description
    };
  
    items.push(item);
  }

  renderItems();
  createForm.reset();
}

function deleteItem(id) {
  items = items.filter(item => item.id !== id);
  renderItems();
}

function editItem(id) {
  const item = items.find(item => item.id === id);
  if (item) {
    nameInput.value = item.name;
    descriptionInput.value = item.description;
    editingItemId = id;
  }
}

function renderItems() {
  itemList.innerHTML = '';

  if (items.length === 0) {
    const emptyMessage = document.createElement('p');
    emptyMessage.textContent = 'No hay elementos registrados.';
    itemList.appendChild(emptyMessage);
    return;
  }

  items.forEach(item => {
    const listItem = document.createElement('li');
    listItem.className = 'list-item';

    const itemName = document.createElement('h3');
    itemName.textContent = item.name;
    listItem.appendChild(itemName);

    const itemDescription = document.createElement('p');
    itemDescription.textContent = item.description;
    listItem.appendChild(itemDescription);

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';

    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    editButton.className = 'edit-button';
    editButton.addEventListener('click', () => editItem(item.id));
    buttonContainer.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.className = 'delete-button';
    deleteButton.addEventListener('click', () => deleteItem(item.id));
    buttonContainer.appendChild(deleteButton);

    listItem.appendChild(buttonContainer);

    itemList.appendChild(listItem);
  });
}

createForm.addEventListener('submit', createItem);

renderItems();
