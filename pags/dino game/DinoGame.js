var time = new Date();
var deltaTime = 0;
const reload = document.getElementById('reload')


if(document.readyState === "complete" || document.readyState === "interactive"){
    setTimeout(Init, 1);
}else{
    document.addEventListener("DOMContentLoaded", Init); 
}

function Init() {
    time = new Date();
    Start();
    Loop();
}

function Loop() {
    deltaTime = (new Date() - time) / 1000;
    time = new Date();
    Update();
    requestAnimationFrame(Loop);
}

//****** GAME LOGIC ********//

var sueloY = 22;
var velY = 0;
var impulso = 900;
var gravedad = 2500;

var dinoPosX = 42;
var dinoPosY = sueloY; 

var sueloX = 0;
var velEscenario = 1190/3;
var gameVel = 1;
var score = 0;

var parado = false;
var saltando = false;

var tiempoHastaObstaculo = 1;
var tiempoObstaculoMin = 0.7;
var tiempoObstaculoMax = 1.8;
var obstaculoPosY = 10;
var cactus = [];

var tiempoHastaNube = 0.5;
var tiempoNubeMin = 0.7;
var tiempoNubeMax = 2.7;
var maxNubeY = 270;
var minNubeY = 100;
var nubes = [];
var velNube = 0.5;

var contenedor;
var dino;
var textoScore;
var suelo;
var gameOver;

function Start() {
    gameOver = document.querySelector(".game-over");
    suelo = document.querySelector(".suelo");
    contenedor = document.querySelector(".contenedor");
    textoScore = document.querySelector(".score");
    dino = document.querySelector(".dino");
    document.addEventListener("keydown", HandleKeyDown);
}

function Update() {
    if(parado) return;
    //if (parado===false){ 
        MoverDinosaurio();
        MoverSuelo();
        CreacionObstaculo();
        CrearNubes();
        MoverCactus();
        MoverNubes();
        ChocaContraCactus();
    //}
    
    velY -= gravedad * deltaTime;
}

function HandleKeyDown(ev){
    if(ev.keyCode == 32 ||ev.keyCode == 87|| ev.keyCode ==38 ){
        Saltar();
    }
}

function Saltar(){
    if(dinoPosY === sueloY){
        saltando = true;
        velY = impulso;
        dino.classList.remove("dino-corriendo");
    }
}

function MoverDinosaurio() {
    dinoPosY += velY * deltaTime;
    if(dinoPosY < sueloY){
        
        TocarSuelo();
    }
    dino.style.bottom = dinoPosY+"px";
}

function TocarSuelo() {
    dinoPosY = sueloY;
    velY = 0;
    if(saltando){
        dino.classList.add("dino-corriendo");
    }
    saltando = false;
}

function MoverSuelo() {
    sueloX += CalcularDesplazamiento();
    suelo.style.left = -(sueloX % contenedor.clientWidth) + "px";
}

function CalcularDesplazamiento() {
    return velEscenario * deltaTime * gameVel;
}

function Estrellarse() {
    dino.classList.remove("dino-corriendo");
    dino.classList.add("dino-estrellado");
    parado = true;
}

function CreacionObstaculo() {
    tiempoHastaObstaculo -= deltaTime;
    if(tiempoHastaObstaculo <= 0) {
        CrearObstaculo();
    }
}

function CrearNubes() {
    tiempoHastaNube -= deltaTime;
    if(tiempoHastaNube <= 0) {
        CrearNube();
    }
}

function CrearObstaculo() {
    var obstaculo = document.createElement("div");
    contenedor.appendChild(obstaculo);
    obstaculo.classList.add("cactus");
    if(Math.random() > 0.5) obstaculo.classList.add("cactus2");
    obstaculo.posX = contenedor.clientWidth;
    obstaculo.style.left = contenedor.clientWidth+"px";

    cactus.push(obstaculo);
    tiempoHastaObstaculo = tiempoObstaculoMin + Math.random() * (tiempoObstaculoMax-tiempoObstaculoMin) / gameVel;
}

function CrearNube() {
    var nube = document.createElement("div");
    contenedor.appendChild(nube);
    nube.classList.add("nube");
    nube.posX = contenedor.clientWidth;
    nube.style.left = contenedor.clientWidth+"px";
    nube.style.bottom = minNubeY + Math.random() * (maxNubeY-minNubeY)+"px";
    
    nubes.push(nube);
    tiempoHastaNube = tiempoNubeMin + Math.random() * (tiempoNubeMax-tiempoNubeMin) / gameVel;
}

function MoverCactus() {
    for (var i = cactus.length - 1; i >= 0; i--) {
        if(cactus[i].posX < -cactus[i].clientWidth) {
            cactus[i].parentNode.removeChild(cactus[i]);
            cactus.splice(i, 1);
            GanarPuntos();
        }else{
            cactus[i].posX -= CalcularDesplazamiento();
            cactus[i].style.left = cactus[i].posX+"px";
        }
    }
}

function MoverNubes() {
    for (var i = nubes.length - 1; i >= 0; i--) {
        if(nubes[i].posX < -nubes[i].clientWidth) {
            nubes[i].parentNode.removeChild(nubes[i]);
            nubes.splice(i, 1);
        }else{
            nubes[i].posX -= CalcularDesplazamiento() * velNube;
            nubes[i].style.left = nubes[i].posX+"px";
        }
    }
}

function GanarPuntos() {
    score++;
    gameVel=+1;
    textoScore.innerText = score;
    console.log(score);
    if(score % 3  == 0){
        //gameVel = 1;
        if(score == 1){
            contenedor.classList.add("mediodia");
            console.log("mediodia")
        }else{
            contenedor.classList.replace("noche","noche");
            console.log("noche")
        }

        console.log("mediodia");
    }else if(score% 3  == 1) {
        //gameVel = 1.5;
        //contenedor.classList.add("tarde");
        contenedor.classList.replace("mediodia","tarde");
        console.log("tarde");
    } else if(score %  3  == 2) {
        //gameVel = 2;
        //contenedor.classList.add("noche");
        contenedor.classList.replace("tarde","noche");
        console.log("noche");
    }   
    suelo.style.animationDuration = (3/gameVel)+"s";
}

function GameOver() {
    Estrellarse();
    gameOver.style.display = "block";
}

function ChocaContraCactus() {
    for (var i = 0; i < cactus.length; i++) {
        if(cactus[i].posX > dinoPosX + dino.clientWidth) {
            //EVADE
            break; //al estar en orden, no puede chocar con más
        }else{
            if(Chocar(dino, cactus[i], 10, 30, 15, 20)) {
                GameOver();
            }
        }
    }
}

function Chocar(a, b, paddingTop, paddingRight, paddingBottom, paddingLeft) {
    var aRect = a.getBoundingClientRect();
    var bRect = b.getBoundingClientRect();

    return !(
        ((aRect.top + aRect.height - paddingBottom) < (bRect.top)) ||
        (aRect.top + paddingTop > (bRect.top + bRect.height)) ||
        ((aRect.left + aRect.width - paddingRight) < bRect.left) ||
        (aRect.left + paddingLeft > (bRect.left + bRect.width))
    );
}
/*botones*/

/* reload.addEventListener("click", () => {
	location.reload();
}) */

 