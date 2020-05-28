<template>
     <div id="Adminheader">
        <el-menu :default-active="$route.path"
            :router="true" 
            class="el-menu-demo row"
            mode="horizontal">
            <el-menu-item index="/Adminindex/Adminmain" class="col-xs-12 col-sm-1" >首页</el-menu-item>
            <el-menu-item index="/Adminindex/Adminproduct" class="col-xs-12 col-sm-1">产品中心</el-menu-item>
            <el-menu-item index="/Adminindex/Adminabout" class="col-xs-12 col-sm-1" >关于我们</el-menu-item>
            <el-menu-item index="/Adminindex/Adminrelation" class="col-xs-12 col-sm-1" >联系我们</el-menu-item>
            <div class="header_login header_right" v-show="show">
                        <el-menu-item index="/login" target="_blank">登录</el-menu-item>
                        <el-menu-item index="/register">注册</el-menu-item>
                    </div>
           <el-menu :default-active="$route.path" :router="true" class="el-menu-demo row header_user header_right" mode="horizontal" menu-trigger="click"  v-show="!show">
                    <el-submenu index="6">
                        <template slot="title"> <el-tag>{{name}} </el-tag></template>
                        <el-menu-item index="/Index/Personal">个人中心</el-menu-item>
                        <el-menu-item index="6-2" @click="returnFun()">退出</el-menu-item>
                    </el-submenu>
            </el-menu>
        </el-menu>
    </div>
</template>
<script>
export default {
    name:'Adminheader',
     props: ['returnFun'],
    data() {
        return {
             show: true,
             name:''
        }
    },
    methods: {
        checkUser(name) {
            if (name) {
                this.show = false;
            }
        }
    },
    created() {
        this.name = sessionStorage.getItem("name");
        this.checkUser(this.name);
    },
}
</script>
<style scoped>
.el-menu-item a{
    text-decoration: none;
}
.header_login {
    display: flex;
}
.el-tag {
    font-size: 20px;
}
.header_right {
    float: right;
    margin-right: 5%;
}
.el-avatar {
    background: #409eff;
}
</style>
