Two Pointer

#### How to identify?
- Sorted Array
- Subarray Or Substring Problem (Question ask this type of output)
- Complimentry Condition
	- Trying to find two numbers to satisfy certain
		- sum, product, difference
- Brute force might include nested loops
- Can include Sliding window in solution


#### Problems
- https://leetcode.com/problems/string-compression/description/
	- This problem needs to compress array of string .. from ['a', 'a', 'a', 'b'] to ['a', '3', 'b'], and in constant space means you can't have a separate variable to store output then split and all. So,
	- Here we'll have two pointers
		1. For reading next word in array
			- it will be O(n)
		2. For writing inside the same array
			- it will be O(log n)