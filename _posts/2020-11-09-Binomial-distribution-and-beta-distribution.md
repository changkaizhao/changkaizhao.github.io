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

投硬币游戏中，会产生两种结果：***正面***和***背面***，可以用随机变量$$x$$表示。因此$$x\in\{0,1\}$$，表示抛硬币结果不是正面就是反面。
## Save numpy array to tfrecord 

**saveDataToTFRecord.py**

$$\begin{tikzpicture}[scale=1.0544]\small
\begin{axis}[axis line style=gray,
	samples=120,
	width=9.0cm,height=6.4cm,
	xmin=-1.5, xmax=1.5,
	ymin=0, ymax=1.8,
	restrict y to domain=-0.2:2,
	ytick={1},
	xtick={-1,1},
	axis equal,
	axis x line=center,
	axis y line=center,
	xlabel=$x$,ylabel=$y$]
\addplot[red,domain=-2:1,semithick]{exp(x)};
\addplot[black]{x+1};
\addplot[] coordinates {(1,1.5)} node{$y=x+1$};
\addplot[red] coordinates {(-1,0.6)} node{$y=e^x$};
\path (axis cs:0,0) node [anchor=north west,yshift=-0.07cm] {0};
\end{axis}
\end{tikzpicture}$$

<pre><code class="language-python">
#Save numpy data to tfrecord

import numpy as np
import tensorflow as tf
</code></pre>


## Load data from tfrecord via TFSlim data pipeline

**loaddatafromtfrecord.py**

