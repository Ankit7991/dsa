# Greedy Approach

- First I have used greedy approach in Djkstra (dike-struh) algorighm to find the shortest path.

- however it's not limited to that

- We can use it in 
	- Scheduling (Eg. which task finished first)
	- Transaction handling (Eg. To provide change efficiently)
		- Eg. in lemonade task .. on leetcode

- Always look for
	- Optimal subtraction
	- 

## Problem 1

- https://leetcode.com/problems/lemonade-change/description/
	- Here We give change from highest denominator to lowest that's why it's greedy approach

## Problem 2
- https://leetcode.com/problems/maximum-distance-in-arrays/
	- The question ask to find maximum distance between two numbers of any array in list,
	- And array in list is sorted .. 
	- Because child arrays are sorted .. we can use min (first element) and max (last elemtn) and ignore all the other elements .. (IGNORE) .. kinda Greedy!