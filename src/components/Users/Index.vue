<template>
    <div id="Index">
        <v-Header :name='name' :save_id='save_id' :returnFun='returnFun'></v-Header>
        <router-view></router-view>
        <v-Footer></v-Footer>
    </div>
</template>

<script>
import Header from '../Common/Header'
import Footer from '../Common/Footer'
export default {
    name: 'Index',
    data() {
        return {
            data: {},
            name: '',
            save_id:0
        }
    },
    components: {
        "v-Header": Header,
        "v-Footer": Footer
    },
    methods: {
        returnFun() { // 退出登录
            this.$confirm('此操作将注销登录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$store.commit('$_removeStorage'); // 清除登录信息
                // let routerjump = 
                this.$router.push({
                    name: 'Login'
                });
                // window.open(routerjump.href,'_blank');
                this.$message({
                    type: 'success',
                    message: '注销成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消注销'
                });
            });
        }
    },
    created() {
        this.name = sessionStorage.getItem("name");
        this.save_id = sessionStorage.getItem("id");
    },
    mounted() {

    },
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

#Index {
    width: 100%;
    min-height: 100%;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
}
</style>
