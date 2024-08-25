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

# Two Pointer Problems
## Sliding the Zeroes
https://leetcode.com/problems/move-zeroes/description/

Given an integer array nums, move all 0's to the end of it
	while maintaining the relative order of the non-zero elements.

Note that you must do this in-place without making a copy of the array.
## Sliding the Zeroes
```
Input: nums = [0,1,0,3,12]
Output: [1,3,12,0,0]
Example 2:

Input: nums = [0]
Output: [0]
```
### Solution
```
var moveZeroes = function(nums) {
    let at = 0;

    for(let i = 0; i < nums.length; i++) {
        if(nums[i] !== 0) {
            [nums[i], nums[at]] = [nums[at], nums[i]]
            at++;
        }
    }
};
```
Note:
- "at" is the first pointer
- "i" is the second pointer
