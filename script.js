var origBoard;
const huPlayer = '0';
const aiPlayer = 'X';
const winCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2],
]

const cells = document.querySelectorAll('.cell') //elige todos los elementos HTML q tengan la clase cell
startGame();
console.log('afuera de la funcion');
function startGame() {
	console.log('startgame');
	document.querySelector(".endgame").style.display = "none";
	origBoard = Array.from(Array(9).keys()); //crea un arreglo del 0 al 9, con el metodo array.from
	for (var i = 0; i < cells.length; i++) {
		cells[i].innerText = '';
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click', turnClick, false); //agrego un event listener en cada celda y ejecuto la funcion turnclick
	}
}

function turnClick(square) {
	console.log(square.target.id)
}