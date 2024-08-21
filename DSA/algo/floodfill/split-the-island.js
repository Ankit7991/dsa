export class Queue {
	#at = 0;
	#end = 0;

	constructor(size, data = []) {
		this.size = size + 1;
		this.data = data.concat(new Array(size - data.length).fill(null));
		this.#end = data.length;
	}

	push(value) {
		if (this.isFull()) throw new TypeError('Queue is full');
		this.data[ this.#end ] = value;
		this.#end = (this.#end + 1) % (this.size);
	}

	pop() {
		if (this.isEmpty()) throw new TypeError('Queue is empty');
		const val = this.data[ this.#at ];
		this.data[ this.#at ] = null;
		this.#at = (this.#at + 1) % (this.size);
		return val;
	}

	isEmpty() {
		return this.#at === this.#end;
	}
	isFull() {
		return (this.#end + 1) % this.size === this.#at;
	}
}

let isLand = grid => (x, y) => grid[ x ]?.[ y ] === 1 || grid[ x ]?.[ y ] === 'v';

/**
 * @param {number[][]} grid
 * @return {number}
 */
var minDays = function (grid) {
	let islands = [];
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[ i ].length; j++) {
			if (grid[ i ][ j ] === 1) {
				let land = getIsland(grid, [ i, j ]);
				// console.log(`--> `, land);
				if (land.length) islands.push(land);
			}
		}
	}

	console.log(islands);
};


function getIsland(grid, pos) {
	const il = isLand(grid);
	const queue = new Queue(grid.length * grid[ 0 ].length);
	queue.push(pos);
	const edges = [];
	const priorityEdges = [];
	const visited = new Set();

	if (grid[ pos[ 0 ] ][ pos[ 1 ] ] !== 1) return null;
	// while (queue.size() > 0) {
	while (!queue.isEmpty()) {
		let [ x, y ] = queue.pop();
		// if(!il(x, y)) continue;
		const [ currentLand, connectedLands ] = connectedIsland(grid, [ x, y ], (ax, by) => {
			queue.push([ ax, by ]);
			grid[ ax, by ] = 'v';
		});
		console.log({currentLand, connectedLands})
		if (connectedLands.length === 2) edges.push([ currentLand, connectedLands ]);
		else if (connectedLands.length === 1) priorityEdges.push([ currentLand, connectedLands ]);
	}
	if (priorityEdges.length) return priorityEdges;
	else return edges;
}

/** @returns [[0, 0], [[0, 1], [1, 0]]] */
function connectedIsland(grid, [ x, y ], cb) {
	const il = isLand(grid);
	const directions = [ [ 0, 1 ], [ 1, 0 ], [ 0, -1 ], [ -1, 0 ] ];
	const output = [];
	for (let i = 0; i < 4; i++) {
		let [ a, b ] = directions[ i ];
		let [ ax, by ] = [ x + a, y + b ];
		if (il(ax, by)) {
			cb?.(ax, by);
			output.push([ ax, by ]);
		}
	}
	return [ [ x, y ], output ];
}
minDays([ [ 0, 1, 1, 0 ], [ 0, 1, 1, 0 ], [ 0, 0, 0, 0 ] ]);