<template>
    <div id="Product">
        <v-BackHeader></v-BackHeader>
        <v-InfoCard></v-InfoCard>
            <el-col :span="12">
                <el-menu :default-active="this.$router.path" router>
                    <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name" @click.native="routerRefresh">
                        {{ item.navItem }}
                    </el-menu-item>
                </el-menu>
            </el-col>
            <router-view v-if="routerAlive"></router-view>
    </div>
</template>

<script>
import BackHeader from '../Common/BackHeader';
import InfoCard from '../Common/InfoCard'
export default {
    name: 'Product',
    data() {
        return {
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
    methods: {
        routerRefresh(){
		this.routerAlive = false;
		this.$nextTick(()=>{
		    this.routerAlive = true;
	        });
	    },
    },
    components: {
        "v-BackHeader": BackHeader,
        "v-InfoCard": InfoCard
    },
}
</script>

<style scoped>
#Product {
    width: 100%;
    height: 100%;
    /* position: relative; */
}

.el-col-12 {
    width: 15%;
}

.el-menu-item {
    text-align: left;
}

a {
    text-decoration: none;
}
</style>
