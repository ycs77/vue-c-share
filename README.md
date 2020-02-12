# Vue Component - C Share buttons

[![npm version](https://img.shields.io/npm/v/vue-c-share?style=flat-square)](https://www.npmjs.com/package/vue-c-share)

The share to community buttons Component for Vue.

[jQuery version](https://github.com/ycs77/jquery-plugin-c-share)

## Getting started

Install package:

```
npm i vue-c-share
# or
yarn add vue-c-share
```

## Usage

*example.vue*
```vue
<template>
  <div>
    <c-share></c-share>
  </div>
</template>

<script>
import CShare from 'vue-c-share'

export default {
  components: {
    CShare
  }
}
</script>
```

## Develop

Install the global `@vue/cli-service-global` package:

```
npm install -g @vue/cli-service-global
# or
yarn global add @vue/cli-service-global
```

Start server to develop:

```
vue serve src/CShare.vue
```
