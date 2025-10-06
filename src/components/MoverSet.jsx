import React from 'react';
import Mover from './Mover';

function MoverSet(props) {

	const colorList = ['red', 'purple', 'blue', 'green', 'yellow', 'orange'];
	const moverList = [];
	const moversPerColumn = 10;
	const moversPerRow = 10;
	const firstLeft = 100;
	const firstTop = 200;
	const next = 3;
	const width = 50;
	let moverKey = 0;
	for (let x = firstLeft; x <= moversPerColumn*next+firstLeft; x+=next){
		for (let y = firstTop; y <= moversPerRow*next+firstTop; y+=next){
			let randomColor = colorList[Math.floor(Math.random() * colorList.length)];
			moverList.push(
				{
					key: moverKey,
					startData: {
						left: x,
						top: y, 
						width: width, 
						height: width,
						color: randomColor,
					},
				}
			);
			moverKey++;
		}
	}

	function displayMover(attributes) {
		return (
			<Mover 
				key={attributes.key}
				initial={attributes.startData}
				updateList={props.updateList}
				cursor={props.cursor}
				viewport={props.viewport}
			/>
		);
	}

	return (
		<div>
			{moverList.map(displayMover)}
		</div>
	);
}

export default MoverSet;