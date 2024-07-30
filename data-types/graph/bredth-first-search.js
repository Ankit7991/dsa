
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

	bfs(start, distanceThreshold) {
		const queue = [[start, 0]];
		const visited = new Set([start]);
		let index = 0;

		while(index < queue.length) {
			console.log(queue[ index ]);
			const [vertex, weight] = queue[index++];
			let vertices = this.graph[ vertex ];

			vertices.forEach(el => {
				if(!visited.has(el[0])) queue.push(el);
			})

			visited.add(vertex);
		}

		return [...visited];
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
	let bfs1 = graph.bfs(1, distanceThreshold);
	console.log(bfs1);
};


findTheCity(6, [ [ 0, 1, 10 ], [ 0, 2, 1 ], [ 2, 3, 1 ], [ 1, 3, 1 ], [ 1, 4, 1 ], [ 4, 5, 10 ] ], 20);
