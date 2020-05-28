<template>
    <div id="About">
        <v-BackHeader></v-BackHeader>
        <v-InfoCard></v-InfoCard>
        <div id="CardInfo">
            <el-card class="box-card_about">
                <div slot="header" class="clearfix">
                    <span>{{about.title}}</span>
                </div>
                <div class="about_text item">
                    <img src="" alt="" class="image">
                    <p class="about_text-p"> {{about.content}}</p>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
import BackHeader from '../Common/BackHeader';
import InfoCard from '../Common/InfoCard'
export default {
    name: 'About',
    data() {
        return {
            about: {}
        }
    },
    methods: {

    },
    created(){
        this.$http.get('/Information').then((response) => {
            console.log(response);
            this.about = response.data;
        }, function(err) {
            console.log(err);
        })
    },
    components: {
        "v-BackHeader": BackHeader,
        "v-InfoCard": InfoCard
    }
}
</script>

<style scoped>
#About {
    width: 100%;
}

#CardInfo {
    position: relative;
}
.about_text {
    font-size: 18px;
    margin-bottom: 18px;
}

.about_text-p {
    text-indent: 2em;
    text-align: left;
}

.image {
    width: 40%;
    display: block;
    float: left;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

.box-card_about {
    width: 80%;
    height: 60%;
    margin: 0 auto;
}
</style>
