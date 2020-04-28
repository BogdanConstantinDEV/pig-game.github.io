let activePlayer, scores, roundScore, gameON
newGame()


// button-event => roll dice
document.querySelector('.btn-roll').addEventListener('click', () => {
    if (gameON) {
        const dice = Math.floor(Math.random() * 6) + 1

        // set dice img
        const diceImg = document.querySelector('.dice')
        diceImg.style.display = 'block'
        diceImg.src = `dice-${dice}.png`

        // set round score
        if (dice === 1) return nextPlayer()
        roundScore += dice
        document.getElementById(`current-${activePlayer}`).textContent = roundScore
    }
})




// button-event => hold
document.querySelector('.btn-hold').addEventListener('click', () => {
    if (gameON) {
        // update player score
        scores[activePlayer] += roundScore
        document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer]

        // check if current player won
        if (scores[activePlayer] >= 100) {
            return gameWon()
        }

        nextPlayer()
    }
})




// button-event => new game
document.querySelector('.btn-new').addEventListener('click', newGame)






function newGame() {

    scores = [0, 0]
    activePlayer = 0
    roundScore = 0

    document.getElementById('score-0').textContent = 0
    document.getElementById('score-1').textContent = 0
    document.getElementById('current-0').textContent = 0
    document.getElementById('current-1').textContent = 0
    document.getElementById(`name-0`).textContent = 'Player 1'
    document.getElementById(`name-1`).textContent = 'Player 2'

    document.querySelector(`.player-0-panel`).classList.remove('winner')
    document.querySelector(`.player-1-panel`).classList.remove('winner')

    document.querySelector('.player-0-panel').classList.remove('active')
    document.querySelector('.player-0-panel').classList.add('active')
    document.querySelector('.player-1-panel').classList.remove('active')

    document.querySelector('.dice').style.display = 'none'
    gameON = true
}



function nextPlayer() {
    roundScore = 0
    document.getElementById('current-0').textContent = 0
    document.getElementById('current-1').textContent = 0
    activePlayer = activePlayer === 0 ? activePlayer = 1 : activePlayer = 0

    document.querySelector('.player-0-panel').classList.toggle('active')
    document.querySelector('.player-1-panel').classList.toggle('active')

    document.querySelector('.dice').style.display = 'none'
}




function gameWon() {
    document.getElementById(`name-${activePlayer}`).textContent = 'WINNER'
    document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner')

    gameON = false
}