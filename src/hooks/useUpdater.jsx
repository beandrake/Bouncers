import React from 'react';

/**
 *  This is an unconventional type of Hook that I've been fiddling with.
 *  
 *  Let's say you want to have 1000 things on the screen that are all supposed
 *  to update in real time.  This Hook creates a list that you can put all of
 *  those things in, and then at regular intervals based on your desired
 *  FPS (Frames Per Second), this Hook will tell them to update in sequence
 *  by calling each object's update() method.  After all the updates, a state
 *  variable is set, triggering a render.
 *  
 *  The intention is that nothing else in your entire program should trigger
 *  renders, making this Hook the only think asking for more renders.  But
 *  that probably isn't a hard requirement, just an optional optimization.
 * 
 *  Note that the desired FPS and the actual FPS seem to differ slightly.
 *  
 * 
 * @param {number} fps - desire updates and renders per second
 * @returns an object containing the following:
 * 		updateList - a ref to hold the objects you want to regularly update
 * 		framesElapsed - the state variable that increments each frame
 * 		secondsElapsed - a ref containing the number of seconds elapsed
 */
function useUpdater(fps) {

	// desired FPS
	const FPS = fps;
	// a list of objects that should be prompted to update each interval
	const updateList = React.useRef([]);
	// records how much time has passed
	const initialTimestamp = React.useRef(Date.now());
	const secondsElapsed = React.useRef(0);

	// every object in this list should have an update function
	function updateAll() {
		for (let object in updateList.current) {
			updateList.current[object].current.update();
		}
		//console.log(updateList.current);
	}

	// FPS times per second, update everything in the list
	const [framesElapsed, setFramesElapsed] = React.useState(0);
	React.useEffect(
		() => {
			setTimeout(
				() => {
					updateAll();
					secondsElapsed.current = (Date.now() - initialTimestamp.current) / 1000;
					setFramesElapsed( framesElapsed + 1	);
				},
				1000/FPS
			);
		},
		[framesElapsed]	// dependency array contains the value being updated,
						// so useEffect will be called again after each timeout
	)

	return {
		updateList: updateList,
		framesElapsed: framesElapsed,
		secondsElapsed: secondsElapsed,
	};
}

export default useUpdater;