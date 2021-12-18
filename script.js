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
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
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
};

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

// game modes
var firstGameMode = "assign cards & test for early winners";
var secondGameMode = "choose hit or stand for player";

var currentGameMode = firstGameMode;

var gameLogic = function () {
  // create the deck
  deck = makeDeck();
  // run shuffle function
  shuffledDeck = shuffleCards(deck);
  // if is firstGameMode, deal cards to players
  var computerCards = [];
  var playerCards = [];

  if (currentGameMode == firstGameMode) {
    // deal playerCards

    var playerCard = shuffledDeck.pop();
    playerCards.push(playerCard.rank);
    console.log(
      "pushed 1st player card. Ensure all cards are pushed: " + playerCard.rank
    );
    playerCard = shuffledDeck.pop();
    playerCards.push(playerCard.rank);
    console.log(
      "pushed 2nd player card. Ensure all cards are pushed: " + playerCard.rank
    );

    // deal computerCards
    var computerCard = shuffledDeck.pop();
    computerCards.push(playerCard.rank);
    console.log(
      "pushed 1st computer card. Ensure all cards are pushed: " +
        computerCard.rank
    );
    computerCard = shuffledDeck.pop();
    computerCards.push(playerCard.rank);
    console.log(
      "pushed 2nd computer card. Ensure all cards are pushed: " +
        computerCard.rank
    );
    console.log("player's holdings: " + playerCards);
    console.log("computer's holdings: " + computerCards);

    var cardsAreAssignedText = `Player has: ${playerCards} <br> Computer has: ${computerCards} <br> Please enter "hit" or "stand, then click Submit.`;
    myOutputValue = cardsAreAssignedText;
    currentGameMode = secondGameMode;
    return myOutputValue;
  }

  if (currentGameMode == secondGameMode) {
  }

  // analyse cards for game winning conidtions e.g. Blackjack, tie, or normal win (only those immediate winning conditions for now)

  // display cards to user

  // the user allowed to decide whether to hit or stand, using the submit button

  // user cards analysed for winning or losing conditions

  // the computer decides to hit or standa automatically based on game rules

  // the game either ends of continues
};

// output texts (only include those that don't have string literal to avoid logic flow issues)
var myOutputValue = "";

var main = function (input) {
  var finalOutput = gameLogic(input);
  return finalOutput;
};
