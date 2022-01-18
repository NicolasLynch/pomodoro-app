/* 	- Es esta aplicacion vamos a ver declarados 2 veces varios useStates, uno con su nombre real y el otro con el pronombre "update". 
      Hice esto porque de esta manera me ahorro varios problemas. La versión final es la que se va a renderizar en pantalla. Mientras que la vercion con el 
      pronombre "update" es la que usaremos para hacer cambios, ya que con esta versión podremos declararla como una cariable comun y corriente (que a diferencia de 
	  un useState, este primero no es asincronico y por ende carga más rapido). Y en las versiones del pronombre "update" que sean un useState, estos sirven para 
	  renderizar los cambios en la pantalla de settings sin que se apliquen los cambios hasta que haga click en el boton "Aply" 
	 
 	- El metodo pomodoro consta de tres partes: El cronometro donde se trabaja, al cual llamaremos "pomodoro" (25 min de duracion). El cronometro de descanso corto, 
	  el cual llamaremos "short break" (5 minutos de duracion). Y el cronometro de descanso largo el cual llamaremos "long break"  (15 min de duración) 
	  
	- El funcionamiento del metodo pomodoro es que se trabaja por 25 minutos y luego se descansa por 5 minutos. Esto se hace durante 4 repeticiones. En luego de la 
	  ultima repetición, en vez de descazar 5 minutos, se descanza 15 minutos. Todo esto se considera un ciclo entero */


import './App.css';

import ModeButtons from './components/ModeButtons';
import ProgressCircle from './components/ProgressCircle';
import Modal from './components/Modal';

import { useState, useEffect } from 'react';


