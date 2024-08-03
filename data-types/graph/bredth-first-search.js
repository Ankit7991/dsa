import PriorityQueue from "../queeue/priority-queue.js";

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
		const visited = new Set();
		// const queue = [[start, start]]; // [[fromVertex, toVertex]]
		const pQueue = new PriorityQueue();
		pQueue.enqueue(0, [start, start]);
		distanceList[start][1] = 0;
		let index = 0;
		let maxweight = 0;
		
		// while (queue.length > index) {
		while(!pQueue.isEmpty()) {
			// const [fromCity, currentCity] = queue[index++];
			const dequeue = pQueue.dqueue();
			const [fromCity, currentCity] = dequeue.data;
			const neighbours = this.verticesMap[currentCity];
			
			if(visited.has(currentCity)) continue;
			visited.add(currentCity);

			const [currentCityFrom, currentDistance] = distanceList[currentCity];

			let distanceFromMap = neighbours[fromCity] || Infinity;
			// let isInLimit = distanceFromMap
			// let previousDistance = distanceList[fromCity][1];
			// let totalDistance = distanceFromMap+previousDistance;


			// if(distanceFromMap < currentDistance && totalDistance < distanceThreshold) {
			// 	distanceList[ currentCity ] = [ fromCity, totalDistance ];
			// }
			
			for(let [neighbourId, neighbourDistance] of Object.entries(neighbours)) {
				neighbourId = parseInt(neighbourId);
				// currently i am on a neighbour of my current visiting city
				// I need to check - if they are more easily reachable from existing path.
				// So I'll get their current distance from whaterver path they are currently easily accessible
				let [neighbourFromId, neighbourCurrentDistance] = distanceList[neighbourId];
				// And calculate from current city this neighbour's distance
				let neighbourDistanceFromCurrentCity = currentDistance + neighbourDistance;
				// And if can reach quicker then existing distance update .. 
				let canVisitEasily = neighbourDistanceFromCurrentCity < neighbourCurrentDistance;

				if(canVisitEasily && neighbourDistanceFromCurrentCity <= distanceThreshold) {
					distanceList[neighbourId] = [currentCity, neighbourDistanceFromCurrentCity];
					maxweight = neighbourDistanceFromCurrentCity;
					// queue.push([currentCity, neighbourId])
					pQueue.enqueue(neighbourDistanceFromCurrentCity, [ currentCity, neighbourId ]);
				}
				neighbourId = parseInt(neighbourId);
				// if(!visited.has(neighbourId)) queue.push([currentCity, neighbourId]);
			}

			// neighbours.map(([nVertex, nWeight]) => {
			// 	if(!visited.has(nVertex)) queue.push(nVertex);
			// })
			'a';
		}

		// return [distanceList.reduce((sum, dist) => sum + (isFinite(dist[1]) ? 1: 0) , 0), maxweight];
		// return [distanceList, maxweight];
		return [distanceList.filter(el => isFinite(el[1]) && el[1] > 0), maxweight];

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
	// let bfs1 = graph.bfs(1, distanceThreshold);
	let minNeighbour = Infinity, minNeighbourIndex = NaN, maxDistance = 0;
	for(let i = 0; i < n; i++) {
		let [ distanceList, maxweight ] = graph.djkstra(i, distanceThreshold);

		if (distanceList.length <= minNeighbour && maxweight >= maxDistance) minNeighbourIndex = i;
	}
	// console.log(bfs1);
	console.log(minNeighbourIndex);
	return minNeighbourIndex;
};


findTheCity(6, [ [ 0, 1, 10 ], [ 0, 2, 1 ], [ 2, 3, 1 ], [ 1, 3, 1 ], [ 1, 4, 1 ], [ 4, 5, 10 ] ], 20);
// findTheCity(4, [[0, 1, 2], [1, 2, 3], [1, 3, 4], [2, 3, 4]], 6);
// findTheCity(6, [[0,1,3], [0,2,2], [1,3,4], [2,3,3], [3,4,5]], 9);
