 <template>
    <div id="Forget">
        <header>
            <div id="BG" aria-hidden="true">
                <span></span>
            </div>
        </header>
        <section class="forget_wrap">
            <el-card>
                <div slot="header" class="clearfix">
                    <span>Forget</span>
                </div>
                <el-form action="/Forget" ref="Forget_form" status-icon :model="Forget_form" :rules="rules" label-width="80px" label-position="left">
                    <el-form-item label="Email" prop="email">
                        <el-input type="text" v-model="Forget_form.email"></el-input>
                    </el-form-item>
                    <el-form-item label="Password" prop="password">
                        <el-input type="password" v-model="Forget_form.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="Confirm" prop="password1">
                        <el-input v-model="Forget_form.password1" type="password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="Code" class="form_code">
                        <el-input v-model="Forget_form.VarCode" class="formCodeInp"></el-input>
                        <el-button type="primary" @click="Code()" class="formCodeBtn">获取验证码!</el-button>
                    </el-form-item>
                    <el-button type="primary" @click="Forget('Forget_form')" class="form_Forget">确定</el-button>
                </el-form>
            </el-card>
        </section>
    </div>
</template>

<script>
export default {
    name: 'Forget',
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Please enter your password!'));
            } else {
                if (this.password1 !== '') {
                    this.$refs.Forget_form.validateField('password1');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Please enter your password again!'));
            } else if (value !== this.Forget_form.password) {
                callback(new Error('The two passwords are inconsistent!'));
            } else {
                callback();
            }
        };
        return {
            Forget_form: {
                email: '',
                password: '',
                VarCode: '',
                code_key:'',
            },
            password1: '',
            rules: {
                email: [
                    { required: true, message: 'Please enter your Email!', trigger: 'blur' },
                    { min: 0, max: 20, message: '0 to 20 characters in length', trigger: 'blur' }
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
        Forget(formName) {
            let _this = this
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let params = {
                        'data': _this.Forget_form
                    }
                    this.$http.post('/UpdatePassword', params.data).then(response => {
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
                'email': _this.Forget_form.email
            }
            console.log(params.email)
            _this.$http.post('/VarCodeSend', {email:params.email}).then(response => {
                console.log(response.data.key)
                _this.Forget_form.code_key = response.data.key
            })
            }
    },
    mounted() {

    },
}
</script>

<style scoped>
#Forget {
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

.forget_wrap {
    position: absolute;
    width: 25%;
    top: 20%;
    left: 35%;
}
.formCodeInp{
    width: 50%;
    float: left;
}
.form_Forget {
    width: 100%;
    margin-top: 10px;
}

.el-link.el-link--default {
    text-decoration: none;
}
</style>
