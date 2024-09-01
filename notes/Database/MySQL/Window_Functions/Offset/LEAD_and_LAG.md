LEAD is to get next nth value for each row.
LAG is to get previous nth value for each row.

# LEAD

	select
		sale,
		LEAD(sale, 1) over (partition / order) as tomorrowsSale
		...

# LAG

	SELECT 
		id,
		num,
		LAG(num, 1) OVER (PARTITION / ORDER) AS prev_num
	FROM Logs;