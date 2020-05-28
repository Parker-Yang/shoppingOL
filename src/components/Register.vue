<template>
    <div id="Register">
        <header>
            <div id="BG" aria-hidden="true">
                <span></span>
            </div>
        </header>
        <section class="wrap">
            <el-card class="box-card-1">
                <div slot="header" class="clearfix">
                    <span>注册</span>
                </div>
                <el-form action="/register" ref="register_form" status-icon :model="register_form" :rules="rules" label-width="80px" label-position="left">
                    <el-form-item label="Name" prop="name">
                        <el-input type="text" v-model="register_form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="Tel" prop="tel">
                        <el-input type="text" v-model="register_form.tel"></el-input>
                    </el-form-item>
                    <el-form-item label="Email" prop="email">
                        <el-input type="text" v-model="register_form.email"></el-input>
                    </el-form-item>
                    <el-form-item label="Password" prop="password">
                        <el-input type="password" v-model="register_form.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="Confirm" prop="password1">
                        <el-input v-model="register_form.password1" type="password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="Code" class="form_code">
                        <el-input v-model="register_form.VarCode" class="formCodeInp"></el-input>
                        <el-button type="primary" @click="Code()" class="formCodeBtn">获取验证码!</el-button>
                    </el-form-item>
                    <el-button type="primary" @click="register('register_form')" class="form_Register">注册</el-button>
                </el-form>
            </el-card>
        </section>
    </div>
</template>

<script>
export default {
    name: 'Register',
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Please enter your password!'));
            } else {
                if (this.password1 !== '') {
                    this.$refs.register_form.validateField('password1');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Please enter your password again!'));
            } else if (value !== this.register_form.password) {
                callback(new Error('The two passwords are inconsistent!'));
            } else {
                callback();
            }
        };
        return {
            register_form: {
                name: '',
                tel: '',
                email: '',
                password: '',
                VarCode: '',
                code_key:''
            },
            password1: '',
            rules: {
                name: [
                    { required: true, message: 'Please enter your name!', trigger: 'blur' },
                    { min: 0, max: 12, message: '5 to 12 characters in length', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: 'Please enter your Email!', trigger: 'blur' },
                    { min: 0, max: 20, message: '0 to 20 characters in length', trigger: 'blur' }
                ],
                tel: [
                    { required: true, message: 'Please enter your tel!', trigger: 'blur' },
                    { min: 11, max: 11, message: '11 characters in length', trigger: 'blur' }
                ],
                password: [
                    { validator: validatePass, trigger: 'blur' },
                ],
                password1: [
                    { validator: validatePass2, trigger: 'blur' },
                ],
            },
        };
    },
    methods: {
        register(formName) {
            let _this = this
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let params = {
                        'data': _this.register_form
                    }
                    console.log(_this.register_form)
                    this.$http.post('/register', params.data).then(response => {
                        if (response.data.success) {
                            this.$message({
                                message: response.data.message,
                                type: 'success',
                                center: true
                            })
                            setTimeout(() => {
                                _this.$router.push({
                                    path: '/login'
                                })
                            }, 1500)
                        } else {
                            this.$message({
                                message: response.data.message,
                                type: 'error',
                                center: true
                            })
                        }
                    })

                }
            })
        },
        Code() {
            let _this = this
                let params = {
                    'email': _this.register_form.email
                }
                console.log(params.email)
                _this.$http.post('/VarCodeSend', {email:params.email}).then(response => {
                    _this.register_form.code_key = response.data.key
                })

            }
    },
    mounted() {

    },
}
</script>

<style scoped>
#Register {
    width: 100%;
}

#BG {
    position: absolute;
    width: 100%;
    height: 75%;
    overflow: hidden;
    background: linear-gradient(#53f 15%, #05d5ff 70%, #a6ffcb 94%);
    transform: skewY(15deg);
    transform-origin: right;
}

#BG :nth-child(1) {
    width: calc(100% /5);
    background-color: #409eff;
    height: 190px;
    top: 55%;
    right: 0;
}

#BG span {
    position: absolute;
}

.wrap {
    position: absolute;
    width: 25%;
    top: 20%;
    left: 35%;
}

.formCodeInp{
    width: 50%;
    float: left;
}
.form_Register {
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
