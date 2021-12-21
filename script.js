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

var gameEnded = 0; // 0: game still in progress 1: game ended
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

    // Loop from 1 to 13 to create frall cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;
      var blackjackScore = rankCounter; // BlackJack: by default, score is also same as rankCounter except for picture cards

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
        blackjackScore = 10;
      } else if (cardName == 11) {
        cardName = "jack";
        blackjackScore = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        blackjackScore = 10;
      } else if (cardName == 13) {
        cardName = "king";
        blackjackScore = 10;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        score: blackjackScore, // so that picture cards are always score 10 instead of 11,12,13
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

  console.log("sum: " + sum);

  return sum;
};

// game modes
var firstGameMode = "assign cards & test for early winners";
var secondGameMode = "player choose hit or stand";
var thirdGameMode = "dealer choose hit or stand";

var currentGameMode = firstGameMode;

// game mode logic

var computerCardsName = [];
var playerCardsName = [];

var playerCardsScore = [];
var computerCardsScore = [];

var sumPlayerCards = 0;
var sumComputerCards = 0;
var summarySoFarText = `Player now has ${playerCardsName} and a total of ${sumPlayerCards}. <br> Dealer has ${computerCardsName} and a total of ${sumComputerCards}. `;
var myOutputValue;

// Creating evaluatewinner to cover all scenarios

//I noticed that I cannot use summarySoFarText within evaluate winner because it will always call back to the original global variable, thereby leading to sumComputerCards/sumPlayerCards == 0
var evaluateWinner = function () {
  // if both P D are < 21, then compare who is higher. The one closer to 21 will win -> output text of winner
  if (sumPlayerCards <= 21 && sumComputerCards <= 21) {
    if (sumPlayerCards == sumComputerCards) {
      // draw
      myOutputValue =
        `Player now has ${playerCardsName} and a total of ${sumPlayerCards}. <br> Dealer has ${computerCardsName} and a total of ${sumComputerCards}.` +
        "<br><br>The game is a draw.<br><br>Click submit to start game again.";
      gameEnded = 1;
    }
    if (sumPlayerCards > sumComputerCards) {
      // player wins
      myOutputValue =
        `Player now has ${playerCardsName} and a total of ${sumPlayerCards}. <br> Dealer has ${computerCardsName} and a total of ${sumComputerCards}.` +
        "<br><br>Congrats! The player received a higher hand. Therefore, player wins. <br><br>Click submit to start game again.";
      gameEnded = 1;
    }
    if (sumPlayerCards < sumComputerCards) {
      // dealer wins
      myOutputValue =
        `Player now has ${playerCardsName} and a total of ${sumPlayerCards}. <br> Dealer has ${computerCardsName} and a total of ${sumComputerCards}.` +
        "<br><br>The dealer received a higher hand. Therefore, dealer wins! <br><br>Click submit to start game again.";
      gameEnded = 1;
    }
    return myOutputValue;
  }

  if (sumPlayerCards > 21) {
    // player has busted
    myOutputValue =
      `Player now has ${playerCardsName} and a total of ${sumPlayerCards}. <br> Dealer has ${computerCardsName} and a total of ${sumComputerCards}.` +
      "<br><br>The player has busted! The dealer wins. <br><br>Click submit to start game again.";

    gameEnded = 1;
    return myOutputValue;
  }
  if (sumComputerCards > 21) {
    myOutputValue =
      `Player now has ${playerCardsName} and a total of ${sumPlayerCards}. <br> Dealer has ${computerCardsName} and a total of ${sumComputerCards}.` +
      "<br><br> The dealer has busted! The player wins.<br><br>Click submit to start game again.";
    gameEnded = 1;
    return myOutputValue;
  }
  if (sumPlayerCards > 21 && sumComputerCards > 21) {
    myOutputValue =
      `Player now has ${playerCardsName} and a total of ${sumPlayerCards}. <br> Dealer has ${computerCardsName} and a total of ${sumComputerCards}.` +
      "Both player & dealer has busted. The game is a draw!<br><br>Click submit to start game again.";
    gameEnded = 1;
    return myOutputValue;
  }
};

