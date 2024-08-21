
/* priority queue without heap */
class PriorityQueue {
	constructor() {
		this.queue = [];
		this.at = 0;
	}

	enqueue(weight, data) {
		const item = { data, weight };
		let added = false;

		for (let i = this.at; i < this.queue.length; i++) {
			if (item.weight < this.queue[ i ].weight) {
				this.queue.splice(i, 0, item);
				added = true;
				break;
			}
		}

		if (!added) {
			this.queue.push(item);
		}
	}

	dqueue() {
		if (this.isEmpty()) return null;
		const val = this.queue[ this.at ];
		this.at++;
		return val;
	}

	isEmpty() {
		return this.at >= this.queue.length;
	}
}



// let pque = new PriorityQueue();
// console.log(pque.isEmpty());
// pque.enqueue(10, {name: 'gujarati thali'});
// console.log(pque.isEmpty());
// pque.enqueue(0, {name: 'burger'});
// console.log(pque.isEmpty());
// let d = pque.dequeue();

// console.log(pque);


export default PriorityQueue;