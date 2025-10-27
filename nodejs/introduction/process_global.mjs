/*****************
 * The process global object has several useful properties and 
 * methods. Below are some examples of how to use it with ES6
 * syntax.
 *****************/

// Command line arguments accessed via process.argv
for (let i = 0; i < process.argv.length; i++){
    console.log(`ARG${i}: ${process.argv[i]}`);
}

// Access "secret" environment variables via process.env
// For Node 20.6 or later
// Run Node process with environment file flag
// node --env-file=.env argv.mjs
console.log(`EPIC_SECRET: ${process.env.EPIC_SECRET}`);
console.log(`API_KEY: ${process.env.API_KEY}`);

// Access the current file name with absolute path
console.log(`Current file: ${import.meta.url}`);

// Get the current working directory
console.log(`Current directory: ${process.cwd()}`);