var origBoard; //debe ser el tablero vacio
const huPlayer = '0'; //human player
const aiPlayer = 'X'; //AI player
const winCombos = [ //combos ganadores
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2],
]

const cells = document.querySelectorAll('.cell') //elije todos los elementos HTML q tengan la clase cell y los mete en un objeto
startGame();
console.log('afuera de la funcion');
function startGame() {
	console.log('startgame');
	document.querySelector(".endgame").style.display = "none"; //oculta la clase endgame, en caso de que hayas jugado antes
	origBoard = Array.from(Array(9).keys()); //crea un arreglo del 0 al 8, con el metodo array.from
	for (var i = 0; i < cells.length; i++) {
		cells[i].innerText = ''; //limpia la tabla
		cells[i].style.removeProperty('background-color'); //sacale color de fondo
		cells[i].addEventListener('click', turnClick, false); 
		//agrego un event listener, q queda cargado, en cada celda y ejecuto la funcion turnclick
	}
}

function turnClick(square) { //square es el td en este caso. Turnclick le pasa el objeto clickeado como parametro. Square es el objeto q tiene las propuedades del td
	//console.log(square.target.id)
	turn(square.target.id, huPlayer)
}

function turn(squareId, player){
	//le pasa el simbolo del jugador al cuadradito de la tabla
	origBoard[squareId] = player;
	document.getElementById(squareId).innerText = player; //para plancharlo en lo q se ve, q es el html.
	let gameWon = checkWin(origBoard, player);
	if (gameWon) gameOver(gameWon);
}

function checkWin(board, player) { //board es la info del tablero actual y player es el q hizo la ultima jugada
	let plays = board.reduce((a,e,i) => (e === player) ? a.concat(i) : a, []); 
	//plays es un array que guarda donde jugo el jugador
	let gameWon = null;
	for (let [index, win] of winCombos.entries()) { //creas una matriz, con index y los array triunfadores. con entries recorres todo el array
		if (win.every((elem) => plays.indexOf(elem > -1))) { // ¿> -1? entonces es un numero, has the player plays en all the spots del winCombo?
			gameWon = {index: index, player: player}; //gano el player!
		break;}
	
	return gameWon;
	}
}

/*
Arrow Function const add = (a, b) => (a + b)  
Is equivalent to  const add = (a, b) => {     return a + b; }  
When you use the() after your => it just automatically returns the values inside.  
const moli = (x, y) => (x+y);  console.log(moli(1,2) )

ternary operator:
"La Cuota es de:  " + (isMember ? "$2.00" : "$10.00")

array.reduce(myFunc, [])
fucntion myFunc(a,e,i){
	if(e === player){
		return a.concat(i);
	}
	else{
		return a
	}
}
reduce parece ser una función recurrente que toma un valor acumulator y un valor corriente


*/

