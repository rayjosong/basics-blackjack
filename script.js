/*
SIMPLIFIED RULES 
1. There will be only two players. One human and one computer (for the Base solution).
2. The computer will always be the dealer.
3. Each player gets dealt two cards to start.
4. The player goes first, and decides if they want to hit (draw a card) or stand (end their turn).
5. The dealer has to hit if their hand is below 17.
6. Each players' score is the total of their card ranks. Jacks/Queen/Kings are 10. Aces can be 1 or 11.
7. The player who is closer to, but not above 21 wins the hand.

*/

// =========================== GLOBAL VARIABLES ===========================

var dealerCardsName = [];
var playerCardsName = [];

var dealerCardsScore = [];
var playerCardsScore = [];
var sumDealerCards = 0;
var sumPlayerCards = 0;

var myOutputValue;

// ===========================  GAME MODES ===========================
var firstGameMode = "assign cards & test for early winners";
var secondGameMode = "player choose hit or stand";
var thirdGameMode = "dealer choose hit or stand";
var blackjackMode = "there is a blackjack";

var currentGameMode = firstGameMode;

// =========================== HELPER FUNCTIONS ===========================
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

// Shuffle the elements in the cardDeck array (called getRandomIndex)
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

  // console.log("sumCards function, gives me sum of: " + sum);

  // variable ace. Got the idea from Cheena's code during redux
  for (let j = 0; j < array.length; j += 1) {
    if (array[j].name == "ace" && sum < 12) {
      sum = sum + 10;
    }
  }
  return sum;
};
// Creating evaluatewinner to cover all scenarios

// I noticed that I cannot use summarySoFarText within evaluate winner because it will always call back to the original global variable, thereby leading to sumComputerCards/sumPlayerCards == 0
// var evaluateWinner = function () {
//   // if both P D are < 21, then compare who is higher. The one closer to 21 will win -> output text of winner
//   if (sumPlayerCards <= 21 && sumDealerCards <= 21) {
//     console.log("both are <21");
//     if (sumPlayerCards == sumDealerCards) {
//       console.log("draw");
//       // draw
//       // myOutputValue =
//       //   `<u>Player</u> <br><br>Cards: ${playerCardsName}<br>Score: ${sumPlayerCards} <br><br><u>Dealer</u><br><br>Score: ${sumDealerCards}` +
//       //   "<br><br><p style='color: red;'>The game is a draw.<br><br>Click submit to start game again.<p>";
//       gameEnded = 1;
//       // return myOutputValue;
//       return "draw";
//     }
//     if (sumPlayerCards > sumDealerCards) {
//       console.log("win");
//       // player wins
//       // myOutputValue =
//       //   `<u>Player</u> <br><br>Cards: ${playerCardsName}<br>Score: ${sumPlayerCards} <br><br><u>Dealer</u><br><br>Score: ${sumDealerCards}` +
//       //   "<br><br><p style='color: red;'>Congrats! The player received a higher hand. Therefore, player wins. <br><br>Click submit to start game again.</p>";
//       gameEnded = 1;
//       return "win";
//     }
//     if (sumPlayerCards < sumDealerCards) {
//       console.log("lose");
//       // dealer wins
//       // myOutputValue =
//       //   `<u>Player</u> <br><br>Cards: ${playerCardsName}<br>Score: ${sumPlayerCards} <br><br><u>Dealer</u><br><br>Score: ${sumDealerCards}` +
//       //   "<br><br><p style:'color = red;'>The dealer received a higher hand. Therefore, dealer wins! <br><br>Click submit to start game again.</p>";
//       gameEnded = 1;
//       return "lose";
//     }
//   }

//   if (sumPlayerCards > 21) {
//     // player has busted
//     myOutputValue =
//       `<u>Player</u> <br><br>Cards: ${playerCardsName}<br>Score: ${sumPlayerCards} <br><br><u>Dealer</u><br><br>Score: ${sumDealerCards}` +
//       "<br><br><p style='color: red;'>The player has busted! The dealer wins. <br><br>Click submit to start game again.</p>";

