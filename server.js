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
 
 const updateUserById = ({ name, budget}, id) => {
   return db('accounts').where({ id }).update({ name, budget });
  };
  
  const deleteUserById = ( id ) => {
    return db('accounts').where({ id }).del();
  };
  
  
  const server = express();
  
  server.use(express.json());
  
  

  server.get("/accounts", async (req, res) => {

  const users = await getAllUser();
  res.json(users);

  });
  
  server.get("/accounts/:id", async (req, res) => {
    const user = await getUserById(req.params.id);
    res.json(user[0]);
    });
  
    server.post("/accounts", async (req, res) => {
      const arrayOfId = await createNewUser(req.body);
      const arrayOfUser = await getUserById(arrayOfId[0]);
      res.json(arrayOfUser[0]);
      });
  
    server.put("/accounts/:id", async (req, res) => {
      const { name, budget } = req.body;
      const result = await updateUserById({ name, budget } ,req.params.id);
      res.json(result);
    });
  
    server.delete('/accounts/:id', async (req, res) => {
      const deleteUser = await deleteUserById(req.params.id);
      res.json(deleteUser);
    });

module.exports = server;