const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let firstCard;
let secondCard;
let lockBoard = false;


function flipcard()
{
	if(lockBoard) return; //si el tablero esta bloqueado no ejecuta nada
	if(this === firstCard) return; //si la carta fue clickeada dos veces no toma en cuenta el segundo click
	
	this.classList.toggle("flip"); //da vuelta una carta cuando la clickeas
	
	if (!hasFlippedCard)
	{
		//primer click
		hasFlippedCard = true;
		firstCard = this;
		return;
	}
	
	//segundo click
	hasFlippedCard = false;
	secondCard = this;
	
	checkForMatch();
	
}

function checkForMatch() //chequea si las cartas son iguales
{
	
	let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
	isMatch ? disableCards() : unFlipCards();
	
	/* estas lineas hacen lo que estan en la caja punteada en una sola linea
	-------------------------------------------------------------------------------------------
	if (firstCard.dataset.framework === secondCard.dataset.framework) //son iguales
	{
		disableCards();
	}
	else //no son iguales
	{
		unFlipCards();
	}
----------------------------------------------------------------------------------------------	 */
}

function disableCards() //deshabilita las cartas cuya pareja ya fue encontrada
{
	firstCard.removeEventListener("click", flipcard); //le saca el eventListener para que no pueda volver a ser clickeada, ya que se encontro su pareja
	secondCard.removeEventListener("click", flipcard); //lo mismo pero a la pareja
	resetBoard();
} 

function unFlipCards() //da vuelta las cartas al dar vuelta 2 incorrectas
{
	lockBoard = true; //bloquea el tablero durante la animacion de mostrar la segunda carta para que el usuario no pueda tocar mas cartas y rompa la logica del codigo
	setTimeout(() =>{ //le agrega un delay para poder ver la carta incorrecta antes de darla vuelta de nuevo
		firstCard.classList.remove("flip"); // se da vuelta de nuevo la carta
		secondCard.classList.remove("flip"); // lo mismo pero a la otra
		
		lockBoard = false; //desbloquea el tablero al terminar la animacion
	}, 1500);
}

function resetBoard() //reinicia las variables
{
	firstCard = null;
	secondCard = null;
	lockBoard = false;
	hasFlippedCard = false;
}

(function shuffle(){
	cards.forEach (card => {
		let randomPos = Math.floor(Math.random() * 12);
		card.style.order = randomPos;
	})
})(); // esta funcion tiene dos parentesis mas, lo que hace que se ejecute al principio del codigo siempre que se ejecuta este

cards.forEach(card => card.addEventListener("click", flipcard)) // le da a cada carta un eventListener para que reconozca cuando se la clickea y llame a la funcion flipCard