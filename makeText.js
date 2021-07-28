/** Command-line tool to generate Markov text. */
const { MarkovMachine } = require('./markov')
const axios = require('axios');
const fsP = require("fs/promises");
const argv = process.argv;

// Reads a utf8 file
async function cat(path) {
  try {
    let contents = await fsP.readFile(path, "utf8");
    return contents;
  } catch (err) {
    let msg = `Error reading file: \nError: Could not find file`;
    console.log(msg);
    process.exit(1);
  }
}

// Reads a URL
async function webCat(url) {
  try {
      const resp = await axios.get(url);
      return resp.data;
  } catch (err) {
      let msg = `Error fetching ${url}: \nError: Request failed with status code 404`;
      console.log(msg);
      process.exit(1);
  }
}

// Note: alternative to startsWith is to resolve the domain using a DNS lookup (Tim suggested, but not required)
// Determines if utf8 file or URL and invokes relevant function

// consolidate: make variable called 'promiseText' and save... then add .then outside of the if/else to 
// avoid duplication (Tim suggested)
if (argv[2] === "url") {
  webCat(argv[3]).then(function(file){
    let mm = new MarkovMachine(file);
    console.log(mm.getText(50));
  })
} else {
  cat(argv[3]).then(function(file){
    let mm = new MarkovMachine(file);
    console.log(mm.getText(50));
  }) 
}
