/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
      /* splits text on one or more spaces, carriage returns or new 
      lines using RegEx, and puts them in an array */
    let words = text.split(/[ \r\n]+/);
    // MORE CODE HERE
    this.words = words;
    this.chainsObj = this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // MORE CODE HERE
    const chains = {};
    for (let i = 0; i < this.words.length; i++) {
        if (!(this.words[i] in chains)) {
            chains[this.words[i]] = [];        
        }
        if (this.words[i + 1] === undefined) {
            chains[this.words[i]].push(null);
        } else {
            chains[this.words[i]].push(this.words[i + 1]);
        }
    }
    return chains;
  }


  /** return random text from chains */

  getText(numWords = 100) {
    // MORE CODE HERE\
    let randomStartingWordIndex = Math.floor((Math.random() * this.words.length)); //random index to find starting word
    let randomStartingWord = this.words[randomStartingWordIndex]; //starting word

    let text = randomStartingWord;
    let count = 1;
    let randomNextWord;
    do {
      let nextWords = this.chainsObj[randomStartingWord]; //array from chainObj
      let randomNextWordIndex = Math.floor((Math.random() * nextWords.length)); //index for array
      randomNextWord = this.chainsObj[randomStartingWord][randomNextWordIndex]; //next word --> get array from object and then get a word
      
      if (randomNextWord === null) {
        break;
      } else {
        text += " " + randomNextWord;
      }

      count++;
      randomStartingWord = randomNextWord;
    } while (count <= numWords)
    return text;
  }
}

// console.log(mm.makeChains())
// console.log(mm.getText(20));
module.exports = { MarkovMachine };