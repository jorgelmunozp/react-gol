import logo from './assets/images/logo.png';
import balon from './assets/images/balon.png';
import jugador1 from './assets/images/jugador1.png';
import jugadorCPU1 from './assets/images/jugador2.png';
import './App.css';

import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFutbol,faTshirt,faClock,faPlayCircle,faCaretUp, faCaretDown, faCaretLeft, faCaretRight } from '@fortawesome/fontawesome-free-solid'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const deviceWidth = document.documentElement.clientWidth;       // Tamaño horizontal de pantalla
const deviceHeight = document.documentElement.clientHeight;     // Tamaño vertical de pantalla
let canchaLimitsH = [Math.round((-(deviceWidth)*90/100)/10)*10, Math.round(((deviceWidth)*90/100)/10)*10];   // Límite horizontal bordes cuadrilatero
let canchaLimitsV = [-Math.floor((deviceHeight*90/100)/10)*10, Math.floor((deviceHeight*90/100)/10)*10];  // Límite vertical bordes cuadrilatero
console.log("Medidas cancha: ",deviceWidth,deviceHeight);
console.log("Limites cancha H: ",canchaLimitsH);
console.log("Limites cancha V: ",canchaLimitsV);

const balonH = 0;
const balonV = 0;
const jugador1H = canchaLimitsH[0];
const jugador1V = 0;
const jugadorCPU1H = canchaLimitsH[1];
const jugadorCPU1V = 0;
const porteria1H = canchaLimitsH[0];
const porteria1V = 0;
const porteria2H = canchaLimitsH[1];
const porteria2V = 0;

const alert = withReactContent(Swal);
// alert.fire({
//   title: <strong>Doggybol</strong>,
//   html: <i>You clicked the button!</i>,
//   icon: 'success'
// })

