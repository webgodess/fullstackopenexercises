import { useEffect, useState } from "react";
import axios from "axios";
import { getAll, create, remove, update } from "./services/base";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("effect");
    getAll()
      .then((response) => {
        console.log("promise fulfilled");
        setPersons(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    const personExists = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (personExists) {
      if (
        window.confirm(
          `${newName} is already added to phonebook,replace the old number with a new one`
        )
      ) {
        const changedInfo = { ...personExists, number: newNumber };

        update(personExists.id, changedInfo)
          .then((response) => {
            console.log(response.data);
            setPersons(
              persons.map((person) =>
                person.id === personExists.id ? changedInfo : person
              )
            );
          })
          .catch((error) => {
            setMessage(
              `Information of ${newName} has already been removed from server`
            );
            setPersons(
              persons.filter((person) => person.id !== personExists.id)
            );
            setTimeout(() => {
              setMessage("");
            }, 4000);
          });
      } else {
        console.log("no thanks");
      }
    } else {
      create(newPerson).then((response) => {
        setPersons(persons.concat(response.data));
        setMessage(`added ${newName}`);
        {
          setTimeout(() => {
            {
              setMessage("");
            }
          }, 4000);
        }
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const handleChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (e) => {
    const targetId = e.target.value;
    const toBeRemoved = persons.find((person) => {
      if (targetId == person.id) {
        return person;
      }
    });
    if (window.confirm(`Delete ${toBeRemoved.name}?`)) {
      const personscopy = [...persons];
      remove(targetId)
        .then((response) => {
          console.log("User deleted successfully:", response.data);
          setPersons(
            personscopy.filter((person) => person.id !== toBeRemoved.id)
          );
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
        });
    } else {
      console.log(`not possible to delete ${toBeRemoved.name}`);
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <h3 className={message.startsWith("added") ? "success" : "error"}>
        {message}
      </h3>
      <Filter handleSearch={handleSearch} />
      <h2>Add a new contact</h2>
      <Notification />
      <h2>Numbers</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
        handleChange={handleChange}
        handleNumberChange={handleNumberChange}
      />
      <div>
        {filteredPersons.map((person) => (
          <Persons
            id={person.id}
            name={person.name}
            number={person.number}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

const Notification = () => {};

const Filter = ({ handleSearch }) => {
  return (
    <div>
      <label htmlFor="search">Search for contact </label>
      <input type="search" id="search" onChange={handleSearch} />
    </div>
  );
};

const PersonForm = ({
  handleSubmit,
  handleChange,
  handleNumberChange,
  newName,
  newNumber,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name </label>
        <input type="text" value={newName} onChange={handleChange} id="name" />
      </div>
      <div>
        <label htmlFor="number">Number </label>
        <input value={newNumber} onChange={handleNumberChange} id="number" />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ id, name, number, handleDelete }) => {
  return (
    <>
      <p key={id}>
        {name} {number}
      </p>
      <button onClick={handleDelete} value={id}>
        delete
      </button>
    </>
  );
};

export default App;
