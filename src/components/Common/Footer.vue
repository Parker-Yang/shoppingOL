<template>
    <div id="Footer">
        <el-divider></el-divider>
        <div id="FBG" aria-hidden="true">
        </div>
        <section class="container-F">
            <div class="Studio">
                <el-card class="box-card footer—card" shadow="none">
                    <div class="text item">
                        <h2> Studio</h2>
                    </div>
                    <div class="space"></div>
                    <div class="text item">
                        <p>Copyright © 2019 V.1.5.0</p>
                    </div>
                </el-card>
            </div>
            <div class="product">
                <el-card class="box-card footer—card" shadow="hover">
                    <div class="text item">
                        <el-link href="/#/Index/product" target="_blank" :underline="false">全部产品</el-link>
                    </div>
                    <div class="text item">
                        <el-link href="/#/Index/product" target="_blank" :underline="false">服装</el-link>
                    </div>
                    <div class="text item">
                        <el-link href="/#/Index/product" target="_blank" :underline="false">日用品</el-link>
                    </div>
                    <div class="text item">
                        <el-link href="/#/Index/product" target="_blank" :underline="false">数码</el-link>
                    </div>
                    <div class="text item">
                        <el-link href="/#/Index/product" target="_blank" :underline="false">图书</el-link>
                    </div>
                </el-card>
            </div>
            <div class="about">
                <el-card class="box-card footer—card" shadow="none">
                    <div class="text item">
                        <el-link href="/#/Index/about" target="_blank" :underline="false">关于</el-link>
                    </div>
                </el-card>
            </div>
            <div class="relation">
                <el-card class="box-card footer—card relation-box-card" shadow="hover">
                    <div class="text item">
                        <p><i class="el-icon-phone-outline"></i>联系电话：{{relation.SalesTel}}</p>
                        <p><i class="el-icon-user"></i>邮箱：{{relation.Email1}}</p>
                        <p><i class="el-icon-s-promotion"></i>地址：{{relation.Address}}</p>
                    </div>
                </el-card>
            </div>
        </section>
    </div>
</template>
<script>
export default {
    name: 'Footer',
    data() {
        return {
            relation: {}
        }
    },
    created () {
        let _this = this;
            _this.$http.get('/index_footer').then((response) => {
                _this.relation = response.data;
            }, function(err) {
                console.log(err);
            });
    },
    methods: {
    },
    mounted() {
    },
}
</script>
<style scoped>
#Footer {
    width: 100%;
    position: relative;
    margin-top: 10%;
}

#FBG {
    position: absolute;
    width: 100%;
    height: 300px;
    background: linear-gradient(#ebeef500, #ebeef570, #ebeef5);
}

.container-F {
    position: relative;
    padding-left: 20%;
}

.Studio {
    float: left;
}

.space {
    height: 100px;
}

.product {
    float: left;
}

.about {
    float: left;
}
.relation{
    float: left;
}
.relation .item{
    display: block;
}
.text {
    font-size: 14px;
}

.item {
    padding: 18px 0;
}
.footer—card {
    border: none;
    background-color: #fff0;
    width: 200px;
    height: 300px;
}
.relation-box-card {
    width: 400px;
}
</style>