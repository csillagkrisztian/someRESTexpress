const user = require("./models").user;
const todoItems = require("./models").todoItem;

async function findAllUsers() {
  try {
    const allUsers = await user.findAll();
    console.log(allUsers);
  } catch (e) {
    console.log(e);
  }
}
async function findAlltodoItems() {
  try {
    const allTodoItems = await todoItems.findAll();
    console.log(allTodoItems.map((item) => item.get({ plain: true })));
  } catch (error) {
    console.error(error);
  }
}

async function findUserByPrimaryKey(id) {
  try {
    const specificUser = await user.findByPk(id);
    console.log(specificUser.get({ plain: true }));
  } catch (error) {
    console.error(error);
  }
}

async function createNewUser(name, email, phone) {
  try {
    const newUser = await user.create({
      name: name,
      email: email,
      phone: phone,
    });
    console.log("Created", newUser.get({ plain: true }));
    return newUser;
  } catch (error) {
    console.error(error);
  }
}

async function findImportantTodos(id) {
  try {
    const importantTodos = await todoItems.findAll({
      where: { important: true },
    });
    console.log(importantTodos.map((todo) => todo.get({ plain: true })));
  } catch (error) {
    console.error(error);
  }
}

//findAllUsers().then((result) => console.log(result));
//findAllUsers();
//findAlltodoItems();
//findUserByPrimaryKey(7);
//createNewUser("Chris", "likoda@gmail.com", 6288444);
//findImportantTodos();
