import React from 'react';

/**
 *  This is an unconventional type of Hook that I've been fiddling with.
 *  
 *  Let's say you want to have 1000 things on the screen that are all supposed
 *  to update in real time.  This Hook creates a list that you can put all of
 *  those things in, and then at regular intervals based on your desired
 *  updates per second, this Hook will tell them to update in sequence
 *  by calling each object's update() method.  After all the updates, a state
 *  variable is set, triggering a render.
 *  
 *  The intention is that nothing else in your entire program should trigger
 *  renders, making this Hook the only think asking for more renders.  But
 *  that's not a hard requirement, just an optional optimization.
 * 
 *  Note that the desired updates per second and the actual updates per second
 * 	may differ slightly.  See below for more details.
 * 
 * 	This Hook offers two different options to time the delay between updates:
 * 	setInterval or setTimeout.  While neither of these functions guarantees
 * 	to match the precise amount of delay requested, each offers different pros
 * 	and cons.  To quickly summarize, setInterval starts the delay for the next
 * 	interval immediately after the previous delay ends; this means that as the
 * 	time required to update all objects increases, setInterval will better
 * 	stick to its schedule...that is, until the time required to update all
 * 	objects exceeds the interval duration, at which point update requests will
 * 	start to overlap, which may lead to undesirable behavior.  The alternative
 * 	is setTimeout, which will wait until all updates have concluded before
 * 	starting the delay to the next interval.  Due to this, updates per second
 * 	will be delayed as the time required to make all updates increases, but it
 * 	will never overlap updates.  For this reason, setTimeout is the default.
 * 
 * @param {number} updatesPerSecond - desired updates and renders per second
 * @returns an object containing the following:
 * 		updateList - a ref to hold the objects you want to regularly update
 * 		secondsElapsed - a state variable, the number of seconds elapsed
 * 		updatesRequested - a ref that increments each time state var is set
 */
function useUpdater(updatesPerSecond, useSetInterval=false) {

	const millisecondsBetweenUpdates = 1000/updatesPerSecond;
	// a list of objects that should be prompted to update each interval
	const updateList = React.useRef([]);
	// records how much time has passed since updater started
	const initialTimestamp = React.useRef(Date.now());
	const [secondsElapsed, setSecondsElapsed] = React.useState(0);
	// number of times renders have been requested via setting a state variable
	const updatesRequested = React.useRef(0);


	function updateObjects() {
		// every object in this list should have an update() function
		for (let object in updateList.current) {
			updateList.current[object].current.update();
		}
		//console.log(updateList.current);
	}

	function updateTime () {
		setSecondsElapsed( (Date.now() - initialTimestamp.current) / 1000 );
		updatesRequested.current += 1;
	};

	function updateEverything() {
		const updateStart = performance.now();
		updateObjects();
		updateTime();
		const duration = performance.now() - updateStart;
		if (duration > millisecondsBetweenUpdates) {			
			console.log(
				"WARNING: time needed to update was " + duration.toFixed(2)
				+ "ms," + '\n' + "which exceeds update interval time of "
				+ millisecondsBetweenUpdates.toFixed(2) + "ms!"
			);
		}
	}

	// One of the two ways to create the delay between updates.
	function doDelayViaSetTimeout() {
		React.useEffect(
			() => {
				setTimeout(
					() => {
						const updateStart = performance.now();
						updateEverything();
						const duration = performance.now() - updateStart;
					},
					millisecondsBetweenUpdates
				);
			},
			[secondsElapsed]	// dependency array contains the state variable being updated,
								// so useEffect will be called again after each timeout
		);
	}

	// One of the two ways to create the delay between updates.
	function doDelayViaSetInterval() {
		React.useEffect(
			() => {
				const interval = setInterval(
					() => {
						updateEverything();
					},
					millisecondsBetweenUpdates
				);
				console.log("Update Interval initiated.");

				return () => {
					clearInterval(interval);
					console.log("Update Interval terminated.");
				};
			},
			[]	// empty dependency array tells React to only execute this once
		);
	}

	
	// Actually do all of the stuff
	if (useSetInterval) {
		doDelayViaSetInterval();
	} else {
		doDelayViaSetTimeout();
	}


	return {
		updateList: updateList,
		secondsElapsed: secondsElapsed,
		updatesRequested: updatesRequested,
	};
}

export default useUpdater;