
class Graph {
	constructor(edges = [], verticesCount = 0) {
		this.verticesMap = {};
		this.verticesCount = verticesCount;

		for(let i = 0; i < verticesCount; i++) {
			// this.verticesMap[i] = [];
			this.verticesMap[i] = {};
		}
		edges.map(edge => {
			this.addEdge(...edge);
		})
	}

	addEdge(vertex1, vertex2, weight) {
		// this.verticesMap[vertex1].push([vertex2, weight]);
		this.verticesMap[vertex1][vertex2] = weight;
		// for undirected graphs
		// this.verticesMap[vertex2].push([vertex1, weight]);
		this.verticesMap[vertex2][vertex1] = weight;
	}

	bfs(start) {
		const queue = [[start, 0]];
		const visited = new Set([start]);
		let index = 0;

		while(index < queue.length) {
			const [vertex, weight] = queue[index++];
			let vertices = Object.entries(this.verticesMap[ vertex ]);

			vertices.forEach(el => {
				if(!visited.has(el[0])) queue.push(el);
			})

			visited.add(vertex);
		}

		return [...visited];
	}

	djkstra(start, distanceThreshold) {
		/* index: toCity, value[fromCity, distance] */
		const distanceList = Array.from({ length: this.verticesCount }, () => [ start, Infinity ]);
		const visited = new Set([start]);
		const queue = [[start, start]]; // [[fromVertex, toVertex]]
		distanceList[start][1] = 0;
		let index = 0;
		
		while (queue.length > index) {
			const [fromCity, currentCity] = queue[index++];
			const neighbours = this.verticesMap[currentCity];
			
			visited.add(currentCity);

			const [$fromCity, distance] = distanceList[currentCity];

			let distanceFromMap = neighbours[fromCity] || Infinity;
			// let isInLimit = distanceFromMap
			let previousDistance = distanceList[fromCity][1];
			let totalDistance = distanceFromMap+previousDistance;


			if(distanceFromMap < distance && totalDistance < distanceThreshold) {
				distanceList[ currentCity ] = [ fromCity, totalDistance ];
			}
			
			for(let nVertex in neighbours) {
				nVertex = parseInt(nVertex);
				if(!visited.has(nVertex)) queue.push([currentCity, nVertex]);
			}

			// neighbours.map(([nVertex, nWeight]) => {
			// 	if(!visited.has(nVertex)) queue.push(nVertex);
			// })

		}

		console.log(distanceList);
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
	graph.djkstra(0, distanceThreshold);
	console.log(bfs1);
};


findTheCity(6, [ [ 0, 1, 10 ], [ 0, 2, 1 ], [ 2, 3, 1 ], [ 1, 3, 1 ], [ 1, 4, 1 ], [ 4, 5, 10 ] ], 20);
// findTheCity(4, [[0, 1, 2], [1, 2, 3], [1, 3, 4], [2, 3, 4]], 6);
// findTheCity(6, [[0,1,3], [0,2,2], [1,3,4], [2,3,3], [3,4,5]], 9);
