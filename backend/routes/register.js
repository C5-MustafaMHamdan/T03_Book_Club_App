const express = require("express");
const { register } = require("../controllers/users");

// define router
const registerRouter = express.Router();

/*
 * Testing Routes:
 * POST -> http://localhost:5000/register/
/*

 * Testing Object:
{
  "username": "Mustafa",
 
  "email":"Mustafa@hotmail.com",
  "password": "123456",
  "role":"1"
}
*/

registerRouter.post("/", register);

module.exports = registerRouter;
