# Ranking Window Functions

## ROW_NUMBER
To rank between **single** column

## DENSE_RANK
To rank between **multiple** columns

### EG.
```
dense_rank() over (order by lat, lon) rank

or

dense_rank() over (partition by lat order by lat, lon) rank
```