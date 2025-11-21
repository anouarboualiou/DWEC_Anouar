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
const els = {
    tbody: document.getElementById('usersTbody'),
    form: document.getElementById('userForm'),
    firstName: document.getElementById('firstName'),
    lastName: document.getElementById('lastName'),
    email: document.getElementById('email'),
    picture: document.getElementById('picture'),
    userId: document.getElementById('userId'),
    submitBtn: document.getElementById('submitBtn'),
    cancelBtn: document.getElementById('cancelEditBtn'),
    loadBtn: document.getElementById('loadInitialBtn'),
    refreshBtn: document.getElementById('refreshBtn'),
    msg: document.getElementById('messages'),
    loading: document.getElementById('loading'),
    search: document.getElementById('searchInput')
};
let usersCache = [], busy = false;
function showMessage(t, type = 'success') {
    els.msg.textContent = t;
    els.msg.className = type;
    setTimeout(() => {
        if (els.msg.textContent === t) els.msg.textContent = '';
    }, 3500)
}
function validate() {
    let ok = true;
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const urlRe = /^(https?:\/\/).+/i;
    ['firstName', 'lastName', 'email', 'picture'].forEach(id =>
        document.getElementById('err-' + id).textContent = '');
    if (!els.firstName.value.trim()) {
        document.getElementById('err-firstName').textContent = 'Nombre obligatorio';
        ok = false
    }
    if (!els.lastName.value.trim()) {
        document.getElementById('err-lastName').textContent = 'Apellidos obligatorios';
        ok = false
    }
    if (!emailRe.test(els.email.value.trim())) {
        document.getElementById('err-email').textContent = 'Email no válido';
        ok = false
    }
    if (!urlRe.test(els.picture.value.trim())) {
        document.getElementById('err-picture').textContent = 'URL no válida';
        ok = false
    } return ok
}
function setBusy(v) {
    busy = v; els.submitBtn.disabled = v;
    els.loadBtn.disabled = v;
    els.refreshBtn.disabled = v;
    document.querySelectorAll('.edit,.del').forEach(b => b.disabled = v);
    els.loading.hidden = !v
}
function render(list) {
    els.tbody.innerHTML = '';
    list.forEach(u => {
        const tr = document.createElement('tr');
        tr.dataset.id = u._id || u._tmp; tr.innerHTML =
            `<td><img src="${u.picture}" class="avatar"></td>
                                <td>${u.firstName}</td>
                                <td>${u.lastName}</td>
                                <td>${u.email}</td>
                                <td><button class="edit" data-id="${u._id || u._tmp}">Editar</button> 
                                <button class="del" data-id="${u._id || u._tmp}">Eliminar</button></td>`;
        els.tbody.appendChild(tr)
    });
    attachEvents()
}
function getFiltered() {
    const q = (els.search.value || '').toLowerCase().trim();
    if (!q) return usersCache;
    return usersCache.filter(u => (u.firstName + ' ' + u.lastName).toLowerCase().includes(q))
}
async function fetchUsers() {
    try {
        setBusy(true);
        const r = await fetch(API_URL);
        if (!r.ok) throw new Error('Error');
        const data = await r.json();
        usersCache = data; render(getFiltered())
    }
    catch (e) {
        showMessage('Error cargando', 'error')
    }
    finally {
        setBusy(false)
    }
}
async function uploadInitial() {
    try {
        setBusy(true);
        for (const u of initialUsers) {
            await fetch(API_URL,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(u)
                }
            )
        }
        await fetchUsers();
        showMessage('Iniciales subidos')
    }
    catch (e) { showMessage('Error', 'error') }
    finally { setBusy(false) }
}
function tmpObj(d) {
    return {
        firstName: d.firstName,
        lastName: d.lastName,
        email: d.email,
        picture: d.picture,
        _tmp: 'tmp-' + Date.now()
    }
}
async function addOptim(data) {
    const tmp = tmpObj(data);
    usersCache.unshift(tmp);
    render(getFiltered());
    try {
        setBusy(true);
        const r = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!r.ok) throw new Error();
        const saved = await r.json();
        usersCache = usersCache.map(x => x._tmp === tmp._tmp ? saved : x);
        render(getFiltered());
        showMessage('Añadido')
    }
    catch (e) {
        usersCache = usersCache.filter(x => x._tmp !== tmp._tmp);
        render(getFiltered());

        showMessage('Error', 'error')
    }
    finally {
        setBusy(false)
    }
}
async function deleteOptim(id) {
    const idx = usersCache.findIndex(u => u._id === id);
    const tmp = usersCache.splice(idx, 1)[0];
    render(getFiltered()); try {
        setBusy(true);
        const r = await fetch(API_URL + '/' + id, {
            method: 'DELETE'
        });
        if (!r.ok) throw new Error();
        showMessage('Eliminado')
    }
    catch (e) {
        usersCache.splice(idx, 0, tmp);
        render(getFiltered());
        showMessage('Error', 'error')
    }
    finally {
        setBusy(false)
    }
}
async function updateUser(id, data) {
    const old = usersCache.find(u => (u._id || u._tmp) === id);
    const backup = Object.assign({}, old);
    Object.assign(old, data);
    render(getFiltered());
    try {
        setBusy(true); const body = {
            firstName: old.firstName,
            lastName: old.lastName,
            email: old.email,
            picture: old.picture
        };
        const r = await fetch(API_URL + '/' + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        if (!r.ok) throw new Error();
        showMessage('Actualizado')
    }
    catch (e) {
        Object.assign(old, backup);
        render(getFiltered());
        showMessage('Error', 'error')
    }
    finally {
        setBusy(false)
    }
}
els.form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!validate()) return;
    const payload = {
        firstName: els.firstName.value.trim(),
        lastName: els.lastName.value.trim(),
        email: els.email.value.trim(),
        picture: els.picture.value.trim()
    };
    const id = els.userId.value;
    if (id) {
        await updateUser(id, payload);
        els.form.reset(); els.userId.value = '';
        els.submitBtn.textContent = 'Añadir';
        els.cancelBtn.hidden = true;
        await fetchUsers()
    }
    else {
        await addOptim(payload);
        els.form.reset()
    }
});
els.cancelBtn.addEventListener('click', () => {
    els.form.reset();
    els.userId.value = '';
    els.submitBtn.textContent = 'Añadir';
    els.cancelBtn.hidden = true
});
els.loadBtn.addEventListener('click', uploadInitial);
els.refreshBtn.addEventListener('click', fetchUsers);
els.search.addEventListener('input', () => render(getFiltered()));
window.addEventListener('load', fetchUsers);