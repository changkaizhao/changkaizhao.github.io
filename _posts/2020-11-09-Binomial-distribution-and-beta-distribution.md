---
layout: post
title: '二项分布与Beta分布'
subtitle: '机器学习概率基础一'
date: 2020-11-09
categories: 技术
cover: 'http://www.digitbrain.science/images/ml_tutorial/cover01.png'
tags: machinelearning bayes binomial beta distribution
---

This tutorial shows how to save numpy array to `tfrecord` file a tensorflow dataset format, and load numpy array from tfrecord with `TFSlim` dataset pipeline.

***❗️ `TFSLIM` is deprecated from tensorflow r1.9***

## Save numpy array to tfrecord 

**saveDataToTFRecord.py**


<pre><code class="language-python">
#Save numpy data to tfrecord

import numpy as np
import tensorflow as tf
</code></pre>


## Load data from tfrecord via TFSlim data pipeline

**loaddatafromtfrecord.py**


 will print results as below:
 

 <pre><code class="language-python">
 [[[10 11]
  [12 13]]

  [[14 15]
   [16 17]]]
   
 [[[1. 2.]
   [3. 4.]]

  [[5. 6.]
   [7. 8.]]]
   </code></pre>

 
 we can see the results are all expected!