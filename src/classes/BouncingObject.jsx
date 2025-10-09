import VelocityObject from './VelocityObject'

const {abs, sqrt} = Math;

class BouncingObject extends VelocityObject {
	/**
	 * Make an updateable object that bounces off certain things.
	 * Currently those things are the cursor and the viewport edges.
	 * @param {*} contextData 
	 * @param {number} centerX 
	 * @param {number} centerY 
	 * @param {number} width 
	 * @param {number} height 
	 * @param {string} color 
	 * @param {number} velocityX 
	 * @param {number} velocityY 
	 */
	constructor(contextData, centerX, centerY, width, height, color, velocityX=0, velocityY=0) {
		super(centerX, centerY, width, height, color, velocityX, velocityY);
		this.context = contextData;
	}

	/**
	 * Returns an object containing the x and y of the normalized vector.
	 * @param {number} x 
	 * @param {number} y 
	 */
	normalizeVector(x, y) {
		// For any vector V = (x, y)...
		//	 |V| = sqrt(x*x + y*y)		<--gives the magnitude of the vector
		//	 V/|V| = (x/|V|, y/|V|)		<--normalizes the vector
		const magnitude = abs(sqrt(x*x + y*y));
		return {x: x/magnitude, y: y/magnitude};
	}

	/**
	 * Calculate a normalized vector from the target to our center and
	 * accelerate us away from it.
	 * @param {number} targetX 
	 * @param {number} targetY 
	 * @param {number} magnitude - Optional multiplier for unit vector.
	 */
	accelerateAwayFrom(targetX, targetY, magnitude=1) {
		// calculate a normalized vector from cursor to center
		const vectorX = this.x - targetX;
		const vectorY = this.y - targetY;
		const unitVector = this.normalizeVector(vectorX, vectorY);
		
		this.velocityX += unitVector.x * magnitude;
		this.velocityY += unitVector.y * magnitude;
	}

	/**
	 * Decrease speed vector by a magnitude of 1, to a minimum of 1.
	 */
	decelerate() {			
		// calculate a normalized vector from velocity
		const unitVector = this.normalizeVector(this.velocityX, this.velocityY);

		// reduce velocity by a maximum of the normalized vector
		if (abs(this.velocityX) > abs(unitVector.x)) {
			this.velocityX -= unitVector.x;
		}else{
			this.velocityX = unitVector.x;
		}

		if (abs(this.velocityY) > abs(unitVector.y)) {
			this.velocityY -= unitVector.y;
		}else{
			this.velocityY = unitVector.y;
		}
		//console.log(this.velocityX +', '+ this.velocityY);
	}

	/**
	 * If we're currently touching cursor, calculate a vector from the cursor
	 * to our center and accelerate us along that vector.
	 */
	bounceOffCursorChecks() {
		const cursorX = this.context.cursor.current.x;
		const cursorY = this.context.cursor.current.y;
		const moverLeft = this.getLeft();
		const moverRight = this.getLeft() + this.width;
		const moverTop = this.getTop();
		const moverBottom = this.getTop() + this.height;
		// apply changes to velocity based on if cursor is touching me
		if (moverLeft <= cursorX && cursorX <= moverRight &&
			moverTop <= cursorY && cursorY <= moverBottom) {
			this.accelerateAwayFrom(cursorX, cursorY, 10);
		}else{
			if (this.velocityX != 0 || this.velocityY != 0) {
				this.decelerate();
			}
		}
	}

	/**
	 * If the next update to position would cause us to leave the viewport,
	 * invert the relevant velocities.
	 */
	bounceOffViewportChecks() {
		// Prediction prevents it from going outside window, since
		// divs positioned beyond the window can make an unwanted scrollbar.
		const predictedLeft = this.velocityX + this.getLeft();
		const predictedRight = this.velocityX + this.getLeft() + this.width;
		const predictedTop = this.velocityY + this.getTop();
		const predictedBottom = this.velocityY + this.getTop() + this.height;
		if(
			this.velocityX < 0 && predictedLeft < 0 ||
			this.velocityX > 0 && this.context.viewport.current.width < predictedRight
			){
			this.velocityX = -this.velocityX
		}
		if(
			this.velocityY < 0 && predictedTop < 0 ||
			this.velocityY > 0 && this.context.viewport.current.height < predictedBottom
			){
			this.velocityY = -this.velocityY
		}			
	}

	/**
	 * Update!  Check for bounces, accelerate if needed, then apply velocity.
	 */
	update() { 
		// if colliding with stuff, bounce appropriately
		this.bounceOffCursorChecks();
		this.bounceOffViewportChecks();

		this.updatePosition()
	}
};

export default BouncingObject;