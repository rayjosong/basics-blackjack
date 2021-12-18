/*
SIMPLIFIED RULES 
1. There will be only two players. One human and one computer (for the Base solution).
2. The computer will always be the dealer.
3. Each player gets dealt two cards to start.
4. The player goes first, and decides if they want to hit (draw a card) or stand (end their turn).
5. The dealer has to hit if their hand is below 17.
6. Each players' score is the total of their card ranks. Jacks/Queen/Kings are 10. Aces can be 1 or 11.
7. The player who is closer to, but not above 21 wins the hand.

How to?

- Game modes = (1) Assign cards & test for early winners (2) Choose hit or stand for player - make sure hit if hand is below 17 (3) 
*/

// deck creation function
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = 10;
      } else if (cardName == 12) {
        cardName = 10;
      } else if (cardName == 13) {
        cardName = 10;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // Add the new card to the deck
      cardDeck.push(card);

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  // Return the completed card deck
  return cardDeck;
}; // modified this for picture cards to become cardname 10 instead

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

// For loop to sum an array in javascript
var sumCards = function (array) {
  var sum = 0;

  for (i = 0; i < array.length; i++) {
    sum += array[i];
  }

  console.log(sum);

  return sum;
};

// game modes
var firstGameMode = "assign cards & test for early winners";
var secondGameMode = "player choose hit or stand";

var currentGameMode = firstGameMode;

// game mode logic

var computerCards = [];
var playerCards = [];

var firstModeDealCards = function () {
  var playerCard = shuffledDeck.pop();
  playerCards.push(playerCard.name);
  console.log(
    "pushed 1st player card. Ensure all cards are pushed: " + playerCard.name
  );
  playerCard = shuffledDeck.pop();
  playerCards.push(playerCard.name);
  console.log(
    "pushed 2nd player card. Ensure all cards are pushed: " + playerCard.name
  );

  // deal computerCards
  var computerCard = shuffledDeck.pop();
  computerCards.push(playerCard.name);
  console.log(
    "pushed 1st computer card. Ensure all cards are pushed: " +
      computerCard.name
  );
  computerCard = shuffledDeck.pop();
  computerCards.push(playerCard.name);
  console.log(
    "pushed 2nd computer card. Ensure all cards are pushed: " +
      computerCard.name
  );
  console.log("player's holdings: " + playerCards);
  console.log("computer's holdings: " + computerCards);

  var sumPlayerCards = sumCards(playerCards);
  var sumComputerCards = sumCards(computerCards);
  var cardsAreAssignedText = `Player has: ${playerCards} and a total of ${sumPlayerCards} <br> Computer has: ${computerCards} and a total of ${sumComputerCards} <br> Please enter "hit" or "stand, then click Submit.`;
  myOutputValue = cardsAreAssignedText;
  currentGameMode = secondGameMode;
  return myOutputValue;
};

var secondModePlayerChooseHS = function (input) {
  // user decides to hit or stand, then computer decides to hit or stand

  // user to decide. How?

  // How: if input == hit, then proceed to draw another card if input == stand, then proceed to allow computer to choose
  if (input == "hit") {
    var playerCard = shuffledDeck.pop();
    playerCards.push(playerCard.name);
    console.log(
      "player chose to hit. pushed 3rd computer card. Pushed card: " +
        playerCard.name
    );
    console.log("player's holdings: " + playerCards);

    sumPlayerCards = sumCards(playerCards);
    sumComputerCards = sumCards(computerCards);

    // now check if there are winning or losing conditions
    summarySoFarText = `Player chose to hit. Player now has ${playerCards} and a total of ${sumPlayerCards}. <br> Computer has ${computerCards} and a total of ${sumComputerCards}. `;

    if (sumPlayerCards > 21) {
      myOutputValue =
        summarySoFarText +
        "<br><br>Player has busted and loses. Computer wins.";

      return myOutputValue;
    }

    if (sumPlayerCards == 21) {
      myOutputValue = summarySoFarText + "<br><br>Player has 21! Player wins.";
    } else {
      myOutputValue =
        summarySoFarText + "<br><br> Player is still under 21. Continue on";
      return myOutputValue;
    }

    // } else if (input == "stand") {
    // } // remember to analyse player for winning conditions
  }
  //computer to decide
};

// output texts (only include those that don't have string literal to avoid logic flow issues)
var myOutputValue = "";

var main = function (input) {
  // create the deck
  deck = makeDeck();
  // run shuffle function
  shuffledDeck = shuffleCards(deck);

  // if is firstGameMode, deal cards to players

  if (currentGameMode == firstGameMode) {
    // execute firstModeDealCards
    firstModeDealCards();
    return myOutputValue;
  }

  if (currentGameMode == secondGameMode) {
    // user decides to hit or stand, then computer decides to hit or stand
    secondModePlayerChooseHS(input);
    return myOutputValue;

    //computer to decide
  }

  // analyse cards for game winning conidtions e.g. Blackjack, tie, or normal win (only those immediate winning conditions for now)

  // display cards to user

  // the user allowed to decide whether to hit or stand, using the submit button

  // user cards analysed for winning or losing conditions

  // the computer decides to hit or standa automatically based on game rules

  // the game either ends of continues
};

// var main = function (input) {
//   var finalOutput = gameLogic(input);
//   return finalOutput;
// };
