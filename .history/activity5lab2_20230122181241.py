# import
import numpy as np
import pprint as pp

arr = np.arange(5)
pp.pprint(arr)
pp.pprint(np.sin(arr)) # calculate sin of all the elements  

pp.pprint(np.log(arr)) # calculate the log of all the elements (can't divide by zero)

# np.eye(num)
# num -> how many rows
# the 1 will appears in [0, 
eye_array = np.eye(4)
pp.pprint(eye_array)