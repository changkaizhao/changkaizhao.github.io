---
layout: post
title: Nextcloud(Docker)部署教程
tags: 树莓派4 nextcloud docker
---

> 作者：Roby
# Nextcloud(Docker)部署教程

## 一、介绍

这个教程主要介绍如何通过**树莓派4**+**ubuntu**来配置**NextCloud**私有云服务。

### 需要具备的知识：

* Linux的简单命令行操作
* 网络和服务器的一些基本概念

### 需要具备的硬件：

* 一台已经连入本地**LAN**的**树莓派4**机器，并且已经安装好**Ubuntu**(本教程使用的系统，其他系统例如**Raspberry Pi OS** 也可以)
* 一台**路由器**，可以具备设置DDNS，路由转发或者DMZ功能。
* 最好给**树莓派**外接一个大容量硬盘（本教程使用一个4T的西数硬盘）

## 二、配置路由器

### 动态绑定域名

由于家庭用网络的IP地址并不是静态IP，IP改变后用户就无法通过外网访问内网服务，这个问题可以通过**动态域名解析**(**DDNS**)解决。 要设置**DDNS**就需要有一个域名。

可以在[花生壳](https://hsk.oray.com/)申请一个免费的二级域名。注册后直接进入控制台就可以看到了。

域名大概长这个样子：`**********.qicp.vip`

有了域名后我们就要动态的绑定到我们的IP。以我使用的**小米路由4A千兆版**为例，进入路由管理界(`miwifi.com`)面后执行如下操作：

> 点击**高级设置**\
> 点击**DDNS**\
> 点击添加服务按钮\
> 选择DNS服务商本教程是花生壳，用户名和密码为花生壳的用户名和密码，主机名填写申请到的二级域名,检查时间和强制更新时间可以任意设置本教程填写10分钟和1小时。 点击确定

现在家庭的**IP**地址已经动态的绑定到域名上，一旦**IP**有变化，路由器会通知DNS服务器改变域名绑定的**IP**，这样就保证外网可以通过域名来访问内网了。

### 设置路由转发或者DMZ

如果路由器有**DMZ**功能建议打开**DMZ**，直接将**DMZ**的**IP**设为树莓派的**本地 IP**，这样外网进来的请求全部转发给树莓派去处理，本教程使用**DMZ**的方式。 其他方法也可以通过设置路由器端口转发方式将外部端口映射到树莓派的本地端口，有些路由器的防火墙会将所有端口的外网访问禁止，就需要ROOT路由器打开端口，遇到这种情况比较折腾，本教程就不讨论了。

同样方式进入路由管理界面后，打开DMZ方法如下：

> 点击高级设置\
> 点击路由转发\
> 打开DMZ开关\
> 将树莓派的本地IP最后的**三位数**填入\
> 点击应用

获取树莓派的**IP**方法，`ssh`进入树莓派后在终端界面执行如下：

```
  $ ip addr show
```

如果链接的有线网线，可以在`eth0`项里看到`inet`的值,无线连接在`wlan0`里查看`inet`的值。

⚠️最好也通过路由器把树莓派的**本地 IP** 静态分配，这样树莓派的本地IP就不会在设配重启后随意改变了。

## 三、部署Nextcloud

终于进入正题了😄

### 3.1 准备工作：

* 树莓派上的操作系统安装好**docker**
* 将外置硬盘链接树莓派并挂载

#### docker安装可以参考[官网教程](https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository)

#### 挂载外接硬盘

本例子以西数的HDD为例，将硬盘通过sata转USB线链接树莓派后分别执行格式化和挂载操作。

先查询一下外接的硬盘名字：

```
   $ lsblk

    NAME        MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
    ...
    sda           8:0    0  3.7T  0 disk 
    mmcblk0     179:0    0 59.5G  0 disk 
    ├─mmcblk0p1 179:1    0  256M  0 part /boot/firmware
    └─mmcblk0p2 179:2    0 59.2G  0 part /
```

可以看到我的设备名称是`sda`.

格式化设备文件格式为**ext4**：

```
  $ kfs.ext4 /dev/sda
```

将设备挂载到系统根目录下的`/mnt/data`目录

```
  $ mount /dev/sda  /mnt/data
```

这样就可以通过挂载目录`/mnt/data`对外接硬盘存取数据。

### 3.2 新建docker网络

当然用默认网络也可以。

```
 $docker network create --driver bridge nextcloud-net 
```

上面命令新建了一个名字为`nextcloud-net`的桥接网络。之后的数据库和nextcloud服务都会部署在这个网络。

### 3.3 安装数据库(postgresql)

通过`docker`安装数据库，可以选自己熟悉的，例如`mysql` 等。这里以`postgresql`为例。

新建一个**postgres**数据库容器并运行启动，记住密码。

```
docker run --name postgres --network nextcloud-net  -v /home/usr/postgres/data:/var/lib/postgresql/data -e POSTGRES_PASSWORD=****** -d postgres
```

### 3.4 创建SSL证书

在外网访问时一定要通过加密的https协议传输数据才会安全，开启https需要一个证书，一般情况这个证书通过第三方认证可信机构颁发不过大部分需要付费，其实也可以免费自己做一个证书。

在用户目录创建一个`ssl`文件夹来存证书

```
  $ mkdir /home/usr/ssl
```

先创建一个密钥， 可以命名为`nextcloud.key`

```
 $ openssl genrsa -des3 -out /home/usr/ssl/nextcloud.key 2048
```

创建密钥过程中可能需要输入`passphrase`,如果输入了就要通过下面办法去掉密钥`passphrase`

```
$ mv /home/usr/ssl/nextcloud.key /home/usr/ssl/nextcloud.key.backup
$ openssl rsa -in /home/usr/ssl/nextcloud.key.backup -out /home/usr/ssl/nextcloud.key
```

创建证书：

```
$ openssl req -x509-new -nodes -key /home/usr/ssl/nextcloud.key -sha256-days 1825-out /home/usr/ssl/nextcloud.pem
```

这样就有了自己签发的证书`nextcloud.pem`, 这个文件可以以后下载下来到自己的电脑，手机等设备，对其进行信任操作。

### 3.5 制作Dockerfile

新建一个文件夹存放`Dockerfile`和`setssl.sh`脚本文件。

```
  $ mkdir /home/usr/dockerfile
```

在文件里面创建一个`setssl.sh`脚本文件内容如下，注意里面的`SSLCertificateFile` 和 `SSLCertificateKeyFile`的文件名称一定要设置为之前生成的`key`和`pem`文件的名称

```
# setssl.sh
# USAGE: setssl.sh <domain> <email>

echo 'SSLCipherSuite EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH
SSLProtocol All -SSLv2 -SSLv3
SSLHonorCipherOrder On
Header always set Strict-Transport-Security "max-age=63072000; includeSubdomains"
Header always set X-Frame-Options DENY
Header always set X-Content-Type-Options nosniff
SSLCompression off
SSLSessionTickets Off' > /etc/apache2/conf-available/ssl-params.conf
echo "<IfModule mod_ssl.c>
        <VirtualHost _default_:443>
                ServerAdmin $2
                ServerName $1
" > /etc/apache2/sites-available/default-ssl.conf
echo '
                DocumentRoot /var/www/html

                ErrorLog ${APACHE_LOG_DIR}/error.log
                CustomLog ${APACHE_LOG_DIR}/access.log combined

                SSLEngine on

                SSLCertificateFile    /etc/ssl/nextcloud/nextcloud.pem
                SSLCertificateKeyFile /etc/ssl/nextcloud/nextcloud.key

                <FilesMatch "\.(cgi|shtml|phtml|php)$">
                                SSLOptions +StdEnvVars
                </FilesMatch>
                <Directory /usr/lib/cgi-bin>
                                SSLOptions +StdEnvVars
                </Directory>
        </VirtualHost>
</IfModule>' >> /etc/apache2/sites-available/default-ssl.conf
a2enmod ssl >/dev/null
a2ensite default-ssl >/dev/null
a2enconf ssl-params >/dev/null
```

编写Dockerfile内容如下：

```
FROM nextcloud
COPY /home/usr/dockerfile/setssl.sh /usr/local/bin/
RUN /usr/local/bin/setssl.sh *******.qicp.vip yourname@mail.com
```

运行\`docker build\`\` 镜像

```
$ cd /home/usr/dockerfile
$ docker build --tag nextcloud_ssl .
```

这样就有了名字为`nextcloud_ssl`的镜像，通过这个镜像创建容器并运行。

```
docker run --name nextcloud -d -p 443:443 -v /mnt/data:/data -v /home/usr/nextcloud:/var/www/html -v /home/usr/ssl:/etc/ssl/nextcloud --network nextcloud-net   nextcloud_ssl
```

启动后，就可以在浏览器输入你的域名`https://*********.qicp.vip` 来访问你的`nextcloud`服务。

### 3.6 配置nextcloud开始页面

看到开始欢迎页面后就可以设置了。

输入一个用户名和密码。最好设置的强一点密码，毕竟你的数据很宝贵😄。 在配置数据库的选项卡选在`postgres`选项卡，根据你自己的数据库服务选择。

> 数据库用户名填写 `postgres`   
>
> 密码 填写之前运行数据库容器时设置的密码 
>
> 数据库名称填写 `postgres` 
>
> localhost 填写 `postgres`

点击**下一步**继续就好了。

进入页面后点击头像->点击应用->点击已禁用的应用->将**External storage support**启用->点击头像-> 点击设置-> 点击左侧菜单栏的外部存储-> 在一个编辑行中的**外部存储**选择列表选择 **本地** -> **目录名称**随便起个名字例如*drive* ->**配置**输入`/data`->点击最右侧**对号**添加。 这样在文件应用中就可以看到名字叫**drive**的文件夹，这个文件夹内的数据都会存储到外接的硬盘里。

🎉**恭喜你终于可以看到最后的画面了**。

最后你可以在手机安装**Nextcloud App** 操作文件。还可以在电脑端下载 [nextcloud sync client](https://nextcloud.com/install/#install-clients)同步程序将电脑的文件夹和`nextcloud`的文件夹进行同步。

**Nextcloud**有大量插件应用可以使用，感兴趣可以慢慢探索。
