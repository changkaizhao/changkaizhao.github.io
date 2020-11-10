---
layout: post
title: '二项分布与Beta分布'
subtitle: '机器学习之概率基础一'
date: 2020-11-09
categories: 技术
cover: 'http://www.digitbrain.science/images/ml_tutorial/cover01.png'
tags: 贝叶斯 共轭先验 二项分布 Beta分布
---

## 投硬币

投硬币游戏中，会产生两种结果：**正面**和**背面**，可以用随机变量$$x$$表示。因此$$x\in\{0,1\}$$，表示抛硬币结果不是正面就是反面。其中$$0$$表示**正面**，$$1$$表示**背面**。

我们知道一个均匀的硬币随机投出**正面**的概率为$$0.5$$, 如果硬币不够均匀，则这个概率值会改变。可定义投出**正面**的概率为$$\mu$$，投出**背面**的概率为$$1-\mu$$, $$0\le\mu\le1$$。

$$p(x=1\mid\mu)=\mu$$  

$$p(x=0\mid\mu)=1-\mu$$  


因此，$$x$$的概率分布可表示为**伯努利分布(Bernoulli distribution)**:  

$$Bern(x\mid\mu)=\mu^x(1-\mu)^{1-x}$$


其**期望**和**方差**分别为:  

$$\mathbb{E}[x]=\mu$$  

$$var[x]=\mu(1-\mu)$$  



## 参数估计

我们把投硬币的游戏玩$$N$$次，就得到了$$N$$个样本数据$$\mathcal{D}$$.  
例如: 当$$N=10$$即进行了10次抛硬币,但是每次抛硬币出现**正面**的概率$$\mu$$是未知的，我们需要通过这10次抛硬币的数据样本来估计$$\mu$$值。样本数据$$\mathcal{D}$$如下:   


| $$n$$ | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|:-----:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| $$x$$ | 0 | 1 | 1 | 0 | 0 | 0 | 1 | 0 | 1 | 1 |


 $$p(\mathcal{D}\mid\mu)=\prod_{n=1}^N\mu^{x_n}(1-\mu)^{1-x_n}$$ 

 $$\mathrm{ln}p(\mathcal{D}\mid\mu)=\sum_{n=1}^N\mathrm{ln}p(x_n\mid\mu)=\sum_{n=1}^N\{x_n\mathrm{ln}\mu+(1-x_n)\mathrm{ln}(1-\mu)\}$$


 $$\mu_{\mathrm{ML}}=\frac{1}{N}\sum_{n=1}^Nx_n$$

 $$\mu_{\mathrm{ML}}=\frac{m}{N}$$


## 二项分布
x | y |1
--|--|--
y | 1|2


## Beta分布

<pre><code class="language-python">
#Save numpy data to tfrecord

import numpy as np
import tensorflow as tf
</code></pre>


