---
layout: post
title: React + Typescript + Webpack 开发环境配置
tags: react typescript webpack
---

> 作者：Roby

# 一、 新建空项目

新建一个项目文件夹例如叫`ProjectA`,然后在里面新建两个文件夹如下:  
 • build: 项目的构建目录.  
 • src: 源码目录.

> `$ npm init `

生成`package.json`

```json
{
    "name": "my-app",
    "version": "0.0.1"
}
```

新建一个 `index.html` 在 `src` 文件夹:

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>My app</title>
    </head>
    <body>
        <div id="root"></div>
    </body>
</html>
```

这个**html**模版会被**webpack**利用来生成构建项目。告诉**webpack**如何将**_react_**注入进来。

# 二、配置**react** 和 **TS**

```bash
npm install react react-dom
npm install --save-dev typescript
npm install --save-dev @types/react @types/react-dom
```

**TypeScript**通过 `tsconfig.json`文件来配置 ，新建一个`tsconfig.json`文件内容如下:

```json
{
    "compilerOptions": {
        "lib": ["dom", "dom.iterable", "esnext"],
        "allowJs": true,
        "allowSyntheticDefaultImports": true,
        "skipLibCheck": true,
        "esModuleInterop": true,
        "strict": true,
        "forceConsistentCasingInFileNames": true,
        "moduleResolution": "node",
        "resolveJsonModule": true,
        "isolatedModules": true,
        "noEmit": true,
        "jsx": "react",
        "paths": {
            "src/*": ["./src/*"]
        }
    },
    "include": ["src"]
}
```

**typescript**仅仅是被用来做类型检查，最终我们用**babel**做代码转译。所以在**ts**配置选项里仅设置它的类型检查，不做代码转译。如下：

• `lib`: 类型检查的库，只检查浏览器 DOM 和最新版本的**_ECMAscript_**  
• `allowJs`: 是否允许**_javascript_**被编译.  
• `allowSyntheticDefaultImports`: 类型检查允许默认`imports` 来自于没有默认`exports`的模块。
• `skipLibCheck`: 忽视类型检查对文件(`*.d.ts`)类型.  
• `esModuleInterop`: 与 Babel 的兼容性.  
• `strict`: 设置高级别类型检查. `true`, 表示项目运行在 `strict` 严格模式.  
• `forceConsistentCasingInFileNames`: Ensures that the casing of referenced file names is consistent during the type checking process.  
• `moduleResolution`: 用 `node`解决项目依赖  
• `resolveJsonModule`: 允许模块文件类型为 `.json`, 对于一些文件配置很有用.  
• `noEmit`: 编译过程是否禁止 **TypeScript** 生成 js 代码. 这里设置 `true` 是因为 **Babel** 帮我们转译 **JavaScript** 代码.  
• `jsx`: 是否支持 **JSX** 在 `.tsx` 文件中.  
• `paths`: 定义包的根路径，`ts`在索引包的时候就不需要 `../..`,可以直接从`src/pages/*`开始索引，对于复杂关系的索引会很干净。
• `include`: 需要 **TypeScript** 去检查的文件目录.我们项目指定 **src** 文件夹.

## 增加**react**根组件

新建一个 `index.tsx` 文件在 `src`文件夹. 最终会展示在 `index.html`里.

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
const App = () => <h1>My React and TypeScript App!</h1>;
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
```

我们已经新建了**react** 项目在 `strict mode` 下，并且注入到了`id` 为 `root`的 `div` 元素， .

# 三、配置**Babel**

我们项目要使用 **Babel** 去转译**react**和**TS**为 **JavaScript**.

```bash
npm install --save-dev @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript @babel/plugin-transform-runtime @babel/runtime
```

• `@babel/core`: **Babel** 核心库.
• `@babel/preset-env`: 环境插件， 可以让最新的 **JavaScript** 特性运行在老的浏览器上。`@babel/preset-react`: **REACT**转译插件， **Babel**可以将**React tsx jsx**代码转译为**JavaScript**.
• `@babel/preset-typescript`: **TS**转译插件， **Babel** 可以将**TypeScript** 代码转译为 **JavaScript**.
• `@babel/plugin-transform-runtime` 和 ` @babel/runtime`: 可以让**JS**代码使用 `async` 和`await` **JavaScript** 功能.

配置**Babel**配置文件
**Babel** 配置文件为 `.babelrc`. 配置文件告诉**Babel**使用哪些插件，新建一个如下：

```json
{
    "presets": [
        "@babel/preset-env",
        "@babel/preset-react",
        "@babel/preset-typescript"
    ],
    "plugins": [
        [
            "@babel/plugin-transform-runtime",
            {
                "regenerator": true
            }
        ]
    ]
}
```

# 四、添加**linting**

用**ESLint**检查代码格式和语法错误

```
npm install --save-dev eslint eslint-plugin-react eslint-plugin-react-hooks @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

• `eslint`: **ESLint** 核心.
• `eslint-plugin-react`: **React**的**lint**插件.
• `eslint-plugin-react-hooks`: **react hook** 的**lint** 插件.
• `@typescript-eslint/parser`: 可以检查**TypeScript** 代码
• `@typescript-eslint/eslint-plugin`: 标准检查规则对 **TypeScript** 代码.

配置 `.eslintrc.json` 文件，生成一个如下:

```json
{
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": ["@typescript-eslint", "react-hooks"],
    "extends": [
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "rules": {
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "react/prop-types": "off"
    },
    "settings": {
        "react": {
            "pragma": "React",
            "version": "detect"
        }
    }
}
```

# 五、添加**Webpack**

**Webpack**对前端项目内的所有模块(这里的模块指的是各个资源文件，包括`.json`, `.ts`, `.js`, `.png`, `.svg`等等)`进行打包生成css`, `js`和`images`。

安装**webpack**

```bash
npm install --save-dev webpack webpack-cli @types/webpack
```

安装**webpack server** 用来本地启动打包后的项目

```bash
npm install --save-dev webpack-dev-server @types/webpack-dev-server
```

**babel-loader**, 可以让 **Babel** 转换 **React** 和**TypeScript** 代码为**JavaScript**.

```bash
npm install --save-dev babel-loader
```

`html-webpack-plugin`, 用于生成 **HTML**.

```bash
npm install --save-dev html-webpack-plugin
```

## 5.1 **开发环境配置**

**webpack**配置文件为**JS**的，安装`ts-node`包后就可以使用**ts**配置了，

```bash
npm install --save-dev ts-node
```

通常配置两个配置文件一个用于开发一个用于生产部署。

先在项目根目录建一个开发配置文件 `webpack.dev.config.ts` ，内容如下：

```typescript
import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackDevServer from 'webpack-dev-server';

// 这是webpack的一个bug未来可能被修复， webpack的configuration接口为定义devServer
declare module 'webpack' {
    interface Configuration {
        devServer?: WebpackDevServer.Configuration;
    }
}

const config: webpack.Configuration = {
    mode: 'development',
    output: {
        publicPath: '/',
    },
    entry: './src/index.tsx',
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react',
                            '@babel/preset-typescript',
                        ],
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'build'),
        historyApiFallback: true,
        port: 4000,
        open: true,
        hot: true,
    },
};
export default config;
```

• `mode` 设置是开发还是部署环境. , `development`设置为部署环境. **Webpack** 会自动设置 `process.env.NODE_ENV` 为`development` 表示会把**react**的开发相关包 包含在最后的打包里.  
• `output.publicPath` 设置 **Webpack app**的根路径. 对于 deep 链接在开发服务器上很重要。  
• `entry` 告诉 **Webpack**从哪里开始对项目进行 `bundle`. 我们的项目是 `index.tsx`.  
• `module` 告诉 **Webpack**不同的 modules 如何处理. 由于 **Webpack**本身只能转换`JS/JSON`,所以要使用 `babel-loader`插件去处理 `.js`, `.ts`, 和`.tsx` 文件.  
• `resolve.extensions`告诉 **Webpack** 处理包依赖的时候仅查找什么类型文件。  
• `HtmlWebpackPlugin ` 生成 **HTML** 文件. 使用`src`里的`index.html` 作为 模版.  
• `HotModuleReplacementPlugin` 和 `devServer.hot` 允许模块在应用运行时更新,无需重新加载.  
• `devtool`告诉 **Webpack** 使用 **full inline source maps**. 在转译**JS**之前我们可以对原始代码进行调试。  
• `devServer` 配置 **Webpack** 开发服务器. 告诉 **Webpack**网络服务器的根目录是`build`文件夹, 服务器端口 `4000`. `historyApiFallback` 必要的 使用深度链接在多页面应用. open 告诉**Webpack** 服务启动后打开浏览器.

添加一个`npm`启动脚本在开发模式下
在 `package.json` 添加执行命令:

```json
  ...,
  "scripts": {
    "start": "webpack serve --config webpack.dev.config.ts",
  },
  ...
```

脚本启动 **Webpack** 开发服务器. 这用就可以利用 `config` 里配置好的选项启动服务.

启动运行
`npm start`

几秒钟后可以在浏览器看页面。

目前**Webpack**还没有在`build`文件夹打包任何资源。目前仅仅是把文件加载到**webpack dev server** 内存里。
现在改动一个 `<h1>` 标签，看到浏览器自动刷新了。

增加类型检查在 **webpack** 处理过程
目前 **Webpack** 还没进行任何类型检查。 可以使用 `fork-ts-checker-webpack-plugin` 让**Webpack** 对代码进行类型检查.

安装类型检查包

```bash
npm install --save-dev fork-ts-checker-webpack-plugin @types/fork-ts-checker-webpack-plugin
```

增加到 `webpack.dev.config.ts`:

```typescript
...
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
const config: webpack.Configuration = {
  ...,
  plugins: [
    ...,
    new ForkTsCheckerWebpackPlugin({
      async: false
    }),
  ],
};
```

`async`表示告诉 **Webpack** 在打包代码前做一下类型检查.

重启应用。
把 `index.tsx` 的头改一下. 引用一个没有定义的 `today `

```tsx
...
const App = () => <h1>My React and TypeScript App!! {today}</h1>;
...
```

**webpack**会抛个错误出来。

```tsx
const App = () => (
    <h1>My React and TypeScript App!! {new Date().toLocaleDateString()}</h1>
);
```

求改后，错误消失。

在`webpack `打包过程增加**lint**检查
目前还没有做任何 **linting** 检查。 通过 **ESLintPlugin**插件来做**lint**检查:

安装**lint**

```
npm install --save-dev eslint-webpack-plugin
```

求改配置 `webpack.dev.config.ts`:

```typescript
...
import ESLintPlugin from "eslint-webpack-plugin";
const config: webpack.Configuration = {
  ...,
  plugins: [
    ...,
    new ESLintPlugin({
      extensions: ["js", "jsx", "ts", "tsx"],
    }),
  ],
};
```

`extensions` 告诉 lint 去检查 **TypeScript**和 **JavaScript** 类型文件.
重启应用。

在 `index.tsx`, 增加一个未使用的变量:

```
const unused = "something";
```

**webpack** 会警告我们有未使用变量。

## 5.2 **生产环境配置**

生产环境要去掉开发环境的包。需要重新配置文件，在项目根目录新建一个生产配置文件
`webpack.prod.config.ts` 如下:

```typescript
import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
const config: webpack.Configuration = {
    mode: 'production',
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].[contenthash].js',
        publicPath: '',
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react',
                            '@babel/preset-typescript',
                        ],
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
        }),
        new ForkTsCheckerWebpackPlugin({
            async: false,
        }),
        new ESLintPlugin({
            extensions: ['js', 'jsx', 'ts', 'tsx'],
        }),
        new CleanWebpackPlugin(),
    ],
};
export default config;
```

和开发环境的区别是：  
• `mode` 设为`production`模式. **Webpack** 会自动设置`process.env.NODE_ENV` 为`production` ， 这样**react**中一些开发环境的依赖就不会打包进到生产环境.  
• `output` 告诉**Webpack**最后的打包文件到哪里. 设为 `build` 文件夹.使用 `[name]` 定义`JS`文件名. 附加一个 `[contenthash]`内容哈希值，这样当这个文件内容改变得时候浏览器就可以强制更新缓存.  
• `CleanWebackPlugin` `build`之前清空`build`文件夹 ，要按个插件.

```bash
npm install --save-dev clean-webpack-plugin
```

设置一个生产 build 脚本

```json
  ...,
  "scripts": {
    ...,
    "build": "webpack --config webpack.prod.config.ts",
  },
  ...
```

运行`npm run build`命令进行打包

一会就可以在`build`文件夹看到打包好的内容。

之后就可以部署应用了。

# 六、 **配置测试**

使用**jest**进行测试。

安装以下测试库

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

-   `jest` **js** 的单元测试库
-   `@testing-library/react` React 的测试库
-   `@testing-library/jest-dom` **jest** 的`dom`测试库, 例如测试`dom`里是否包含某个属性
-   `@testing-library/user-event` 用户事件测试库

继续安装

```bash
npm install --save-dev babel-jest identity-obj-proxy
```

-   `babel-jest` jest 测试前用**babel**对 **ts**,**js** 进行编译
-   `identity-obj-proxy` is a handy library for cases where we import files like CSS modules. If you import styles from 'styles.css', then we can configure jest to import ‘identity-obj-proxy’ for \*.css, and then when you do styles.container, it will resolve to “container” instead of throwing an exception.

在根目录下新建`jest.config.ts`配置文件， 配置详见 https://jestjs.io/docs/next/configuration#modulefileextensions-arraystring

```typescript
// jest.config.ts
import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
    globals: { tsConfig: { target: 'es2019' } },
    verbose: true,
    transform: {
        '^.+\\.[jt]sx?$': 'babel-jest',
    },
    moduleNameMapper: {
        // Resolve .css and similar files to identity-obj-proxy instead.
        '.+\\.(css|styl|less|sass|scss)$': `identity-obj-proxy`,
        // Resolve .jpg and similar files to __mocks__/file-mock.js
        '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `<rootDir>/__mocks__/file-mock.js`,
    },
    // Tells Jest what folders to ignore for tests
    testPathIgnorePatterns: [`node_modules`, `\\.cache`],
    testURL: `http://localhost`,
};
export default config;
```

配置以下测试命令在`package.json`

```json
    "scripts": {
        "test": "jest",
        ...
    },
```

执行 `npm test` 进行单元测试。

下一篇来介绍如何利用**CircleCI** 进行**CI/CD**。
