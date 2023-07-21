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
}

class Contacts {
    constructor(name, phone, email) {
        this.name = name;
        this.phone = phone;
        this.email = email;
    }

    static displayContacts(user_id) {
        let user_contacts = contacts_data.filter(
            contact => contact.user_id == user_id
            );
        contact_list.innerHTML = '';
        user_contacts.forEach(contact => {
            contact_list.innerHTML += `
            <li>
                <div class="contact">
                    <div class="contact-info">
                        <h3>John Doe</h3>
                        <p> <span>Phone:</span> 1234567890</p>
                        <p> <span>Email:</span> janedoe@mail.com </p>
                    </div>
                    <div class="contact-action">
                        <img src="assets/images/1.jpg" alt="">
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
        Contacts.displayContacts(user_id);
        alert('Contact added successfully');
    }

    static delete_contact(user_id) {
        let contact_name = document.querySelector('#contact-name').value;
        let contact = contacts_data.filter(contact => contact.name == contact_name);
        contacts_data.splice(contacts_data.indexOf(contact), 1);
        localStorage.setItem('contacts', JSON.stringify(contacts_data));
        Contacts.displayContacts(user_id);
        alert('Contact deleted successfully');
    }

    static getLastId() {
        let lastId = 0;
        if (contacts_data.length > 0) {
            lastId = contacts_data[contacts_data.length - 1].id;
        }
        return lastId;
    }
}

