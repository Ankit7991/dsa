

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

	traverse(head,length, n, log = true) {
		let arr = [],
		temp = head,
		i = 0;
		while ( length === null ? temp : i < (n || length)) {
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

	reverse() {
		let prev = null;
		let current = this.head;
		let next = current.next;
		let stop = false;
		while(!stop) {
			if(current === null) stop = true; 
			console.log(`(${current?.data})`)
			this.traverse(current, null)
			this.traverse(prev, null)
			if(current) current.next = prev;
			prev = current;
			current = next;
			next = next?.next;
		}
	}
}


const ll = new LinkedList();
ll.add(10);
ll.add(11);
ll.addBefore(5);
ll.addTail(12);
ll.traverse(ll.head, ll.length);
ll.reverse();






export class DoublyLinkedList extends LinkedList {
	constructor() {
		super();
	}
}

