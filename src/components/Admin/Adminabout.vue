<template>
    <div id="Adminabout">
        <el-col :span="4">    
            <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
                <router-link to="/Adminindex/Adminabout/Modifyabout">
                    <el-menu-item index="1">
                        <i class="el-icon-menu"></i>
                        <span slot="title">修改公司简介</span>
                    </el-menu-item>
                </router-link>
            </el-menu>
        </el-col>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name:'Adminabout',
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
#Adminabout{
    height: 92%;
    display: flex;
}
.el-col{
    height: 100%;
}
</style>

