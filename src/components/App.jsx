import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { Section } from './Section/Section';

export const App = () => {
  const [contacts, setContacts] = useState(
    () =>
      JSON.parse(localStorage.getItem('contactsData')) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');

    if (contacts) {
      setContacts(JSON.parse(contacts));
    }
  }, []);

  const addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts(contacts => {
      const includeName = contacts.find(user => user.name === contact.name);
      if (includeName) {
        alert(`${contact.name} is already in contacs`);
        return [...contacts];
      } else {
        return [contact, ...contacts];
      }
    });
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
    setFilter('');
  };

  const changeInput = e => {
    const { value } = e.target;
    setFilter(value);
  };

  const filterContacts = contacts.filter(contact => {
    return contact.name.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <>
      <Section title="Phonebook">
        <ContactForm onSubmit={addContact} />
      </Section>
      <Section title="Contacts">
        <Filter name={'filter'} changeInput={changeInput} />
        <ContactList contacts={filterContacts} deleteContact={deleteContact} />
      </Section>
    </>
  );
};





// import { Component } from 'react';
// import { nanoid } from 'nanoid';

// import { ContactForm } from './ContactForm/ContactForm';
// import { Filter } from './Filter/Filter';
// import { ContactList } from './ContactList/ContactList';
// import { Section } from './Section/Section';

// export class App extends Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//   };

//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts');
//     const parsedContacts = JSON.parse(contacts);
//     if (contacts) {
//       this.setState({ contacts: parsedContacts });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   addContact = ({ name, number }) => {
//     const isInContscts = this.state.contacts.some(
//       contact => contact.name.toLocaleUpperCase() === name.toLocaleUpperCase
//     );
//     if (isInContscts) {
//       alert(name + ' is already in contacts');
//       return;
//     }
//     this.setState(prevState => {
//       return {
//         contacts: [{ name, number, id: nanoid() }, ...prevState.contacts],
//       };
//     });
//   };

//   deleteContact = id => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== id),
//     }));
//   };

//   changeInput = e => {
//     const { name, value } = e.target;
//     this.setState({ [name]: value });
//   };

//   getFilteredContacts = () => {
//     const { contacts, filter } = this.state;
//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(filter.toLowerCase())
//     );
//   };

//   render() {
//     // const { contacts, filter } = this.state;
//     const filterContacts = this.getFilteredContacts();

//     return (
//       <>
//         <Section title="Phonebook">
//           <ContactForm onSubmit={this.addContact} />
//         </Section>
//         <Section title="Contacts">
//           <Filter name={'filter'} changeInput={this.changeInput} />
//           <ContactList
//             contacts={filterContacts}
//             deleteContact={this.deleteContact}
//           />
//         </Section>
//       </>
//     );
//   }
// }