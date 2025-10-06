
/* an object that occupies space and exists in space */
class SpaceObject {
	constructor(left, top, width, height, color) {
		this.left =	left;
		this.top = top;
		this.width = width;
		this.height = height;
		this.cssClasses = ['pixel', color]
	}

	getClassString() {
		return this.cssClasses.join(' ')
	}

	getStyleData() {
		return {
			left:	this.left.toString() + 'px',
			top:	this.top.toString() + 'px',
			width:	this.width.toString() + 'px',
			height:	this.width.toString() + 'px',
		}
	}
}

export default SpaceObject;