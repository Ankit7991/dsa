# Some Algorithms 💎

## Knuth-Morris-Pratt (KMP) algorithm 🥽

For finding index of substring

### Normal Approach
```
class Solution:
    def strStr(self, haystack: str, needle: str) -> int:
        # return haystack.find(needle)
        
        for i in range(len(haystack) - len(needle)):
            cnt = 0
            
            # while cnt+i < len(haystack):
            while cnt < len(needle) and haystack[i+cnt] == needle[cnt]:
                cnt += 1
            
            if cnt == len(needle): return i
        
        return -1
                
```

### KMP algorithm
The Knuth-Morris-Pratt (KMP) algorithm efficiently finds the first occurrence of a substring (`needle`) within a string (`haystack`).

It achieves linear time complexity \(O(N + M)\), 
	where 
	\(N\) is the length of the `haystack` 
	and \(M\) is the length of the `needle`.

### KMP algorithm

```
class Solution:
    def strStr(self, haystack: str, needle: str) -> int:
        if not needle:
            return 0
        
        # Compute the LPS array
        lps = self.computeLPS(needle)
        i = j = 0
        while i < len(haystack):
            if haystack[i] == needle[j]:
                i += 1
                j += 1
            
            if j == len(needle):
                return i - j
            elif i < len(haystack) and haystack[i] != needle[j]:
                if j != 0:
                    j = lps[j - 1]
                else:
                    i += 1
        return -1
    
    def computeLPS(self, needle: str) -> list:
        lps = [0] * len(needle)
        length = 0
        i = 1
        
        while i < len(needle):
            if needle[i] == needle[length]:
                length += 1
                lps[i] = length
                i += 1
            else:
                if length != 0:
                    length = lps[length - 1]
                else:
                    lps[i] = 0
                    i += 1
        
        return lps

```
