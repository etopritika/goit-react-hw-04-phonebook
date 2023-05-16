import React, { useState, useEffect } from 'react';
import {ContactForm} from './ContactForm';
import Filter from './Filter';
import Contacts from './Contacts';
const STORAGE_KEY = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useState(() => JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? []);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = data => {
    setContacts(prevContacts => [...prevContacts, data]);
  };

  const filterInputChange = e => {
    const filterValue = e.currentTarget.value;
    setFilter(filterValue);
    filterContactsHandler();
  };

  const filterContactsHandler = () => {
    const filteredItems = contacts.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
    return filteredItems;
  };

  const handleDeleteButton = id => {
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    setContacts(updatedContacts);
  };

  const itemsToRender = filter ? filterContactsHandler() : contacts;

  return (
    <section>
      <h1>Phonebook</h1>
      <ContactForm
        button="Add contact"
        onSubmit={formSubmitHandler}
        contacts={contacts}
      />
      <h2>Contacts</h2>
      <Filter inputValue={filter} onChange={filterInputChange} />
      <Contacts contacts={itemsToRender} deleteButton={handleDeleteButton} />
    </section>
  );
};

// export class App extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };

//   componentDidMount() {
//     const savedContacts = localStorage.getItem(STORAGE_KEY);
//     const parsedContacts = JSON.parse(savedContacts);
//     if (!parsedContacts) {
//       return;
//     }
//     this.setState({ contacts: [...parsedContacts] });
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const { contacts } = this.state;
// localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
//   }

// formSubmitHandler = data => {
//   this.setState(prevState => ({
//     contacts: [...prevState.contacts, data],
//   }));
// };

// filterInputChange = e => {
//   const { name, value } = e.currentTarget;
//   this.setState({ [name]: value });
//   this.filterContactsHandler();
// };

// filterContactsHandler = () => {
//   const filteredItems = this.state.contacts.filter(item =>
//     item.name.toLowerCase().includes(this.state.filter.toLowerCase())
//   );
//   return filteredItems;
// };

// handleDeleteButton = id => {
//   const updatedContacts = this.state.contacts.filter(
//     contact => contact.id !== id
//   );
//   this.setState({ contacts: updatedContacts });
// };

//   render() {
//     const itemsToRender = this.state.filter
//       ? this.filterContactsHandler()
//       : this.state.contacts;
//     return (
//       <section>
//         <h1>Phonebook</h1>
//         <ContactForm
//           button="Add contact"
//           onSubmit={this.formSubmitHandler}
//           contacts={this.state.contacts}
//         />
//         <h2>Contacts</h2>
//         <Filter
//           inputValue={this.state.filter}
//           onChange={this.filterInputChange}
//         />
//         <Contacts
//           contacts={itemsToRender}
//           deleteButton={this.handleDeleteButton}
//         />
//       </section>
//     );
//   }
// }
