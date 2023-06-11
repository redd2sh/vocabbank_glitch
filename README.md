# VOCAB BANK

This project includes a [Node.js](https://nodejs.org/en/about/) server script that uses a persistent [SQLite](https://www.sqlite.org) database. The app also includes a front-end with two web pages that connect to the database using the server API. 📊


## What's in this project?

← `README.md`: That’s this file, where you can tell people what your cool website does and how you built it.

← `package.json`: The NPM packages for your project's dependencies.

← `.env`: The environment is cleared when you initially remix the project, but you will add a new env variable value when you follow the steps in `TODO.md` to set up an admin key.

### Server and database

← `server.js`: The Node.js server script for your new site. The JavaScript defines the endpoints in the site API. The API processes requests, connects to the database using the `sqlite` script in `src`, and sends info back to the client (the web pages that make up the app user interface, built using the Handlebars templates in `src/pages`).

← `/src/sqlite.js`: The database script handles setting up and connecting to the SQLite database. The `server.js` API endpoints call the functions in the database script to manage the data.

← `/src/data.json`: The data config file includes the database manager script–`server.js` reads the `database` property to import the correct script.

When the app runs, the scripts build the database:

← `.data/vocabbank.db`: Database is created and placed in the `.data` folder, a hidden directory whose contents aren’t copied when a project is remixed. You can see the contents of `.data` in the console by selecting __Tools__ >  __Logs__.

### User interface

← `public/vocabBankMainStyle.css`
← `public/vocabBankSignupStyle.css`
← `public/vocabBankLoginStyle.css`
Style rules that define the site appearance.

← `src/pages`
The handlebars files that make up the site user interface. The API in `server.js` sends data to these templates to include in the HTML.

← `src/pages/vocabBankSignup.hbs`
The site homepage presents a form when the user first visits. When the visitor submits a preference through the form, the app calls the `POST` endpoint `/`, passing the user selection. The `server.js` endpoint updates the database and returns the user inputs submitted so far.

← `src/pages/vocabBankLogin.hbs`
The login page presents a form when the user chose to login and when form is submitted, it will take you to the main page.

← `src/pages/vocabBankMain.hbs`
The main page that presents a form in Vocab Add Tab and prompts the user to submit inputs then saves the data to the database. This will also display the inputs made and saved in database as a table in Vocab List Tab. Website uses a randomizer to display set of inputs in the Vocab Pick Tab. 

← `src/seo.json`
Search Engine Optimization, the process used to optimize a website's technical configuration, content relevance and link popularity so its pages can become easily findable, more relevant and popular towards user search queries, and as a consequence, search engines rank them better.

← `public/vocab_SectionTab.js`
Script for the main page to setup the section tabs which elements to display or hide by the section tab clicks.

← `vocabBankF.txt`
File to be overwritten for download button.

## More

💡 __Want to use the server script as an API without using the front-end UI? No problem! Just send a query parameter `?raw=json` with your requests to return JSON, like this (replace the first part of the URL to match your remix): `glitch-hello-sqlite.glitch.me?raw=json`__

___Check out [Blank SQLite](https://glitch.com/~glitch-blank-sqlite) for a minimal demo of get, post, put, and delete methods.___

![Glitch](https://cdn.glitch.com/a9975ea6-8949-4bab-addb-8a95021dc2da%2FLogo_Color.svg?v=1602781328576)

## Built with Glitch!

[Glitch](https://glitch.com) is a friendly community where millions of people come together to build web apps and websites.

- Need more help? [Check out our Help Center](https://help.glitch.com/) for answers to any common questions.
- Ready to make it official? [Become a paid Glitch member](https://glitch.com/pricing) to boost your app with private sharing, more storage and memory, domains and more.
