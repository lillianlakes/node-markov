const { MarkovMachine } = require("./markov");
const TEXT = "the cat in the hat";

test("getText output contains substrings of original text", function() {
  
    let testMarkov = new MarkovMachine(TEXT);
    let testText = testMarkov.getText(10);

    let testTextArray = testText.split(/[ \r\n]+/);

    for (let word of testTextArray) {
        expect(TEXT).toContain(word);
    }  
})

// Tim: suggests 'toBeDefined' which means it's a valid value
test("getText output is not equal 'null'", function() {
  
    let testMarkov = new MarkovMachine(TEXT);
    let testText = testMarkov.getText(10);

    expect(testText).not.toEqual(null); 
})

test("makeChains creates correct Markov chain", function() {
  
    let testMarkov = new MarkovMachine(TEXT);
    let testChain = testMarkov.makeChains();

    let correctChain = {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]};

    expect(testChain).toEqual(correctChain); 
})