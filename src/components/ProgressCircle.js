import TimeComponent from "./TimeComponent";
import StartButton from "./StartButton";

function ProgressCircle(props) {

	const styleProgress = {
		strokeDashoffset: `calc(440 - (440 * ${props.progress}) / 100)`
	}

	return (
		<div className='ProgressCircle'>
			<div className='internal-circle'>
				<div className='percent'>
					<svg className='svg'>
						<circle className='circle circle-one' cx='70' cy='70' r='70'/>
						<circle className={`circle circle-two ${props.styleColor}`} style={styleProgress} cx='70' cy='70' r='70'/>
					</svg>
					<div className='display'>
						<TimeComponent time={props.time} styleFont={props.styleFont}/>
						<StartButton time={props.time} status={props.status} start={props.start} stop={props.stop} resume={props.resume} styleFont={props.styleFont}/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProgressCircle;