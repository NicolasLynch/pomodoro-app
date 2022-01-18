import { useState, useEffect } from "react"

import ModeButton from "./ModeButton"

function ModeButtons(props) {

	// _____Cambiar la posicion del toggle_____ 
	const [togglePosition, setTogglePosition] = useState()

	const changeTogglePosition = () => {
		if (props.actualMode === 'pomodoro'){
			setTogglePosition('0')

		} else if (props.actualMode === 'short-break'){
			setTogglePosition('calc(100% / 3)')

		} else if (props.actualMode === 'long-break'){	
			setTogglePosition('calc(100% / 1.5)')
		}
	}

	useEffect(() => {
		changeTogglePosition()
	}, [props.actualMode])

	const styleTogglePosition = {
		left: togglePosition
	}	

	return (
		<div className='ModeButtons'>
			<div className='toggle-container'>
				<div className={`toggle ${props.styleColor}`} style={styleTogglePosition}></div>
			</div>
			{/* <p className='mode-button' onClick={props.pomodoro}>pomodoro</p>
			<p className='mode-button' onClick={props.shortBreak}>short break</p>
			<p className='mode-button' onClick={props.longBreak}>long break</p> */}

			<ModeButton actualMode={props.actualMode} changeMode={props.pomodoro}  myMode='pomodoro' name='pomodoro'/>
			<ModeButton actualMode={props.actualMode} changeMode={props.shortBreak} myMode='short-break' name='short break'/>
			<ModeButton actualMode={props.actualMode} changeMode={props.longBreak} myMode='long-break' name='long break'/>
		</div>
	);
}

export default ModeButtons;