const API_URL = "https://crudcrud.com/api/1977931abbf243ceb40d0a171ff464da/users";
const initialUsers = [
    { "firstName": "Alice", "lastName": "Smith", "email": "alice.smith@example.com", "picture": "https://randomuser.me/api/portraits/women/1.jpg" },
    { "firstName": "Bob", "lastName": "Johnson", "email": "bob.johnson@example.com", "picture": "https://randomuser.me/api/portraits/men/2.jpg" },
    { "firstName": "Charlie", "lastName": "Brown", "email": "charlie.brown@example.com", "picture": "https://randomuser.me/api/portraits/men/3.jpg" },
    { "firstName": "Diana", "lastName": "Prince", "email": "diana.prince@example.com", "picture": "https://randomuser.me/api/portraits/women/4.jpg" },
    { "firstName": "Eve", "lastName": "Adams", "email": "eve.adams@example.com", "picture": "https://randomuser.me/api/portraits/women/5.jpg" },
    { "firstName": "Frank", "lastName": "White", "email": "frank.white@example.com", "picture": "https://randomuser.me/api/portraits/men/6.jpg" },
    { "firstName": "Grace", "lastName": "Taylor", "email": "grace.taylor@example.com", "picture": "https://randomuser.me/api/portraits/women/7.jpg" },
    { "firstName": "Henry", "lastName": "Moore", "email": "henry.moore@example.com", "picture": "https://randomuser.me/api/portraits/men/8.jpg" },
    { "firstName": "Ivy", "lastName": "Clark", "email": "ivy.clark@example.com", "picture": "https://randomuser.me/api/portraits/women/9.jpg" },
    { "firstName": "Jack", "lastName": "Lewis", "email": "jack.lewis@example.com", "picture": "https://randomuser.me/api/portraits/men/10.jpg" }
];

const el = {
    tbody: document.getElementById('usersTbody'),
    form: document.getElementById('userForm'),
    firstName: document.getElementById('firstName'),
    lastName: document.getElementById('lastName'),
    email: document.getElementById('email'),
    picture: document.getElementById('picture'),
    userId: document.getElementById('userId'),
    submitBtn: document.getElementById('submitBtn'),
    cancelEditBtn: document.getElementById('cancelEditBtn'),
    loadInitialBtn: document.getElementById('loadInitialBtn'),
    refreshBtn: document.getElementById('refreshBtn'),
    messages: document.getElementById('messages')
};

function showMessage(m, err) {
    el.messages.textContent = m;
    el.messages.style.color = err ? "#b91c1c" : "#16a34a";
    setTimeout(() => el.messages.textContent = '', 3000)
}

function uploadInitialUsers(users) {
    users.forEach(u => {
        fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(u)
        }).then(r => {
            if (!r.ok) throw new Error();
            return r.json()
        }).then(() => showMessage('Usuario subido')).catch(e => showMessage('Error', true))
    })
}

function displayUsers() {
    fetch(API_URL).then(r => {
        if (!r.ok) throw new Error();
        return r.json()
    }).then(data => {
        el.tbody.innerHTML = '';
        data.forEach(u => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td><img class="avatar" src="${u.picture}"/></td>
                <td>${u.firstName}</td>
                <td>${u.lastName}</td>
                <td>${u.email}</td>
                <td><button data-id="${u._id}" class="editBtn">Editar</button> <button data-id="${u._id}" class="deleteBtn">Eliminar</button></td>`;
            el.tbody.appendChild(tr)
        });
        attachEvents()
    }).catch(e => showMessage('Error cargando', true))
}

function attachEvents() {
    document.querySelectorAll('.editBtn').forEach(b => b.onclick = e => {
        const id = e.target.dataset.id;
        fetch(API_URL + '/' + id).then(r => {
            if (!r.ok) throw new Error();
            return r.json()
        }).then(u => {
            el.firstName.value = u.firstName;
            el.lastName.value = u.lastName;
            el.email.value = u.email;
            el.picture.value = u.picture;
            el.userId.value = u._id;
            el.submitBtn.textContent = 'Guardar Cambios';
            el.cancelEditBtn.hidden = false
        }).catch(() => showMessage('Error', true))
    });
    document.querySelectorAll('.deleteBtn').forEach(b => b.onclick = e => {
        const id = e.target.dataset.id;
        if (!confirm('¿Eliminar?')) return;
        fetch(API_URL + '/' + id, {
            method: 'DELETE'
        }).then(r => {
            if (!r.ok) throw new Error();
            displayUsers(); showMessage('Eliminado')
        }).catch(() => showMessage('Error', true))
    })
}

el.form.addEventListener('submit', e => {
    e.preventDefault();
    const payload = {
        firstName: el.firstName.value.trim(),
        lastName: el.lastName.value.trim(),
        email: el.email.value.trim(),
        picture: el.picture.value.trim()
    };
    const id = el.userId.value;
    if (id) {
        fetch(API_URL + '/' + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        }).then(r => {
            if (!r.ok) throw new Error();
            l.form.reset(); el.userId.value = '';
            el.submitBtn.textContent = 'Añadir';
            el.cancelEditBtn.hidden = true;
            displayUsers();
            showMessage('Actualizado')
        }).catch(() => showMessage('Error', true))
    } else { fetch(API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }).then(r => { if (!r.ok) throw new Error(); return r.json() }).then(() => { el.form.reset(); displayUsers(); showMessage('Creado') }).catch(() => showMessage('Error', true)) }
});

el.cancelEditBtn.addEventListener('click', () => {
    el.form.reset(); el.userId.value = '';
    el.submitBtn.textContent = 'Añadir';
    el.cancelEditBtn.hidden = true
});
el.loadInitialBtn.addEventListener('click', () => uploadInitialUsers(initialUsers));
el.refreshBtn.addEventListener('click', displayUsers);
window.addEventListener('load', displayUsers);