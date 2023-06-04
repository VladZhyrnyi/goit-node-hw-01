const argv = require("yargs").argv;
const colors = require("colors");
const { getAll, getContact, addContact, removeContact } = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await getAll();
      return console.log(contacts);

    case "get":
      const contact = await getContact(id);
      return console.log(contact);

    case "add":
      const addedContact = await addContact(name, email, phone);
      return (
        addedContact &&
        console.log(`Contact "${addedContact.name}" successfully added.`.green)
      );

    case "remove":
      const removedContact = await removeContact(id);
      return console.log(
        `Contact "${removedContact.name}" successfully removed.`.green
      );

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
