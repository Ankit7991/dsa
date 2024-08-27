# Two Pointer

#### How to identify?
- Sorted Array
- Subarray Or Substring Problem (Question ask this type of output)
- Complimentry Condition
	- Trying to find two numbers to satisfy certain
		- sum, product, difference
- Brute force might include nested loops
- Can include Sliding window in solution

# Two Pointer Problems

## Problems
- https://leetcode.com/problems/string-compression/description/
	- This problem needs to compress array of string .. from ['a', 'a', 'a', 'b'] to ['a', '3', 'b'], and in constant space means you can't have a separate variable to store output then split and all. So,
	- Here we'll have two pointers
		1. For reading next word in array
			- it will be O(n)
		2. For writing inside the same array
			- it will be O(log n)

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
### THIS WAS MIND BOGGLING 💥

## REVERSE THE STRING

EASY

Swap first <-> last 🔁 repeat

## Array Partition

```
Given an integer array nums of 2n integers, 

group these integers into n pairs 
	(a1, b1), (a2, b2), ..., (an, bn) 
such that 
	the sum of min(ai, bi) for all i is maximized. 

Return the maximized sum.
```

### Find the pattern .. 
```
Example 1:

Input: nums = [1,4,3,2]
Output: 4
Explanation: All possible pairings (ignoring the ordering of elements) are:
1. (1, 4), (2, 3) -> min(1, 4) + min(2, 3) = 1 + 2 = 3
2. (1, 3), (2, 4) -> min(1, 3) + min(2, 4) = 1 + 2 = 3
3. (1, 2), (3, 4) -> min(1, 2) + min(3, 4) = 1 + 3 = 4
So the maximum possible sum is 4.
Example 2:

Input: nums = [6,2,6,5,1,2]
Output: 9
Explanation: The optimal pairing is (2, 1), (2, 5), (6, 6). min(2, 1) + min(2, 5) + min(6, 6) = 1 + 2 + 6 = 9.
```

#### Soln
```
def arrayPairSum(self, nums: List[int]) -> int:
	s = sorted(nums)
	sum = 0
	for j in range(0, len(nums), 2):
		sum += s[j]
	return sum
```


## Two Sum II - Input array is sorted

Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Let these two numbers be numbers[index1] and numbers[index2] where 1 <= index1 < index2 <= numbers.length.

Return the indices of the two numbers, index1 and index2, added by one as an integer array [index1, index2] of length 2.

The tests are generated such that there is exactly one solution. You may not use the same element twice.

Your solution must use only constant extra space.


Constraints:

- 2 <= numbers.length <= 3 * 104
- -1000 <= numbers[i] <= 1000
- numbers is sorted in non-decreasing order.
- -1000 <= target <= 1000
- The tests are generated such that there is exactly one solution.

### Examples
```
Example 1:

Input: numbers = [2,7,11,15], target = 9
Output: [1,2]
Explanation: The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2. We return [1, 2].
Example 2:

Input: numbers = [2,3,4], target = 6
Output: [1,3]
Explanation: The sum of 2 and 4 is 6. Therefore index1 = 1, index2 = 3. We return [1, 3].
Example 3:

Input: numbers = [-1,0], target = -1
Output: [1,2]
Explanation: The sum of -1 and 0 is -1. Therefore index1 = 1, index2 = 2. We return [1, 2].
```

#### Soln

You'll need two pointers .. 

```left=0 and right=len-1```