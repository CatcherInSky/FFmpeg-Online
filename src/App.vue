<template>
  <div id="app">
    <el-container style="height: 100vh; width: 100vw">
      <el-header height="5vh">
        <Title />
      </el-header>
      <el-container>
        <el-main style="padding: 0 20px">
          <Content />
        </el-main>
        <el-aside width="20vw" style="height: 65vh">
          <Setting />
        </el-aside>
      </el-container>
      <el-footer height="30vh">
        <Output />
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import Content from './components/Content.vue'
import Output from './components/Output.vue'
import Setting from './components/Setting.vue'
import Title from './components/Title.vue'

export default {
  name: 'App',
  components: {
    Setting,
    Content,
    Title,
    Output,

  }
}
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
