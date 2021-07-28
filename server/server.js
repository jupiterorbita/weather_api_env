const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8000;

// bring in the ENV
require('dotenv').config()

console.log(process.env.SUPER_SECRET_SERVER_PASSWORD);


// const superSecretServerPassword = "pasword123";

// config middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.listen(PORT, ()=> console.log(`>>> server up on ${PORT} <<<`));