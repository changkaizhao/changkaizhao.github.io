---
layout: post
---

This tutorial shows how to save numpy array to `tfrecord` file a tensorflow dataset format, and load numpy array from tfrecord with `TFSlim` dataset pipeline.

***!!! `TFSLIM` is deprecated from tensorflow r1.9***

## Save numpy array to tfrecord 

**saveDataToTFRecord.py**

```
#Save numpy data to tfrecord

import numpy as np
import tensorflow as tf

#Generate Test data
# a float array and int array each with shape (2,2,2)

f_array = np.array([[[1., 2.],
                     [3., 4.]],

                    [[5., 6.],
                     [7., 8.]]], dtype=np.float)

i_array = np.array([[[10, 11],
                     [12, 13]],

                    [[14, 15],
                     [16, 17]]], dtype=np.int64)



#we have to reshape array to 1-D array before saving
f_array = np.reshape(f_array, [2*2*2,])
i_array = np.reshape(i_array, [2*2*2,])


output_filename = "/Development/tensorflow/tensorflowTest/dataloadTest/" \
                  "testdata.tfrecord"

writer = tf.python_io.TFRecordWriter(output_filename)


def float_feature(value):
    return tf.train.Feature(float_list=tf.train.FloatList(value=value))

def int64_feature(value):
    return tf.train.Feature(int64_list=tf.train.Int64List(value=value))

feature_dict = {
    'i_array': int64_feature(i_array),
    'f_array': float_feature(f_array),
}

example = tf.train.Example(features=tf.train.Features(feature=feature_dict))

writer.write(example.SerializeToString())
```

## Load data from tfrecord via TFSlim data pipeline

**loaddatafromtfrecord.py**


```
#Load data from TFRecord via TFSlim data pipeline

import tensorflow as tf
from tensorflow.contrib import slim

data_file = "/Development/tensorflow/tensorflowTest/dataloadTest/" \
                  "testdata.tfrecord"
reader = tf.TFRecordReader

keys_to_features = {
    'i_array' : tf.FixedLenFeature([2*2*2], dtype=tf.int64),
    'f_array' : tf.FixedLenFeature([2*2*2], dtype=tf.float32)
}

items_to_handlers = {
    'i_array' : slim.tfexample_decoder.Tensor('i_array'),
    'f_array' : slim.tfexample_decoder.Tensor('f_array')
}

items_to_descriptions = {
    'i_array' : 'a 2X2X2 int64 array',
    'f_array' : 'a 2X2X2 float32 array'
}
decoder = slim.tfexample_decoder.TFExampleDecoder(keys_to_features,
                                                  items_to_handlers)

dataset = slim.dataset.Dataset(data_sources=data_file, reader=reader,
                               decoder=decoder, num_samples=2,
                               items_to_descriptions=items_to_descriptions)

provider = slim.dataset_data_provider.DatasetDataProvider(
    dataset, num_readers=1, common_queue_capacity=100, common_queue_min=4)

[i_array, f_array] = provider.get(['i_array', 'f_array'])

# we should reshape again ,to restore original shape of array
i_array = tf.reshape(i_array, [2, 2, 2])
f_array = tf.reshape(f_array, [2, 2, 2])

b_iarray, b_farray = tf.train.batch([i_array, f_array], batch_size=1,
                                    num_threads=1, capacity=5)

batch_queue = slim.prefetch_queue.prefetch_queue([b_iarray, b_farray],
                                                 capacity=1)

sess = tf.Session()
thread = tf.train.start_queue_runners(sess=sess)

iarray, farray = batch_queue.dequeue()
ia, fa = sess.run([iarray, farray])

print(ia[0])
print(fa[0])
```

 will print results as below:
 
 ```
 [[[10 11]
  [12 13]]

  [[14 15]
   [16 17]]]
   
 [[[1. 2.]
   [3. 4.]]

  [[5. 6.]
   [7. 8.]]]
 ```
 
 we can see the results are all expected!