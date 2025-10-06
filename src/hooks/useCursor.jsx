import React from 'react';
/*
	this page was useful:
	https://developer.mozilla.org/en-US/docs/Web/API/Element/mousemove_event
*/

function useCursor() {
	//once when the session starts, this sets up a cursor listener
	const cursor = React.useRef({x:-100, y:-100, pressed:false});
	React.useEffect(
		() => {
			const handleCursorLocation = (e) => {
				cursor.current.x = e.clientX;
				cursor.current.y = e.clientY;
			};
			window.addEventListener('mousemove', handleCursorLocation);

			const handleClickDown = (e) => {
				cursor.current.pressed = true;
				//console.log("click");
			};
			window.addEventListener('mousedown', handleClickDown);

			const handleClickUp = (e) => {
				cursor.current.pressed = false;
				//console.log("unclick");
			};
			window.addEventListener('mouseup', handleClickUp);
			console.log("Cursor Detection setup complete.");
			return () => {
				window.removeEventListener('mousemove',	handleCursorLocation);
				window.removeEventListener('mousedown',	handleClickDown);
				window.removeEventListener('mouseup', 	handleClickUp);
			};
		},
		[] //empty dependency array means "run once on mount"
	);
	return cursor;
}

export default useCursor;