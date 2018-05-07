// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Create a list that holds all of your cards
let cardsList = ["fa-diamond","fa-paper-plane-o","fa-anchor","fa-cube","fa-leaf", "fa-bicycle", "fa-bomb", "fa-bolt", "fa-diamond","fa-paper-plane-o","fa-anchor","fa-cube","fa-leaf", "fa-bicycle", "fa-bomb", "fa-bolt"];

// amount of matched cards
let cardsMatchedCount = 0;

// get cards
let cards = document.getElementsByClassName("card");

// get card elements on page
let cardsElements = document.getElementsByClassName("customFa");

// add card face to all elements
function addCardFaceToElement(){
    // shuffle cards
    shuffle(cardsList)
    // add card faces to elements
    for (let i = 0; i < cardsElements.length; i++) {
          cardsElements[i].className += cardsList[i] ;
    }
}

// reset all cards to hidden
function resetAllCardsToHidden(){
    // add card faces to elements
    for (let i = 0; i < cards.length; i++) {
          cards[i].className = "card" ;
    }
}

// reset all cards to hidden
function shuffleAllCardsElements(){
    // shuffle cards elements
    shuffle(cardsList)
    // add card faces to elements
    for (let i = 0; i < cardsElements.length; i++) {
          cardsElements[i].className = "customFa fa " + cardsList[i];
    }
}

// add card face to all elements
addCardFaceToElement();

for(var i=0; i< cards.length; i++) {
  cards[i].addEventListener("click", toggleClass(i));
}

let recentlyClicked = [];

// change elements to hidden
function changeElementsToHidden(){

     // remove open show classes
     recentlyClicked[0].classList.remove("open", "show");
     recentlyClicked[1].classList.remove("open", "show");

}

// change recently clicked elements to matched
function changeElementsToMatched(){
     // add matched
     recentlyClicked[0].classList.add("match");
     recentlyClicked[1].classList.add("match");
     changeElementsToHidden()
}

let counter = 0

// add to moves count
let add = (function () {
  return function () {return counter +=1;}
})();
function movesCount(){
  document.getElementById("movesCount").innerHTML = add();
}

// reset moves count
let reset = (function () {
  return function () {return counter = 0;}
})();
function resetMovesCount(){
  document.getElementById("movesCount").innerHTML = reset();
}


function toggleClass(i) {
  return function(){
    // check if card is a match
   if(cards[i].classList.contains("match")){
    return;
   }
   // check if item is already shown
   else if(cards[i].classList.contains("open" || "show")){
    return;
   }

   // add class show and open to show card element
   cards[i].classList.add("open","show");
   // add card element to recentyClicked array
   recentlyClicked.unshift(cards[i])

   // check if 2 cards have been clicked
   if(recentlyClicked.length == 2){
      // counter moves
      movesCount();
     // compare if recently clicked cards are a match
     if(recentlyClicked[0].isEqualNode(recentlyClicked[1])){
       // change recently clicked to matched styling
       changeElementsToMatched();
       // remove clicked elements
       recentlyClicked.splice(0, 2);
       // add 1 to cards matched
       cardsMatchedCount +=1;
       if(cardsMatchedCount === cardsList.length / 2){
           alert("you won");
       }
       return;
     }
     //   // hide elements
     //   changeElementsToHidden();
     // // remove recently clicked items from array
     // recentlyClicked.splice(0, 2);
             setTimeout(function(){
             changeElementsToHidden()
             recentlyClicked.splice(0, 2);

         },300);

   }

  }
}

function restartGame(){
    // reset all cards to hidden
    resetAllCardsToHidden()
    // shuffle all cards elements
    shuffleAllCardsElements();
    // remove clicked elements
    recentlyClicked.splice(0, 2);

    // reset moves count
    resetMovesCount();
}






/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */