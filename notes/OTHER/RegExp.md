# Regular Expressions

## \b
## Word boundary ( \b )

find : **test**

words:
	da test
	test is 
	this is tasty

Note: full word match is needed

### Soln

```regexp '\\btest\\b'```

or 
```regexp '\\btest'```
to find all the words starting with test