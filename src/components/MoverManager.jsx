import React from 'react';
import Mover from './Mover';

function MoverManager(props) {

	class Manager {
		static colorList = ['red', 'purple', 'blue', 'green', 'yellow', 'orange'];
		
		constructor() {
			this.moverList = [];
			this.moverKey = 0;
			this.wasPressedLastUpdate = false;
			this.makeMoverGrid();
		}
				
		makeMoverGrid() {
			const moversPerColumn = 10;
			const moversPerRow = 10;
			const firstLeft = 100;
			const firstTop = 200;
			const offset = 3;
			const width = 50;
			for (let x = 0; x < moversPerColumn; x+=1){
				for (let y = 0; y < moversPerRow; y+=1){
					
					const xPosition = firstLeft + offset * x;
					const yPosition = firstTop + offset * y;
					
					let randomColor = Manager.colorList[
						Math.floor(Math.random() * Manager.colorList.length)
					];
					this.moverList.push(
						{
							key: this.moverKey,
							startData: {
								left: xPosition,
								top: yPosition, 
								width: width, 
								height: width,
								color: randomColor,
							},
						}
					);
					this.moverKey++;
				}
			}
		}

		// this will be something soon, don't you worry
		makeThing() {
			
		}

		
		update() {
			if (!this.wasPressedLastUpdate && props.cursor.current.pressed) {
				this.makeThing();
			}
			this.wasPressedLastUpdate = props.cursor.current.pressed;
		}
	};
	

	// just once, initialize and add to update list
	const manager = React.useRef( null );
	if (!manager.current) {
		manager.current = new Manager();
		props.updateList.current.push(manager);
	}

	function displayMover(object) {
		return (
			<Mover 
				key={object.key}
				initial={object.startData}
				updateList={props.updateList}
				cursor={props.cursor}
				viewport={props.viewport}
			/>
		);
	}

	return (
		<div>
			{manager.current.moverList.map(displayMover)}
		</div>
	);
}

export default MoverManager;