<template>
    <div id="Header">
        <el-menu :default-active="$route.path" :router="true" class="el-menu-demo row" mode="horizontal" menu-trigger="click"> 
            <el-menu-item index="/Index/Homepage" class="col-xs-12 col-sm-1">首页</el-menu-item>
            <el-menu-item index="/Index/product?all" class="col-xs-12 col-sm-1">产品中心</el-menu-item>
            <el-menu-item index="/Index/about" class="col-xs-12 col-sm-1">关于我们</el-menu-item>
            <div class="header_login header_right" v-show="show">
                <el-menu-item index="/login" target="_blank">登录</el-menu-item>
                <el-menu-item index="/register">注册</el-menu-item>
            </div>
            <!-- <div class="header_user header_right"> -->
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
    name: 'Header',
    props: ['name','returnFun'],
    data() {
        return {
            show: true
        };
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        checkUser(name) {
            if (name) {
                this.show = false;
            }
        }
    },
    created() {
        this.checkUser(this.name);
    },
    mounted() {

    },
}
</script>

<style scoped>
#Header {
    width: 100%;
    /* position: relative; */
    z-index: 10;
}
.el-icon-more {
    color: #409EFF;
}

.header_login {
    display: flex;
}

.header_right {
    float: right;
    margin-right: 5%;
}
.el-tag {
    font-size: 20px;
}

.el-avatar {
    background: #409eff;
}
</style>
