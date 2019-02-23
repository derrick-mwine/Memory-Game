
const ulList = document.querySelector('.deck');
const header = document.querySelector('header');
const h1 = document.querySelector('h1');
const infoText = document.querySelector('.info-text');
const span = document.getElementsByTagName('span');
const restart = document.getElementById('restart');
const timer = document.getElementById('timer');
const stars = document.getElementById('stars');
const counterBox = document.getElementById('moves');
const popup = document.getElementById('popup');

// TODO: set start game text
infoText.innerHTML = 'Click any card to start game!';

// TODO: set the value for clicks counter and timer
let clicks = 0;
let m = 0;
let s = 0;
let timeGoes = true;


/**
* @description Shuffle elements in array
* @constructor
* @param {array} array - The array which elements will be shuffled
*/
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// TODO: definitions of arrays for the sets of cards
let game1 = ['fruit1', 'fruit1', 'fruit2', 'fruit2', 'fruit3', 'fruit3', 'fruit4', 'fruit4', 'fruit5', 'fruit5', 'fruit6', 'fruit6', 'fruit7', 'fruit7', 'fruit8', 'fruit8'];

let game2 = ['landmark1', 'landmark1', 'landmark2', 'landmark2', 'landmark3', 'landmark3', 'landmark4', 'landmark4', 'landmark5', 'landmark5', 'landmark6', 'landmark6', 'landmark7', 'landmark7', 'landmark8', 'landmark8'];

let game3 = ['sport1', 'sport1', 'sport2', 'sport2', 'sport3', 'sport3', 'sport4', 'sport4', 'sport5', 'sport5', 'sport6', 'sport6', 'sport7', 'sport7', 'sport8', 'sport8'];


// TODO: definition of array with names of variables which handle the arrays with sets of cards
let arrayList = [game1, game2, game3];

// TODO: Shuffle the cards in arrays
game1 = shuffle(game1);
game2 = shuffle(game2);
game3 = shuffle(game3);

// TODO: Shuffle the names of variable which handle the arrays with sets of cards
arrayList = shuffle(arrayList);


/**
* @description Create a list that holds all cards
* @constructor
* @param {item} item - The item in array
* @param {index} index - The index of item in array
* @param {array} array - The array
*/
function game(item, index, array){
	ulList.innerHTML += '<li class="card"><span class="lid"></span><span class="item"></span></li>';
	document.querySelector('.item').className = item;
}

// TODO: Make loop of cards from random array with use function 'game'
arrayList[0].forEach(game);

// TODO: Set info text depending on the random array with set of cards
if( arrayList[0] == game1){
	h1.innerHTML += ' FRUITS';
}

else if ( arrayList[0] == game2){
	h1.innerHTML += ' GLOBAL LANDMARKS';
}
else if ( arrayList[0] == game3){
	h1.innerHTML += ' SPORTS';
}


// TODO: Add event listener 'click' for element ul for function startGame
ulList.addEventListener('click', startGame, false);

// TODO: Add event listener 'click' for element with class name lid for function timerGameStart
const clickedCard = document.querySelectorAll('.lid');
for(let i = 0; i < clickedCard.length; i++){
	clickedCard[i].addEventListener('click', timerGameStart, false);
}

/**
* @description Start game
* @constructor
* @param {e} item - Event target
*/
function startGame(e){

	// TODO: stop propagation for click event
	e.stopPropagation();

	// TODO: set variable for one event target
	let clickedCard = e.target;

	// TODO: set variable for tag name on event target
	let cardCheck = e.target.tagName;

	// TODO: check if span class name is 'lid' and if tag name isn't 'UL'
	if( clickedCard.className == 'lid' && cardCheck != 'UL'){
		// TODO: if check is correct change class of element for 'open'
		clickedCard.className = 'open';

		// TODO: call to functions: clicksCounter, cardMatchList and rating
		clicksCounter();
		cardMatchList();
		rating();

		// TODO: Display the  icon for restart game
		restart.innerHTML = '<span class="restart-span">↻</span>';
	}
}


// TODO: set the variable which handle the array with cards which have class 'open'
let listOpenCards = [];

// TODO: set the variable which handle the array with cards which have class 'matched'
let listMatchedCards = [];


