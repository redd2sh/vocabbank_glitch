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
var username;


fastify.post("/vocab_Signup", async (request, reply) => {
 // params.optionHistory = await db.getLogs();
  const vbUsername = await request.body.username
  const vbPassword1 = await request.body.password1
  const vbPassword2 = await request.body.password2
  
  username = vbUsername
  
  const vbAcc = await db.signupAcc(vbUsername, vbPassword1)
  
  // insert module processAcc
  
return vbPassword1 === vbPassword2 ?
 reply.view("/src/pages/vocabBankMain.hbs")
  : reply.send("Username or password error!")
  // insert alert here

  // map for login
    
  
});

// create route for login
fastify.get("/vocabBankLogin", async (request, reply) => {
  /* 
  Params is the data we pass to the client
  - SEO values for front-end UI but not for raw data
  */
  let params = request.query.raw ? {} : { seo: seo };
  
 
  // Send the page options or raw JSON data if the client requested it
  return request.query.raw
    ? reply.send(params)
    : reply.view("/src/pages/vocabBankLogin.hbs", params);
});






fastify.get("/vocab_Signup", async (request, reply) => {
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


fastify.get("/vocab_Login", async (request, reply) => {
  /* 
  Params is the data we pass to the client
  - SEO values for front-end UI but not for raw data
  */
  let params = request.query.raw ? {} : { seo: seo };
  
 
  // Send the page options or raw JSON data if the client requested it
  return request.query.raw
    ? reply.send(params)
    : reply.view("/src/pages/vocabBankLogin.hbs", params);
});




fastify.post("/vocab_Login", async (request, reply) => {

  const vbUsername = await request.body.username
  const vbPassword = await request.body.password

  username = await vbUsername
  
  const vbAcc = await db.loginAcc(vbUsername, vbPassword)


  
return reply.view("/src/pages/vocabBankMain.hbs")

});

fastify.post("/vocab_AddTerm", async (request, reply) => {

  const vbVocabTerm = await request.body.vocabTerm
  const vbDefinition = await request.body.definition
  const vbContext = await request.body.context
  const vbNotes = await request.body.notes
  const vbDate = await request.body.date
  const vbUsername = await username

  
  const vbData = await db.addTerm(vbVocabTerm, vbDefinition, vbContext, vbNotes, vbDate, vbUsername)

  
  
  
return reply.view("/src/pages/vocabBankMain.hbs")
});


fastify.get("/vocab_ListTerm", async (request, reply) => {
  
  const params = await request.query.raw ? {} : { seo: seo };

  // Get the data from the db
  params.userTable = await db.listTerm(username);

  // Let the user know if there's an error
  params.error = params.userTable ? null : data.errorMessage;
  
  console.log("listTerm server");
  // Send the list
  return request.query.raw
    ? reply.send(params)
    : reply.view("/src/pages/vocabBankMain.hbs", params);
});



fastify.get("/vocab_PickTerm", async (request, reply) => {
  
  const params = await request.query.raw ? {} : { seo: seo };
  

  // Get the data from the db
  const countTerms = await db.countTerm(username);
  
  const rownum1 = await Math.floor(Math.random() * countTerms);
  params.pickTerm1 = await db.pickTerm(username, rownum1);
  params.error = params.pickTerm1 ? null : data.errorMessage;
  
  const rownum2 = await Math.floor(Math.random() * countTerms);
  params.pickTerm2 = await db.pickTerm(username, rownum1);
  params.error = params.pickTerm2 ? null : data.errorMessage;
  
  const rownum3 = await Math.floor(Math.random() * countTerms);
  params.pickTerm3 = await db.pickTerm(username, rownum3);
  params.error = params.pickTerm3 ? null : data.errorMessage;
  
  const rownum4 = await Math.floor(Math.random() * countTerms);
  params.pickTerm4 = await db.pickTerm(username, rownum4);
  params.error = params.pickTerm4 ? null : data.errorMessage;
  
  console.log("Server term picked");
  // Send the log list
  return request.query.raw
    ? reply.send(await params)
    : reply.view("/src/pages/vocabBankMain.hbs", await params);
});





fastify.get("/vocabBank_File", async (request, reply) => {
  
  const params = request.query.raw ? {} : { seo: seo };
  try {
  // Get the data from the db
    

  const obj = await db.listTerm(username);
  const jsonCont = await JSON.stringify(obj);
  const fs = require('fs');
    
  fs.writeFile("./public/vocabBankF.txt", jsonCont, (err) => {
  if (err) {
    console.log(err);
    params.msg = err;
  }
  else {
    console.log("File written successfully\n");
  }
});

  console.log("Post method for file");
  } catch (error) {
    console.error(error)
    params.msg = error
    
  }
  params.msg = "File ready to download."
  return reply.view("/src/pages/vocabBankMain.hbs", params);
});





fastify.post("/vocab_Logout", async (request, reply) => {

 username = "";
   try {
  // Get the data from the db
    
  const blank = "Overwritten as logged out.";
  const fs = require('fs');
    
  fs.writeFile("./public/vocabBankF.txt", blank, (err) => {
  if (err) {
    console.log(err);

  }
  else {
    console.log("File written as logged out successfully\n");
  }
});
  } catch (error) {
    console.error(error)
    
  }
  
return reply.view("/src/pages/vocabBankSignup.hbs")

});




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