function App() {
  let [posicionHbalon, setPosicionHbalon] = useState(balonH);
  let [posicionVbalon, setPosicionVbalon] = useState(balonV);
  let [posicionHjugador1, setPosicionHjugador1] = useState(jugador1H);
  let [posicionVjugador1, setPosicionVjugador1] = useState(jugador1V);
  let [posicionHjugadorCPU1, setPosicionHjugadorCPU1] = useState(jugadorCPU1H);
  let [posicionVjugadorCPU1, setPosicionVjugadorCPU1] = useState(jugadorCPU1V);
  let [posicionHporteria1, setPosicionHporteria1] = useState(porteria1H);
  let [posicionVporteria1, setPosicionVporteria1] = useState(porteria1V);
  let [posicionHporteria2, setPosicionHporteria2] = useState(porteria2H);
  let [posicionVporteria2, setPosicionVporteria2] = useState(porteria2V);
  let [golesEquipo1, setGolesEquipo1] = useState(0);
  let [golesEquipo2, setGolesEquipo2] = useState(0);
  let [estado, setEstado] = useState('');
  
  const teclaUp2 = useTeclado("ArrowUp");               //Flechas del teclado Jugador 1
  const teclaDown2 = useTeclado("ArrowDown");
  const teclaLeft2 = useTeclado("ArrowLeft");
  const teclaRight2 = useTeclado("ArrowRight");

  const [seconds, setSeconds] = useState(0);            // Tiempo de juego

  const Tiempo = () => { 
    useEffect(() => {
      const interval = setInterval(() => {
        if(estado === 'start'){ setSeconds(seconds => seconds + 1); }
      }, 1000);
      return () => clearInterval(interval);
    }, []);
    return (<p>{seconds}</p>);
  };

  const TickJugadorCPU1 = () => {
    useEffect(() => {
      const interval = setInterval(() => {
        if(estado === 'start'){
          movimientosJugadorCPU1(estado,posicionHbalon,setPosicionHbalon,posicionVbalon,setPosicionVbalon,posicionHjugadorCPU1,setPosicionHjugadorCPU1,posicionVjugadorCPU1,setPosicionVjugadorCPU1,posicionHporteria1,posicionVporteria1);
          checkGol(posicionHbalon,setPosicionHbalon,posicionVbalon,setPosicionVbalon,posicionHporteria1,posicionVporteria1,posicionHporteria2,posicionVporteria2,posicionHjugador1,setPosicionHjugador1,posicionVjugador1,setPosicionVjugador1,golesEquipo1,setGolesEquipo1,golesEquipo2,setGolesEquipo2);
        }
      }, 1);
      return () => clearInterval(interval);
    }, []);
    return (<p>{movimientosJugadorCPU1}</p>);
  };

  return (
    <div className="App">
      <header className="App-header">
      {<TickJugadorCPU1/>}
        <table className='marcador'>
          <tbody>
            <tr>
              <td><img src={logo} className="App-logo"/></td>
              <td><h2><FontAwesomeIcon icon={faClock}/></h2></td>
              <td><h2>{<Tiempo/>}</h2></td>
              <td><h2><FontAwesomeIcon icon={faTshirt} className='icono' style={{'color':'#3f48cc'}}/></h2></td>
              <td><h2>{golesEquipo1}</h2></td>
              <td><h2><FontAwesomeIcon icon={faFutbol}/></h2></td>
              <td><h2>{golesEquipo2}</h2></td>
              <td><h2><FontAwesomeIcon icon={faTshirt} className='icono' style={{'color':'red'}}/></h2></td>
            </tr>
          </tbody>
        </table> 
      </header>
      <body className="App-body">
        <div className='cancha' id='cancha' autoFocus={true}>
          <div className='fondoCanchaOscuro' id='fondoCancha1'/>
          <div className='fondoCanchaClaro' id='fondoCancha2'/>
          <div className='fondoCanchaOscuro' id='fondoCancha3'/>
          <div className='fondoCanchaClaro' id='fondoCancha4'/>
          <div className='fondoCanchaOscuro' id='fondoCancha5'/>
          <div className='fondoCanchaClaro' id='fondoCancha6'/>
          <div className='fondoCanchaOscuro' id='fondoCancha7'/>
          <div className='fondoCanchaClaro' id='fondoCancha8'/>
          <div className='fondoCanchaOscuro' id='fondoCancha9'/>
          <div className='fondoCanchaClaro' id='fondoCancha10'/>
          <hr className='canchaLineaMitad'/>
          <div className='canchaCirculoCentral'/>
          <div className='canchaTiroEsquina' id='canchaTiroEsquina1'/>
          <div className='canchaTiroEsquina' id='canchaTiroEsquina2'/>
          <div className='canchaTiroEsquina' id='canchaTiroEsquina3'/>
          <div className='canchaTiroEsquina' id='canchaTiroEsquina4'/>
          <div className='canchaMediaLuna' id='canchaMediaLuna1'/>
          <div className='canchaAreaGrande' id='canchaAreaGrande1'/>
          <div className='canchaAreaChica' id='canchaAreaChica1'/>
          <div className='canchaPorteria' id='canchaPorteria1'/>
          <div className='canchaMediaLuna' id='canchaMediaLuna2'/>
          <div className='canchaAreaGrande' id='canchaAreaGrande2'/>
          <div className='canchaAreaChica' id='canchaAreaChica2'/>
          <div className='canchaPorteria' id='canchaPorteria2'/>
          <hr className='porteria' style={{'marginTop':posicionVporteria1,'marginLeft':posicionHporteria1}}/>
          <hr className='porteria' style={{'marginTop':posicionVporteria2,'marginLeft':posicionHporteria2}}/>
          <img id='jugador1' src={jugador1} className="jugador" style={{'marginTop':posicionVjugador1,'marginLeft':posicionHjugador1}}/>
          <img src={jugadorCPU1} className="jugador" style={{'marginTop':posicionVjugadorCPU1,'marginLeft':posicionHjugadorCPU1}}/>
          <img src={balon} className="balon" style={{'marginTop':posicionVbalon,'marginLeft':posicionHbalon}}/>
        </div>
        <div className='controles'>
          <table className='controlIzquierda'>
            <tbody>
              <tr><td><button type="button" className='boton' onClick={(e) => botones(e,'up',posicionHjugador1,setPosicionHjugador1,posicionVjugador1,setPosicionVjugador1,canchaLimitsH,canchaLimitsV,posicionHbalon,setPosicionHbalon,posicionVbalon,setPosicionVbalon,posicionHjugadorCPU1,posicionVjugadorCPU1)} onMouseMove={(e) => botones(e,'up',posicionHjugador1,setPosicionHjugador1,posicionVjugador1,setPosicionVjugador1,canchaLimitsH,canchaLimitsV,posicionHbalon,setPosicionHbalon,posicionVbalon,setPosicionVbalon,posicionHjugadorCPU1,posicionVjugadorCPU1)}><FontAwesomeIcon icon={faCaretUp}/></button></td></tr>
              <tr><td><button type="button" className='boton' onClick={(e) => botones(e,'left',posicionHjugador1,setPosicionHjugador1,posicionVjugador1,setPosicionVjugador1,canchaLimitsH,canchaLimitsV,posicionHbalon,setPosicionHbalon,posicionVbalon,setPosicionVbalon,posicionHjugadorCPU1,posicionVjugadorCPU1)} onMouseMove={(e) => botones(e,'left',posicionHjugador1,setPosicionHjugador1,posicionVjugador1,setPosicionVjugador1,canchaLimitsH,canchaLimitsV,posicionHbalon,setPosicionHbalon,posicionVbalon,setPosicionVbalon,posicionHjugadorCPU1,posicionVjugadorCPU1)}><FontAwesomeIcon icon={faCaretLeft}/></button></td></tr>
              <tr><td><button type="button" className='boton' onClick={(e) => botones(e,'down',posicionHjugador1,setPosicionHjugador1,posicionVjugador1,setPosicionVjugador1,canchaLimitsH,canchaLimitsV,posicionHbalon,setPosicionHbalon,posicionVbalon,setPosicionVbalon,posicionHjugadorCPU1,posicionVjugadorCPU1)} onMouseMove={(e) => botones(e,'down',posicionHjugador1,setPosicionHjugador1,posicionVjugador1,setPosicionVjugador1,canchaLimitsH,canchaLimitsV,posicionHbalon,setPosicionHbalon,posicionVbalon,setPosicionVbalon,posicionHjugadorCPU1,posicionVjugadorCPU1)}><FontAwesomeIcon icon={faCaretDown}/></button></td></tr>
            </tbody>
          </table>
          <button type="button" className='botonStart' onClick={(e) => botonStart(e,estado,setEstado,setPosicionHporteria1,setPosicionHporteria2)} onKeyDown={(e) => flechasTeclado(e,posicionHjugador1,setPosicionHjugador1,posicionVjugador1,setPosicionVjugador1,posicionHbalon,setPosicionHbalon,posicionVbalon,setPosicionVbalon,posicionHjugadorCPU1,posicionVjugadorCPU1)} value="start"><FontAwesomeIcon icon={faPlayCircle}/></button>
          <table className='controlDerecha'>
            <tbody>
              <tr><td><button type="button" className='boton' onClick={(e) => botones(e,'up',posicionHjugador1,setPosicionHjugador1,posicionVjugador1,setPosicionVjugador1,canchaLimitsH,canchaLimitsV,posicionHbalon,setPosicionHbalon,posicionVbalon,setPosicionVbalon,posicionHjugadorCPU1,posicionVjugadorCPU1)} onMouseMove={(e) => botones(e,'up',posicionHjugador1,setPosicionHjugador1,posicionVjugador1,setPosicionVjugador1,canchaLimitsH,canchaLimitsV,posicionHbalon,setPosicionHbalon,posicionVbalon,setPosicionVbalon,posicionHjugadorCPU1,posicionVjugadorCPU1)}><FontAwesomeIcon icon={faCaretUp}/></button></td></tr>
              <tr><td><button type="button" className='boton' onClick={(e) => botones(e,'right',posicionHjugador1,setPosicionHjugador1,posicionVjugador1,setPosicionVjugador1,canchaLimitsH,canchaLimitsV,posicionHbalon,setPosicionHbalon,posicionVbalon,setPosicionVbalon,posicionHjugadorCPU1,posicionVjugadorCPU1)} onMouseMove={(e) => botones(e,'right',posicionHjugador1,setPosicionHjugador1,posicionVjugador1,setPosicionVjugador1,canchaLimitsH,canchaLimitsV,posicionHbalon,setPosicionHbalon,posicionVbalon,setPosicionVbalon,posicionHjugadorCPU1,posicionVjugadorCPU1)}><FontAwesomeIcon icon={faCaretRight}/></button></td></tr>
              <tr><td><button type="button" className='boton' onClick={(e) => botones(e,'down',posicionHjugador1,setPosicionHjugador1,posicionVjugador1,setPosicionVjugador1,canchaLimitsH,canchaLimitsV,posicionHbalon,setPosicionHbalon,posicionVbalon,setPosicionVbalon,posicionHjugadorCPU1,posicionVjugadorCPU1)} onMouseMove={(e) => botones(e,'down',posicionHjugador1,setPosicionHjugador1,posicionVjugador1,setPosicionVjugador1,canchaLimitsH,canchaLimitsV,posicionHbalon,setPosicionHbalon,posicionVbalon,setPosicionVbalon,posicionHjugadorCPU1,posicionVjugadorCPU1)}><FontAwesomeIcon icon={faCaretDown}/></button></td></tr>
            </tbody>
          </table>          
         </div>
      </body>
    </div>
  );
}

