<template>
    <div id="Modify-P-D" class="container">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
              <el-page-header @back="goBack" content="详情页面">
              </el-page-header>
              <span class="header-title"><h2>修改产品</h2></span>
            </div>
            <div class="Modify-P-D">
                <el-card class="Modify-P-D-1">
                    <el-form :model="modify" ref="modify" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="产品名称" prop="name">
                            <el-input v-model="modify.name"></el-input>
                        </el-form-item>
                        <div class="Modify-P-D-1-title">
                            <h3>产品详情</h3>
                            <el-form-item label="产品特征" prop="desc">
                                <el-input type="textarea" v-model="modify.describe"></el-input>
                            </el-form-item>
                        </div> 
                        <el-form-item label="图片" prop="cover_img">
                           <img :src="imgUrlPath + modify.cover_img" alt="" class="text-img-2">
                             <el-upload
                                class="upload-demo"
                                ref="upload"
                                action="39.100.241.104:8010/api/BusinessCoverImg"
                                :http-request="uploadImg"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :file-list="fileList"
                                :auto-upload="false">
                                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                                    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                                </el-upload>
                        </el-form-item>
                        <el-form-item label="产品类型" prop="categories">
                          <el-select v-model="modify.categories" placeholder="请选择产品类型">
                            <el-option label="服装" value="clothing"></el-option>
                            <el-option label="日用品" value="dn"></el-option>
                            <el-option label="数码" value="digital"></el-option>
                            <el-option label="图书" value="book"></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="简介" prop="brief">
                            <el-input v-model="modify.brief"></el-input>
                        </el-form-item>
                        <el-form-item label="价格" prop="price">
                            <el-input v-model="modify.price"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('modify')">立即修改</el-button>
                            <el-button @click="resetForm('modify')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </div>
        </el-card>
    </div>
</template>
<script>
export default {
    name:'Modify-P-D',
    data() {
        return {
            fileList: [],
            imgUrlPath: 'http://39.100.241.104:8010/',
            modify:{
                u_id:'',
                name:'',
                describe:'',//特征
                cover_img:'',
                categories:'',
                brief:'',
                price:''
            }
        }
    },
    created() {
      this.modify.u_id = sessionStorage.getItem("id");
        let id = this.$route.query.id //获取url得id值
        let reqUrl = "/Business/" + id
        this.$http.get(reqUrl).then((response) => {
          console.log(response.data)
            this.modify = response.data;
        }, function(err) {
            console.log(err);
        })
    },
    methods: {
         //返回上一级
        goBack() {
            this.$router.go(-1);
        },
         uploadImg (f) {
          let param = new FormData();
          param.append('cover_img',f.file);
          param.append('u_id',this.modify.u_id);
          this.$http.post('/BusinessCoverImg',param).then((response)=>{
            console.log(response);
            if (response.data.success) {
                this.$message({
                    message: response.data.message,
                    type: 'success',
                    center: true
                })
                this.modify.cover_img = response.data.url;
            }else{
              this.$message({
                    message: response.data.message,
                    type: 'error',
                    center: true
                })
            }
          }
          )
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      submitForm(formName) {
         let _this = this;
        _this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {
                        'data': _this.modify
                    }
            _this.$http.post('/BusinessUpdate', params.data).then(response => {
              if (response.data.success) {
                  _this.$message({
                      message: response.data.message,
                      type: 'success',
                      center: true
                  })                          
                  _this.$router.push({
                      path: '/Adminindex/Adminproduct'
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
#Modify-P-D{
    width: 100%;
    height: 100%;
}
input[type=file] {
    display: none;
}
.Modify-P-D{
  width: 90%;
  margin: 0 auto;
  margin-top: 1%;
}
.Modify-P-D-1{
  /* border: 1px solid #000;  */
  text-align: left;
  width: 100%;
}
.detaildata{
    /* border: 1px solid #000; */
    width: 40%;
    /* margin: 0 auto; */
    text-align: left;
    float: right;
    text-indent: 2em;
    margin-bottom: 4%;
}
.header-title{
  text-align: center;
  width: 80%;
}
 .text {
    font-size: 14px;
    /* display: flex; */
  }
.el-page-header {
    width: 20%;
}
.el-pagination {
    margin-top: 1%;
}
  .item {
    margin-bottom: 18px;
  }
.text-img-1{
    width: 80%;
    float: left;
}
.text-img-2{
    width: 30%;

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
