const arr = 
[
	[0, 0, 1, 1, 0, 0],
	[0, 1, 0, 0, 1, 0],
	[1, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 1],
	[0, 1, 0, 0, 1, 0],
	[0, 0, 1, 1, 0, 0],
]

/* 
/ or \ or 1 - are creating a wall
. or 0 - are islands
We need to count separate islands .. 
[
	[. . / \ . .]
	[. / . . \ .]
	[/ . . . . \]
	[\ . . . . /]
	[. \ . . / .]
	[. . \ / . .]
] -> 5 islands
or
[
	[. . / \]
	[. / . .]
	[/ . . .]
] - 2 islands
or 
[
	[. . / . . /]
	[. / . . / .]
	[/ . . / . .]
	[. . / . . /]
	[. / . . / .]
	[/ . . / . .]
] - 4 islands
*/
export class Queue {
	#at = 0;
	#end = 0;

	constructor(size, data = []) {
		this.size = size + 1;
		this.data = data.concat(new Array(size - data.length).fill(null));
		this.#end = data.length;
	}

	push(value) {
		if(this.isFull()) throw new TypeError('Queue is full');
		this.data[this.#end] = value;
		this.#end = (this.#end + 1) % (this.size);
	}

	pop() {
		if(this.isEmpty()) throw new TypeError('Queue is empty');
		const val = this.data[this.#at];
		this.data[this.#at] = null;
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


function findIsland(grid, x, y) {
	const queue = new Queue(grid.length * grid[ 0 ].length, [ [ x, y ] ]);
	let directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
	let isZero = grid[x][y] === 0;
	while(!queue.isEmpty()) {
		const [cx, cy] = queue.pop();
		if(grid[cx][cy] === 0) grid[cx][cy] = 'v';
		else continue;
		
		for(let i = 0; i < 4; i++) {
			let [a, b] = directions[i];
			if(grid[cx+a]?.[cy+b] === 0) {
				queue.push([cx+a, cy+b])
			}
		}
	}

	return isZero;
}
function floodFill(grid) {
	let count = 0;
	for(let ri = 0; ri < grid.length; ri++) {
		for (let ci = 0; ci < grid[ri].length; ci++) {
			let currentCell = grid[ri][ci];
			let isIsland = findIsland(grid, ri, ci);
			if(isIsland) {
				console.log(`-- ${ri} -- ${ci} --`, grid);
				count++;
			}
		}
	}
	console.log(count);
}

floodFill(arr);