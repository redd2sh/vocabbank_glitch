/**
 * This is the main server script that provides the API endpoints
 * The script uses the database helper in /src
 * The endpoints retrieve, update, and return data to the page handlebars files
 *
 * The API returns the front-end UI handlebars pages, or
 * Raw json if the client requests it with a query parameter ?raw=json
 */

// Utilities we need
const fs = require("fs");
const path = require("path");

// Require the fastify framework and instantiate it
const fastify = require("fastify")({
  // Set this to true for detailed logging:
  logger: false,
});

// Setup our static files
fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "public"),
  prefix: "/", // optional: default '/'
});

// Formbody lets us parse incoming forms
fastify.register(require("@fastify/formbody"));

// View is a templating manager for fastify
fastify.register(require("@fastify/view"), {
  engine: {
    handlebars: require("handlebars"),
  },
});

// Load and parse SEO data
const seo = require("./src/seo.json");
if (seo.url === "glitch-default") {
  seo.url = `https://${process.env.PROJECT_DOMAIN}.glitch.me`;
}

// We use a module for handling database operations in /src
const data = require("./src/data.json");
const db = require("./src/" + data.database);


fastify.get("/", async (request, reply) => {
  /* 
  Params is the data we pass to the client
  - SEO values for front-end UI but not for raw data
  */
  let params = request.query.raw ? {} : { seo: seo };
  
 
  // Send the page options or raw JSON data if the client requested it
  return request.query.raw
    ? reply.send(params)
    : reply.view("/src/pages/vocabBankSignup.hbs", params);
});

// const json = require("./dataForm.json");
// const vocabSignup = require("./vocabBankSignup.hbs");

// var???? to store in js?
let username;


fastify.post("/vocab_Signup", async (request, reply) => {
 // params.optionHistory = await db.getLogs();
  let vbUsername = request.body.username
  let vbPassword1 = request.body.password1
  let vbPassword2 = request.body.password2
  
  username = vbUsername
  
  let vbAcc = await db.processAcc(vbUsername, vbPassword1)
  console.log(vbAcc)
  
  // insert module processAcc
  
return vbPassword1 === vbPassword2 ?
 reply.view("/src/pages/vocabBankMain.hbs")
  : reply.send("Username or password error!");
  // insert alert here

  // map for login
    
  
});

// create route for login




// Run the server and report out to the logs
fastify.listen(
  { port: process.env.PORT, host: "0.0.0.0" },
  function (err, address) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Your app is listening on ${address}`);
  }
);

