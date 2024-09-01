# Multiple Condition Required

Like some queries work with where clause 

And Give simple and neat answer

# Multiple Condition Required
Some are tricky .. like

- Give me users who has one active challenge
	- this can be done with *WHERE* clause
- With user who has only one challenge
	- this need grouping and removing with more count
	
# Multiple Condition Required
And so,

# Multiple Condition Required
Doing one will meddle with another.

# Multiple Condition Required
So we can create separate queries and union or

# Multiple Condition Required
There are some other ways i'vent learned or mentioned in this 
section

later ..

## Primary Department for Each Employee
https://leetcode.com/problems/primary-department-for-each-employee/description/?envType=study-plan-v2&envId=top-sql-50

Now,

Table: Employee

+---------------+---------+
| Column Name   |  Type   |
+---------------+---------+
| employee_id   | int     |
| department_id | int     |
| primary_flag  | varchar |
+---------------+---------+

Employees can belong to multiple departments. When the employee joins other departments, they need to decide which department is their primary department. Note that when an employee belongs to only one department, their primary column is 'N'.

Write a solution to report all the employees with their primary department. For employees who belong to one department, report their only department.

Return the result table in any order.

The result format is in the following example.

### Example

Input: 
Employee table:
+-------------+---------------+--------------+
| employee_id | department_id | primary_flag |
+-------------+---------------+--------------+
| 1           | 1             | N            |
| 2           | 1             | Y            |
| 2           | 2             | N            |
| 3           | 3             | N            |
| 4           | 2             | N            |
| 4           | 3             | Y            |
| 4           | 4             | N            |
+-------------+---------------+--------------+
Output: 
+-------------+---------------+
| employee_id | department_id |
+-------------+---------------+
| 1           | 1             |
| 2           | 1             |
| 3           | 3             |
| 4           | 3             |
+-------------+---------------+
Explanation: 
- The Primary department for employee 1 is 1.
- The Primary department for employee 2 is 1.
- The Primary department for employee 3 is 3.
- The Primary department for employee 4 is 3.


### Solution




select employee_id, department_id
from Employee
group by employee_id
having count(employee_id) = 1

### Solution
select employee_id, department_id
from Employee
where primary_flag = 'Y'






### Solution



union

### Solution
select employee_id, department_id
from Employee
where primary_flag = 'Y'
union
select employee_id, department_id
from Employee
group by employee_id
having count(employee_id) = 1
