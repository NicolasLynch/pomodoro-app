function ModeButton(props) {

	// Cambiar el color de la fuente dependiendo de que si esta seleccionado
	const colorStyle = {																
		color: props.actualMode === props.myMode ? '#161932' : '#d7e0ff',
		opacity:  props.actualMode === props.myMode ? '1' : '0.6',
		transition: '0.3s',
	}

	return (
		<p className='mode-button' style={colorStyle} onClick={props.changeMode}>{props.name}</p>
	)
}

export default ModeButton;