var firstModeDealCards = function () {
  //deal cards and check for early winners
  console.log("running firstmodedealcards function");
  var playerCard = shuffledDeck.pop();
  playerCardsName.push(playerCard.name);
  playerCardsScore.push(playerCard.score);
  console.log(
    "pushed 1st player card. Ensure all cards are pushed: " + playerCard.name
  );
  playerCard = shuffledDeck.pop();
  playerCardsName.push(playerCard.name);
  playerCardsScore.push(playerCard.score);
  console.log(
    "pushed 2nd player card. Ensure all cards are pushed: " + playerCard.name
  );

  // deal computerCards
  var computerCard = shuffledDeck.pop();
  computerCardsName.push(computerCard.name);
  computerCardsScore.push(computerCard.score);
  console.log(
    "pushed 1st dealer card. Ensure all cards are pushed: " + computerCard.name
  );
  computerCard = shuffledDeck.pop();
  computerCardsName.push(computerCard.name);
  computerCardsScore.push(computerCard.score);
  console.log(
    "pushed 2nd dealer card. Ensure all cards are pushed: " + computerCard.name
  );
  console.log("player's holdings: " + playerCardsName);
  console.log("player's score:" + playerCardsScore);
  console.log("dealer's holdings: " + computerCardsName);
  console.log("dealer's score:" + computerCardsScore);

  sumPlayerCards = sumCards(playerCardsScore);
  sumComputerCards = sumCards(computerCardsScore);
  var summarySoFarText = `Player now has ${playerCardsName} and a total of ${sumPlayerCards}. <br> Dealer has ${computerCardsName} and a total of ${sumComputerCards}. `;

  console.log("dealt first 2 cards to player and dealer respectively");

  myOutputValue =
    "Player and dealer are dealt 2 cards each.<br><br>" +
    summarySoFarText +
    "<br><br>Proceed to enter 'hit' or 'stand', then click submit.";
  currentGameMode = secondGameMode;
  return myOutputValue;
  //case if player is > 21 #busted

  // if (sumPlayerCards > 21) {
  //   myOutputValue =
  //     // summarySoFarText + "<br><br>Player has busted and loses. dealer wins.";
  //     `Player chose to hit. Player now has ${playerCardsName} and a total of ${sumPlayerCards}. <br> Dealer has ${computerCardsName} and a total of ${sumComputerCards}. ` +
  //     "<br><br>Player has busted and loses. Dealer wins.";

  //   return myOutputValue;
  // }
  // //case if player = 21 #win
  // if (sumPlayerCards == 21) {
  //   // myOutputValue = summarySoFarText + "<br><br>Player has 21! Player wins.";
  //   myOutputValue =
  //     `Player chose to hit. Player now has ${playerCardsName} and a total of ${sumPlayerCards}. <br> Dealer has ${computerCardsName} and a total of ${sumComputerCards}. ` +
  //     "<br><br>Player has 21! Player wins.";
  // }

  // // insert case if ace and ace?
  // else {
  //   //case if player <21 #continue on to choose hit/stand
  //   // myOutputValue =
  //   //   summarySoFarText +
  //   //   "<br><br> Player is still under 21. Please enter 'hit' or 'stand', then click submit.";
  //   myOutputValue =
  //     `Player chose to hit. Player now has ${playerCardsName} and a total of ${sumPlayerCards}. <br> Dealer has ${computerCardsName} and a total of ${sumComputerCards}. ` +
  //     "<br><br> Player is still under 21. Please enter 'hit' or 'stand', then click submit.";
};

var secondModePlayerChooseHS = function (input) {
  // user decides to hit or stand, then dealer decides to hit or stand

  // user to decide. How?

  // How: if input == hit, then proceed to draw another card if input == stand, then proceed to allow dealer to choose
  if (input == "hit") {
    console.log("player chose hit");
    var playerCard = shuffledDeck.pop();
    playerCardsScore.push(playerCard.score);
    playerCardsName.push(playerCard.name);
    console.log(
      "player chose to hit. pushed 3rd player card. Pushed card: " +
        playerCard.name
    );
    console.log("player's holdings: " + playerCardsName);

    sumPlayerCards = sumCards(playerCardsScore);
    sumComputerCards = sumCards(computerCardsScore);

    // now check if there are winning or losing conditions
    summarySoFarText = `Player chose to hit. Player now has ${playerCardsName} and a total of ${sumPlayerCards}. <br> Dealer has ${computerCardsName} and a total of ${sumComputerCards}. `;

    // if (sumPlayerCards > 21) {
    //   myOutputValue =
    //     summarySoFarText + "<br><br>Player has busted and loses. Dealer wins.";

    //   return myOutputValue;
    // }

    // if (sumPlayerCards == 21) {
    //   myOutputValue = summarySoFarText + "<br><br>Player has 21! Player wins.";
    // } else {
    //   myOutputValue =
    //     summarySoFarText + "<br><br> Player is still under 21. Continue on";
    //   return myOutputValue;
    // }

    // if player busted, end game. Else, continue with secondGameMode

    if (sumPlayerCards > 21) {
      gameEnded = 1;
      myOutputValue =
        summarySoFarText +
        "<br><br>Player has busted. Player loses! Click submit again to restart game.";
      return myOutputValue;
    } else {
      myOutputValue =
        summarySoFarText +
        "<br><br>Player, please enter 'hit' or 'stand', then click submit.";
      currentGameMode = secondGameMode;
      return myOutputValue;
    }
  }

  if (input == "stand") {
    console.log("player chose stand");
    currentGameMode = thirdGameMode; // Dealer to choose hit or stand in thirdGameMode
    myOutputValue =
      "Player chose to stand. Hit submit once more †o see whether dealer chose to hit or stand."; // must hit submit once more for main function to run again
    return myOutputValue;
  }
};

