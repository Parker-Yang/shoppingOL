<template>
    <div id="Modifyabout" class="container">
        <el-card class="box-card">
            <el-form :model="brief" ref="brief" label-width="100px" class="demo-ruleForm">
              <el-form-item label="简介标题" prop="title">
                    <el-input type="text" v-model="brief.title"></el-input>
                </el-form-item>
                <el-form-item label="简介详情" prop="content">
                    <el-input type="textarea" :rows="6" v-model="brief.content" class="content"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('brief')">立即修改</el-button>
                    <el-button @click="resetForm('brief')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
export default {
    name:'Modifyabout',
    data() {
        return {
            action:'',
            brief:{
                title:'',
               content:'',
               u_id:''
            }
        }
    },
    created() {
        this.$http.get('/Information').then((response) => {
            console.log(response);
            this.brief = response.data;
            this.brief.u_id = sessionStorage.getItem("id");
        }, function(err) {
            console.log(err);
        })
    },
    methods: {
      submitForm(formName) {
         let _this = this;
        _this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {
                        'data': _this.brief
                    }
                    console.log(_this.brief)
            _this.$http.post('/UpdateInformation', params.data).then(response => {
              if (response.data.success) {
                  _this.$message({
                      message: response.data.message,
                      type: 'success',
                      center: true
                  })                          
                  _this.$router.push({
                      path: '/Adminindex/Adminabout'
                  })
              }
              else{
                _this.$message({
                      message: response.data.message,
                      type: 'error',
                      center: true
                  })
              }
            }).catch(function(error){
              console.log(error);
            })
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
}
</script>
<style scoped>
#Modifyabout{
    width: 100%;
    height: 100%;
}
.item {
    margin-bottom: 18px;
  }
.clearfix{
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
.box-card {
    width: 80%;
    position: relative;
    margin: 0 auto;
    margin-top: 4%;
}
</style>
