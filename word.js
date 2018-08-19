const Letter = require("./letter.js");

function Word(word) {
    this.word = word;
    this.letters = [];

    this.makeLetters = function () {
        // split the word and store it in variable wordArr
        let wordArr = this.word.split("");
        // loop through the length of wordArr
        for (var i = 0; i < wordArr.length; i++) {

            let newLetter = new Letter(wordArr[i]);
            // push each letter to the array in this.letter
            this.letters.push(newLetter);
        }
    }

    // function to make guesses
    this.makeGuess = function (guess) {
        this.letters.forEach(letter => {
            letter.checkLetter(guess);
        });
    }
    this.update=function(){
        var printWord="";
        this.letters.forEach(letter => {
            printWord += letter.getCharacter() + " ";
        });
        return printWord;
    }
}
module.exports=Word;