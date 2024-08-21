class Node<T> {
	value: T;
	next: Node<T> | null;
	constructor(value: T, next: Node<T> | null) {
		this.value = value;
		this.next = next;
	}
}

type node<T> = Node<T> | null;

export class SinglyLinkedList<T> {
	head: node<T>;
	constructor() {
		this.head = null;
	}
	
}