var thirdGameModeDealerChooseHS = function (input) {
  var summarySoFarText = `Player now has ${playerCardsName} and a total of ${sumPlayerCards}. <br>Dealer has ${computerCardsName} and a total of ${sumComputerCards}. `;

  // randomise Dealer hit/stand choice
  var hitStandArray = ["hit", "stand"];
  var getRandomInteger = function (max) {
    return Math.floor(Math.random() * max);
  };

  var randomIndex = getRandomInteger(hitStandArray.length);
  var computerHSChoice = hitStandArray[randomIndex];

  // if sumComputerCards <17 -> must draw more cards, so set computerHSCards as "hit" automatically
  if (sumComputerCards < 17) {
    computerHSChoice = "hit";
    console.log("as sumComputerCards is <17, dealer chose " + computerHSChoice);
  }

  // if computerHSchoice is hit, then add cards,
  if (computerHSChoice == "hit") {
    console.log("dealer chose hit");
    var computerCard = shuffledDeck.pop();
    computerCardsName.push(computerCard.name);
    computerCardsScore.push(computerCard.score);
    console.log(
      "Dealer chose to hit. pushed dealer card. Pushed card: " +
        computerCard.name
    );
    console.log(
      "Dealer's holdings: " +
        computerCardsName +
        "<br><br>Dealer's score: " +
        computerCardsScore
    );

    sumPlayerCards = sumCards(playerCardsScore);
    sumComputerCards = sumCards(computerCardsScore);

    console.log(
      "after Dealer chose hit, sumComputerCards = " + sumComputerCards
    );
    summarySoFarText = `Player now has ${playerCardsName} and a total of ${sumPlayerCards}. <br>Dealer has ${computerCardsName} and a total of ${sumComputerCards}. `;
    myOutputValue = "Dealer chose to hit <br><br>" + summarySoFarText;
    // check winning conditions between player and Dealer

    // if dealer busted, end game. Else, computerHSChoice == "stand"

    if (sumComputerCards > 21) {
      gameEnded = 1;
      console.log(summarySoFarText);
      myOutputValue =
        summarySoFarText +
        "<br><br>Dealer has busted. Dealer loses and player wins! Click submit again to restart game.";
      return myOutputValue;
    }
    if (sumComputerCards < 17) {
      computerHSChoice = "hit";
      console.log("dealer still < 17, must hit again");
      myOutputValue =
        myOutputValue +
        "<br><br>Dealer's score is too low. Click submit for dealer to hit again.";
    }

    if (sumComputerCards > 17 && sumComputerCards <= 21) {
      // myOutputValue =
      //   summarySoFarText +
      //   "<br><br>Player, please enter 'hit' or 'stand', then click submit.";
      // currentGameMode = secondGameMode;
      // return myOutputValue;
      computerHSChoice = "stand";
      myOutputValue =
        myOutputValue +
        "<br><br>Dealer is done hitting. Click submit again to proceed.";
    }
  }
  // if computerHS choice is stand, then evaluate result
  if (computerHSChoice == "stand") {
    console.log("Dealer chose" + computerHSChoice);
    evaluateWinner();
  }
};

// output texts (only include those that don't have string literal to avoid logic flow issues)
var myOutputValue = "";

var main = function (input) {
  // create the deck
  deck = makeDeck();
  // run shuffle function
  shuffledDeck = shuffleCards(deck);

  // if is firstGameMode, deal cards to players
  if (gameEnded == 0) {
    if (currentGameMode == firstGameMode) {
      // execute firstModeDealCards
      firstModeDealCards();
      return myOutputValue;
    }
    if (currentGameMode == secondGameMode) {
      // user decides to hit or stand, then dealer decides to hit or stand
      secondModePlayerChooseHS(input);
      return myOutputValue;
    }
    if (currentGameMode == thirdGameMode) {
      //computer to decide
      thirdGameModeDealerChooseHS(input);
      return myOutputValue;
    }
  }
  if (gameEnded == 1) {
    computerCardsName = [];
    playerCardsName = [];

    playerCardsScore = [];
    computerCardsScore = [];

    sumPlayerCards = 0;
    sumComputerCards = 0;
    firstModeDealCards();
    gameEnded = 0;

    return "Welcome back to the game! Click submit to play the game again.";
  }
};

// var main = function (input) {
//   var finalOutput = gameLogic(input);
//   return finalOutput;
// };
