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
    constructor(name, phone, email) {
        this.name = name;
        this.phone = phone;
        this.email = email;
    }

    static displayContacts() {
        let user_contacts = contacts_data
        contact_list.innerHTML = '';
        user_contacts.forEach(contact => {
            contact_list.innerHTML += `
            <li>
                <div class="contact">
                    <div class="contact-info">
                        <h3>${contact.name}</h3>
                        <p> <span>Phone:</span> ${contact.phone} </p>
                        <p> <span>Email:</span> ${contact.email} </p>
                    </div>
                    <div class="contact-action">
                        <img src="" alt="">
                    </div>
                </div>
            </li>
            `;
        });
    }

    static add_contact(name, phone, email, user_id) {
        let contact = new Contacts(name, phone, email, user_id);
        contacts_data.push(contact);
        localStorage.setItem('contacts', JSON.stringify(contacts_data));
        Contacts.displayContacts();
        alert('Contact added successfully');
    }

    static delete_contact(user_id) {
        let contact_name = document.querySelector('#contact-name').value;
        let contact = contacts_data.filter(contact => contact.name == contact_name);
        contacts_data.splice(contacts_data.indexOf(contact), 1);
        localStorage.setItem('contacts', JSON.stringify(contacts_data));
        Contacts.displayContacts();
        alert('Contact deleted successfully');
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
            let user_id = JSON.parse(localStorage.getItem('user'))[0].id;
            Contacts.add_contact(name, phone, email, user_id);
        });
    }
}





// Users.user_events_listeners();
Contacts.contact_events_listeners();
Contacts.displayContacts(JSON.parse(localStorage.getItem('user'))[0].id);

