const form = document.getElementById('crud-form');
const nameInput = document.getElementById('name-input');
const phoneInput = document.getElementById('phone-input');
const emailInput = document.getElementById('email-input');
const positionInput = document.getElementById('position-input');
const employeeList = document.getElementById('employee-list');

let employees = [];
let updateButton = null;

function addEmployee(event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const email = emailInput.value.trim();
  const position = positionInput.value.trim();

  if (name === '' || phone === '' || email === '' || position === '') {
    showError('Por favor, completa todos los campos');
    return;
  }

  const employee = {
    id: Date.now(),
    name,
    phone,
    email,
    position
  };

  employees.push(employee);
  renderEmployeeList();

  form.reset();
}

form.addEventListener('submit', addEmployee);

function renderEmployeeList() {
  employeeList.innerHTML = '';

  employees.forEach(employee => {
    const row = document.createElement('tr');

    const nameCell = document.createElement('td');
    nameCell.textContent = employee.name;
    row.appendChild(nameCell);

    const phoneCell = document.createElement('td');
    phoneCell.textContent = employee.phone;
    row.appendChild(phoneCell);

    const emailCell = document.createElement('td');
    emailCell.textContent = employee.email;
    row.appendChild(emailCell);

    const positionCell = document.createElement('td');
    positionCell.textContent = employee.position;
    row.appendChild(positionCell);

    const actionsCell = document.createElement('td');
    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    editButton.addEventListener('click', () => editEmployee(employee.id));
    actionsCell.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.addEventListener('click', () => deleteEmployee(employee.id));
    actionsCell.appendChild(deleteButton);

    row.appendChild(actionsCell);

    employeeList.appendChild(row);
  });
}

function deleteEmployee(id) {
  employees = employees.filter(employee => employee.id !== id);
  renderEmployeeList();
}

function editEmployee(id) {
  const employee = employees.find(employee => employee.id === id);

  if (employee) {
    nameInput.value = employee.name;
    phoneInput.value = employee.phone;
    emailInput.value = employee.email;
    positionInput.value = employee.position;

    // Si ya existe un botón "Actualizar", no se crea otro
    if (!updateButton) {
      updateButton = document.createElement('button');
      updateButton.textContent = 'Actualizar';
      updateButton.addEventListener('click', () => updateEmployee(id));
      form.appendChild(updateButton);
    }

    deleteEmployee(id); // Elimina el empleado existente para evitar duplicados
  }
}

function updateEmployee(id) {
  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const email = emailInput.value.trim();
  const position = positionInput.value.trim();

  if (name === '' || phone === '' || email === '' || position === '') {
    showError('Por favor, completa todos los campos');
    return;
  }

  const employee = {
    id,
    name,
    phone,
    email,
    position
  };

  employees.push(employee);
  renderEmployeeList();

  form.reset();

  // Remover el botón de actualizar
  if (updateButton) {
    updateButton.remove();
    updateButton = null; // Restablecer la variable para permitir la creación de otro botón en la próxima edición
  }
}

function showError(message) {
  const errorElement = document.createElement('div');
  errorElement.classList.add('error');
  errorElement.textContent = message;

  form.appendChild(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, 3000);
}

renderEmployeeList();
