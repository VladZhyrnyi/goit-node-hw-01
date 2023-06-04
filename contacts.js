const fs = require("fs").promises;
const path = require("path");
const colors = require("colors");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const getAll = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContact = async (contactId) => {
  const contacts = await getAll();
  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
};

const addContact = async (name, email, phone) => {
  if (!name || !email || !phone) {
    console.log(
      "Not enough data. Please enter name, email and phone parameters.".red
    );
    return;
  }
  const contacts = await getAll();

  if (contacts.some((contact) => contact.name === name)) {
    console.log(`Contact "${name}" is allready in contact list.`.red);
    return;
  }

  const newContact = { id: nanoid(), name, email, phone };

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const removeContact = async (contactId) => {
  const contacts = await getAll();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

module.exports = { getAll, addContact, getContact, removeContact };
