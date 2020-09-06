## Vue 3.0 初尝试—— [composition-api](https://github.com/vuejs/composition-api/blob/master/README.zh-CN.md)

## 引入

### 安装

```shell
npm install @vue/composition-api - S
# or
yarn add @vue/composition-api
```

### 支持 jsx

```shell
# 支持 jsx
npm installl babel-preset-vca-jsx --save-dev
```

```js
// babel.config.js 配置
module.exports = {
  presets: [
    "vca-jsx",
    "@vue/cli-plugin-babel/preset"
  ]
}
```

### 使用

```js
// 全局引入
import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'

Vue.use(VueCompositionAPI)
```

```js
// 使用
import {ref, reactive, computed} from '@vue/composition-api'
```

### 引入TS（可选）

#### 安装

```shell
# 1. 安装typescript等工具包，该命令会自动安装支持typescript所需的包(先全局安装@vue/cli)
vue add typescript
```

#### 配置

```js
// 2. 配置所需的类型文件； 如global.ts

declare module '*.js'

type Env = 'prd' | 'pre' | 'test'
interface Window {
  $global_env: Env;
  lang: () => string
}
```

#### 使用

```js
// 3. 为了让 TypeScript 在 Vue 组件选项中正确地进行类型推导，我们必须使用 defineComponent 来定义组件:
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  // 类型推断启用
})
```

#### JSX/TSX

要使得 `@vue/composition-api` 支持 JSX/TSX，请前往查看由 [@luwanquan](https://github.com/luwanquan) 开发的 Babel 插件[babel-preset-vca-jsx](https://github.com/luwanquan/babel-preset-vca-jsx)。