function botonStart(e,estado,setEstado,setPosicionHporteria1,setPosicionHporteria2){     //Función para iniciar el juego
  e.preventDefault();                            
  estado = 'start';
  setEstado(estado);
  const limitWidth = Math.floor(document.getElementById('cancha').offsetWidth/10) * 10;   // Redondeo de unidades a la decena inferior mas cercana
  const limitHeigth = Math.floor(document.getElementById('cancha').offsetHeight/10) * 10;
  canchaLimitsH = [-Math.round(((limitWidth)*95/100)/10)*10, Math.round(((limitWidth)*95/100)/10)*10];   // Límite horizontal bordes cuadrilatero
  canchaLimitsV = [-Math.floor((limitHeigth*90/100)/10)*10, Math.floor((limitHeigth*90/100)/10)*10];  // Límite vertical bordes cuadrilatero
  console.log("Medidas cancha: ",limitWidth,limitHeigth);
  console.log("Limites cancha H: ",canchaLimitsH);
  console.log("Limites cancha V: ",canchaLimitsV);
  setPosicionHporteria1(canchaLimitsH[0]);
  setPosicionHporteria2(canchaLimitsH[1]);
}

// Botones del control por interfaz gráfica
function botones(e,direction,posicionHjugador1,setPosicionHjugador1,posicionVjugador1,setPosicionVjugador1,canchaLimitsH,canchaLimitsV,posicionHbalon,setPosicionHbalon,posicionVbalon,setPosicionVbalon,posicionHjugadorCPU1,posicionVjugadorCPU1) {     // Botones interfaz gráfica movimiento Doggy dentro de la cancha
  e.preventDefault();
  if (direction === 'up') {
    if(posicionVjugador1 > canchaLimitsV[0]){
      posicionVjugador1= posicionVjugador1 - 10;
      setPosicionVjugador1(posicionVjugador1);
    }
  }
  if (direction === 'down') {
    if(posicionVjugador1 < canchaLimitsV[1]){
      posicionVjugador1= posicionVjugador1 + 10;
      setPosicionVjugador1(posicionVjugador1);
    }
  }
  if(direction === 'right') {
    if(posicionHjugador1 < canchaLimitsH[1]){
      posicionHjugador1 = posicionHjugador1 + 10;
      setPosicionHjugador1(posicionHjugador1);
    }
  }
  if (direction === 'left') {
    if(posicionHjugador1 > canchaLimitsH[0]){
      posicionHjugador1 = posicionHjugador1 - 10;
      setPosicionHjugador1(posicionHjugador1);
    }
  }
  checkPosicionBalon(e,posicionHbalon,setPosicionHbalon,posicionVbalon,setPosicionVbalon,posicionHjugador1,posicionVjugador1,posicionHjugadorCPU1,posicionVjugadorCPU1);
}

