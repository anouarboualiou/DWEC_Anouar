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
    search: document.getElementById('searchInput'),
    gradesModal: document.getElementById('gradesModal'),
    gradesForm: document.getElementById('gradesForm'),
    gradesTitle: document.getElementById('gradesTitle'),
    gMath: document.getElementById('g-math'),
    gHistory: document.getElementById('g-history'),
    gScience: document.getElementById('g-science'),
    gEnglish: document.getElementById('g-english'),
    gArt: document.getElementById('g-art'),
    saveGradesBtn: document.getElementById('saveGradesBtn'),
    clearGradesBtn: document.getElementById('clearGradesBtn'),
    closeGradesBtn: document.getElementById('closeGradesBtn')
};

let usersCache = [],
    busy = false,
    currentGradesUserId = null;

function showMessage(t, type = 'success') {
    els.msg.textContent = t;
    els.msg.className = type;
    setTimeout(() => {
        if (els.msg.textContent === t) els.msg.textContent = '';
    }, 3500);
}

function validate() {
    let ok = true;
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const urlRe = /^(https?:\/\/).+/i;

    ['firstName', 'lastName', 'email', 'picture'].forEach(id => {
        const elErr = document.getElementById('err-' + id);
        if (elErr) elErr.textContent = '';
    });

    if (!els.firstName.value.trim()) {
        const e = document.getElementById('err-firstName');
        if (e) e.textContent = 'Nombre obligatorio';
        ok = false;
    }

    if (!els.lastName.value.trim()) {
        const e = document.getElementById('err-lastName');
        if (e) e.textContent = 'Apellidos obligatorios';
        ok = false;
    }

    if (!emailRe.test(els.email.value.trim())) {
        const e = document.getElementById('err-email');
        if (e) e.textContent = 'Email no válido';
        ok = false;
    }

    if (!urlRe.test(els.picture.value.trim())) {
        const e = document.getElementById('err-picture');
        if (e) e.textContent = 'URL no válida';
        ok = false;
    }

    return ok;
}

function validateGrades() {
    let ok = true;

    ['g-math', 'g-history', 'g-science', 'g-english', 'g-art'].forEach(id => {
        const elErr = document.getElementById('err-' + id);
        if (elErr) elErr.textContent = '';
    });

    const checks = [
        ['g-math', 'err-g-math'],
        ['g-history', 'err-g-history'],
        ['g-science', 'err-g-science'],
        ['g-english', 'err-g-english'],
        ['g-art', 'err-g-art']
    ];

    checks.forEach(pair => {
        const v = document.getElementById(pair[0]).value;
        if (v === '') {
            const elErr = document.getElementById(pair[1]);
            if (elErr) elErr.textContent = 'Requerido';
            ok = false;
            return;
        }
        const n = Number(v);
        if (Number.isNaN(n) || n < 0 || n > 10) {
            const elErr = document.getElementById(pair[1]);
            if (elErr) elErr.textContent = '0-10';
            ok = false;
        }
    });

    return ok;
}

function setBusy(v) {
    busy = v;
    if (els.submitBtn) els.submitBtn.disabled = v;
    if (els.loadBtn) els.loadBtn.disabled = v;
    if (els.refreshBtn) els.refreshBtn.disabled = v;
    document.querySelectorAll('.edit,.del,.grades').forEach(b => b.disabled = v);
    if (els.loading) els.loading.hidden = !v;
}

function render(list) {
    els.tbody.innerHTML = '';
    list.forEach(u => {
        const tr = document.createElement('tr');
        tr.dataset.id = u._id || u._tmp;
        const gradesHtml = u.calificaciones
            ? Object.entries(u.calificaciones).map(([k, v]) => `<div><strong>${k}:</strong> ${v}</div>`).join('')
            : '<div>Sin calificaciones</div>';

        tr.innerHTML = `
            <td><img src="${u.picture}" class="avatar"></td>
            <td>${u.firstName}</td>
            <td>${u.lastName}</td>
            <td>${u.email}</td>
            <td>${gradesHtml}</td>
            <td>
                <button class="edit" data-id="${u._id || u._tmp}">Editar</button>
                <button class="grades" data-id="${u._id || u._tmp}">Calificaciones</button>
                <button class="del" data-id="${u._id || u._tmp}">Eliminar</button>
            </td>
        `;

        els.tbody.appendChild(tr);
    });

    attachEvents();
}

