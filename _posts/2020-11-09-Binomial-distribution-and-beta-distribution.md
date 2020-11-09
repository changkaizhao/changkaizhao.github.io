---
layout: post
title: '二项分布与Beta分布'
subtitle: '机器学习之概率基础一'
date: 2020-11-09
categories: 技术
cover: 'http://www.digitbrain.science/images/ml_tutorial/cover01.png'
tags: machinelearning bayes binomial beta distribution conjugacy
---

**投硬币**

投硬币游戏中，会产生两种结果：***正面***和***背面***，可以用随机变量$$x$$表示。因此$$x\in\{0,1\}$$，表示抛硬币结果不是正面就是反面。其中$$0$$表示***正面***，$$1$$表示***背面***。


**saveDataToTFRecord.py**



<pre><code class="language-python">
#Save numpy data to tfrecord

import numpy as np
import tensorflow as tf
</code></pre>


## Load data from tfrecord via TFSlim data pipeline

**loaddatafromtfrecord.py**

