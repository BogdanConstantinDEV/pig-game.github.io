let activePlayer, scores, roundScore, gameON, finalScore
newGame()


// button-event => roll dice
document.querySelector('.btn-roll').addEventListener('click', () => {
    if (gameON) {
        const dice_1 = Math.floor(Math.random() * 6) + 1
        const dice_2 = Math.floor(Math.random() * 6) + 1

        // set dice img
        toggleDice('block')
        document.getElementById('dice-1').src = `dice-${dice_1}.png`
        document.getElementById('dice-2').src = `dice-${dice_2}.png`



        if (dice_1 === 1 || dice_2 === 1) return nextPlayer()
        // set round score
        roundScore += dice_1 + dice_2
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
        let scoreInput = document.querySelector('.final-score').value
        if (scoreInput) {
            finalScore = scoreInput
        } else {
            finalScore = 100
        }

        if (scores[activePlayer] >= finalScore) {
            gameWon()
        } else {
            nextPlayer()
        }

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

    toggleDice('none')
    gameON = true
}
function toggleDice(visibility) {
    document.querySelectorAll('.dice').forEach((dice, i) => {
        dice.style.display = visibility === 'block' ? 'block' : 'none'
    })
}



function nextPlayer() {
    roundScore = 0
    document.getElementById('current-0').textContent = 0
    document.getElementById('current-1').textContent = 0
    activePlayer = activePlayer === 0 ? activePlayer = 1 : activePlayer = 0

    document.querySelector('.player-0-panel').classList.toggle('active')
    document.querySelector('.player-1-panel').classList.toggle('active')

    toggleDice('none')
}




function gameWon() {
    document.getElementById(`name-${activePlayer}`).textContent = 'WINNER'
    document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner')

    gameON = false
}