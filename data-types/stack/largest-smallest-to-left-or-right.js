import Stack from './Stack.js';


// const test = new Stack();
// test.push('1')
// console.log(test.top, test.isEmpty);


const array = [ 1, 1, 2, 3, 4, 2, 6, 1, 0, 5];
const n = 5;

for(let i = 0; i < n; i++) {
	const rand = Math.floor(Math.random()*15);
	array.push(rand);
}

console.log(`---->`, array.length, array);
function nextLargestUsingLoop(arr) {
	const output = [];
	let t = 0;
	for(let i = 0; i < arr.length; i++) {
		t++;
		let el = arr[i];
		let val = -1;
		inner: for(let j = i; j < arr.length; j++) {
			t++;
			let el2 = arr[j];
			if(el2 > el) {
				val = el2;
				break inner;
			}
		}
		output.push(val);
	}
	console.log(t);
	return output;
}

/* 
Notes;
If stack is getting empty -> means no greater element to right
If stack is not empty -> top element is the output (large element)

// stack <- []
// output <- []
// for i <- 0 to arr.length do
// 	if(!stack.length) {
// 		output [arr.length-1] = -1;
// 		stack.push(arr[i])
// 	} 
// 	// below part should be in loop
// 	else if (stack[stack.length -1] > arr[i]) {
// 		output [arr.length-1] = stack[stack.length -1];
// 	} else if (stack[stack.length -1] > arr[i]) {
// 		output [arr.length-1] = -1;
// 		stack.push(arr[i])
// 	}

if stack empty -- return -1 with adding current element to stack

*/
function nextLargestUsingArrayAsStack(arr) {
	const stack = [], output = [];
	let t = 0;

	for(let i = arr.length-1; i >= 0; i--) {
		const inEl = arr[i];
		t++;
		
		thewhile: while(stack.length > 0) {
			t++;
			const top = stack[stack.length - 1] || -1;
			if(inEl >= top) {
				stack.pop();
				continue thewhile;
			}
			
			stack.push(inEl);
			output.push(top);
			break thewhile;
		}

		if (!stack.length) {
			output.push(-1);
			stack.push(inEl);
		}
	}
	console.log(t)
	return output.reverse();
}


function nextLargestUsingStack(arr) {
	const stack = new Stack(), output = [];
	let t = 0;

	for (let i = arr.length-1; i >= 0; i--) {
		t++;
		w: while(!stack.isEmpty) {
			t++;
			if(stack.top <= arr[i]) {
				stack.pop();
				continue w;
			}
			output.push(stack.top);
			stack.push(arr[i]);
			break w;
		}

		if(stack.isEmpty) {
			output.push(-1);
			stack.push(arr[i]);
		}
	}
	console.log(t);
	return output.reverse();
}



console.time('nextLargestUsingArrayAsStack');
console.log(nextLargestUsingArrayAsStack(array));
console.timeEnd('nextLargestUsingArrayAsStack');

console.time('nextLargestUsingStack');
console.log(nextLargestUsingStack(array));
console.timeEnd('nextLargestUsingStack');

console.time('nextLargestUsingLoop');
console.log(nextLargestUsingLoop(array));
console.timeEnd('nextLargestUsingLoop');