// Manejo del Teclado
function useTeclado(targetKey) {                            // Hook que detecta el Teclado
  const [keyPressed, setKeyPressed] = useState(false);      // State for keeping track of whether key is pressed
  const downHandler = ({key}) => { if(key === targetKey){ setKeyPressed(true); }}   // If pressed key is our target key then set to true
  const upHandler = ({key}) => { if(key === targetKey){ setKeyPressed(false); }}; // If released key is our target key then set to false
  useEffect(() => {                                         // Add event listeners
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    return () => {                                          // Remove event listeners on cleanup
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []);                                                   // Empty array ensures that effect is only run on mount and unmount
  return keyPressed;
}
function flechasTeclado(e,posicionHjugador1,setPosicionHjugador1,posicionVjugador1,setPosicionVjugador1,posicionHbalon,setPosicionHbalon,posicionVbalon,setPosicionVbalon,posicionHjugadorCPU1,posicionVjugadorCPU1) {     //Función para sensar las flechas del teclado
  if (e.key === 'ArrowUp'){                                 //Jugador 1
    if(posicionVjugador1 > canchaLimitsV[0]){
      posicionVjugador1= posicionVjugador1 - 10;
      setPosicionVjugador1(posicionVjugador1);
    }
  }   
  if (e.key === 'ArrowDown'){
    if(posicionVjugador1 < canchaLimitsV[1]){
      posicionVjugador1= posicionVjugador1 + 10;
      setPosicionVjugador1(posicionVjugador1);
    }
  }
  if (e.key === 'ArrowLeft'){
    if(posicionHjugador1 > canchaLimitsH[0]){
      posicionHjugador1 = posicionHjugador1 - 10;
      setPosicionHjugador1(posicionHjugador1);
    }
  }   
  if (e.key === 'ArrowRight'){
    if(posicionHjugador1 < canchaLimitsH[1]){
      posicionHjugador1 = posicionHjugador1 + 10;
      setPosicionHjugador1(posicionHjugador1);
    }
  }
  checkPosicionBalon(e,posicionHbalon,setPosicionHbalon,posicionVbalon,setPosicionVbalon,posicionHjugador1,posicionVjugador1,posicionHjugadorCPU1,posicionVjugadorCPU1);
}

function checkPosicionBalon(e,posicionHbalon,setPosicionHbalon,posicionVbalon,setPosicionVbalon,posicionHjugador1,posicionVjugador1,posicionHjugadorCPU1,posicionVjugadorCPU1) {
  if((posicionHbalon - 40  < posicionHjugador1 && posicionHjugador1 < posicionHbalon + 40) &&
     (posicionVbalon - 70  < posicionVjugador1 && posicionVjugador1 < posicionVbalon + 20)
  ){
    posicionHbalon = posicionHjugador1+24;
    posicionVbalon = posicionVjugador1+50;
  }
  if((posicionHbalon - 40  < posicionHjugadorCPU1 && posicionHjugadorCPU1 < posicionHbalon + 40) &&
     (posicionVbalon - 70  < posicionVjugadorCPU1 && posicionVjugadorCPU1 < posicionVbalon + 20)
  ){
    posicionHbalon = posicionHjugadorCPU1;
    posicionVbalon = posicionVjugadorCPU1;
  }
  setPosicionHbalon(posicionHbalon)
  setPosicionVbalon(posicionVbalon);
}

function checkGol(posicionHbalon,setPosicionHbalon,posicionVbalon,setPosicionVbalon,posicionHporteria1,posicionVporteria1,posicionHporteria2,posicionVporteria2,posicionHjugador1,setPosicionHjugador1,posicionVjugador1,setPosicionVjugador1,golesEquipo1,setGolesEquipo1,golesEquipo2,setGolesEquipo2) {
  if((posicionHbalon + 50 === posicionHporteria1) &&
    (posicionVporteria1 - 50  < posicionVbalon && posicionVbalon < posicionVporteria1 + 80)
  ){
    golesEquipo2++;
    setGolesEquipo2(golesEquipo2);
    posicionHbalon = balonH;
    setPosicionHbalon(posicionHbalon)
    posicionVbalon = balonV;
    setPosicionVbalon(posicionVbalon);
    // posicionHjugador1 = jugador1H;
    // setPosicionHjugador1(posicionHjugador1);
    // posicionVjugador1 = jugador1V;
    // setPosicionVjugador1(posicionVjugador1);
  }
  if((posicionHbalon - 24 === posicionHporteria2) &&
    (posicionVporteria2 - 50  < posicionVbalon && posicionVbalon < posicionVporteria2 + 80)
  ){
    golesEquipo1++;
    setGolesEquipo1(golesEquipo1);
    posicionHbalon = balonH;
    setPosicionHbalon(posicionHbalon)
    posicionVbalon = balonV;
    setPosicionVbalon(posicionVbalon);
    // posicionHjugador1 = jugador1H;
    // setPosicionHjugador1(posicionHjugador1);
    // posicionVjugador1 = jugador1V;
    // setPosicionVjugador1(posicionVjugador1);
  }
}

function movimientosJugadorCPU1(estado,posicionHbalon,setPosicionHbalon,posicionVbalon,setPosicionVbalon,posicionHjugadorCPU1,setPosicionHjugadorCPU1,posicionVjugadorCPU1,setPosicionVjugadorCPU1,posicionHporteria1,posicionVporteria1) {
  if(estado === 'start'){
    if(posicionHbalon > posicionHjugadorCPU1 && posicionVbalon > posicionVjugadorCPU1){           //Hace que el Gusano persiga a Toto
      posicionHjugadorCPU1 = posicionHjugadorCPU1 + 1;
      posicionVjugadorCPU1 = posicionVjugadorCPU1 + 1;
    } else if(posicionHbalon > posicionHjugadorCPU1 && posicionVbalon < posicionVjugadorCPU1){           
      posicionHjugadorCPU1 = posicionHjugadorCPU1 + 1;
      posicionVjugadorCPU1 = posicionVjugadorCPU1 - 1;
    } else if(posicionHbalon === posicionHjugadorCPU1 && posicionVbalon > posicionVjugadorCPU1){     
      posicionVjugadorCPU1 = posicionVjugadorCPU1 + 1;
    } else if(posicionHbalon === posicionHjugadorCPU1 && posicionVbalon < posicionVjugadorCPU1){  
      posicionVjugadorCPU1 = posicionVjugadorCPU1 - 1;
    } else if(posicionHbalon < posicionHjugadorCPU1 && posicionVbalon > posicionVjugadorCPU1){
      posicionHjugadorCPU1 = posicionHjugadorCPU1 - 1;
      posicionVjugadorCPU1 = posicionVjugadorCPU1 + 1;
    } else if(posicionHbalon < posicionHjugadorCPU1 && posicionVbalon < posicionVjugadorCPU1){
      posicionHjugadorCPU1 = posicionHjugadorCPU1 - 1;
      posicionVjugadorCPU1 = posicionVjugadorCPU1 - 1;
    } else if(posicionHbalon > posicionHjugadorCPU1 && posicionVbalon === posicionVjugadorCPU1){           //Hace que el Gusano persiga a Toto
      posicionHjugadorCPU1 = posicionHjugadorCPU1 + 1;
    } else if(posicionHbalon < posicionHjugadorCPU1 && posicionVbalon === posicionVjugadorCPU1){           //Hace que el Gusano persiga a Toto
      posicionHjugadorCPU1 = posicionHjugadorCPU1 - 1;
    } else if(posicionHbalon === posicionHjugadorCPU1 && posicionVbalon === posicionVjugadorCPU1){
        if((posicionHporteria1 === posicionHjugadorCPU1 || posicionHporteria1 > posicionHjugadorCPU1 || posicionHporteria1 < posicionHjugadorCPU1) && posicionVporteria1 === posicionVjugadorCPU1){
          posicionHjugadorCPU1 = posicionHjugadorCPU1 - 1;
        } else if((posicionHporteria1 === posicionHjugadorCPU1 || posicionHporteria1 > posicionHjugadorCPU1 || posicionHporteria1 < posicionHjugadorCPU1) && posicionVporteria1 > posicionVjugadorCPU1){
          posicionHjugadorCPU1 = posicionHjugadorCPU1 - 1;
          posicionVjugadorCPU1 = posicionVjugadorCPU1 + 1;
        } else if((posicionHporteria1 === posicionHjugadorCPU1 || posicionHporteria1 > posicionHjugadorCPU1 || posicionHporteria1 < posicionHjugadorCPU1) && posicionVporteria1 < posicionVjugadorCPU1){
          posicionHjugadorCPU1 = posicionHjugadorCPU1 - 1;
          posicionVjugadorCPU1 = posicionVjugadorCPU1 - 1;
        }
      posicionHbalon = posicionHjugadorCPU1;
      posicionVbalon = posicionVjugadorCPU1;
    }
    setPosicionHbalon(posicionHbalon);
    setPosicionVbalon(posicionVbalon);
    setPosicionHjugadorCPU1(posicionHjugadorCPU1);
    setPosicionVjugadorCPU1(posicionVjugadorCPU1);
  }
}


export default App;
