<template>
    <div id="Homepage"> 
        <v-BackHeader></v-BackHeader>
        <div class="home_wrap">
            <section class="container-1">
                <el-card class="box-card home_card" shadow="hover">
                    <div class="clearfix">
                      <span><h1>{{item.introduce.Studio.title}}</h1></span>
                    </div>
                    <div class="text item home_card_text">
                        <p>{{item.introduce.Studio.body}}</p>
                    </div>
                </el-card>
            </section>
            <section class="container-3">
                <el-card class="box-card home_card" shadow="hover">
                    <div class="clearfix">
                        <span><h1>{{item.introduce.Business.title}}</h1></span>
                    </div>
                    <div class="text item home_card_text">
                        <p>{{item.introduce.Business.body}}</p>
                    </div>
                </el-card>
            </section>
            <section class="container-4">
                <el-card class="box-card home_card" shadow="hover">
                    <div class="clearfix">
                        <span><h1>{{item.introduce.Achievement.title}}</h1></span>
                    </div>
                    <div class="text item home_card_text">
                        <p>{{item.introduce.Achievement.body}}</p>
                    </div>
                </el-card>
            </section>
            <section class="container-2">
                <header>
                    <el-menu :default-active="this.$router.path" router class="el-menu-demo el-menu-mid" mode="horizontal">
                        <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name" @click.native="routerRefresh">
                            {{ item.navItem }}
                        </el-menu-item>
                    </el-menu>
                </header>
                <section class="homepage_product">
                    <router-view v-if="routerAlive"></router-view>
                </section>
            </section>
        </div>
    </div>
</template>
<script>
import BackHeader from '../Common/BackHeader'
export default {
    name: 'Homepage',
    data() {
        return {
            item: {
                introduce:{
                    Studio:{},
                    Business:{},
                    Achievement:{},
                },
            },
            routerAlive:'',
                navList:[
                    {name:'/Index/product/productinfo?all',navItem:'全部产品'},
                    {name:'/Index/product/productinfo?clothing',navItem:'服装'},
                    {name:'/Index/product/productinfo?dn',navItem:'日用品'},
                    {name:'/Index/product/productinfo?digital',navItem:'数码'},
                    {name:'/Index/product/productinfo?book',navItem:'图书'},
                ]
        }
    },
    created() {
        let that = this;
        this.$http.get('/AllData').then((response) => {
            that.item = response.data;
        }, function(err) {
            console.log(err);
        })
    },
    methods: {
        routerRefresh(){
		this.routerAlive = false;
		this.$nextTick(()=>{
		    this.routerAlive = true;
	        });
	    },
    },
    mounted() {

    },
     components: {
        "v-BackHeader": BackHeader
    },
}
</script>
<style scoped>
#Homepage {
    width: 100%;
    height: 100%;
    /* position: relative; */
    display: block;
}

.home_wrap {
    display: block;
}
.container-1 {
    position: relative;
    width: 50%;
    top: 35%;
    left: 15%;
}

.container-3 {
    position: relative;
    width: 50%;
    /* top: 35%; */
    left: 45%;
}

.container-4 {
    position: relative;
    width: 50%;
    /* top: 35%; */
    left: 5%;
}

.home_card {
    border: none;
    background-color: #fff0;
    width: 100%;
    height: 300px;
}

.home_card_text {
    font-size: 18px;
    text-align: left;
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

.container-2 {
    position: relative;
    margin-top: 12%;
    width: 100%;
}

.el-menu-mid {
    width: 75%;
    margin: 0 auto;
}
</style>
