import SpaceObject from './SpaceObject'

/* moves in a direction, forever */
class VelocityObject extends SpaceObject {
	/**
	 * Make an updateable object with a constant velocity.
	 * @param {*} left 
	 * @param {*} top 
	 * @param {*} width 
	 * @param {*} height 
	 * @param {*} color 
	 * @param {*} velocityX 
	 * @param {*} velocityY 
	 */
	constructor(left, top, width, height, color, velocityX=0, velocityY=0) {
		super(left, top, width, height, color);
		this.velocityX = velocityX;
		this.velocityY = velocityY;
	}

	/**
	 * Update!  Apply velocity.
	 */
	update() { 
		// apply changes to position based on velocity
		this.left += this.velocityX;
		this.top += this.velocityY;
	}
}

export default VelocityObject;