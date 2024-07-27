
class Graph {
	constructor(edges = [], verticesCount = 0) {
		this.graph = {};

		for(let i = 0; i < verticesCount; i++) {
			this.graph[i] = [];
		}
		edges.map(edge => {
			this.addEdge(...edge);
		})
	}

	addEdge(vertex1, vertex2, weight) {
		this.graph[vertex1].push([vertex2, weight]);
		// for undirected graphs
		this.graph[vertex2].push([vertex1, weight]);
	}

	bfs(start) {
		const queue = [[start, 0]];
		const traverse = [];
		let index = 0;

		while(index < queue.length) {
			console.log(queue[ index ]);
			const [vertex, weight] = queue[index++];
			let vertices = this.graph[ vertex ];
			// if(traverse.findIndex(([v, weight]) => v === ))queue.push(...vertices);

			vertices.forEach(el => {
				let temp = queue.findIndex(([ v, weight ]) => v === el[ 0 ]);

				if(temp === -1) queue.push(el);
			})

			traverse.push([vertex, weight]);
		}

		return traverse;
	}
}




/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} distanceThreshold
 * @return {number}
 */
var findTheCity = function (n, edges, distanceThreshold) {
	const graph = new Graph(edges, n);
	let bfs1 = graph.bfs(1);
	console.log(graph);
};


findTheCity(6, [ [ 0, 1, 10 ], [ 0, 2, 1 ], [ 2, 3, 1 ], [ 1, 3, 1 ], [ 1, 4, 1 ], [ 4, 5, 10 ] ], 20);
