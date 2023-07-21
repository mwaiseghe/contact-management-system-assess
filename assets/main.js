let contact_list = document.querySelector('#contacts-list');
let contact_form = document.querySelector('#contact-form');

let contacts = localStorage.getItem('contacts') ? JSON.parse(localStorage.getItem('contacts')) : [];
localStorage.setItem('contacts', JSON.stringify(contacts));
let contacts_data = JSON.parse(localStorage.getItem('contacts'));

let users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
localStorage.setItem('users', JSON.stringify(users));
let users_data = JSON.parse(localStorage.getItem('users'));

class Users {
    constructor(username, password) {
        this.id = Users.getLastId() + 1;
        this.username = username;
        this.password = password;
    }

    static getLastId() {
        let lastId = 0;
        if (users_data.length > 0) {
            lastId = users_data[users_data.length - 1].id;
        }
        return lastId;
    }

    static createUser(username, password) {
        let user = new Users(username, password);
        users_data.push(user);
        localStorage.setItem('users', JSON.stringify(users_data));
        alert('User created successfully');
    }

    static login(username, password) {
        let user = users_data.filter(user => user.username == username && user.password == password);
        if (user.length > 0) {
            localStorage.setItem('user', JSON.stringify(user));
            window.location.href = 'contacts.html';
        } else {
            alert('Invalid username or password');
        }
    }

    static user_events_listeners() {
        let new_user_form = document.querySelector('#new-user-form');

        new_user_form.addEventListener('submit', (e) => {
            e.preventDefault();
            let username = document.querySelector('#new-username').value;
            let password = document.querySelector('#new-password').value;
            Users.createUser(username, password);
        });

        let login_form = document.querySelector('#login_form');

        login_form.addEventListener('submit', (e) => {
            e.preventDefault();
            let username = document.querySelector('#username').value;
            let password = document.querySelector('#password').value;
            Users.login(username, password);
        });
        }
}


class Contacts {
    constructor(name, phone, email, user_id) {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.user_id = user_id;
    }

    static displayContacts(user_id) {
        let user_contacts = contacts_data.filter(contact => contact.user_id == user_id);
        let contact_list = document.querySelector('#contacts-table');
        contact_list.innerHTML = '';
        user_contacts.forEach(contact => {
            contact_list.innerHTML += `
            <tr>
                <td>${contact.name}</td>
                <td>${contact.phone}</td>
                <td>${contact.email}</td>
                <td><button class="btn btn-danger btn-sm delete-contact" id="delete-contact" data-id="${contact.id}">Delete</button></td>
            </tr>
            `;
        });
    }

    static add_contact(name, phone, email, user_id) {
        let contact = new Contacts(name, phone, email, user_id);
        contacts_data.push(contact);
        localStorage.setItem('contacts', JSON.stringify(contacts_data));
        Contacts.displayContacts(user_id);
        alert('Contact added successfully');
    }

    static delete_contact(id) {
        let contacts = contacts_data.filter(contact => contact.id != id);
        localStorage.setItem('contacts', JSON.stringify(contacts));
        Contacts.displayContacts(JSON.parse(localStorage.getItem('user'))[0].id);
    }   

    static getLastId() {
        let lastId = 0;
        if (contacts_data.length > 0) {
            lastId = contacts_data[contacts_data.length - 1].id;
        }
        return lastId;
    }

    static contact_events_listeners() {
        contact_form = document.querySelector('#contact-form');
        contact_form.addEventListener('submit', (e) => {
            e.preventDefault();
            let name = document.querySelector('#contact-name').value;
            let phone = document.querySelector('#contact-phone').value;
            let email = document.querySelector('#contact-email').value;
            try{
                let user_id = JSON.parse(localStorage.getItem('user'))[0].id;
            }catch(e){
                alert('You must be logged in to add a contact');
            
            }
            Contacts.add_contact(name, phone, email, 1);

        });
    }
}





try{
    Users.user_events_listeners();
}catch(e){
    console.log(e);
}


try {
    Contacts.contact_events_listeners();
}catch(e){
    console.log(e);
}

try {
    Contacts.displayContacts(JSON.parse(localStorage.getItem('user'))[0].id);
}catch(e){
    console.log(e);
}


try {
    let contact_delete_buttons = document.querySelectorAll('.delete-contact');
    contact_delete_buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            let id = e.target.dataset.id;
            Contacts.delete_contact(id);
        });
    }
    );
}catch(e){
    console.log(e);
}