# FASC

Find A Stronger Computer: compile code on a stronger computer than yours to save time. Fall Hacks 2022.

## Team:

Adam Podoxin, Edan Stasiuk, Toby Lin

## To Use

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/AdamPodoxin/FASC
# Go into the repository
cd FASC
# Install dependencies
npm install
# Run the app
npm start
```

# Documentation

generateUID(): returns a unique ID (internal use only).

getProviders(): returns an array of all the providers (users).

registerAccount(name, CPU, GPU, RAM, OS, languages): registers an account to the database, returns a unique ID.

sendCompileRequest(from, to, fileURL, instructions): uploads a CompileRequest to the database. This will be used in the Provider view to check if anyone has requested them to compile code.

sendCodeFile(from, to, file): uploads a code to file to storage, returns a URL to the file.

sendCompiledMessage(from, to, fileURL): send a message to the database that tells the Client that their code has been compiled and uploaded by the Provider.

sendCompiledFile(from, to, file): upload the compiled file (e.g. exe) to storage, returns the URL to the file.
