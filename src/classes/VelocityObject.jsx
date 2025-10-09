import SpaceObject from './SpaceObject'

/* moves in a direction, forever */
class VelocityObject extends SpaceObject {
	/**
	 * Make an updateable object with a constant velocity.
	 * @param {*} centerX 
	 * @param {*} centerY 
	 * @param {*} width 
	 * @param {*} height 
	 * @param {*} color 
	 * @param {*} velocityX 
	 * @param {*} velocityY 
	 */
	constructor(centerX, centerY, width, height, color, velocityX=0, velocityY=0) {
		super(centerX, centerY, width, height, color);
		this.velocityX = velocityX;
		this.velocityY = velocityY;
	}

	/**
	 * Apply velocity to current position.
	 */
	updatePosition() {
		this.x += this.velocityX;
		this.y += this.velocityY;
	}

	/**
	 * Updates to occur every update interval.
	 */
	update() { 
		updatePosition();
	}
}

export default VelocityObject;