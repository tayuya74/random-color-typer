let $start = document.querySelector('#start')
let $game = document.querySelector('#game')
let $time = document.querySelector('#time')
let $result = document.querySelector('#result')
let $timeHeader = document.querySelector('#time-header')
let $resultHeader = document.querySelector('#result-header')
let $gameTime = document.querySelector('#game-time')

let score = 0
let	isGameStarted  = false
let colors = ['#b9b9ff', '#22c1c3', '#fdbb2d', '#833ab4', '#eeaeca', '#020024', '#2daf05', '#090979', '#3b20d5', '#6cfd2d', '#fb3ff0', '#f9ff00']

$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBoxClick)
$gameTime.addEventListener('input', setGameTime)

function show($el) {
	$el.classList.remove('hide')
}

function hide($el) {
	$el.classList.add('hide')
}

function startGame() {
	score = 0
	setGameTime()
	$gameTime.setAttribute('disabled', 'true')
	isGameStarted = true
	$game.style.backgroundColor = '#fff'
	hide($start)

	  let interval = setInterval(function() {
			let time = parseFloat($time.textContent)

			if (time <= 0) {
				clearInterval(interval)
				endGame()
			} else {
				$time.textContent = (time - 0.1).toFixed(1)
			}

		}, 100)

	renderBox()
}

function setGameScore() {
	$result.textContent = score.toString()
}

function setGameTime() {
	let time = +$gameTime.value
	$time.textContent = time.toFixed(1)
	show($timeHeader)
	hide($resultHeader)
}

function endGame() {
	isGameStarted = false
	setGameScore()
	$gameTime.removeAttribute('disabled')
	show($start)
	$game.style.backgroundColor = '#ccc'
	$game.innerHTML= ''
	hide($timeHeader)
	show($resultHeader)
}

function handleBoxClick(event) {

	if (!isGameStarted){
		return
	}

	if (event.target.dataset.box) {
		score++
		renderBox()
	}
}

function renderBox() {
	$game.innerHTML= ''

	let box = document.createElement('div')
	let boxSize = getRandom(30, 100)
	let gameSize = $game.getBoundingClientRect()
	let maxTop = gameSize.height - boxSize
	let maxLeft = gameSize.width - boxSize 
	let randomColorIndex = getRandom(0, colors.length)

	box.style.width = box.style.height = boxSize + 'px'
	box.style.position = 'absolute' 
	box.style.backgroundColor = colors[randomColorIndex]
	box.style.top = getRandom(0, maxTop) + 'px'
	box.style.left = getRandom(0, maxLeft) + 'px'
	box.style.cursor = 'pointer'
	box.setAttribute('data-box', 'true')
	$game.insertAdjacentElement('afterbegin', box)
}

function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min) + min)
}