//     gameEnded = 1;
//     return myOutputValue;
//   }
//   if (sumComputerCards > 21) {
//     myOutputValue =
//       `<u>Player</u> <br><br>Cards: ${playerCardsName}<br>Score: ${sumPlayerCards} <br><br><u>Dealer</u><br><br>Score: ${sumDealerCards}` +
//       "<br><br><p style='color: red;'>The dealer has busted! The player wins.<br><br>Click submit to start game again.</p>";
//     gameEnded = 1;
//     return myOutputValue;
//   }
//   if (sumPlayerCards > 21 && sumComputerCards > 21) {
//     myOutputValue =
//       `<u>Player</u> <br><br>Cards: ${playerCardsName}<br>Score: ${sumPlayerCards} <br><br><u>Dealer</u><br><br>Score: ${sumDealerCards}` +
//       "<br><br><p style='color: red;'>Both player & dealer has busted. The game is a draw!<br><br>Click submit to start game again.</p>";
//     gameEnded = 1;
//     return myOutputValue;
//   }
// };

// check if blackjack condition has been fulfilled
var checkBlackJack = function () {
  // Case 1: Yes, got blackjack
  if (sumPlayerCards == 21 || sumDealerCards == 21) {
    currentGameMode = blackjackMode;

    if (currentGameMode == blackjackMode) {
      if (sumPlayerCards == 21 && sumDealerCards == 21) {
        console.log("dealer score: " + sumDealerCards);
        console.log("player score: " + sumPlayerCards);
        gameEnded = 1;

        return `Player has ${sumPlayerCards}.<br>Dealer has ${sumDealerCards}.<br><br>There is a draw! Both player and dealer has gotten blackjack.<br><br>Click submit to play again.`;
      }

      if (sumDealerCards == 21) {
        console.log("dealer score: " + sumDealerCards);
        console.log("player score: " + sumPlayerCards);
        return `Player has ${sumPlayerCards}.<br>Dealer has ${sumDealerCards}.<br><br>Dealer wins with a blackjack!<br><br>Click submit to play again.`;
      }

      if (sumPlayerCards == 21) {
        console.log("dealer score: " + sumDealerCards);
        console.log("player score: " + sumPlayerCards);
        return `Player has ${sumPlayerCards}.<br>Dealer has ${sumDealerCards}.<br><br>Player wins with a blackjack!<br><br>Click submit to play again.`;
      }
    }
  }
};

// ================== HTML FUNCTIONS ==================
var shuffledDeck = shuffleCards(makeDeck());

var deal = function () {
  if (currentGameMode === firstGameMode && gameEnded == 0) {
    console.log("dealing cards");
    // deal player cards
    for (i = 0; i < 2; i++) {
      var playerCard = shuffledDeck.pop();
      playerCardsName.push(playerCard.name);
      playerCardsScore.push(playerCard.score);
      console.log(`[Player] Pushed card ${i + 1}. In deck: ${playerCardsName}`);
    }
    // deal dealer cards
    for (i = 0; i < 2; i++) {
      var dealerCard = shuffledDeck.pop();
      dealerCardsName.push(dealerCard.name);
      dealerCardsScore.push(dealerCard.score);
      console.log(`[Dealer] Pushed card ${i + 1}. In deck: ${dealerCardsName}`);
    }

    sumPlayerCards = sumCards(playerCardsScore);
    sumDealerCards = sumCards(dealerCardsScore);
    console.log(`Player score: ${sumPlayerCards}`);
    console.log(`Dealer score: ${sumDealerCards}`);

    // TODO: maybe output text for player/dealer score?
    myOutputValue = `<u>Player</u> <br><br>Cards: ${playerCardsName}<br>Score: ${sumPlayerCards} <br><br><u>Dealer</u><br><br>Score: ${sumDealerCards}<br><br>
    
    <p style='color: red;'><i>Click hit or stand to continue.</i></p>`;

    currentGameMode = secondGameMode;
    return myOutputValue;
  }

  if (currentGameMode != firstGameMode && gameEnded == 0) {
    return `<p style='color:red;'>Please click 'hit' or 'stand' to continue</p>`;
  }

  if (gameEnded == 1) {
    return `<p style='color:red;'>Game has ended. Please refresh to play again</p>`;
  }
};

