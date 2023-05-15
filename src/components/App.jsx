import React, { Component } from 'react';
import ContactForm from './ContactForm';
import Filter from './Filter';
import Contacts from './Contacts';
const STORAGE_KEY = 'contacts';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem(STORAGE_KEY);
    const parsedContacts = JSON.parse(savedContacts);
    if (!parsedContacts) {
      return;
    }
    this.setState({ contacts: [...parsedContacts] });
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  }

  formSubmitHandler = data => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, data],
    }));
  };

  filterInputChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
    this.filterContactsHandler();
  };

  filterContactsHandler = () => {
    const filteredItems = this.state.contacts.filter(item =>
      item.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
    return filteredItems;
  };

  handleDeleteButton = id => {
    const updatedContacts = this.state.contacts.filter(
      contact => contact.id !== id
    );
    this.setState({ contacts: updatedContacts });
  };

  render() {
    const itemsToRender = this.state.filter
      ? this.filterContactsHandler()
      : this.state.contacts;
    return (
      <section>
        <h1>Phonebook</h1>
        <ContactForm
          button="Add contact"
          onSubmit={this.formSubmitHandler}
          contacts={this.state.contacts}
        />
        <h2>Contacts</h2>
        <Filter
          inputValue={this.state.filter}
          onChange={this.filterInputChange}
        />
        <Contacts
          contacts={itemsToRender}
          deleteButton={this.handleDeleteButton}
        />
      </section>
    );
  }
}
