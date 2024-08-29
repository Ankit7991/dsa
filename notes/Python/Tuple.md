# Tuple

## Task 1: Creating a Tuple
my_tuple = '1', '2', '3', 'apple', 'banana'

print(my_tuple)

## Task 2: Accessing Elements in a Tuple
print(my_tuple[0], my_tuple[-1])

- or

first, *_, last = my_tuple 🤩
print(first, last)

## Task 3: Slicing a Tuple

~~sliced_tuple = my_tuple.slice(0, 2)~~

sliced_tuple = my_tuple[1:4]

print(sliced_tuple)


## Task 4: Tuple Immutability

my_tuple[2] = 'orange' 😲

### my_tuple[2] = 'orange' Causes ❌ Error
---------------------------------------------------------------------------
TypeError                                 Traceback (most recent call last)
<ipython-input-9-f1a936fa3bf5> in <cell line: 3>()
      1 ## Task 4: Tuple Immutability
      2 
----> 3 my_tuple[2] = 'orange'

TypeError: 'tuple' object does not support item assignment

## Task 5: Tuple Concatenation

new_tuple = my_tuple + ("orange", "grape")
print(new_tuple)

## Task 6: Tuple Repetition

repeated_tuple = my_tuple * 3

print(repeated_tuple)

## Task 7: Tuple Length

print (len(my_tuple))
print (len(repeated_tuple))


## Task 8: Tuple Membership

print(True if 'apple' in my_tuple else False)


## Task 9: Nested Tuples

nested_tuple = ('a', 'b', (1,2,3), 'c')

inner_tuple = None
for el in nested_tuple:
  if type(el) == tuple:
    inner_tuple = el
    break

print(inner_tuple)
print(inner_tuple[1])

## Task 10: Tuple Unpacking

a, b,  c, d, e = my_tuple

print(a, b, c, d, e)

## Task 11: Converting a Tuple to a List

temp_array = list(my_tuple)

print(type(temp_array))


## Continuing Task 11:
- Task 11: Converting a Tuple to a List
- Final Task

temp_array[1] = 'ankit'
new_tuple = tuple(temp_array)
print(new_tuple, my_tuple)