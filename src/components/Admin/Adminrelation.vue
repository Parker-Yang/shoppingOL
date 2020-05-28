<template>
    <div id="Adminrelation">
        <el-col :span="4">    
            <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <router-link to="/Adminindex/Adminrelation/Modifyrelation"><el-menu-item index="1">
                <i class="el-icon-menu"></i>
                <span slot="title">修改联系方式</span>
            </el-menu-item></router-link>
            </el-menu>
        </el-col>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name:'Adminrelation',
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
#Adminrelation{
    height: 92%;
    display: flex;
}
.el-col{
    height: 100%;
}
</style>

