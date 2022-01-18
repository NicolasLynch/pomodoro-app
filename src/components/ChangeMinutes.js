function ChangeMinutes(props) {

	const subtractMinute = () => {
		if (props.minute > 1) {
			props.updateMinute(props.minute - 1)
		}
	}

	const addMinute = () => {
		props.updateMinute(props.minute + 1)
	}

	return (
		<div className='ChangeMinutes'>
			<p className='minutes-name'>{props.name}</p>
			<div className='minutes-container'>
				<span className='minutes-settings'>{props.minute}</span>
				<div className="arrows">
					<svg className="arrow" onClick={addMinute} xmlns="http://www.w3.org/2000/svg" width="14" height="7"><path fill="none" stroke="#999999" strokeOpacity="1" strokeWidth="2" d="M1 6l6-4 6 4"></path></svg>
					<svg className="arrow arrow-down" onClick={subtractMinute} xmlns="http://www.w3.org/2000/svg" width="14" height="7"><path fill="none" stroke="#999999" strokeOpacity="1" strokeWidth="2" d="M1 6l6-4 6 4"></path></svg>
				</div>
			</div>
		</div>
	)
}

export default ChangeMinutes
