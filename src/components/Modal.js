import ChangeMinutes from "./ChangeMinutes";
import ChangeFont from "./ChangeFont";
import ChangeColor from "./ChangeColor";

function Modal(props) {

	return (
		<div className={`Modal ${props.modalStyle[0]}`}>
			<div className={`settings ${props.modalStyle[1]}`}>
				<div className='setting-top-container'>
					<h2 className='settings-title'>Settings</h2>
					<span className='material-icons close-icon' onClick={props.close}>close</span>
				</div>
				<div className='bar'></div>
				<div className='time-setting'>
					<h3 className="time-title">TIME (MINUTES)</h3>
					<div className='modes-minutes'>
						<ChangeMinutes name="pomodoro" minute={props.updatePomodoroMinute} updateMinute={props.setUpdatePomodoroMinute}/>
						<ChangeMinutes name="short break" minute={props.updateShortBreakMinute} updateMinute={props.setUpdateShortBreakMinute}/>
						<ChangeMinutes name="long break" minute={props.updateLongBreakMinute} updateMinute={props.setUpdateLongBreakMinute}/>
					</div>
				</div>
				<div className='font-setting'>
					<h3 className='font-title'>FONT</h3>
					<div className='fonts'>
						<ChangeFont font='font-Kumbh' setUpdateStyleFont={props.setUpdateStyleFont} updateStyleFont={props.updateStyleFont} myFont='font-Kumbh'/>
						<ChangeFont font='font-roboto' setUpdateStyleFont={props.setUpdateStyleFont} updateStyleFont={props.updateStyleFont} myFont='font-roboto'/>
						<ChangeFont font='font-space' setUpdateStyleFont={props.setUpdateStyleFont} updateStyleFont={props.updateStyleFont} myFont='font-space'/>
					</div>
				</div>
				<div className='color-setting'>
					<h3 className='color-title'>COLOR</h3>
					<div className='colors'>
						<ChangeColor color='orange' setUpdateStyleColor={props.setUpdateStyleColor} updateStyleColor={props.updateStyleColor} myColor='orange'/>
						<ChangeColor color='cyan' setUpdateStyleColor={props.setUpdateStyleColor} updateStyleColor={props.updateStyleColor} myColor='cyan'/>
						<ChangeColor color='purple' setUpdateStyleColor={props.setUpdateStyleColor} updateStyleColor={props.updateStyleColor} myColor='purple'/>
					</div>
				</div>
				<div className={`apply ${props.styleColor}`} onClick={props.apply}>Apply</div>
			</div>
		</div>
	);
}

export default Modal;