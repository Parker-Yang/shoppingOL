<template>
    <div id="ProductDetails">
         <v-BackHeader></v-BackHeader>
        <el-card class="box-card-1">
            <div slot="header" class="clearfix">
                <el-page-header @back="goBack" content="详情页面">
                </el-page-header>
                <span class="header-title"><h2>{{product.name}}</h2></span>
            </div>
            <div class="text item">
                <img :src="imgUrlPath + product.cover_img" alt="" class="text-img-2">
                <div class="productdetails">
                    <el-card class="productdetails-1">
                        <p>TIME：{{product.time}}</p>
                        <!-- <p>产品ID：{{product.Id}}</p> -->
                        <div class="productdetails-1-title">
                            <h3>产品详情</h3>
                            <p>价格：{{product.price}}</p>
                        </div>
                        <div class="detaildata">
                            <p>描述：{{product.describe}}</p>
                        </div>
                        <div class="productPay">
                            <el-button type="success" plain @click="pay">支付</el-button>
                            <el-button type="info" plain @click="goBack">返回</el-button>
                        </div>
                    </el-card>
                </div>
            </div>
        </el-card>
    </div>
</template>
<script>
import BackHeader from '../Common/BackHeader'
export default {
    name: 'ProductDetails',
    data() {
        return {
            product: {},
            imgUrlPath: 'http://39.100.241.104:8010/',
            business_id:'',
            u_id:''
        }
    },
    components: {
        "v-BackHeader": BackHeader
    },
    methods: {
        //返回上一级
        goBack() {
            this.$router.go(-1);
        },
        pay(){
            // let params = {
            //     'business_id':this.business_id,
            //     'u_id':this.u_id
            // }
            let param = new FormData();
            param.append( 'u_id',this.u_id);
            param.append('business_id',this.business_id);
            this.$http.post('/Pay',param).then((response) => {
                console.log(response);
                this.$message({
                    message: response.data.message,
                    type: 'success',
                    center: true
                    })
            }, function(err) {
                console.log(err)
            })
        }
    },
    created() {
        this.u_id = sessionStorage.getItem("id");
        this.business_id = this.$route.query.id //获取url得id值
        let reqUrl = "/Business/" + this.business_id 
        this.$http.get(reqUrl).then((response) => {
            this.product = response.data;
        }, function(err) {
            console.log(err);
        })
    },
}
</script>
<style scoped>
#ProductDetails {
    width: 100%;
    height: 100%;
    position: absolute;
}

.productdetails {
    width: 90%;
    margin: 0 auto;
    margin-top: 1%;
}

.productdetails-1 {
    /* border: 1px solid #000;  */
    text-align: left;
}

.detaildata {
    /* border: 1px solid #000; */
    width: 40%;
    /* margin: 0 auto; */
    text-align: left;
    float: right;
    text-indent: 2em;
    margin-bottom: 4%;
}

.header-title {
    text-align: center;
    width: 80%;
}

.text {
    font-size: 14px;
    /* display: flex; */
}
.item {
    margin-bottom: 18px;
}

.text-img-1 {
    width: 80%;
    float: left;
}

.text-img-2 {
    width: 80%;
}

.clearfix {
    display: flex;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

.box-card-1 {
    width: 80%;
    position: relative;
    margin: 0 auto;
    margin-top: 4%;
    border: 1px solid #EBEEF5;
    background-color: #FFF;
}
</style>
