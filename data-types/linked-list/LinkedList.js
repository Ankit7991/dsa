

export class Node {
	constructor(data) {
		this.data = data;
		/**@type {Node | null} */
		this.next = null;
	}
}

export class LinkedList {
	constructor() {
		/**@type {Node | null} */
		this.head = null;
		this.tail = null;
		this.at = null;
		this.length = 0;
	}

	addTail(data) {
		const node = new Node(data);
		this.tail.next = node;
		this.tail = this.tail.next;
		console.log(this);
		this.length++;
	}

	add(data) {
		// without using tail
		const node = new Node(data);
		if(!this.head) {
			this.head = node;
			this.tail = this.head;
			this.length++;
			return;
		}
		let current = this.head;
		while (current?.next) {
			current = current.next;
		}
		current.next = node;
		this.tail = current.next;
		this.length++;
	}

	get next() {
		this.at = this.head.next;
		return this.at;
	}

	addBefore(data) {
		const node = new Node(data);
		node.next = this.head;
		this.head = node;
		this.length++;
	}

	traverse(n, log = true) {
		let arr = [],
		temp = this.head,
		i = 0;
		while (i < (n || this.length)) {
			if(log) arr.push(JSON.stringify(temp.data));
			temp = temp.next;
			i++;
		}

		if(log) console.log(arr.join(' -> '));
		return temp;
	}

	remove(at){
		const temp = this.traverse(at - 1, false);

		temp.next = temp.next?.next || null;
		if(at = this.at) this.at = this.at?.next || null;
		return this.at;
	}
}


// const ll = new LinkedList();
// console.log(ll);
// ll.add(10);
// console.log(ll);
// ll.add(11);
// console.log(ll.next.next);
// ll.addBefore(5);
// ll.add({name: 'anki'});
// ll.addTail(12);
// ll.remove(2);
// ll.traverse();
// console.log(ll.head, ll.tail);




export class DoublyLinkedList extends LinkedList {
	constructor() {
		super();
	}
}

