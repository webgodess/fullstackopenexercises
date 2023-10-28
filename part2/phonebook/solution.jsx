import { useState } from "react";

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

const Persons = ({ id, name, number }) => {
  return (
    <p key={id}>
      {name} {number}
    </p>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    const personExists = persons.find((person) => person.name === newName);

    if (personExists) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(newPerson));
    }

    setNewName("");
    setNewNumber("");
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearch={handleSearch} />
      <h2>Add a new contact</h2>

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
          <Persons id={person.id} name={person.name} number={person.number} />
        ))}
      </div>
    </div>
  );
};

export default App;
