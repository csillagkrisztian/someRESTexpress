const { user, todoItem, todoList, tag } = require("./models");

async function listsWithUsers() {
  const lists = await user.findAll({
    include: [{ model: todoList, attributes: ["name"] }],
  });

  return lists.map((list) => {
    const user = list.get({ plain: true });
    //   user.todoListName = user.todoLists.map((list) => list.name);
    return user;
  });
}

async function getUserByID(id) {
  const lists = await user.findOne({
    where: { id: id },
    include: { model: todoList, attributes: ["name"] },
  });
  return lists.get({ plain: true });
}

async function getImportantItems() {
  const items = await todoItem.findAll({
    where: { important: true },
    include: { model: todoList, attributes: ["name"] },
  });
  return items.map((list) => list.get({ plain: true }));
  //   user.todoListName = user.todoLists.map((list) => list.name);
}

async function getUserWithListsandListItems(id) {
  const neededuser = await user.findOne({
    where: { id: id },
    include: {
      model: todoList,
      include: { model: todoItem, attributes: ["task"] },
    },
  });
  return neededuser.get({ plain: true });
}

async function getTodoItemWithTag() {
  const items = await todoItem.findAll({
    include: { model: tag, attributes: ["title"] },
  });
  return items.map((item) => item.get({ plain: true }));
}

//listsWithUsers().then((lists) => console.log(lists));

//getUserByID(1).then((user) => console.log(user));

//getImportantItems().then((stuff) => console.log(stuff));

getTodoItemWithTag().then((list) => console.log(list[0]));
