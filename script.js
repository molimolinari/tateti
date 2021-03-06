var origBoard; //debe ser el tablero vacio
const huPlayer = 'O'; //human player
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
	if (typeof origBoard[square.target.id] == 'number') { //si el valor es numerico, nadie jugo en ese cuadrado
		if(turn(square.target.id, huPlayer)){
		  if (!checkTie()) {
			turn(bestSpot(emptySquares().length), aiPlayer) // le pasa el mejor lugar
		  } //revisa si hay un empate
		} 
	}
}

function turn(squareId, player){
	//le pasa el simbolo del jugador al cuadradito de la tabla
	origBoard[squareId] = player;
	document.getElementById(squareId).innerText = player; //para plancharlo en lo q se ve, q es el html.
	let gameWon = checkWin(origBoard, player);
	if (gameWon) {
		gameOver(gameWon);
		return false;
	}
	return true;
}

function checkWin(board, player) { //board es la info del tablero actual y player es el q hizo la ultima jugada
	let plays = board.reduce((a,e,i) => (e === player) ? a.concat(i) : a, []); 
	//plays es un array que guarda donde jugo el jugador

	let gameWon = null;
	
/*
sentencia for of: for ("index" of "objeto iterable"), 
ejecuta un bloque decodigo por cada elemento del objeto iterable

for (i of "moli"){
	i = i+e;
	consolelog(i)
}
Devuelve: me, oe, le, ie

metodo entries: es usado para retornar un array que consiste en las propiedades

*/

	for (let [index, win] of winCombos.entries()) { //creas una matriz, con index y los array triunfadores. con entries recorres todo el array
//every: determina si todos los elementos en el array y ejecuta una función (con una condicion)
		if (win.every(elem => plays.indexOf(elem) > -1)) { //es una funcion de busqueda que devuelve -1 si no encontro el valor o el valor del indice donde esta la palabra
			gameWon = {index: index, player: player}; //gano el player!
			break;}		
		}
	return gameWon;
	}

function gameOver(gameWon) {
	for (let index of winCombos[gameWon.index]){
		document.getElementById(index).style.backgroundColor = gameWon.player == huPlayer ? "blue" : "red";
	}

	for (let i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click',turnClick, false) //ya no escuches mas!
	}
	declareWinner(gameWon.player == huPlayer ? "Ganaste Campeon!" : "Perdiste!!!");

}

function declareWinner(who){
	document.querySelector(".endgame").style.display = "block";
	document.querySelector(".endgame .text").innerText = who;
}

function emptySquares(){
	return origBoard.filter(s => typeof s == 'number'); //va recortandoe l origboard donde vos jugaste
}

function bestSpot(length){
	index = Math.floor(Math.random()*length);
	console.log(index)
	return emptySquares()[index];
}

function checkTie(){
	if (emptySquares().length == 0) {
		for (var i=0; i<cells.length; i++) {
			cells[i].style.backgroundColor = "green";
			cells[i].removeEventListener('click', turnClick, false);
		}
		declareWinner("Empate")
		return true;
	}
	return false;
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

