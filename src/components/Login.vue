<template>
    <div id="Login">
        <v-BackHeader></v-BackHeader>
        <section class="wrap">
            <el-card class="box-card-1">
                <div slot="header" class="clearfix">
                    <span>登录</span>
                </div>
                <el-form action="/login" ref="login_form" :model="login_form" :rules="rules" method="post" label-width="80px" label-position="left">
                    <el-form-item label="Email" prop="email">
                        <el-input v-model="login_form.email"></el-input>
                    </el-form-item>
                    <el-form-item label="Password" prop="password">
                        <el-input v-model="login_form.password" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="Code" class="form_code">
                        <el-input v-model="login_form.VarCode" class="formCodeInp"></el-input>
                        <img :src="img" alt="未加载" @click="getCode">
                    </el-form-item>
                    <div class="form_register">
                        <router-link to="/register" target="_blank">Register？</router-link>
                        <span>|</span>
                        <router-link to="/Forget" target="_blank">Forget Password？</router-link>
                    </div>
                    <el-button type="primary" :loading="loading" @click.native.prevent="login('login_form')" :disabled="!login_form.email || !login_form.password" class="form_Login">Login</el-button>
                </el-form>
            </el-card>
        </section>
    </div>
</template>

<script>
import BackHeader from './Common/BackHeader';
import { mapMutations } from 'vuex';
export default {
    name: 'Login',
    data() {
        return {
            login_form: {
                email: '',
                password: '',
                VarCode:'',
                code_key:''
            },
            img:'',
            imgUrlPath: 'http://39.100.241.104:8010/',
            userToken: '',
            loading: false,
            rules: {
                email: [
                    { required: true, message: 'Please enter your email!', trigger: 'blur' },
                    { min: 0, max: 20, message: '0 to 16 characters in length', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: 'Please enter your password!', trigger: 'blur' },
                    { min: 0, max: 16, message: '0 to 16 characters in length', trigger: 'blur' }
                ],
            }
        }
    },
    created() {     
        this.getCode()
    },
    methods: {
        ...mapMutations(['changeLogin']),
        login(formName) {
            let _this = this
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let params = {
                        'data': _this.login_form
                    }
                    this.$http.post('/login', params.data).then(response => {
                        if(response.data.identity==1){
                            if (response.data.success) {
                            this.$message({
                                message: response.data.message,
                                type: 'success',
                                center: true
                            })
                            setTimeout(() => {
                                _this.userToken = 'Bearer ' + response.data.token;
                                // 将用户token保存到vuex中 
                                _this.changeLogin({ Authorization: _this.userToken });
                                sessionStorage.setItem("name", response.data.name);
                                sessionStorage.setItem("email", response.data.email);
                                sessionStorage.setItem("id", response.data.id);
                                _this.$router.push({
                                    path: '/Adminindex'
                                })
                            }, 1500)
                        } else {
                            this.$message({
                                message: response.data.message,
                                type: 'error',
                                center: true
                            })
                            setTimeout(() => {
                                _this.$router.push({
                                    path: '/login'
                                })
                            }, 1500)
                            // alert("账号或密码错误！")
                        }
                        }else{
                        if (response.data.success) {
                            this.$message({
                                message: response.data.message,
                                type: 'success',
                                center: true
                            })
                            setTimeout(() => {
                                _this.userToken = 'Bearer ' + response.data.token;
                                // 将用户token保存到vuex中 
                                _this.changeLogin({ Authorization: _this.userToken });
                                sessionStorage.setItem("name", response.data.name);
                                sessionStorage.setItem("email", response.data.email);
                                sessionStorage.setItem("id", response.data.id);
                                _this.$router.push({
                                    path: '/Index'
                                })
                            }, 1500)
                        } else {
                            this.$message({
                                message: response.data.message,
                                type: 'error',
                                center: true
                            })
                            setTimeout(() => {
                                _this.$router.push({
                                    path: '/login'
                                })
                            }, 1500)
                            // alert("账号或密码错误！")
                        }
                        }
                    })
                }
            })
        },
        getCode(){
            this.$http.get('/getCodeKey').then(response => {
                console.log(response)
                this.login_form.code_key = response.data.code_key;
                console.log(1,this.login_form.code_key);
                this.setCaptch(this.login_form.code_key);
            })
        }
        ,
        setCaptch(){
            console.log(this.login_form.code_key)
            this.$http({
                method: 'post',
                responseType: 'blob',
                url: '/setCaptcha',
                data:{code_key:this.login_form.code_key}
            }).then( res => {
                console.log(res)
                let blob = new Blob([res.data], {type: "application/vnd.ms-excel"});
                let url = URL.createObjectURL(blob);
                this.img = url

            }).catch( error => {
                this.$message({
                    message: error.tips,
                    type: 'error'
                });
            })
        }
    },
    components: {
        "v-BackHeader": BackHeader,
    },
}
</script>

<style scoped>
#Login {
    width: 100%;
}

.wrap {
    position: absolute;
    width: 25%;
    top: 30%;
    left: 35%;
}

.formCodeInp{
    width: 50%;
    float: left;
}

.form_register {
    text-align: right;
}

.form_Login {
    width: 100%;
    margin-top: 10px;
}

.el-link.el-link--default {
    text-decoration: none;
}
.box-card-1 {
    border: 1px solid #EBEEF5;
    background-color: #FFF;
}
</style>
