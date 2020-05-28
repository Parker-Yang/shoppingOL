<template>
    <div id="Adminmain">
        <h2>欢迎使用后台管理系统</h2>
        <el-calendar v-model="value"></el-calendar>  
    </div>
</template>

<script>
  export default {
    data() {
      return {
        value: new Date()
      }
    }
  }
</script>
<style scoped>
#Adminmain h2{
  margin-top: 1%; 
  color: #409EFF;
}
</style>