<template>
    <div id="Adminindex">
        <v-Aheader  :returnFun='returnFun'></v-Aheader>
        <router-view class="animated bounceInDown box"></router-view>
        <V-Afooter></V-Afooter>
    </div>
</template>
<script>
import Adminheader from './Adminheader'
import AdminFooter from './AdminFooter'
export default {
    name:'Adminindex',
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
    components:{
        "v-Aheader":Adminheader,
        "V-Afooter":AdminFooter
    }
}
</script>
<style scoped>
#Adminindex{
    height: 100%;
    width: 100%;
}
</style>
