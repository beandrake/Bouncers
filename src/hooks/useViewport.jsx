import React from 'react';


function useViewport() {
	const viewport = React.useRef({width: window.innerWidth, height: window.innerHeight});
	React.useEffect(
		() => {
			const handleResize = () => {
				viewport.current.width = window.innerWidth;
				viewport.current.height = window.innerHeight;
				//console.log(viewport.current.width, viewport.current.height);
			};
			window.addEventListener('resize', handleResize);
			console.log("Viewport Dimensions Detection setup complete.");
			return () => window.removeEventListener('resize', handleResize);
		},
		[]
	)
	return viewport;
}

export default useViewport;