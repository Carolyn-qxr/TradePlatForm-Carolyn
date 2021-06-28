<template>
  <div class="enterRegister">
    <div class="contain">
      <div class="big">
        <el-form ref="enterRef" class="enter_form" size="mini" :rules="rules" :model="form">
          <el-form-item prop="name">
            <el-input v-model="form.name" placeholder="商家姓名" prefix-icon="iconfont icon-denglu" clearable></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="form.password" placeholder="请输入密码" prefix-icon="iconfont icon-mima" show-password></el-input>
          </el-form-item>
          <el-form-item prop="gender">
            <el-input v-model="form.gender" placeholder="性别" prefix-icon="iconfont icon-xingbie" clearable></el-input>
          </el-form-item>
          <el-form-item prop="phone">
            <el-input v-model="form.phone" placeholder="请输入电话号码" prefix-icon="iconfont icon-dianhuahaoma" clearable></el-input>
          </el-form-item>
          <el-form-item prop="account">
            <el-input v-model="form.account" placeholder="请输入银行账户" prefix-icon="iconfont icon-yinhangzhanghu" clearable></el-input>
          </el-form-item>
        </el-form>
        <div style="color: #fff">身份证：</div>
        <el-upload  :multiple="multiple" action="/upload" list-type="picture-card" :auto-upload="false"
                    :http-request="identifyUpload" ref="upload1" :on-remove="RemoveLicense" :on-change="ChangeLicense" :class="{hide:hideUpload}">
          <i class="el-icon-plus"></i>
        </el-upload>
        <div style="color: #fff">营业执照：</div>
        <el-upload :multiple="multiple" action="/upload" list-type="picture-card" :auto-upload="false"
                   :http-request="LicenseUpload" ref="upload2" :on-remove="RemoveLicense" :on-change="ChangeLicense" :class="{hide:hideUpload}">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-button @click="uploadPicture" size="mini" plain round>提交图片</el-button>
        <el-button class="button-register" @click="enterRegister">商家注册</el-button>
      </div>
      <div class="small">
        <div class="small-title">商家注册</div>
        <div class="content">与我们保持联系，请登录你的账户</div>
        <div class="small-button">
          <button class="button" @click="login">登录</button><br>
          <button class="button" @click="userRegister">用户注册</button>
        </div>
      </div>



      <!--            <button class="button-register" @click="enterRegister">商家注册</button>-->
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      input: '',
      form:{
        name: '',
        password: '',
        gender: '',
        phone: '',
        account: ''
      },
      formData:'',
      multiple: true,
      rules:{
        name:[
          {required: true,message:'商家姓名为必填项',trigger: 'blur'},//必填项验证
          {min :3,max :12,message: '长度在3到12个字符',trigger: 'blur'}//长度验证
        ],
        password:[
          {required: true, message:'用户密码为必填项',trigger: 'blur'},//必填项验证
          {min :6,max :10,message: '长度在6到10个字符',trigger: 'blur'}//长度验证
        ],
        gender:[
          {required: true,message:'用户性别为必填项',trigger: 'blur'},//必填项验证
          {min :1,max :1,trigger: 'blur'}//长度验证
        ],
        phone:[
          {required: true,message:'电话号码为必填项',trigger:'blur'},
          {min: 11,max:11,message: '长度为11位电话号码',trigger: 'blur'},
        ],
        account:[
          {required: true,message:'银行账户为必填项',trigger:'blur'},
          {min: 16,max:16,message: '长度为16位银行账户',trigger: 'blur'},
        ]},
      hideUpload:false,
    }
  },
  methods:{
    /*跳转*/
    login(){this.$router.push({path: '/login'})},
    userRegister(){this.$router.push({path: '/register'})},
    /*商家申请注册*/
    uploadPicture(){
      this.formData = new FormData();
      this.$refs.upload1.submit();
      this.$refs.upload2.submit();
      let config ={
        headers:{
          'Content-Type': 'multipart/form-data'
        }
      }
      console.log(this.formData)
      this.$refs.enterRef.validate((valid=>{
            if(valid){
              /*先\上传图片*/
              this.axios.post("/register/uploadEnter?enterName="+this.form.name,this.formData).
              then((res)=>{
                if(res.data==="上传成功"){
                  this.$message.success("照片上传成功")
                }
                else if (res.data==="更新成功"){
                  this.$message.success("照片更新成功")
                }
              });
            }else{
              this.$message.error('输入不合法，请重新输入！')
            }
          })

      )},
    /*商家申请注册*/
    enterRegister(){
      this.$refs.enterRef.validate((valid=>{
            if(valid){
              /*上传用户其他信息*/
              this.axios.post("/register/registEnter?enterName="+this.form.name + "&enterPassword="+this.form.password
                  +"&enterGender="+this.form.gender+"&enterPhone="+this.form.phone+"&enterAccount="+this.form.account)
                  .then((res)=>{
                    if(res.data.flag==="success"){
                      this.$message.success("注册成功，等待管理员审核")
                    }else{
                      this.$message.error("注册失败，清检查输入信息")
                    }
                  })
            }else{
              this.$message.error('输入不合法，请重新输入！')
            }
          })

      )
    },
    handleRemove(file,filelist){
      console.log(file,filelist)
    },
    handlePreview(file){
      console.log(file)
    },
    identifyUpload(file){
      this.formData.append('enterIdentity',file.file)
    },
    LicenseUpload(file){
      this.formData.append('enterLicense',file.file)
    }

  }
}
</script>
<style scoped="scoped">
.enterRegister{
  background-image: url("../../assets/shoppingMall.png");
  width: 100%;
  height: 100%; /**宽高100%是为了图片铺满屏幕 */
  position: absolute;
  top: 0px; /*这里是设置与顶部的距离*/
  left: 0px; /*这里是设置与左边的距离*/
  bottom: 0px;
  right: 0px;

}
.contain{
  width: 50%;
  height: 100%;
  top: 50%;
  position: relative;
  left: 50%;
  transform: translate(-50%,-50%);
  background-color: rgba(255, 255,255, 0.2);
  border-radius: 20px;
  box-shadow: 0 0 3px #f0f0f0,
  0 0 6px #f0f0f0;
}
.big{
  position: relative;
  width: 60%;
  left: 230px;
  top:20px;
  align-content: center;
}
.small{
  position: absolute;
  width: 30%;
  top:80px;
  left:40px;
  align-content: center;

}
.small-button{
  position: absolute;
  width: 160px;
  top: 210px;
  left:-10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.button{
  width: 70%;
  height: 40px;
  border-radius: 24px;
  border: 1px solid #fff;
  outline: none;
  background-color: transparent;
  color: #fff;
  font-size: 0.9em;
  cursor: pointer;
}
.small-title{
  font-size: 1.5em;
  font-weight: bold;
  color: #fff;
  position: absolute;
  left: 20px;
  top: 50px;

}
.content{
  font-size: 0.8em;
  color: #fff;
  text-align: center;
  padding: 2em 4em;
  line-height: 1.7em;
  position: absolute;
  left: -60px;
  top:100px;
}
.upload{
  position: absolute;
  left:270px;
  top: 380px;
}
.button-register{
  width: 30%;
  height: 40px;
  border-radius: 24px;
  border: 1px solid #fff;
  outline: none;
  background-color:  rgb(57,167,176);
  color: #fff;
  font-size: 0.9em;
  cursor: pointer;
  position: absolute;
  left:130px;
  top:600px;
}
.upload{
  width: 20px;
  height: 20px;
}

</style>
