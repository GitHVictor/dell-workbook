'use strict'
const assert = require('assert')
const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
let board = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']]

let playerTurn = 'X'

function printBoard () {
  console.log('   0  1  2')
  console.log('0 ' + board[0].join(' | '))
  console.log('  ---------')
  console.log('1 ' + board[1].join(' | '))
  console.log('  ---------')
  console.log('2 ' + board[2].join(' | '))
}

function horizontalWin () {
  let IsThereAWinner = false
  for (var i = 0; i < board.length - 1; i++) {
    IsThereAWinner =
      board[i][0] === playerTurn &&
      board[i][1] === playerTurn &&
      board[i][2] === playerTurn
    if (IsThereAWinner) {
      break
    }
  }
  return IsThereAWinner
}

function verticalWin () {
  let IsThereAWinner = false
  for (var i = 0; i < board.length - 1; i++) {
    IsThereAWinner =
      board[0][i] === playerTurn &&
      board[1][i] === playerTurn &&
      board[2][i] === playerTurn
    if (IsThereAWinner) {
      break
    }
  }
  return IsThereAWinner
}

function diagonalWin () {
  let IsThereAWinner = false
  IsThereAWinner =
    (board[0][0] === playerTurn &&
      board[1][1] === playerTurn &&
      board[2][2] === playerTurn) ||
    (board[0][2] === playerTurn &&
      board[1][1] === playerTurn &&
      board[2][0] === playerTurn)

  return IsThereAWinner
}

function checkForWin () {
  let IsThereAWinner = diagonalWin() || horizontalWin() || verticalWin()
  return IsThereAWinner
}

function ticTacToe (row, column) {
  board[row][column] = playerTurn
  playerTurn = playerTurn === 'X' ? 'O' : 'X'
}

function getPrompt () {
  printBoard()
  console.log("It's Player " + playerTurn + "'s turn.")
  rl.question('row: ', row => {
    rl.question('column: ', column => {
      ticTacToe(row, column)
      getPrompt()
    })
  })
}

// Tests

if (typeof describe === 'function') {
  describe('#ticTacToe()', () => {
    it('should place mark on the board', () => {
      ticTacToe(1, 1)
      assert.deepEqual(board, [
        [' ', ' ', ' '],
        [' ', 'X', ' '],
        [' ', ' ', ' ']
      ])
    })
    it('should alternate between players', () => {
      ticTacToe(0, 0)
      assert.deepEqual(board, [
        ['O', ' ', ' '],
        [' ', 'X', ' '],
        [' ', ' ', ' ']
      ])
    })

    it('should check for vertical wins', () => {
      board = [[' ', 'X', ' '], [' ', 'X', ' '], [' ', 'X', ' ']]
      assert.equal(verticalWin(), true)
    })
    it('should check for horizontal wins', () => {
      board = [['X', 'X', 'X'], [' ', ' ', ' '], [' ', ' ', ' ']]
      assert.equal(horizontalWin(), true)
    })
    it('should check for diagonal wins', () => {
      board = [['X', ' ', ' '], [' ', 'X', ' '], [' ', ' ', 'X']]
      assert.equal(diagonalWin(), true)
    })
    it('should detect a win', () => {
      assert.equal(checkForWin(), true)
    })
  })
} else {
  getPrompt()
}
