export default class Stack {
	#data;
	#count;
	constructor() {
		this.#data = [];
		this.#count = 0;
	}

	push(data) {
		this.#data.push(data);
		this.#count++;
		return data;
	}

	pop() {
		this.#handleEmpty();
		this.#count--;
		return this.#data.pop();
	}
	
	get top() {
		this.#handleEmpty();
		return this.#data[this.#count-1];
	}
	
	get isEmpty() {
		return !this.#count;
	}
	
	#handleEmpty() {
		if(this.isEmpty) throw new TypeError('Stack Is Empty.');
	}
}