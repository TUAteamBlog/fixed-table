# fixed-table
基于 Vue 2 的 ui 组件库

## 安装

```bash
$ tnpm i -S fixed-table
# OR
$ npm i -S fixed-table
# OR
$ yarn add fixed-table
```

## 使用
### 完整引入

```js
import Vue from 'vue'
import TuaUI from 'fixed-table'
import 'fixed-table/dist/fixed-table.css'

Vue.use(TuaUI)
```

### 按需引入
由于完整引入体积太大，尤其在开发移动端页面时，如何减小打包体积尤其重要。

在使用 `fixed-table` 时，支持按需引入组件（不需要引入各种 babel 插件，通过加载源码利用 webpack 的 tree-shaking 删除没有用到的代码）。[具体原理可参见这篇文章。](https://buptsteve.github.io/blog/posts/017.how-to-build-a-vue-ui-lib-1.html)

但有一些前提条件：

* scss：由于源码使用 scss 编写，所以项目中要配置好 scss。（后期开源可以考虑编一份 css）
* babel：由于源码使用 es6+ 编写，所以配置 babel 时别排除 `fixed-table`。

**废话了这么多，其实使用起来很方便...**

```js
import Vue from 'vue'
import {
    TuaToast,
    TuaButton,
} from 'fixed-table/src/' // <- 直接引源码
// 不需要单独引入样式~

Vue.use(TuaToast)
Vue.use(TuaButton)
```

我们最终的代码只会打包以上两个组件。

