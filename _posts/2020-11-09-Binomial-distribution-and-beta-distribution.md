---
layout: post
title: '二项分布与Beta分布'
subtitle: '机器学习之概率基础一'
date: 2020-11-09
categories: 技术
cover: 'http://www.digitbrain.science/images/ml_tutorial/cover01.png'
tags: machinelearning bayes binomial beta distribution conjugacy
---

投硬币
---

投硬币游戏中，会产生两种结果：**正面**和**背面**，可以用随机变量$$x$$表示。因此$$x\in\{0,1\}$$，表示抛硬币结果不是正面就是反面。其中$$0$$表示**正面**，$$1$$表示**背面**。

我们知道一个均匀的投硬币随机投出出现正面的概率为$$0.5$$, 如果硬币不够均匀，则这个概率值会改变。可定义投出正面的概率为$$\mu$$，投出反面的概率为$$1-\mu$$, $$0\le\mu\le1$$。

$$p(x=1\mid\mu)=\mu$$  

$$p(x=0\mid\mu)=1-\mu$$  


因此，$$x$$的概率分布可表示为**伯努利分布**:  

$$Bern(x\mid\mu)=\mu^x(1-\mu)^{1-x}$$


其**期望**和**方差**分别为:  

$$\mathbb{E}[x]=\mu$$  

$$var[x]=\mu(1-\mu)$$  











<pre><code class="language-python">
#Save numpy data to tfrecord

import numpy as np
import tensorflow as tf
</code></pre>


## Load data from tfrecord via TFSlim data pipeline

**loaddatafromtfrecord.py**

