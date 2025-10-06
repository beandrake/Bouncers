import React from 'react';
import BouncingObject from '../classes/BouncingObject';
//import VelocityObject from '../classes/VelocityObject';

function Mover(props) {

	const mover = React.useRef(
		new BouncingObject(
			{viewport:props.viewport, cursor:props.cursor}, //contextData
			props.initial.left,
			props.initial.top,
			props.initial.width,
			props.initial.height,
			props.initial.color,
		)		
	);

	// only once on creation of the Component, add it to update list
	const initialized = React.useRef(false);
	if (!initialized.current) {
		props.updateList.current.push(mover);
		initialized.current = true;
	}

	return (
		<div 
			className={mover.current.getClassString()}
			style={mover.current.getStyleData()}
		>
		</div>
	);
}

export default Mover;