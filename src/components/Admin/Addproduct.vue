<template>
    <div id="Addproduct">
      <div class="container add_info">
        <el-form :model="product"  ref="product" label-width="100px" class="demo-ruleForm">
          <el-form-item label="产品名称" prop="name">
            <el-input v-model="product.name"></el-input>
          </el-form-item>
          <el-form-item label="产品类型" prop="region">
            <el-select v-model="product.categories" placeholder="请选择产品类型">
              <el-option label="服装" value="clothing"></el-option>
              <el-option label="日用品" value="dn"></el-option>
              <el-option label="数码" value="digital"></el-option>
              <el-option label="图书" value="book"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上传图片" prop="img">
            <el-upload
              class="upload-demo add-upload"
              ref="upload"
              action="39.100.241.104:8010/api/BusinessCoverImg"
              :http-request="uploadImg"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              :auto-upload="false"
              list-type="picture">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            </el-form-item>
            <el-form-item label="产品特征" prop="describe">
              <el-input type="textarea" v-model="product.describe"></el-input>
            </el-form-item>
            <el-form-item label="简介" prop="brief">
                <el-input v-model="product.brief"></el-input>
            </el-form-item>
            <el-form-item label="价格" prop="price">
                <el-input v-model="product.price"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('product')">立即创建</el-button>
              <el-button @click="resetForm('product')">重置</el-button>
            </el-form-item>
        </el-form>
        </div>
    </div>
</template>
<script>
export default {
    name:'Addproduct',
    data() {
      return {
        fileList: [],
        action:'',
        product: {
                u_id:'',
                name:'',
                describe:'',//特征
                cover_img:'',
                categories:'',
                brief:'',
                price:''
          },
      };
    },
    created() {
      this.product.u_id = sessionStorage.getItem("id");
    },
    methods: {
      uploadImg (f) {
        console.log(f.file);
        let param = new FormData();
         param.append('cover_img',f.file);
         param.append('u_id',this.product.u_id);
        //     'cover_img': f.file,
        //     'u_id':this.product.u_id
        // }
        console.log(param)
        this.$http.post('/BusinessCoverImg',param).then((response)=>{
          console.log(response);
           if (response.data.success) {
              this.$message({
                  message: response.data.message,
                  type: 'success',
                  center: true
              })
              this.product.cover_img = response.data.url;
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
                        'data': _this.product
                    }
            _this.$http.post('/BusinessInsert', params.data).then(response => {
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
            })
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style scoped>
#Addproduct{
    width: 60%;
    margin: 0 auto;
}
.add_info{
  margin-top: 2%;
}
.Upload{
    width: 80%;
    margin-top: 1% ;
    margin-left: 2%;
}
input[type='file'] {
    display: none;
}
</style>
