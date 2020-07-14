const express = require("express");
const User = require("./models").user;
const TodoList = require("./models").todoList;

const app = express();
const PORT = process.env.PORT || 4000;
const cors = require("cors");
app.use(cors());

app.use(express.json());

app.listen(PORT, () => console.log(`Listening on port:${PORT}`));

app.post("/echo", (req, res) => {
  res.json(req.body);
});

app.get("/users/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = await User.findByPk(userId);
  if (!user) {
    res.status(404).send("User not found");
  } else {
    res.send(user);
  }
});

app.post("/users", async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const condition = !email || email === " " || !name || name === " ";
    console.log(req.body);
    if (condition) {
      res.status(400).send("Must provide a name and an  email address");
    } else {
      const neededUser = await User.create(req.body);
      res.json(neededUser);
    }
  } catch (e) {
    next(e);
  }
});

app.put("/users/:userId", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const userToUpdate = await User.findByPk(userId);
    if (!userToUpdate) {
      res.status(404).send("User not found");
    } else {
      const updatedUser = await userToUpdate.update(req.body);
      res.json(updatedUser);
    }
  } catch (e) {
    next(e);
  }
});

app.get("/users/:userId/lists", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const user = await User.findByPk(userId, {
      include: [TodoList],
    });
    if (user) {
      res.send(user.TodoLists);
    } else {
      res.status(404).send("User not found");
    }
  } catch (e) {
    next(e);
  }
});

app.post("/users/:userId/lists", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const user = await User.findByPk(userId, {
      include: [TodoList],
    });
    if (user) {
      const newList = await TodoList.create(req.body);
      newList.userId = userId;
      if (!newList.name) {
        res.status(400).send("Give me a name!");
      } else {
        res.json(newList);
      }
    } else {
      res.status(404).send("User not found");
    }
  } catch (e) {
    next(e);
  }
});

app.put("/users/:userId/lists/:listId", async (req, res, next) => {
  try {
    const listId = parseInt(req.params.listId);
    const toUpdate = await TodoList.findByPk(listId);
    if (!toUpdate) {
      res.status(404).send("List not found");
    } else {
      const updated = await toUpdate.update(req.body);
      res.json(updated);
    }
  } catch (e) {
    next(e);
  }
});

app.delete("/users/:userId/lists/:listId", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const listId = parseInt(req.params.listId);
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).send("No user found");
    } else {
      const list = await TodoList.findOne({
        where: {
          userId: userId,
          id: listId,
        },
      });
      if (list) {
        list.destroy();
        res.status(204).send("List deleted");
      } else {
        res.status(404).send("List not found");
      }
    }
  } catch (e) {
    next(e);
  }
});

app.delete("/users/:userId/lists/", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);

    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).send("User not found");
    } else {
      const list = await TodoList.findAll({
        where: {
          userId: userId,
        },
      });
      if (!list || list.length <= 0) {
        res.status(404).send("List not found");
      } else {
        list.forEach((list) => list.destroy());
        res.status(204).send("List deleted");
      }
    }
  } catch (e) {
    next(e);
  }
});