var hit = function () {
  dealerHS();
  if (currentGameMode === secondGameMode && gameEnded == 0) {
    console.log(
      `Player holdings: ${playerCardsName} <br>Player score: ${sumPlayerCards}`
    );
    console.log("player chose to hit");
    playerCard = shuffledDeck.pop();
    playerCardsScore.push(playerCard.score);
    playerCardsName.push(playerCard.name);

    sumPlayerCards = sumCards(playerCardsScore);
    sumDealerCards = sumCards(dealerCardsScore);

    // myOutputValue = `<u>Player</u> <br><br>Cards: ${playerCardsName}<br>Score: ${sumPlayerCards} <br><br><u>Dealer</u><br><br>Score: ${dealerCardsScore}<br><br><i>Click hit or stand to continue.</i>`;
    var playerText = `Player chose to hit. <br><br><u>Player</u> <br><br>Cards: ${playerCardsName}<br>Score: ${sumPlayerCards} <br><br><u>Dealer</u><br><br>Score: ${sumDealerCards}`;
    console.log(playerText);

    if (sumDealerCards > 21 && sumPlayerCards > 21) {
      gameEnded = 1;
      return (
        playerText +
        "<p style='color: red;'><br><br>Both player and dealer has busted. Nobody wins! Refresh to restart game.</p>"
      );
    }

    if (sumPlayerCards > 21) {
      gameEnded = 1;
      return (
        playerText +
        "<p style='color: red;'><br><br>Player has busted. Player loses! Refresh to restart game.</p>"
      );
    }

    if (sumDealerCards > 21) {
      gameEnded = 1;
      return (
        playerText +
        "<p style='color: red;'><br><br>Dealer has busted. Player wins! Refresh to restart game.</p>"
      );
    } else {
      return (
        playerText +
        '<p style="color: red;"><br><br><i>Click "hit" button or "stand" button to continue.</i></p>'
      );
    }
  }

  if ((gameEnded = 1)) {
    return `<p style='color:red;'>Game has ended. Please refresh to play again</p>`;
  }
};

