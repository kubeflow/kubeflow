# Example Notebook Servers

Below is an example of using pyspark kernel in non-client mode. 

*It can also be used to execute queries in client mode, to overcome envoy-proxy not able to communicate with driver refer to the workaround [here](https://github.com/kubeflow/kubeflow/issues/4306#issuecomment-719162698).* 


## Non-Client mode

In this mode, spark query is executed within the notebook server.
```python
from pyspark.sql import SparkSession
import random

spark = SparkSession \
    .builder \
    .appName("Python Spark SQL basic example") \
    .getOrCreate()

num_samples = 5000000

def inside(p):     
  x, y = random.random(), random.random()
  return x*x + y*y < 1

count = spark.sparkContext.parallelize(range(0, num_samples)).filter(inside).count()

pi = 4 * count / num_samples
print(pi)

```
