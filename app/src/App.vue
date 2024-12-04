<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <h2>Vue tests</h2>
  <dynamic-form/>
</template>

<script>


import DynamicForm from "@/components/DynamicForm";
export default {
  name: 'App',
  components: {
    DynamicForm
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