function App() {

	// ____Cronometro:_____
	const [updatePomodoroMinute, setUpdatePomodoroMinute] = useState(25);						/* Valor del tiempoen minutos que dura el cronometro en modo "pomodoro" */											
	const [pomodoroMinute, setPomodoroMinute] = useState(updatePomodoroMinute);

	const [updateShortBreakMinute, setUpdateShortBreakMinute] = useState(5);					/* Valor del tiempoen minutos que dura el cronometro en modo "short break" */	
	const [shortBreakMinute, setShortBreakMinute] = useState(updateShortBreakMinute);

	const [updateLongBreakMinute, setUpdateLongBreakMinute] = useState(15);						/* Valor del tiempoen minutos que dura el cronometro en modo "long break" */	
	const [longBreakMinute, setLongBreakMinute] = useState(updateLongBreakMinute);
	


	const [time, setTime] = useState({ms:0, s:0, m:pomodoroMinute});							/* Valores del cronometro que se renderizara en pantalla.      ms = milisegundos (en realidad son centisegundos. Tener cuidado con esto);     s = segundos;       m = minutos. */
	const [interv, setInterv] = useState();														/* Aquí se va a guardar la función que ejecuta el setIntercal(), que es la herramienta que hace funcionar los temporizadores en JS  */
	const [status, setStatus] = useState(0);													/* Segun su numero, me indica el estado del cronometro.   0 = Not started;    1 = started    2 = stoped  */								

	
	useEffect(() => {																			/*  Cada vez que se habra la página o se cambien los valores del useState pomodoroMinute, que los valores del cronometro sean estos */
		setTime({ms:0, s:0, m:pomodoroMinute});
	}, [pomodoroMinute]);


	let updatedMs = time.ms; 
	let updatedS = time.s; 
	let updatedM = time.m;


	const [actualMode, setActualMode] = useState('pomodoro');									/* Este es el modo en el que esta el cronometro. Su modo inicial es "pomodoro". Luego va a cambiar a "short-break" o "long break" segun corresponda */
	let updateActualMode = actualMode;

	const [nextMode, SetNextMode] = useState('short-break');									/* Es el siguiente modo al cual va a cambiar, en este caso es "short-break". Luego va a cambiar a "pomodoro" o "long break" segun corresponda */
	let updateNextMode = nextMode;



	

	// _____Circulo de progreso_____
	let upgrateFullProgress = updatePomodoroMinute * 6000;										/* Esta variable guarda es la cantidad de "centisegundos" que hay en cada modo. Esto lo vamos más adelante dentro de una regla de tres simples para que el aro externo crezca en base a los milisegundos restantes.  // ¿De donde viene el numero 6000? Un segundo tiene 100 centisegundos. Y un minuto son 60 segundos. Osea 100 * 60 = "6000" */

	const [fullProgress, setFullProgress] = useState(upgrateFullProgress);

	useEffect(() => {																			/* Cuando se cambie el modo, la cantidad total de milisegundos va a variar */
		if (actualMode === 'pomodoro') {
			upgrateFullProgress = updatePomodoroMinute * 6000;
			
		} else if (actualMode === 'short-break') {
			upgrateFullProgress = updateShortBreakMinute * 6000;
		
		} else if (actualMode === 'long-break') {
			upgrateFullProgress = updateLongBreakMinute * 6000;
		}

		setFullProgress(upgrateFullProgress);
	}, [actualMode]);

	

	const [progress, setProgress] = useState();													/* Esto guarda el progreso. Osea, el  porcentaje de tiempo recorrido desde que hice click en el boton "start" */

	
	useEffect(() => {
		let updateProgress = ((time.m * 6000) + (time.s * 100) + time.ms) * 100 / fullProgress;	/* Esto guarda el progreso. Osea, el  porcentaje de tiempo recorrido desde que hice click en el boton "start". Esto no es más que una regla de 3 simples para obtener el porcentaje */
		
		setProgress(updateProgress);
	}, [time, actualMode, fullProgress]);
	
	
	

	// _____Funcionamiento del ciclo_____

	const [pomodoroTurns, setPomodoroTurns] = useState(3);										/* Estos son los turnos de este modo. Un ciclo entero son 4 pomodoros. El primero no se cuenta más estos 3 */
	let updatePomodoroTurns = pomodoroTurns; 
	const [shortBreakTurn, setShortBreakTurn] = useState(3);
	let updateShortBreakTurns = shortBreakTurn;


	const run = () => {
		if(updatedS === -1){																	/* Cuando el segundero llege a -1, que se le reste una unidad al minutero y que ademas el segundo vuelva a 59 segundos */ 
			updatedM--;
			updatedS = 59;
		}

		if(updatedMs === -1){
			updatedS--;
			updatedMs = 99;
		}
	
		if (updatedM === 0 && updatedS === 0 && updatedMs === 0) {								/* Si el milisegunto, el segundo y el minuto lleguen a 0. Que se cambie de modo */
			if (updatePomodoroTurns === 0 && updateShortBreakTurns === 0) {						/* Si la cantidad de turnos del "pomodoro" y del "short break" se acaban y llegan a 0, que el modo cambie a "long break" */
				updatedM = longBreakMinute;
				updatedS = 0;

				updateActualMode = 'long-break';												/* Me indica que este es el modo actual */
				updateNextMode = 'pomodoro';													/* Que el siguiente modo sea pomodoro */
				
				updatePomodoroTurns = 4;														/* Que los turnos se reestablezcan */
				updateShortBreakTurns = 3;

				upgrateFullProgress = (updatedM * 6000) + (updatedS * 100) + updatedMs;			/* Me dice cuantos milesegundos totales hay en este modo. Esto sirve para renderizar el circulo de progreso */

			} else if (updateNextMode === 'pomodoro') {
				updatedM = pomodoroMinute;
				updatedS = 0;
				
				updateActualMode = 'pomodoro';
				updateNextMode = 'short-break';

				updatePomodoroTurns -= 1;														/* Resta un turno */

				upgrateFullProgress = (updatedM * 6000) + (updatedS * 100) + updatedMs;

			} else if (updateNextMode === 'short-break') {
				updatedM = shortBreakMinute;
				updatedS = 0;
				
				updateActualMode = 'short-break';
				updateNextMode = 'pomodoro';
				
				updateShortBreakTurns -= 1;

				upgrateFullProgress = (updatedM * 6000) + (updatedS * 100) + updatedMs;
			}
		}	

		// updateNextMode = 'fullProgress'
		setActualMode(updateActualMode);
		SetNextMode(updateNextMode);

		
		updatedMs--;																			/* Esto es importante porque hace que el cronometro corra para abajo y no para arriba */
		setTime({ms:updatedMs, s:updatedS, m:updatedM});
	};


	/* _____Boton start_____ */
	const start = () => {																		
		run();
		setStatus(1);
		setInterv(setInterval(run, 10));														/* Este 10 representa a 1 centisegundo */
	  };
  

	// _____Boton stop____ 
	const stop = () => {																		
	  clearInterval(interv);
	  setStatus(2);
	};
  

	// _____Boton resume_____
	const resume = () => start();											


	//____Boton pomodoro_____
	const pomodoro = () => {
		setActualMode('pomodoro');
		SetNextMode('short-break');
		setPomodoroTurns(3);
		setShortBreakTurn(3);

		clearInterval(interv);
		setStatus(0);
		setTime({ms:0, s:0, m:pomodoroMinute});
	};
	
	//____Boton  short break_____
	const shortBreak = () => {
		setActualMode('short-break');
		SetNextMode('pomodoro');
		setPomodoroTurns(3);
		setShortBreakTurn(2);

		clearInterval(interv);
		setStatus(0);
		setTime({ms:0, s:0, m:shortBreakMinute});
	};
  
	//____Boton long break_____
	const longBreak = () => {
		setActualMode('long-break');
		SetNextMode('pomodoro');
		setPomodoroTurns(4);
		setShortBreakTurn(3);

		clearInterval(interv);
		setStatus(0);
		setTime({ms:0, s:0, m:longBreakMinute});
	};



	// _____Cambio de color:_____
	const [updateStyleColor, setUpdateStyleColor] = useState('orange');
	const [styleColor, setStyleColor] = useState(updateStyleColor);

	const [updateStyleFont, setUpdateStyleFont] = useState('font-Kumbh');
	const [styleFont, setStyleFont] = useState(updateStyleFont);




	// _____Activar y desactivar el modal/settings:_____
	const [modalStyle, setModalStyle] = useState(['', '']);										// Este useState va a tener una palabra que representa a una clase CSS para activar el modal/el cartel de settings	

	const activateModalStyle = () => {														// Esta funcion activa el modal ya que le agrega la clase al useState modalStyle
		setModalStyle(['modal-activate', 'settings-activate']);											
	}

	const desactivateModalStyle = () => {													// Esta funcion desactiva el modal ya que quita la clase al useState modalStyle
		setModalStyle(['', '']);
	}



	// _____Boton apply:_____
	const apply = () => {
		setPomodoroMinute(updatePomodoroMinute);
		setShortBreakMinute(updateShortBreakMinute);
		setLongBreakMinute(longBreakMinute);

		setStyleColor(updateStyleColor);
		setStyleFont(updateStyleFont);

		if (updatePomodoroMinute !== pomodoroMinute || updateShortBreakMinute !== shortBreakMinute || updateLongBreakMinute !== longBreakMinute) {		// Cartel en caso de que el usuario modifique los tiempos
			upgrateFullProgress = updatePomodoroMinute * 6000;
			setFullProgress(upgrateFullProgress);
			pomodoro();
		}

		desactivateModalStyle();
	}


	// _____Boton close:_____
	const close = () => {																	/* Cuando se presiona este boton, cabe la posibilidad de que se hizo click en algo, pero no se quiere que se guarden esos valores. Con los codigos de abajo hago que los valores de los botones presionados vuelvan a su estado original cuando vuelva a habrir el cartel de settings */
		desactivateModalStyle();
		setUpdatePomodoroMinute(pomodoroMinute);
		setUpdateShortBreakMinute(shortBreakMinute);
		setUpdateLongBreakMinute(longBreakMinute);
		setUpdateStyleColor(styleColor);
		setUpdateStyleFont(styleFont);
	}



	return (
		<div className={`App ${styleFont}`}>
			<header className='header'>
				<h1 className='title'>pomodoro</h1>
			</header>
			<main className='main'>
				<ModeButtons pomodoro={pomodoro} shortBreak={shortBreak} longBreak={longBreak} styleColor={styleColor} actualMode={actualMode}/>
				<ProgressCircle time={time} status={status} start={start} stop={stop} resume={resume} styleColor={styleColor} progress={progress} styleFont={styleFont}/>
				<span className='material-icons icon-settings' onClick={activateModalStyle}>settings</span>
				<Modal updatePomodoroMinute={updatePomodoroMinute} updateShortBreakMinute={updateShortBreakMinute} updateLongBreakMinute={updateLongBreakMinute} setUpdatePomodoroMinute={setUpdatePomodoroMinute} setUpdateShortBreakMinute={setUpdateShortBreakMinute} setUpdateLongBreakMinute={setUpdateLongBreakMinute} apply={apply} setUpdateStyleColor={setUpdateStyleColor} styleColor={styleColor} setUpdateStyleFont={setUpdateStyleFont} close={close} modalStyle={modalStyle} updateStyleFont={updateStyleFont} updateStyleColor={updateStyleColor}/>
			</main>
		</div>
	);
}

export default App;
