<template>
    <div id="Modify">
        <header>
            <div id="BG" aria-hidden="true">
                <span></span>
            </div>
        </header>
        <section class="container container_modify">
            <el-card>
                <div slot="header" class="clearfix">
                    <span>修改信息</span>
                </div>
                <el-form action="/Modify" ref="modify_form" status-icon :model="modify_form" :rules="rules" label-width="80px" label-position="left">
                    <el-form-item label="Email">
                        <el-input type="text" v-model="modify_form.email" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="Name" prop="name">
                        <el-input type="text" v-model="modify_form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="Tel" prop="tel">
                        <el-input type="text" v-model="modify_form.tel"></el-input>
                    </el-form-item>
                    <el-form-item label="VarCode" class="form_VarCode">
                        <el-input v-model="modify_form.VarCode" class="formCodeInp"></el-input>
                        <el-button type="primary" @click="Code()" class="formCodeBtn">获取验证码!</el-button>
                    </el-form-item>
                    <el-button type="primary" @click="Modify('modify_form')" class="form_Modify">修改</el-button>
                </el-form>
            </el-card>
        </section>
    </div>
</template>

<script>
export default {
    name: 'Modify',
    data() {
        return {
            modify_form: {
                name: '',
                tel: '',
                id:'',
                email:'',
                VarCode:''
            },
            rules: {
                name: [
                    { required: true, message: 'Please enter your name!', trigger: 'blur' },
                    { min: 0, max: 12, message: '0 to 12 characters in length', trigger: 'blur' }
                ],
                tel: [
                    { required: true, message: 'Please enter your tel!', trigger: 'blur' },
                    { min: 11, max: 11, message: '11 characters in length', trigger: 'blur' }
                ],
            },
        };
    },
    methods: {
        Modify(formName) {
            let _this = this
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let params = {
                        'data': _this.modify_form
                    }
                    this.$http.post('/Modify', params.data).then(response => {
                        if (response.data.success) {
                            this.$message({
                                message: response.data.message,
                                type: 'success',
                                center: true
                            })
                            setTimeout(() => {
                                this.$router.go(-1)
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
                'email': _this.modify_form.email
            }
            _this.$http.post('/VarCodeSend', {email:params.email}).then(response => {

           })
         }
    },
    mounted() {

    },
    created(){
        this.modify_form.id=this.$route.query.id;
        this.modify_form.email = this.$route.query.email;
    }
}
</script>

<style scoped>
#Modify {
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

.container_modify {
    position: absolute;
    width: 450px;
    top: 20%;
    left: 35%;
}
.formCodeInp{
    width: 50%;
    float: left;
}
.form_Modify {
    width: 100%;
    margin-top: 10px;
}

.el-link.el-link--default {
    text-decoration: none;
}
</style>
