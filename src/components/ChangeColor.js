function ChangeColor(props) {

	const selectColor = () => {
		props.setUpdateStyleColor(props.color)
	}


	const selectColorEfect = () => {									// Con esta función le agrego el icono de "check" al color seleccionado. Su utilidad es unicamente estetica 
		if (props.updateStyleColor === props.myColor){
			return(
				<span className='material-icons done'>done</span>
			)
		}
	}

	
	return (
		<div className={`ChangeColor ${props.color}`} onClick={selectColor}>
			{selectColorEfect()}
		</div>
	)
}

export default ChangeColor
