# Window Functions (count)


### Question 1. Last Person To Fit In Bus

	Table: Queue

	+-------------+---------+
	| Column Name | Type    |
	+-------------+---------+
	| person_id   | int     |
	| person_name | varchar |
	| weight      | int     |
	| turn        | int     |
	+-------------+---------+

### Question 1. Last Person To Fit In Bus

	There is a queue of people waiting to board a bus. 
	
	However, the bus has a weight limit of 1000 kilograms, 
	so there may be some people who cannot board.

### Question 1. Last Person To Fit In Bus

	Write a solution to find the person_name of the last person 
	that can fit on the bus without exceeding the weight limit. 
	
	The test cases are generated such that the first person does not exceed the weight limit.


#### Solution

	select
        person_id,
        person_name,
		-- need to find comulative sum
        turn
    from Queue

#### Solution

	select
        person_id,
        person_name,
        sum(weight) over (order by turn asc) as thesum,
        turn
    from Queue


#### Solution
	select person_name from (
		select
			person_id,
			person_name,
			sum(weight) over (order by turn asc) as thesum,
			turn
		from Queue
	) temp
	where thesum <= 1000
	order by turn desc limit 1

