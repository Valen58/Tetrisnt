const boton0 = document.getElementById('btn1') //consigue la id del elemento al que quiere checkear y le asigna en una constante del nombre que desees
const boton1 = document.getElementById('btn2')
const boton2 = document.getElementById('btn3')
const boton3 = document.getElementById('btn4')
const boton4 = document.getElementById('btn5')
const boton5 = document.getElementById('btn6')
const boton6 = document.getElementById('btn7')
const boton7 = document.getElementById('btn8')
const boton8 = document.getElementById('btn9')

let botonClickeado = 0;
let estadoBoton = [0, 0, 0, 0, 0, 0, 0, 0, 0]
let ultimoBotonClickeado = 2;

boton0.addEventListener("click", () => {  //usa un eventListener en el elemento boton1, para checkear si se clickea ese botons
	ultimoBotonClickeado = click(0, ultimoBotonClickeado);
});

boton1.addEventListener("click", () => { 
	ultimoBotonClickeado = click(1, ultimoBotonClickeado);
});

boton2.addEventListener("click", () => { 
	ultimoBotonClickeado = click(2, ultimoBotonClickeado);
});

boton3.addEventListener("click", () => { 
	ultimoBotonClickeado = click(3, ultimoBotonClickeado);
});

boton4.addEventListener("click", () => { 
	ultimoBotonClickeado = click(4, ultimoBotonClickeado);
});

boton5.addEventListener("click", () => { 
	ultimoBotonClickeado = click(5, ultimoBotonClickeado);
});

boton6.addEventListener("click", () => { 
	ultimoBotonClickeado = click(6, ultimoBotonClickeado);
});

boton7.addEventListener("click", () => { 
	ultimoBotonClickeado = click(7, ultimoBotonClickeado);
});

boton8.addEventListener("click", () => { 
	ultimoBotonClickeado = click(8, ultimoBotonClickeado);
});

function gana1(){
	setTimeout(() => {
		alert("Gana el jugador 1");
	}, 10);
}

function gana2(){
	setTimeout(() => {
		alert("Gana el jugador 2");
	}, 10);
}

function click (botonClickeado, ultimoBotonClickeado){
	if (estadoBoton[botonClickeado] === 0){
		if (ultimoBotonClickeado === 1)
		{
			//event.target.style.backgroundColor = 'red';
			event.target.style.backgroundImage = "url('./img/circulo.png')";

			estadoBoton[botonClickeado] = 2
			finDelJuego();
			return 2;
		}
		else if (ultimoBotonClickeado === 2){
			//event.target.style.backgroundColor = 'green';
			event.target.style.backgroundImage = "url('./img/cruz.png')";

			estadoBoton[botonClickeado] = 1;
			finDelJuego();
			return 1;
		}
	}
	else
	return ultimoBotonClickeado;
}

function finDelJuego(){

	let contador = 0;

	if (estadoBoton[0] === 1 && estadoBoton[1] === 1 && estadoBoton[2] === 1){
		gana1();
		
	}
	else if (estadoBoton[3] === 1 && estadoBoton[4] === 1 && estadoBoton[5] === 1){
		gana1();
	}
	else if (estadoBoton[6] === 1 && estadoBoton[7] === 1 && estadoBoton[8] === 1){
		gana1();	}
		
	else if (estadoBoton[0] === 1 && estadoBoton[3] === 1 && estadoBoton[6] === 1){
		gana1();
	}
	else if (estadoBoton[1] === 1 && estadoBoton[4] === 1 && estadoBoton[7] === 1){
		gana1();	
	}
		
	else if (estadoBoton[2] === 1 && estadoBoton[5] === 1 && estadoBoton[8] === 1){
		gana1();
	}
	else if (estadoBoton[0] === 1 && estadoBoton[4] === 1 && estadoBoton[8] === 1){
		gana1();
	}
	else if (estadoBoton[2] === 1 && estadoBoton[4] === 1 && estadoBoton[6] === 1){
		gana1();
	}
	else if (estadoBoton[0] === 2 && estadoBoton[1] === 2 && estadoBoton[2] === 2){
		gana2();
	}
	else if (estadoBoton[3] === 2 && estadoBoton[4] === 2 && estadoBoton[5] === 2){
		gana2();
	}
	else if (estadoBoton[6] === 2 && estadoBoton[7] === 2 && estadoBoton[8] === 2){
		gana2();
	}
	else if (estadoBoton[0] === 2 && estadoBoton[3] === 2 && estadoBoton[6] === 2){
		gana2();
	}
	else if (estadoBoton[1] === 2 && estadoBoton[4] === 2 && estadoBoton[7] === 2){
		gana2();
	}
	else if (estadoBoton[2] === 2 && estadoBoton[5] === 2 && estadoBoton[8] === 2){
		gana2();
	}
	else if (estadoBoton[0] === 2 && estadoBoton[4] === 2 && estadoBoton[8] === 2){
		gana2();
	}
	else if (estadoBoton[2] === 2 && estadoBoton[4] === 2 && estadoBoton[6] === 2){
		gana2();
	}
	else
		for (let i = 0; i < 8; i++){
			if (estadoBoton[i] != 0){
				contador++;
			}
		}
		if (contador === 8){
			setTimeout(() => {
				alert("Empate");
			}, 10);
		}
	reload.addEventListener("click", () => {
		location.reload();
	})  
}