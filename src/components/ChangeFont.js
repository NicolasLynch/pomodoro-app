function ChangeFont(props) {
	
	const selectFont = () => {
		props.setUpdateStyleFont(props.font);
	}
	
	const styleColor = {																/* Si selecicono una fuente que se cambie a color negro el boton de esa opcion */
		backgroundColor: props.updateStyleFont === props.myFont ? '#000000' : '',
		color: props.updateStyleFont === props.myFont ? '#ffffff' : ''
	}

	return (
		<div className={`ChangeFont ${props.font}`} style={styleColor} onClick={selectFont}>
			Aa
		</div>
	)
}

export default ChangeFont
