/**
 * Module handles database management
 *
 * Server API calls the methods in here to query and update the SQLite database
 */

// Utilities we need
const fs = require("fs");

// Initialize the database
const dbFile = "./.data/vocabbank.db";
const exists = fs.existsSync(dbFile);


if (!exists) {
    console.log("Creating DB file.");
    fs.openSync(dbFile, 'w');
}


let sql;
const sqlite3 = require("sqlite3").verbose();
const dbWrapper = require("sqlite");
let db;

/* 
We're using the sqlite wrapper so that we can make async / await connections
- https://www.npmjs.com/package/sqlite
*/
dbWrapper
  .open({
    filename: dbFile,
    driver: sqlite3.Database
  })
  .then(async dBase => {
    db = dBase;

    // We use try and catch blocks throughout to handle any database errors
    try {
      // The async / await syntax lets us write the db operations in a way that won't block the app
      if (!exists) {
        // Database doesn't exist yet - create Choices and Log tables
        await db.run("CREATE TABLE Vocab_acctbl (user_id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT);");

        await db.run("CREATE TABLE Vocab_tbl (vocab_term TEXT, definition TEXT, context TEXT, notes TEXT, date TEXT, username TEXT, vocab_id INTEGER PRIMARY KEY AUTOINCREMENT);");
     
      
        // We have a database already - write Choices records to log for info
    
       

        //If you need to remove a table from the database use this syntax
        //db.run("DROP TABLE Logs"); //will fail if the table doesn't exist
      } else {
        // We have a database already - write Choices records to log for info
       console.log(await db.all("SELECT * from Vocab_acctbl"));

        }
    } catch (dbError) {
      console.error(dbError);
    }

  });

// Our server script will call these methods to connect to the db

module.exports = {

  /*
   * Process a user vote
   *
   * Receive the user vote string from server
   * Add a log entry
   * Find and update the chosen option
   * Return the updated list of votes
   */
  signupAcc: async (username, password) => {
    // Insert new Log table entry indicating the user choice and timestamp
    try {
      // Check the vote is valid
      const un = await db.get(
        "SELECT COUNT(*) from Vocab_acctbl WHERE username = ?",
        [username]
      );
      const {'COUNT(*)': count} = un;
      const un1 = await db.all(
        "SELECT * from Vocab_acctbl");
      console.log(count)
      console.log(un1)
      if (count == 0) {
        // Build the user data from the front-end and the current time into the sql query
        await db.run("INSERT INTO Vocab_acctbl (username, password) VALUES (?, ?)", ([username,
         password
        ]));
      } else
        {
          throw "Duplicate existing account. Retry login or use other username."
        }
      const un2 = await db.all(
        "SELECT * from Vocab_acctbl");
      console.log(count)
      console.log(un1)
      console.log(un2)
      console.log("that is all");
    
    } catch (dbError) {
      console.error(dbError);
    }
  },
  
  
  
  
addTerm: async (vTerm, defi, contx, note, date, usern) => {
    // Insert new Log table entry indicating the user choice and timestamp
    try {
      // Check the vote is valid
      const countRes = await db.get(
        "SELECT COUNT(*) from Vocab_tbl WHERE username = ? and vocab_term = ?",
        ([usern, vTerm])
      );
      const {'COUNT(*)': count} = countRes;

      console.log(count)
      console.log(countRes)
      if (count == 0) {
        // Build the user data from the front-end and the current time into the sql query
        await db.run("INSERT INTO Vocab_tbl (vocab_term, definition, context, notes, date, username) VALUES (?, ?, ?, ?, ?, ?)", ([vTerm, defi, contx, note, date, usern]));
      } else
        {
            throw "Invalid inputs or a duplicate vocab term input. Please try again."
        }
      const un2 = await db.all(
        "SELECT * from Vocab_tbl where username = ? and vocab_term = ?",
        ([usern, vTerm])
      );
      console.log(countes)

      console.log("that is all");
    
    } catch (dbError) {
      console.error(dbError);
    }
  },
  
  
  
  
  
loginAcc: async (username, password) => {
    // Insert new Log table entry indicating the user choice and timestamp
    try {
      // Check the vote is valid
      const result = await db.get(
        "SELECT COUNT(*) from Vocab_acctbl WHERE username = ? AND password = ?",
        [username, password]
      );
      const {'COUNT(*)': count} = result;
      
      console.log(count)
      console.log(result)
      if (count != 1) {
        throw "Duplicate or account not exist. Retry login or use other username."
        
      }
    } catch (dbError) {
      console.error(dbError);
    }
  }
  
  
}