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


// starting time of game
let timer = -1;
let timerToggle = true;

// get stars score elements
let stars = document.querySelector(".stars");

// Create a list that holds all of your cards
let cardsList = ["fa-diamond","fa-paper-plane-o","fa-anchor","fa-cube","fa-leaf", "fa-bicycle", "fa-bomb", "fa-bolt", "fa-diamond","fa-paper-plane-o","fa-anchor","fa-cube","fa-leaf", "fa-bicycle", "fa-bomb", "fa-bolt"];

// amount of matched cards
let cardsMatchedCount = 0;

// get cards
let cards = document.getElementsByClassName("card");

// get stars for score
let scoreStars = document.getElementsByClassName("fa-star");

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

// counter for moves
let counter = 0

// add to moves count
let add = (function () {
  return function () {
      // remove star if counter is 8 or 16
      if(counter == 8 || counter == 16){
          stars.removeChild(stars.childNodes[0]);
          stars.removeChild(stars.childNodes[0]);
      }
      return counter +=1;
  }
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

function myTimer() {
    timer += 1;
    let showTime = timer
    document.getElementById("showStartingTime").innerHTML = showTime
}
function myStopFunction() {
    clearInterval(intervalTimer);
}

// variable for interval function
let intervalTimer = 0;

function toggleClass(i) {
  return function(){
    if(timer == -1){
      timer = 0;
      intervalTimer = setInterval(function(){ myTimer() }, 1000);

    }

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
       // if all cards matched show score
       if(cardsMatchedCount === cardsList.length / 2){
           myStopFunction()
           // get stars score count
           let starsCount = document.querySelector(".stars").childElementCount;
           // get element to add score
           let element = document.getElementById("modalText");
           // get timer show time
           let showTime = document.getElementById("showStartingTime").innerHTML;
           // text to add to element score
           let wonText = "You got a score of " + starsCount + " stars in " + counter + " moves" + " in " + showTime + ' seconds.';
           // add won text to page
           element.innerHTML = wonText;
           openModal();
       }
       return;
     }

     setTimeout(function(){
         changeElementsToHidden()
         recentlyClicked.splice(0, 2);

     },300);

   }

  }
}

// reset star count
function resetStarCount(i){
    for(let count = 0; count < i; count ++){
      //create li element
      let li = document.createElement("LI");
      // create i element
      let i = document.createElement("i");
      // add class to i element
      i.className = "fa fa-star";
      // add i element to li element
      li.appendChild(i);
      // add li to stars score
      document.querySelector(".stars").appendChild(li);
    }
}
// reset starting time and ending time
function resetTime(){
  startingTime = 0;
  endingTime = 0;
}

// restart game function
function restartGame(){
    // reset all cards to hidden
    resetAllCardsToHidden()
    // shuffle all cards elements
    shuffleAllCardsElements();
    // remove clicked elements
    recentlyClicked.splice(0, 2);
    // reset moves count
    resetMovesCount();
    // get stars score count
    let starsCount = document.querySelector(".stars").childElementCount;
    // reset star count
    if(starsCount == 1){
        resetStarCount(2);
    } else if(starsCount == 2){
        resetStarCount(1)
    }
    // reset game time
    resetTime();
    // reset cards matched count
    cardsMatchedCount = 0;
    // close popup modal
    closeModal();
    // end counter for time
    myStopFunction();
    // reset timer
    timer = -1;
    // reset timer element
    document.getElementById("showStartingTime").innerHTML = 0;

}