<template>
  <div id="app">
    <el-container style="height: 100vh; width: 100vw">
      <el-header height="5vh">
        <Title />
      </el-header>
      <el-container>
        <el-main>
          <Content />
        </el-main>
        <el-aside width="20vw" style="height: 65vh">
          <Setting />
        </el-aside>
      </el-container>
      <el-footer height="30vh">
        <Detail />
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import Content from './components/Content.vue'
import Detail from './components/Detail.vue'
import Setting from './components/Setting.vue'
import Title from './components/Title.vue'

export default {
  name: 'App',
  components: {
    Setting,
    Content,
    Title,
    Detail,

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
