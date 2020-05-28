<template>
    <div id="Adminproduct">
        <el-col :span="4">    
            <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <router-link to="/Adminindex/Adminproduct/Addproduct"><el-menu-item index="1">
                <i class="el-icon-menu"></i>
                <span slot="title">添加产品</span>
            </el-menu-item></router-link>
            <router-link to="/Adminindex/Adminproduct/Deleteproduct">
            <el-menu-item index="2">
                <i class="el-icon-document"></i>
                <span slot="title">删除产品</span>
            </el-menu-item>
            </router-link>
            <router-link to="/Adminindex/Adminproduct/Modifyproduct">
            <el-menu-item index="3">
                <i class="el-icon-setting"></i>
                <span slot="title">修改产品</span>
            </el-menu-item>
            </router-link>
            </el-menu>
        </el-col>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name:'Adminproduct',
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>
<style scoped>
#Adminproduct{
        height: 92%;
    display: flex;
}
.el-col{
    height: 100%;
}
</style>