var stand = function () {
  console.log("player chose to stand");
  // if both P D are < 21, then compare who is higher. The one closer to 21 will win -> output text of winner
  if (sumPlayerCards <= 21 && sumDealerCards <= 21 && gameEnded == 0) {
    console.log("both are <21");
    if (sumPlayerCards == sumDealerCards) {
      console.log("draw");
      // draw
      myOutputValue =
        `<u>Player</u> <br><br>Cards: ${playerCardsName}<br>Score: ${sumPlayerCards} <br><br><u>Dealer</u><br><br>Score: ${sumDealerCards}` +
        "<br><br><p style='color: red;'>The game is a draw.<br><br>Refresh page to play again.<p>";
      gameEnded = 1;
      return myOutputValue;
    }
    if (sumPlayerCards > sumDealerCards) {
      console.log("win");
      // player wins
      myOutputValue =
        `<u>Player</u> <br><br>Cards: ${playerCardsName}<br>Score: ${sumPlayerCards} <br><br><u>Dealer</u><br><br>Score: ${sumDealerCards}` +
        "<br><br><p style='color: red;'>Congrats! The player received a higher hand. Therefore, player wins. <br><br>Refresh page to play again..</p>";
      gameEnded = 1;
      return myOutputValue;
    }
    if (sumPlayerCards < sumDealerCards) {
      console.log("lose");
      // dealer wins
      myOutputValue =
        `<u>Player</u> <br><br>Cards: ${playerCardsName}<br>Score: ${sumPlayerCards} <br><br><u>Dealer</u><br><br>Score: ${sumDealerCards}` +
        "<br><br><p style='color = red;'>The dealer received a higher hand. Therefore, dealer wins! <br><br>Refresh page to play again..</p>";
      gameEnded = 1;
      return myOutputValue;
    }
  }

  if (sumPlayerCards > 21) {
    // player has busted
    myOutputValue =
      `<u>Player</u> <br><br>Cards: ${playerCardsName}<br>Score: ${sumPlayerCards} <br><br><u>Dealer</u><br><br>Score: ${sumDealerCards}` +
      "<br><br><p style='color: red;'>The player has busted! The dealer wins. <br><br>Refresh page to play again..</p>";

    gameEnded = 1;
    return myOutputValue;
  }
  if (sumDealerCards > 21) {
    myOutputValue =
      `<u>Player</u> <br><br>Cards: ${playerCardsName}<br>Score: ${sumPlayerCards} <br><br><u>Dealer</u><br><br>Score: ${sumDealerCards}` +
      "<br><br><p style='color: red;'>The dealer has busted! The player wins.<br><br>Refresh page to play again..</p>";
    gameEnded = 1;
    return myOutputValue;
  }
  if (sumPlayerCards > 21 && sumDealerCards > 21) {
    myOutputValue =
      `<u>Player</u> <br><br>Cards: ${playerCardsName}<br>Score: ${sumPlayerCards} <br><br><u>Dealer</u><br><br>Score: ${sumDealerCards}` +
      "<br><br><p style='color: red;'>Both player & dealer has busted. The game is a draw!<br><br>Refresh page to play again.</p>";
    gameEnded = 1;
    return myOutputValue;
  }

  if (gameEnded == 1) {
    return `<p style='color:red;'>Game has ended. Please refresh to play again</p>`;
  }
};

// ================== MAIN FUNCTIONS ==================

// game logic for dealer
var dealerHS = function () {
  // randomly choose to hit or stand for dealer
  var hitStandArray = ["hit", "stand"];
  var getRandomInteger = function (max) {
    return Math.floor(Math.random() * max);
  };

  var randomIndex = getRandomInteger(hitStandArray.length);
  var dealerHSChoice = hitStandArray[randomIndex];

  // if dealer chose < 17 -> draw more cards, so set dealerHSChoice as "hit" automatically
  while (sumDealerCards < 17) {
    console.log("dealer chose hit automatically because < 17 cards");
    var dealerCard = shuffledDeck.pop();
    dealerCardsName.push(dealerCard.name);
    dealerCardsScore.push(dealerCard.score);
    sumDealerCards = sumCards(dealerCardsScore);
    console.log(
      `As sumComputerCards was <17, dealer had to hit. Dealer score: ${sumDealerCards}`
    );
  }

  // dealerHSChoice = "stand";

  if (dealerHSChoice == "hit") {
    console.log("dealer chose to hit");
    var dealerCard = shuffledDeck.pop();
    dealerCardsName.push(dealerCard.name);
    dealerCardsScore.push(dealerCard.score);

    sumDealerCards = sumCards(dealerCardsScore);
    sumPlayerCards = sumCards(playerCardsScore);
  }
  //   if (sumDealerCards > 21) {
  //     gameEnded = 1;
  //     var dealerText = `Dealer chose to hit. <br>Dealer holdings: ${dealerCardsName}<br>Dealer score: ${sumDealerCards}`;
  //     // TODO: output text for ending game
  //   }

  //   if (sumDealerCards >= 17 && sumDealerCards <= 21) {
  //     // TODO: evaluate winner
  //   }
  // }

  // if (sumDealerCards >= 17 && sumDealerCards <= 21) {
  //   // TODO: evaluate winner
  // }
};
// var main = function (input) {
//   var finalOutput = gameLogic(input);
//   return finalOutput;
// };
