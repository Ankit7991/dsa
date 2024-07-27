
/* 
The graph we are looking for

⭐
Direction : undirected
Weight: Weighted (edges are weighted)
Cycle: cyclic
Connectivity: connected

⭐
Keywords: vertices(vertex), edges

⭐
Data to manage graph
const adjacencyList = {
	'A': { // current vertex
		'B': 5, // next (or neighbour vertex) and their weight
		'C': 10
	},
	'B': {
		'A': 5,
		'C': 3
	},
	'C': {
		'A': 10,
		'B': 3
	}
};

⭐
Basic Functions Needed in a Graph
	Add update Vertex and Edges
	Traverse ()

⭐
To traverse by weight there are some algorightm involved but we'll do without them
These algorithms are 
	Dijkstra’s Algorithm
	Prim’s Algorithm

*/


class Graph {
	constructor(edges = []) {
		this.data = {};
		edges.forEach(el => {
			this.addEdge(...el);
		});
	}

	#increment(vertex) { this.data[ vertex ].count++; }
	#decrement(vertex) { this.data[ vertex ].count--; }

	#weight(v1, v2, weight) {
		this.data[ v1 ].vertices[ v2 ] = weight;
	}

	addEdge(vertex1, vertex2, weight) {
		if (!this.data[ vertex1 ]) this.data[ vertex1 ] = { count: 0, vertices: {} };
		if (!this.data[ vertex2 ]) this.data[ vertex2 ] = { count: 0, vertices: {} };

		this.#weight(vertex1, vertex2, weight);
		this.#weight(vertex2, vertex1, weight);
		this.#increment(vertex1);
		this.#increment(vertex2);
	}

	traverseByWeight(vertex, weight, traverse) {
		/* we need .. max weight in any traverse and count of neighbours */

		let v = this.data[ vertex ];

		if (!traverse) traverse = {
			parentVertex: vertex,
			maxWeight: 0,
			remainingWeight: weight,
			neighbour: []
		};

		for (let adjecent in v.vertices) {
			let currentWeight = v.vertices[ adjecent ];
			let traversed = traverse.neighbour.includes(adjecent);
			if (currentWeight <= weight) {
				if (!traversed && adjecent.toString() !== traverse.parentVertex.toString()) {
					traverse.neighbour.push(adjecent);
					this.traverseByWeight(adjecent, weight - currentWeight, traverse);
				}
				if (currentWeight > traverse.maxWeight) traverse.maxWeight = currentWeight;
			}
		}

		return {
			vertex,
			maxWeight: traverse.maxWeight,
			neighbour: traverse.neighbour
		};
	}
}




const edges = [ [ 0, 1, 3 ], [ 1, 2, 1 ], [ 1, 3, 4 ], [ 2, 3, 1 ] ];


// const graph = new Graph(edges);


// console.log(graph.data);


// console.log(graph.traverseByWeight(0, 4));
// console.log(graph.traverseByWeight(1, 4));
// console.log(graph.traverseByWeight(2, 4));
// console.log(graph.traverseByWeight(3, 4));


var findTheCity = function (n, edges, distanceThreshold) {
	const graph = new Graph(edges);
	console.log(graph);

	let lowestNeighbour = Infinity;
	const items = {};

	for (let vertex in graph.data) {
		let data = graph.traverseByWeight(vertex, distanceThreshold);
		let isLonlier = data.neighbour.length <= lowestNeighbour;
		if (isLonlier) lowestNeighbour = data.neighbour.length;
		else continue;
		if (!items[ lowestNeighbour ]) items[ lowestNeighbour ] = [];
		items[ lowestNeighbour ].push(data);
	}

	console.log(items);

	let
		maxWeight = 0, output = null,
		arr = items[ lowestNeighbour ];

	for (let i = 0; i < arr.length; i++) {
		let el = arr[i];
		if(el.maxWeight > maxWeight) output = el.vertex;
	}

	console.log(output);
	return parseInt(output);
};

findTheCity(4, edges, 4);








/* 
Question


1334. Find the City With the Smallest Number of Neighbors at a Threshold Distance
Medium
Topics
Companies
Hint
There are n cities numbered from 0 to n-1. Given the array edges where edges[i] = [fromi, toi, weighti] represents a bidirectional and weighted edge between cities fromi and toi, and given the integer distanceThreshold.

Return the city with the smallest number of cities that are reachable through some path and whose distance is at most distanceThreshold, If there are multiple such cities, return the city with the greatest number.

Notice that the distance of a path connecting cities i and j is equal to the sum of the edges' weights along that path.

 

Example 1:


Input: n = 4, edges = [[0,1,3],[1,2,1],[1,3,4],[2,3,1]], distanceThreshold = 4
Output: 3
Explanation: The figure above describes the graph. 
The neighboring cities at a distanceThreshold = 4 for each city are:
City 0 -> [City 1, City 2] 
City 1 -> [City 0, City 2, City 3] 
City 2 -> [City 0, City 1, City 3] 
City 3 -> [City 1, City 2] 
Cities 0 and 3 have 2 neighboring cities at a distanceThreshold = 4, but we have to return city 3 since it has the greatest number.
Example 2:


Input: n = 5, edges = [[0,1,2],[0,4,8],[1,2,3],[1,4,2],[2,3,1],[3,4,1]], distanceThreshold = 2
Output: 0
Explanation: The figure above describes the graph. 
The neighboring cities at a distanceThreshold = 2 for each city are:
City 0 -> [City 1] 
City 1 -> [City 0, City 4] 
City 2 -> [City 3, City 4] 
City 3 -> [City 2, City 4]
City 4 -> [City 1, City 2, City 3] 
The city 0 has 1 neighboring city at a distanceThreshold = 2.
 

Constraints:

2 <= n <= 100
1 <= edges.length <= n * (n - 1) / 2
edges[i].length == 3
0 <= fromi < toi < n
1 <= weighti, distanceThreshold <= 10^4
All pairs (fromi, toi) are distinct.


*/