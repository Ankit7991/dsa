
/* priority queue without heap */
class PriorityQueue {

	constructor() {
		this.queue = [];
		this.at = 0;
	}


	enqueue(weight, item = {}) {
		item.weight = weight;

		let added = false;
		for(let i = this.at; i < this.queue.length; i++) {
			if(added) break;
			const {weight: newWeight} = this.queue[i];
			if(weight < newWeight) {
				this.queue.splice(i, 0, item);
				added = true;
			}
		}

		if(!added) {
			this.queue.push(item);
		}
	}

	dequeue() {
		if(this.isEmpty()) return null; 
		const val = this.queue[this.at];
		this.queue[this.at] = null;
		this.at++;
		console.log(val);
		return val;
	}

	isEmpty() {
		return this.queue.length -1 === this.at;
	}
}


let pque = new PriorityQueue();
pque.enqueue(10, {name: 'gujarati thali'});
pque.enqueue(15, {name: 'burger'});
pque.dequeue();
pque.enqueue(3, {name: 'pakodi'})
pque.enqueue(3, {name: 'abc'})
pque.dequeue();
pque.enqueue(20, {name: 'abc'})

console.log(pque);


export default PriorityQueue;