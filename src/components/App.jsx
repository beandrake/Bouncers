import React from 'react';
import MoverManager from './MoverManager';
import Mover from './Mover';
import useCursor from '../hooks/useCursor';
import useViewport from '../hooks/useViewport';
import useUpdater from '../hooks/useUpdater';

function App() {

	// updatesPerSecond is kind of conceptually similar to FPS...
	// ...but remember that renderung isn't the same as painting
	const FPS = 60;
	const {updateList, secondsElapsed, updatesRequested} = useUpdater(FPS, true);

	const cursor = useCursor();
	const viewport = useViewport();

	return (
		<div className={'outline'}>
			<div className={'monospace'}>
				Debug Information <br/><br/>
				Frames Elapsed: {updatesRequested.current} <br/>
				Seconds Elapsed: {(secondsElapsed).toFixed(2)} <br/> 
				Average FPS: {(updatesRequested.current/secondsElapsed).toFixed(2)} <br/><br/>
			</div>
			<MoverManager
				updateList={updateList}
				cursor={cursor}
				viewport={viewport}
			/>
			<div className={'monospace'}>
				Cursor Location:         {cursor.current.x}, {cursor.current.y}
			</div>
			<div className={'monospace'}>
				Viewport Width & Height: {viewport.current.width}, {viewport.current.height}
			</div>
			<Mover 
				initial={{centerX:100, centerY:100, width:100, height:100, color:'white'}}
				updateList={updateList}
				cursor={cursor}
				viewport={viewport}
			/>
		</div>
	);
}

export default App;