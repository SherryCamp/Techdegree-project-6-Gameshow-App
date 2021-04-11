// GLOBAL VARIABLES


const phrase = document.querySelector("#phrase");
const qwerty = document.querySelector("#qwerty");
const button_reset = document.querySelector(".btn__reset");
const keyboardButton = document.querySelectorAll('.keyrow button');
let wrongGuess = 0;




// PHRASE ARRAY
const phrases = [
    "is there anybody out there",
    "goodbye blue sky",
    "the nile song",
    "the great gig in the sky",
    "have a cigar",
    "learning to fly",
    "shine on you crazy diamond",
    "another brick in the wall"

];


// RANDOMLY CHOOSES ARRAY
function getRandomPhraseAsArray(arr) {
const arrayLength = Math.floor(Math.random() * phrases.length); 
randomPhrase = phrases[arrayLength];
phraseCharacters = randomPhrase.split("");
return phraseCharacters;
};

//ADDS RANDOM PHRASE TO LIST AND APPENDS LIST TO UL

function addPhraseToDisplay (arr) {
const ul = document.querySelector('#phrase ul');
    for (let i = 0; i < arr.length; i++) {
        const li = document.createElement('li');
        ul.appendChild(li);
        li.textContent = arr[i];
        
        if (arr[i] != " ") {
        li.className = "letter";
        } else {
        li.className = "space";
        }
    }
}


// HIDES OVERLAY AND RESETS COUNTER

button_reset.addEventListener('click', () => {
for (let i = 0; i < keyboardButton.length; i++) {
    keyboardButton[i].style.cursor = "pointer";
    }
    // HIDE OVERLAY

    const overlay = document.querySelector("#overlay");
    overlay.style.display = "none";
    wrongGuess = 0;
    const buttons = document.querySelectorAll('.keyrow button');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("chosen");
        buttons[i].disabled = false;
    }

    const hearts = document.querySelectorAll('.tries img');
    for (let j = 0; j < hearts.length; j++) {
        hearts[j].src = "images/liveHeart.png";
    }
    // REMOVES LIST ITEMS
    const listItems = document.querySelectorAll('ul li');
    for (let j = 0; j < listItems.length; j++) {
        if (listItems[j] != 0) {
        listItems[j].remove();
        }
    }
    const phraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArray);
});



//COMPARES BUTTON TO LIST ITEMS WITH .LETTER CLASS

function checkLetter(buttonSelected) {
const letters = document.querySelectorAll(".letter");
let letterMatch = null;
    for (let i = 0; i < letters.length; i++) {
        if (buttonSelected == letters[i].textContent) {
           letters[i].className = "letter show";
           letterMatch = letters[i].textContent;
       }  
    }
return letterMatch;
}

//COMPARES BUTTON CLICKED AND CURRENT PHRASE

qwerty.addEventListener('click', (event) => {
 const button = document.querySelector('.keyrow button').target;
 const buttons = document.querySelectorAll('.keyrow button');
 const buttonContent = event.target.textContent;
 const keyRows = document.querySelector('.keyrow');

    if (event.target.tagName == 'BUTTON'){

        event.target.style.cursor = 'none';
  
    let letterFound = checkLetter(buttonContent); 
        for (let i = 0; i < buttons.length; i++) {
        event.target.className = "chosen";
        event.target.disabled = true;   
    }

   
// IF QUESSED LETTER NOT FOUND, REMOVE A SCORE AND ADD WRONGGUESS TO COUNTER
let scoreboard = document.querySelector('#scoreboard ol');
const hearts = document.querySelectorAll('.tries img');
    if (letterFound == null) {
        hearts[wrongGuess].src = "images/lostHeart.png";
        hearts.length --;
        wrongGuess += 1;
    }

const letters = document.querySelectorAll(".letter");
const show = document.querySelectorAll(".show");

//CHECK IF GAME IS WON OR NOT TO DISPLAY CORECT OVERLAY
function checkWin () {
let overlay = document.querySelector("#overlay");
let overlayLinks = document.querySelector("#overlay a");
let overlayTitle = document.querySelector(".title");
    if (show.length == letters.length) {
       overlay.className = "win";
       overlay.style.display = 'flex';
       overlayTitle.textContent = "You Win !"
       button_reset.textContent = "New Game";
    } else if (wrongGuess >= 5) {
    overlay.className = "lose";
    overlay.style.display = "flex";
    overlayTitle.textContent = "Game Over "
    button_reset.textContent = "Try Again";
    }
}
checkWin();
}
});