function getFiltered() {
    const q = (els.search.value || '').toLowerCase().trim();
    if (!q) return usersCache;
    return usersCache.filter(u => (u.firstName + ' ' + u.lastName).toLowerCase().includes(q));
}

async function fetchUsers() {
    try {
        setBusy(true);
        const r = await fetch(API_URL);
        if (!r.ok) throw new Error();
        usersCache = await r.json();
        render(getFiltered());
    } catch (e) {
        showMessage('Error', 'error');
    } finally {
        setBusy(false);
    }
}

async function uploadInitial() {
    try {
        setBusy(true);
        for (const u of initialUsers) {
            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(u)
            });
        }
        await fetchUsers();
        showMessage('Iniciales subidos');
    } catch (e) {
        showMessage('Error', 'error');
    } finally {
        setBusy(false);
    }
}

function tmpObj(d) {
    return {
        firstName: d.firstName,
        lastName: d.lastName,
        email: d.email,
        picture: d.picture,
        _tmp: 'tmp-' + Date.now()
    };
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
        showMessage('Añadido');
    } catch (e) {
        usersCache = usersCache.filter(x => x._tmp !== tmp._tmp);
        render(getFiltered());
        showMessage('Error', 'error');
    } finally {
        setBusy(false);
    }
}

async function deleteOptim(id) {
    const idx = usersCache.findIndex(u => u._id === id);
    const tmp = usersCache.splice(idx, 1)[0];
    render(getFiltered());

    try {
        setBusy(true);
        const r = await fetch(API_URL + '/' + id, { method: 'DELETE' });
        if (!r.ok) throw new Error();
        showMessage('Eliminado');
    } catch (e) {
        usersCache.splice(idx, 0, tmp);
        render(getFiltered());
        showMessage('Error', 'error');
    } finally {
        setBusy(false);
    }
}

