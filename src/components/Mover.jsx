import React from 'react';
import BouncingObject from '../classes/BouncingObject';

function Mover(props) {

	// just once, initialize and add to update list
	const mover = React.useRef(null);
	if (!mover.current) {
		mover.current = new BouncingObject(
			{viewport:props.viewport, cursor:props.cursor}, //contextData
			props.initial.centerX,
			props.initial.centerY,
			props.initial.width,
			props.initial.height,
			props.initial.color,
		)	
		props.updateList.current.push(mover);
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