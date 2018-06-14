---
layout: post
title: Getting projection matrix from camera's intrinsics 
---

> 
> Author：Roby
> 
> Abstract：Projection matrix is essential for openGL applications,esspecially for AR applications。Deriving projection matrix from camera's intrinsics is a critical procedure for AR application to make virtual and physical objects matching perfectly.


**海马体**`CA3`区在学习和记忆过程中起着关键作用。`CA3`区的神经网络的一个最重要的功能是它可以检索之前存储在记忆中的不完整或降级版本，也就是被人熟知的**模式生成**(*pattern completion*)。人们普遍认为`CA3`区神经网络内的锥形神经元细胞之间的突触 (重复的`CA3-CA3`突触)，在模式生成过程中起到了关键作用，但其内部运作机理目前仍然不清晰。最近的一篇研究文章题为“**Synaptic Connectivity Motifs Contribute to Efficient Memory Retrieval in Hippocampus**”于2016年9月9日发表在**Science**，作者*Jose Guzman, Alois Schlögl, Michael Frotscher*  和 *Peter Jonas*通过结合**功能连接分析**和**网络建模**来研究上述运作机理。他们的研究结果表明，`CA3`区神经网络锥形神经元之间的突触连接的方式对**模式生成**效率的影响极其显著。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  

![突触连接](https://raw.githubusercontent.com/changkaizhao/changkaizhao.github.io/master/images/2016-9-13/1.jpg)
`CA3`区锥形**神经元对**突触连接重建图。图中为由单个突触连接的**神经元对**的显微图像。NeuroscienceNews.com image is adapted from the IST Austria press release.



早前对于**海马体**构成的理论认为`CA3`区的神经网络内部的神经元也是高度相互连接的。奥地利科技学院的神经科学家通过同时监控8个相互连接的神经元之间的电信号传导的方法来检验早前的假设。经过实验后，结果让人很震惊,首先他们发现此区域中的神经元连接是稀疏的，平均连接概率约为`1%`。这对于之前死板地认为神经网络的神经元是高度连接的结论提出了极大的挑战。令人更加惊讶的是，网络内部神经元的连接也不是随机的，相对于随机神经网络其内部神经元连接更多地呈现某种**样式**(*motifs*)。因此，**海马体**`CA3`区的神经元连接结构某种程度上让人联想到社交网络中的*"小世界"*(small world)结构。最后，作者发现这个区域中的两个神经元间的突触连接仅有`1`到`2`个。要知道在**新大脑皮层**(*neocortex*)中的神经元之间刺激性突触连接个数远大于`2`个。

**这些极特殊的突触连接方式具有什么功能，尤其对模式生成有什么关系？**为了回答这个问题，*Peter Jonas*和他的团队根据他们的实验发现搭建了一个`CA3`神经网络模型。跟之前的研究不同，这次构建的神经网络是全尺寸的，因此老鼠**海马体**内`330，000`个`CA3`区的神经元全部被模拟出来。这个建模方式占用了大量奥地利科技学院计算机集群的计算能力，同时也获得了学院科学技术服务部门*“科学计算”*的大力支持。作者发现跟真实大脑一样连接率`1%`全尺寸的神经网络模型确实能够进行**模式生成**的网络计算。此外，在特定条件下，出现的连接动机增加了神经网络的性能。最后，基于1到2个神经突触连接方式设计的模型看起来对于**模式生成**也是很有帮助，显然因为信息在神经网络中传递的冗余被减小。这样宏观连接(例如**样式** *motifs*)和微观连接(例如**连接属性** *properties of connection*)对于`CA3`区神经网络的**模式生成**都起到了作用。**“实验结果证明了*Hopfield*的名言“*只有亲手建造过，才会理解其原理*” 在神经网络关键问题的研究中是一个成功的方法论” *Peter Jonas*_** 说，其领导整个细胞神经科学小组。