/**
* @description Create list of matched cards
* @constructor
*/
function cardMatchList(){

	// TODO: set the variable which handle length of list of open cards
	let noOfCards = listOpenCards.length;

	// TODO: set the variable which handle length of list of matched cards
	let noOfMatchedCards = listMatchedCards.length;

	// TODO: check if some element span in document has class with name 'open'
	if(span.className = 'open'){

		// TODO: add to array with open elements span elements with class name 'open'
		listOpenCards[noOfCards] = document.getElementsByClassName('open');

		// TODO: check if on array with open elements are 2 elements
		if(listOpenCards.length == 2){

		  // TODO: loops on elements in array with open elements
		  for (const openCard of listOpenCards) {

			  // TODO: set variables which handle these two elements from array with open span elements
			  let openCard1 = openCard[0];
			  let openCard2 = openCard[1];

			  // TODO: check if these two elements have the same class name
			  if(openCard1.nextSibling.className === openCard2.nextSibling.className){

				  // TODO: add to siblings of these elements transform of property rotate - this animate these elements
				  openCard1.nextSibling.style.transform = 'rotate(360deg)';
				  openCard2.nextSibling.style.transform = 'rotate(360deg)';

				  // TODO: add to siblings of these elements class mame 'matched'
				  openCard1.nextSibling.className += ' matched';
				  openCard2.nextSibling.className += ' matched';

				  // TODO: remove from these elements class name 'open'
				  openCard1.classList.remove('open');
				  openCard2.classList.remove('open');

				  // TODO: add to array with matched elements these two elements
				  listMatchedCards.length = listMatchedCards.length + 2;

				  // TODO: reset quantity of elements in array with open elements to 0
				  listOpenCards.length = 0;


				  // TODO: check if quantity of elements in array with matched elements equals 16
				  if(listMatchedCards.length == 16){

					  // TODO: call to function finishGame
					  finishGame();
				  }
			  }else{
				  // TODO: if these two elements haven't the same class change the class name of previous sibling element of these elements for 'lid' after 550 miliseconds
				  setTimeout(function(){
					 openCard1.className = 'lid';
				 	 openCard2.className = 'lid';
				  }, 550);

				  // TODO: reset quantity of elements in array with open elements to 0
				  listOpenCards.length = 0;

				}
			}
		}
	}
}


/**
* @description Clicks counter
* @constructor
*/
function clicksCounter(){

	// TODO: counting clicks in cards
	clicks = clicks + 1;
	counterBox.innerHTML = 'Moves: ' + clicks;

	// TODO: Remove event listener 'click' for function timerGameStart
	if(clicks == 1){
		for(let i = 0; i < clickedCard.length; i++){
			clickedCard[i].removeEventListener('click', timerGameStart, false);
		}
	}
}


/**
* @description Star rating
* @constructor
*/
function rating(){
	if(clicks <= 20){
		stars.innerHTML = 'Star rating: <i class="star1">*</i><i class="star2">*</i><i class="star3">*</i>';
	}
	else if(clicks > 20 && clicks < 30){
		stars.innerHTML = 'Star rating: <i class="star1">*</i><i class="star2">*</i>';
	}
	else if(clicks > 30 ){
		stars.innerHTML = 'Star rating: <i class="star1">*</i>';
	}
}


/**
* @description Start game timer
* @constructor
*/
function timerGameStart(){
	setInterval('count()', 1000);
}


/**
* @description Stop game timer
* @constructor
*/
function timerGameStop(){
	timeGoes == false;
}

/**
* @description Count time of game
* @constructor
*/
function count(){
	if(timeGoes == true){
		s.value = s;
		m.value = m;

		s++;

		if(s == 60){
			m++;
			s = 0;
		}
	}else{
		s = 0;
		m = 0;
	}
	timer.innerHTML = 'Time: ' + m + ' min ' + s + ' sec';
}

/**
* @description Reload game
* @constructor
*/
function reload(){
	window.location.reload();

	// TODO: Make loop of cards from random array with use function 'game'
	arrayList[0].forEach(game);
}

// TODO: add event listener 'click' to element which is handle in variable with name 'restart' which call to function reload
restart.addEventListener('click', reload, false);


/**
* @description Display popup window with scores when game is finished
* @constructor
*/
function finishGame(){

	// TODO: set the variables these handles time game and star raiting
	let gameTime = m + ' min ' + s + ' sec';
	let gameRating = stars.innerHTML;

	// TODO: don't display ul list with cards
	ulList.style.display = 'none';

	// TODO: display popup window with information about scores
	popup.style.visibility = 'visible';
	header.style.visibility = 'hidden';

	infoText.innerHTML = 'Matched Cards!';;
	popup.innerHTML = '<p><span class="popup-title">Great job!<br>You matched all the cards!</span><br><br><span class="score">Your score:</span><br><br>Time: ' + gameTime + '<br>' + gameRating + '<br>Moves: ' + clicks + '<br><br><button id="next-game">PLAY AGAIN »</button></p>';

	// TODO: set value of variable timeGoes to false and stop the timer
	timeGoes = false;

	// TODO: set time on 0
	timer.innerHTML = "Time: 0 min 0 sec";

	// TODO: set variable next-game which handle button with id nextGame
	nextGame = document.getElementById('next-game');

	// TODO: add to variable next-game event listener click which call to function reload
	nextGame.addEventListener('click', reload , false);
}

/*** udacity guide ***/

/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
/*function shuffle(array) {
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

*/
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