async function updateUser(id, data) {
    const old = usersCache.find(u => (u._id || u._tmp) === id);
    const backup = Object.assign({}, old);
    Object.assign(old, data);
    render(getFiltered());

    try {
        setBusy(true);
        const body = {
            firstName: old.firstName,
            lastName: old.lastName,
            email: old.email,
            picture: old.picture
        };
        if (old.calificaciones) body.calificaciones = old.calificaciones;

        const r = await fetch(API_URL + '/' + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        if (!r.ok) throw new Error();
        showMessage('Actualizado');
    } catch (e) {
        Object.assign(old, backup);
        render(getFiltered());
        showMessage('Error', 'error');
    } finally {
        setBusy(false);
    }
}

function openGradesFor(u) {
    currentGradesUserId = u._id || u._tmp;
    els.gradesTitle.textContent = 'Calificaciones - ' + (u.firstName + ' ' + u.lastName);
    els.gMath.value = u.calificaciones && u.calificaciones['Matemáticas'] != null ? u.calificaciones['Matemáticas'] : '';
    els.gHistory.value = u.calificaciones && u.calificaciones['Historia'] != null ? u.calificaciones['Historia'] : '';
    els.gScience.value = u.calificaciones && u.calificaciones['Ciencia'] != null ? u.calificaciones['Ciencia'] : '';
    els.gEnglish.value = u.calificaciones && u.calificaciones['Inglés'] != null ? u.calificaciones['Inglés'] : '';
    els.gArt.value = u.calificaciones && u.calificaciones['Arte'] != null ? u.calificaciones['Arte'] : '';
    els.gradesModal.hidden = false;
}

async function saveGrades() {
    if (!validateGrades()) return;

    const id = currentGradesUserId;
    const user = usersCache.find(u => (u._id || u._tmp) === id);
    if (!user) {
        showMessage('Usuario no encontrado', 'error');
        return;
    }

    const cal = {
        'Matemáticas': Number(els.gMath.value),
        'Historia': Number(els.gHistory.value),
        'Ciencia': Number(els.gScience.value),
        'Inglés': Number(els.gEnglish.value),
        'Arte': Number(els.gArt.value)
    };

    const backup = Object.assign({}, user);
    user.calificaciones = cal;
    render(getFiltered());

    try {
        setBusy(true);
        const body = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            picture: user.picture,
            calificaciones: user.calificaciones
        };

        const r = await fetch(API_URL + '/' + user._id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        if (!r.ok) throw new Error();
        showMessage('Calificaciones guardadas');
        els.gradesModal.hidden = true;
        await fetchUsers();
    } catch (e) {
        Object.assign(user, backup);
        render(getFiltered());
        showMessage('Error', 'error');
    } finally {
        setBusy(false);
    }
}

async function clearGrades() {
    if (!confirm('¿Borrar calificaciones?')) return;

    const id = currentGradesUserId;
    const user = usersCache.find(u => (u._id || u._tmp) === id);
    if (!user) {
        showMessage('Usuario no encontrado', 'error');
        return;
    }

    const backup = Object.assign({}, user);
    delete user.calificaciones;
    render(getFiltered());

    try {
        setBusy(true);
        const body = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            picture: user.picture
        };

        const r = await fetch(API_URL + '/' + user._id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        if (!r.ok) throw new Error();
        showMessage('Calificaciones borradas');
        els.gradesModal.hidden = true;
        await fetchUsers();
    } catch (e) {
        Object.assign(user, backup);
        render(getFiltered());
        showMessage('Error', 'error');
    } finally {
        setBusy(false);
    }
}

els.gradesForm.addEventListener('submit', async e => {
    e.preventDefault();
    await saveGrades();
});

els.closeGradesBtn.addEventListener('click', () => {
    els.gradesModal.hidden = true;
});

els.clearGradesBtn.addEventListener('click', async () => {
    await clearGrades();
});

function attachEvents() {
    document.querySelectorAll('.edit').forEach(b => {
        b.disabled = busy;
        b.onclick = async e => {
            const id = e.target.dataset.id;
            const u = usersCache.find(x => (x._id || x._tmp) === id);
            if (!u) return;
            els.firstName.value = u.firstName;
            els.lastName.value = u.lastName;
            els.email.value = u.email;
            els.picture.value = u.picture;
            els.userId.value = id;
            els.submitBtn.textContent = 'Guardar Cambios';
            els.cancelBtn.hidden = false;
        };
    });

    document.querySelectorAll('.del').forEach(b => {
        b.disabled = busy;
        b.onclick = async e => {
            const id = e.target.dataset.id;
            if (id.startsWith('tmp-')) {
                usersCache = usersCache.filter(u => u._tmp !== id);
                render(getFiltered());
                return;
            }
            if (!confirm('¿Eliminar?')) return;
            await deleteOptim(id);
        };
    });

    document.querySelectorAll('.grades').forEach(b => {
        b.disabled = busy;
        b.onclick = async e => {
            const id = e.target.dataset.id;
            const u = usersCache.find(x => (x._id || x._tmp) === id);
            if (!u) return;
            openGradesFor(u);
        };
    });
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
        els.form.reset();
        els.userId.value = '';
        els.submitBtn.textContent = 'Añadir';
        els.cancelBtn.hidden = true;
        await fetchUsers();
    } else {
        await addOptim(payload);
        els.form.reset();
    }
});

els.cancelBtn.addEventListener('click', () => {
    els.form.reset();
    els.userId.value = '';
    els.submitBtn.textContent = 'Añadir';
    els.cancelBtn.hidden = true;
});

els.loadBtn.addEventListener('click', uploadInitial);
els.refreshBtn.addEventListener('click', fetchUsers);
els.search.addEventListener('input', () => render(getFiltered()));
window.addEventListener('load', fetchUsers);
