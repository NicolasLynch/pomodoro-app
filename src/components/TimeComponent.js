import React from 'react';

function TimeComponent(props) {

	// Ajustar el tamaño de letra segun su fuente		
	const styleFont = {															// Esta fuente en especial me trae problema devido a que es más grande que el resto con este style ajusto este problema
		fontWeight: props.styleFont === 'font-space' ? '400' : '',
		letterSpacing: props.styleFont === 'font-space' ? '-3px' : '',
		marginBottom: props.styleFont === 'font-space' ? '0.03em' : ''
	}

	return (
		<div className='TimeComponent' style={styleFont}>
			<span>{(props.time.m < 0 || props.time.m >= 10)? props.time.m : "0"+ props.time.m}</span>
			:
			<span>{(props.time.s < 0 || props.time.s >= 10)? props.time.s : "0"+ props.time.s}</span>
		</div>
	);
}

export default TimeComponent;