const express = require('express');

const db = require('./data/dbConfig.js');

const getAllUser = () => {

  return db('accounts');
};

const getUserById = (id) => {
  return db('accounts').where({ id });
};

const createNewUser = ({ name, budget }) => {
  return db('accounts').insert({ name, budget });
};

const updateUserById = ({ name, budget }, id) => {
  return db('accounts').where({ id }).update({ name, budget });
};

const deleteUserById = (id) => {
  return db('accounts').where({ id }).del();
};

const server = express();

server.use(express.json());


server.get("/accounts", async (req, res) => {

  const users = await getAllUser();
  res.json(users);

});

server.get("/accounts/:id", async (req, res) => {
  const getUser = await getUserById(req.params.id);
  try {
    if (getUser) {
      res.statzs(200).json(user[0]);
    } else {
      res.status(400).json({ message: 'invalid Id ' });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: `request could'nt process` });
  }
});

server.post("/accounts", async (req, res) => {
  const arrayOfId = await createNewUser(req.body);
  const arrayOfUser = await getUserById(arrayOfId[0]);
  try {
    if (arrayOfId) {
      res.json(arrayOfUser[0]);
    } else {
      res.status(400).json({ message: 'invalid Id ' });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: `request could'nt process` });
  }
});

server.put("/accounts/:id", async (req, res) => {
  const { name, budget } = req.body;
  const result = await updateUserById({ name, budget }, req.params.id);
  try {
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(400).json({ message: 'invalid Id ' });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: `request could'nt process` });
  }
});

server.delete('/accounts/:id', async (req, res) => {
  const deleteUser = await deleteUserById(req.theId);
  try {
    if (deleteUser) {
      res.status(200).json(deleteUser);
    } else {
      res.status(400).json({ message: 'invalid Id ' });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: `request could'nt process` });
  }
});

module.exports = server;