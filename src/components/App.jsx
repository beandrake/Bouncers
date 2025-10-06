import React from 'react';
import MoverSet from './MoverSet';
import Mover from './Mover';
import useCursor from '../hooks/useCursor';
import useViewport from '../hooks/useViewport';
import useUpdater from '../hooks/useUpdater';

function App() {

	const FPS = 60;
	const {updateList, framesElapsed, secondsElapsed} = useUpdater(FPS);

	const cursor = useCursor();
	const viewport = useViewport();

	return (
		<div className={'outline'}>
			<div className={'monospace'}>
				Debug Information <br/><br/>
				Frames Elapsed: {framesElapsed} <br/>
				Seconds Elapsed: {(secondsElapsed.current).toFixed(2)} <br/> 
				Average FPS: {(framesElapsed/secondsElapsed.current).toFixed(2)} <br/><br/>
			</div>
			<MoverSet
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
				initial={{left: 50, top:50, width:100, height:100, color:'white'}}
				updateList={updateList}
				cursor={cursor}
				viewport={viewport}
			/>
		</div>
	);
}

export default App;