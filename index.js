const Word=require("./word.js");
const inquirer=require("inquirer");

const wordBank=[
    "mercury", "venus", "earth", "mars", 
    "jupiter", "saturn", "neptune", "pluto", 
    "ceres", "eris", "makemake","haumea"];
 
    let guesses;
    let pickedWords;
    let word;
    var pickedOne;

    function init()
    {
    // this function will console log the start of game and call the function game
 pickedWords = [];
  console.log("Hello, and welcome to Word Guess in Space!");
  console.log("------------------------------------------");
  game();
    }

function game(){
    pickedOne="";
    guesses=15;
    if(pickedWords.length<wordBank.length){
        pickedOne=getWord();
    }
    else{
        console.log("you win!!!!");
        // function called to continue playing if user wins
        continuePlay();
    }
    if(pickedOne){
        word=new Word(pickedOne);
        word.makeLetters();
        makeGuess();
    }
}

function getWord(){
    // picks a random word from word bank
    var random= Math.floor(Math.random()*wordBank.length);
var randomWord=wordBank[random];
// -1 signifies no match found
if(pickedWords.indexOf(randomWord) === -1) {
    pickedWords.push(randomWord);
    return randomWord;
  } else {
    return getWord();
  }
}

function makeGuess(){
    var checker=[];
    inquirer.prompt([{
        name: "guessedLetter",
        // whatever the user guessed right + guess a letter and the guesses that user make
      message: word.update() + 
              "\nGuess a letter!" +
              "\nGuesses Left: " + guesses
    }
]).then(data => {
    word.letters.forEach(letter=>{
        letter.checkLetter(data.guessedLetter);
        checker.push(letter.getCharacter());
    });
    if(guesses > 0 && checker.indexOf("_") !== -1) {
        guesses--;
        if(guesses === 0) {
          console.log("YOU RAN OUT OF GUESSES! GAME OVER.");
          continuePlay();
        } else {
          makeGuess();
        }
      } else {
        console.log("CONGRATULATIONS! YOU GOT THE WORD!");
        console.log(word.update());
        continuePlay();
      }
})
}

// this function will be called everytime user wins or lose to confirm if user wanted to continue playing
function continuePlay() {
    inquirer.prompt([
        {
          name: "continue",
          type: "list",
          message: "Would you like to play again?",
          choices: ["Yes", "No"]
        }
      ])
    .then(data => {
        if(data.continue === "Yes") {
          init();
        } else {
          console.log("Thanks for playing!");
        }
    });
  }
init();
