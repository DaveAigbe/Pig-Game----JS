'use strict';

const playerNameZero = document.querySelector('#name--0');
const playerNameOne = document.querySelector('#name--1');

const playerZero = document.querySelector('.player--0');
const playerOne = document.querySelector('.player--1');

const totalScoreZero = document.querySelector('#score--0');
const totalScoreOne = document.querySelector('#score--1');

const currentScoreZero = document.querySelector('#current--0');
const currentScoreOne = document.querySelector('#current--1');

const btnRollDice = document.querySelector('.btn--roll');
const btnNewGame = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

const dice = document.querySelector('.dice');

// Start off showing no dice
dice.classList.add('hidden');

// Setup lists and variables with current players so it will be easy to swap after 2 turns
const playerList = [totalScoreZero, totalScoreOne];
const playerScoreList = [currentScoreZero, currentScoreOne];
let currentPlayer = playerList[0];
let currentPlayerScore = playerScoreList[0];

// Function to generate a random number
const randomNumber = function ()
{
  return Math.trunc(Math.random() * 6) + 1;
};

// Function for roll dice button
const diceRoll = function (playerScore)
{
  // Generate a random number
  const rolledNumber = randomNumber();

  // Display proper dice
  dice.classList.remove('hidden');
  // Use src because it derives from an image
  dice.src = `dice-${rolledNumber}.png`;

  // If a 1 is rolled, set the current total to 0 and player turn will end
  if (rolledNumber === 1)
  {
    playerScore.textContent = 0;
    swap();
  } else
  {
    // Add the random number to the current total
    playerScore.textContent = Number(playerScore.textContent) + rolledNumber;
  }

  // Check for winner
  winner();
};

// Function for hold button
const hold = function (player, playerScore)
{
  // Add current score to player total
  player.textContent =
    Number(player.textContent) + Number(playerScore.textContent);
  // Check to see after points have been added to total, if current user has won
  if (Number(player.textContent) >= 100)
  {
    console.log(`${playerNameZero.textContent} has won!`);
  }

  // Set current score back to 0
  playerScore.textContent = 0;

  // Swap active player
  swap();

  // Check for Winner
  winner();
};

// Function for new game button
const newGame = function ()
{
  totalScoreZero.textContent = 0;
  totalScoreOne.textContent = 0;

  currentScoreZero.textContent = 0;
  currentScoreOne.textContent = 0;

  playerNameZero.textContent = 'Player 1';
  playerNameOne.textContent = 'Player 2';

  // Hide the dice
  dice.classList.add('hidden');

  // Reset it back to player 1 having first turn
  currentPlayer = playerList[1];
  swap();
};

// Function that will display if someone has won
const winner = function ()
{
  if (Number(totalScoreZero.textContent) >= 100)
  {
    playerNameZero.textContent = 'Winner!🏆';
  } else if (Number(totalScoreOne.textContent) >= 100)
  {
    playerNameOne.textContent = 'Winner!🏆';
  }
};

// Function that will swap current player
const swap = function ()
{
  // Switch the current player
  if (currentPlayer === playerList[0])
  {
    currentPlayer = playerList[1];
    currentPlayerScore = playerScoreList[1];
    // Swap the shaded area to highlight the active player
    playerZero.classList.remove('player--active');
    playerOne.classList.add('player--active');
  } else
  {
    currentPlayer = playerList[0];
    currentPlayerScore = playerScoreList[0];
    playerOne.classList.remove('player--active');
    playerZero.classList.add('player--active');
  }
};

// Use anonymous function to pass parameters to the specified function that uses parameters
btnRollDice.addEventListener('click', function ()
{
  diceRoll(currentPlayerScore);
});

btnHold.addEventListener('click', function ()
{
  hold(currentPlayer, currentPlayerScore);
});

btnNewGame.addEventListener('click', newGame);
