# import
import numpy as np
import pprint as pp

arr = np.arange(5)
pp.pprint(arr)
pp.pprint(np.sin(arr)) # calculate sin of all the elements  

pp.pprint(np.log(arr)) # calculate the log of all the elements (can't divide by zero)

# np.eye(num)
# num -> how many rows
# the 1 will appears in [0, 0], [1, 1], [2, 2] ...
eye_array = np.eye(4)
pp.pprint(eye_array)

# method chaining
# create an array then reshape it
arr = np.arange(9).reshape(3, 3)
pp.pprint(arr)

pp.pprint(np.triu(arr))
pp.pprint(np.tril(arr))
pp.pprint(np.diag(arr))
pp.pprint(arr.T) # View of the transposed array.