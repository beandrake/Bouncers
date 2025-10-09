
/* an object that occupies space and exists in space */
class SpaceObject {
	constructor(centerX, centerY, width, height, color) {
		this.x = centerX;
		this.y = centerY;
		this.width = width;
		this.height = height;
		this.cssClasses = ['pixel', color]
	}

	getLeft() {
		return this.x - this.width/2;
	}

	getTop() {
		return this.y - this.height/2;
	}

	getClassString() {
		return this.cssClasses.join(' ')
	}

	getStyleData() {
		return {
			left:	this.getLeft().toString() + 'px',
			top:	this.getTop().toString() + 'px',
			width:	this.width.toString() + 'px',
			height:	this.height.toString() + 'px',
		}
	}
}

export default SpaceObject;