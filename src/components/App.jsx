import React, { Component } from 'react';

import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');

    if (contacts !== null) {
      this.setState({ contacts: JSON.parse(contacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  formSubmitHandler = ({ name, number }) => {
    const newContact = { name, number, id: nanoid() };
    const message = name + ' is already in contacts';

    if (this.state.contacts.find(contact => contact.name === name)) {
      alert(message);
    } else {
      this.setState(prevState => {
        return {
          contacts: [...prevState.contacts, newContact],
        };
      });
    }
  };

  searchHandler = event => {
    this.setState({ filter: event.target.value });
  };

  handleDelete = id => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const contactsFiltered = contacts.filter(contact => {
      const nameInLowerCase = contact.name.toLowerCase();
      return nameInLowerCase.includes(filter.toLowerCase());
    });

    return (
      <>
        <h1>Phonebook</h1>
        <ContactForm onFormSubmit={this.formSubmitHandler} />
        <hr />

        <h2>Contacts</h2>
        <Filter onSearch={this.searchHandler} value={filter} />
        <ContactList contacts={contactsFiltered} onClick={this.handleDelete} />
      </>
    );
  }
}
