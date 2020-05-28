<template>
    <div id="Modifyrelation">
        <el-card class="box-card">
            <el-form :model="relation" ref="relation" label-width="100px" class="demo-Relation">
            <el-form-item label="电话" prop="SalesTel">
                <el-input v-model="relation.SalesTel"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="Email1">
                <el-input v-model="relation.Email1"></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="Address">
                <el-input v-model="relation.Address"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('relation')">立即修改</el-button>
                <el-button @click="resetForm('relation')">重置</el-button>
            </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
export default {
    name:'Modifyrelation',
    data() {
        return {
            relation:{
              SalesTel:'',
              Email1:'',
              Address:'',
              u_id:''
            }
        }
    },
    created() {
      console.log( this.relation.u_id)
      let _this = this;
            _this.$http.get('/index_footer').then((response) => {
                _this.relation = response.data;
                _this.relation.u_id = sessionStorage.getItem("id");
            }, function(err) {
                console.log(err);
            });
    },
    methods: {
      submitForm(formName) {
        let _this = this;
        _this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {
                        'data': _this.relation
                    }
                    console.log(_this.relation)
            _this.$http.post('/UpdateContact', params.data).then(response => {
              if (response.data.success) {
                  _this.$message({
                      message: response.data.message,
                      type: 'success',
                      center: true
                  })                          
                  _this.$router.push({
                      path: '/Adminindex/Adminrelation'
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
#Modifyrelation{
    width: 100%;
    height: 100%;
}
.text {
font-size: 14px;
display: flex;
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
/* height: 80%; */
position: relative;
margin: 0 auto;
margin-top: 4%;
}
</style>
