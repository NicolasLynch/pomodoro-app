import React from 'react';

function StartButton(props) {

	// Ajustar el tamaño de letra segun su fuente		
	const styleFont = {																	// Esta fuente en especial me trae problema devido a que es más grande que el resto con este style ajusto este problema
		wordSpacing: props.styleFont === 'font-space' ? '0.49em' : ''
	}

	return (
		<div className='StartButton' style={styleFont}>
			{(props.status === 0)? 
				<p className="display-buton" onClick={props.start}>S T A R T</p> : "" 
			}

			{(props.status === 1)? 
				<p className="display-buton" onClick={props.stop}>P A U S E</p> : ""
			}

			{(props.status === 2)? 
				<p className="display-buton" onClick={props.resume}>R E S U M E</p>  : ""
			}
		</div>
	);
}

export default StartButton;