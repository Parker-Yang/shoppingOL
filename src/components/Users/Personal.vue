<template>
    <div id="Personal">
        <v-BackHeader></v-BackHeader>
        <section class="container-1">
            <el-card class="box-card info_card" shadow="none">
                <div class="clearfix">
                    <span><h1>{{username}}</h1></span>
                    <router-link :to="{name: 'PersonalModify',query: {id:save_id,email:email}}">
                        <h3>修改个人信息</h3>
                    </router-link>
                </div>
                <div class="text item">
                    <p>欢迎来到个人中心</p>
                    <p>电话：{{self.tel}}</p>
                    <p>邮箱：{{self.email}}</p>
                </div>
            </el-card>
        </section>
        <section class="personal_msg">
            <div class="clearfix">
                <span><h1>订单</h1></span>
            </div>
            <el-card class="personal_msg_card" v-for="(o,index) in personal" :key="index">
                <div slot="header" class="clearfix">
                    <span>{{o.name}}</span>
                    <!-- <router-link :to="'/OrderDetails?id='+o.order_id">
                        
                    </router-link> -->
                    <el-button style="float: right; padding: 3px 0" type="text" @click="confirm(o.order_id)">删除订单</el-button>
                </div>
                <div class="text item">
                    <img :src="imgUrlPath + o.cover_img" alt="" class="image">
                    <p class="text-p">{{o.time}}</p>
                </div>
            </el-card>
            <el-pagination background v-if="paginationShow" layout="prev, pager, next,total" :page-count="totalPage" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageNo">
        </el-pagination>
        </section>
    </div>
</template>

<script>
import BackHeader from '../Common/BackHeader';
export default {
    inject:['reload'],
    name: 'Personal',
    data() {
        return {
            imgUrlPath: 'http://39.100.241.104:8010/',
            save_id:'',
            email:'',
            self:{},
            username:'',
            personal: {},
            pageNo: 1, //当前页码
            totalPage: 0, //总页数
            paginationShow: false, //是否显示分页
        }
    },
    methods: {
        //改变每页显示数量时调用
        handleSizeChange(val) {
            this.$nextTick(() =>
                this.getPageData(),
            )
        },
        //点击下一页和点击页码时执行
        handleCurrentChange(val) {
            this.getPageData();
        },
        //获取分页数据totalDataNumber
        getPageData() {
            let that = this;
            let reqUrl = "/order/?page=" + parseInt(this.pageNo)
            this.$http.post(reqUrl,{u_id:this.save_id}).then((response) => {
                that.personal = response.data.data;
            }, function(err) {confirm
                console.log(err)
            })
        },
         confirm(id) { // 退出登录
            this.$confirm('此操作将删除此订单, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                 let params = {
                'order_id':id,
                }
                this.$http.post('/OrderCancel',{order_id:params.order_id}).then((response) => {
                    console.log(response);
                    if(response.data.success){
                    this.$message({
                        message: response.data.message,
                        type: 'success',
                        center: true
                        })
                        this.reload();
                    }else{
                        this.$message({
                        message: response.data.message,
                        type: 'error',
                        center: true
                        })
                    }
                })            
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
         }
    },
    created () {
        this.username = sessionStorage.getItem("name");
        this.email= sessionStorage.getItem("email")
        this.save_id = sessionStorage.getItem("id");
        console.log(this.save_id)
        let _this = this;
        let reqUrl = "/order/?page=" + parseInt(this.pageNo)
        _this.$http.post(reqUrl,{u_id:this.save_id}).then(response=>{
            _this.personal = response.data.data;
            _this.totalPage = response.data.totalPage; //设置分页的总页数
            if (_this.totalPage > 1) { //总页数大于1时显示分页
                _this.paginationShow = true;
            }
            console.log("总页数：" + _this.totalPage);
            }, function(err) {
                console.log(err)
        });
        let SelfUrl = "/SelfPage/"+ parseInt(this.save_id);
        _this.$http.get(SelfUrl).then(response=>{
            console.log(response);
            _this.self = response.data;
            }, function(err) {
                console.log(err)
        });
    },
    mounted() {

    },
    components: {
        "v-BackHeader": BackHeader,
    }
}
</script>

<style scoped>
.container-1 {
    position: relative;
    width: 50%;
    top: 35%;
    left: 15%;
}

.info_card {
    border: none;
    background-color: #fff0;
    width: 100%;
    height: 200px;
}

.text {
    font-size: 18px;
    text-align: left;
}

.item {
    margin-bottom: 18px;
}

.clearfix {
    text-align: left;
    margin-bottom: 20px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}
.personal_msg {
    width: 70%;
    margin: 0 auto;
    margin-top: 10%;
    position: relative;
}

.personal_msg_card {
    margin-top: 5%;
    border: 1px solid #EBEEF5;
    background-color: #FFF;
}

.image {
    width: 8%;
    display: block;
    float: left;
}

.text-p {
    text-indent: 2em;
    text-align: left;
}

a {
    color: #f56c6c;
}
.el-pagination {
    margin-top: 2%;
}
</style>
