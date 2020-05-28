<template>
    <div id="Productinfo">
        <el-row>
            <el-col :span="5" v-for="(o, index) in product" :key="index" :offset="index > 0 ? 1 : 1">
                <el-card :body-style="{ padding: '0px'}">
                    <!-- <img :src="imgUrlPath + o.cover_img" class="image"> -->
                    <el-image style="width: 100px; height: 100px" :src="imgUrlPath + o.cover_img" fit="scale-down"></el-image>
                    <div style="padding: 14px;">
                        <span>{{o.name}}</span>
                        <div class="bottom clearfix">
                            <time class="time">{{ o.id }}</time>
                            <router-link :to="'/productdetails?id='+o.id">
                                <el-button type="text" class="button"><i class="el-icon-more"></i></el-button>
                            </router-link>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-pagination background v-if="paginationShow" layout="prev, pager, next,total" :page-count="totalPage" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageNo">
        </el-pagination>
    </div>
</template>

<script>
export default {
    name: 'Productinfo',
    data() {
        return {
            product: {}, //当前页产品
            imgUrlPath: 'http://39.100.241.104:8010/',
            // clockInfoList: [], //返回数据——填充到数据列表
            pageNo: 1, //当前页码
            totalPage: 0, //总页数
            paginationShow: false, //是否显示分页
            category:'',
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
            let reqUrl = "/Business/BusinessCategories/?page=" + parseInt(this.pageNo)
            this.$http.post(reqUrl,{categories:this.category}).then((response) => {
                // console.log(response)
                that.product = response.data.data;
            }, function(err) {
                console.log(err)
            })
        }
    },
    //进入页面后请求的初始数据
    created() {
        this.category = window.location.href.split('?')[1];
        var params = {
            'categories':this.category
        }
        let that = this;
        let reqUrl = "/Business/BusinessCategories/?page=" + parseInt(this.pageNo)
        that.$http.post(reqUrl,{categories:this.category}).then((response) => {
            console.log(response)
            that.product = response.data.data;
            that.totalPage = response.data.totalPage; //设置分页的总页数
            if (that.totalPage > 1) { //总页数大于1时显示分页
                that.paginationShow = true;
            }
            console.log("总页数：" + that.totalPage)
        }, function(err) {
            console.log(err);
        })
    },
}
</script>

<style scoped>
#Productinfo {
    width: 80%;
    float: right;
}
.el-card {
    margin-top: 20px;
    width: 80%;
    border: 1px solid #EBEEF5;
    background-color: #FFF;
}
.time {
    font-size: 13px;
    color: #999;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
}

.button {
    padding: 0;
    float: right;
}

/* .image {
    width: 100%;
    display: block;
} */

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both;
}

.el-pagination {
    margin-top: 2%;
    position: relative;
}

</style>
