<template>
  <div class="login-register">
    <div class="contain">
      <div class="big-box" >
        <div class="big-contain" >
          <div class="b_title">校园二手交易平台</div>
          <el-form
              ref="loginFormRef"
              :rules="login_rules"
              :model="form"
              class="login_form">
            <el-form-item prop="name">
              <el-input v-model="form.name" prefix-icon="iconfont icon-denglu"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="form.password" type="password" prefix-icon="iconfont icon-mima"></el-input>
            </el-form-item>
          </el-form>
          <div class="select">
            <template>
              <el-radio v-model="radio" label="1"  class="radio">用户</el-radio>
              <el-radio v-model="radio" label="2" style="color: #fff">商家</el-radio>
              <el-radio v-model="radio" label="3" style="color: #fff">管理员</el-radio>

            </template>
          </div>
          <button class="b_button" @click="login">登录</button>
        </div>
      </div>
      <div class="small-box" >
        <div class="small-contain">
          <div class="s_title">Welcome！</div>
          <p class="s_content">开始注册，和我们一起旅行</p>
          <button class="s_button" @click="register">注册</button><br>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
export default{
  // eslint-disable-next-line vue/no-unused-component

  data(){
    return {
      radio: '1',
      form:{
        name:'naying',
        password:'000000'
      },
      //验证对象
      login_rules:{
        name:[
          {required: true,message:'用户密码为必填项',trigger: 'blur'},//必填项验证
          {min :5,max :12,message: '长度在5到12个字符',trigger: 'blur'}//长度验证
        ],
        password:[
          {required: true, message:'用户密码为必填项',trigger: 'blur'},//必填项验证
          {min :6,max :10,message: '长度在6到10个字符',trigger: 'blur'}//长度验证
        ],
      },
    }
  },
  created() {
    sessionStorage.setItem("userLoginState",false);
    sessionStorage.setItem("enterLoginState",false);
  },
  methods:{
    /**
     * 提交登录信息
     */
    login() {
      console.log(this.radio)
      if(this.radio==='1'){
        this.$refs.loginFormRef.validate(async valid =>{
          if(!valid) return;
          this.axios.post("/login/userLogin?" +
              "userName="+this.form.name+"&userPassword="+this.form.password).
          then((res)=>{
            if(res.data.flag ==="success"){
              this.userLoginSuccess();
              sessionStorage.setItem("userLoginState",true)
              sessionStorage.setItem("user",JSON.stringify(res.data.user))
              console.log(sessionStorage.getItem('user'))
              this.$router.push({path: '/home'})

            }else{
              this.loginFail()
            }
            console.log(res.data)
            this.radio ='1'
          })
        })
      }else if(this.radio==='2'){
        //商家登录
        this.$refs.loginFormRef.validate(async valid =>{
          if(!valid) return;
          this.axios.post("/login/enterLogin?" +
              "enterName="+this.form.name+"&enterPassword="+this.form.password).
          then((res)=>{
            if(res.data.flag ==="success"){
              this.userLoginSuccess();
              sessionStorage.setItem("enterLoginState",true)
              sessionStorage.setItem("enter",JSON.stringify(res.data.enter))
              console.log(sessionStorage.getItem('enter'))
              this.$router.push({path: '/home'})

            }else{
              this.loginFail()
            }
            console.log(res.data)
            this.radio ='1'
          })
        })
      }
      else{
        console.log(this.radio)
        this.$refs.loginFormRef.validate(async valid =>{
          if(!valid) return;
          this.axios.post("/login/adminLogin?" + "userName="+this.form.name+"&userPassword="+this.form.password).
          then((res)=>{
            if(res.data.flag==="success"){
              this.adminLoginSuccess();
              sessionStorage.setItem("admin",JSON.stringify(res.data.admin))
              this.$router.push({path: '/adminSystem/adminHome'})
              //window.sessionStorage.setItem("adminMessage",res.user)
            }else{
              this.loginFail()
            }
            console.log(res.data)
          })
        })

      }
    },
    register(){
      this.$router.push({path: '/register'})
    },
    userLoginSuccess(){
      // eslint-disable-next-line no-unused-vars
      const h = this.$createElement;
      this.$notify({
        title: '登录成功',
        message: h('i',{style:'color: teal'},'欢迎进入校园二手交易平台！'),
        type: 'success'

      });
    },
    adminLoginSuccess(){
      // eslint-disable-next-line no-unused-vars
      const h = this.$createElement;
      this.$notify({
        title: '登录成功',
        message: h('i',{style:'color: teal'},'欢迎回来，管理员！'),
        type: 'success'

      });
    },
    loginFail(){
      this.$notify.error({
        title: '登录失败',
        message: '请输入正确的用户信息'
      })
    }
  }
}
</script>

<style scoped="scoped">
.divIdentifyingCode {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 5;
  width: 102px; /*设置图片显示的宽*/
  height: 40px; /*图片显示的高*/
  background: #e2e2e2;
  margin: 0;
}

.login-register{
  background-image: url("../../assets/shoppingMall.png");
  width: 100%;
  height: 100%; /**宽高100%是为了图片铺满屏幕 */
  z-index: -1;
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
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  box-shadow: 0 0 3px #f0f0f0,
  0 0 6px #f0f0f0;
}
.big-box{
  width: 70%;
  height: 100%;
  position: absolute;
  top: 0;
  transform: translateX(0%);
  transition: all 1s;
}
.big-contain{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.b_title{
  margin-top: -300px;
  font-size: 1.5em;
  font-weight: bold;
  position: absolute;
  color: #fff;
}
.login_form{
  width: 50%;
  height: 28%;
  padding: 2em;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.login_form input{
  width: 100%;
  height: 40px;
  border: none;
  outline: none;
  border-radius: 50px;
  padding-left: 2em;
  background-color: #f0f0f0;
}
.register_form{
  width: 100%;
  height: 60%;
  padding: 2em ;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.register_form input{
  width: 50%;
  height: 30px;
  border: none;
  outline: none;
  border-radius: 10px;
  padding-left: 2em;
  background-color: #f0f0f0;
}
.b_button{
  width: 20%;
  height: 30px;
  border-radius: 24px;
  border: none;
  outline: none;
  background-color: rgb(57,167,176);
  color: #fff;
  font-size: 0.9em;
  cursor: pointer;
  flex-direction: row;
  margin-top: 20px;
}
.small-box{
  width: 30%;
  height: 100%;
  background-color: rgba(255, 0, 0, 0);
  position: relative;
  top: -35px;
  left: 400px;
  transform: translateX(0%);
  transition: all 1s;
  border-top-left-radius: inherit;
  border-bottom-left-radius: inherit;
}
.small-contain{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.s_title{
  font-size: 1.5em;
  font-weight: bold;
  color: #fff;
}
.s_content{
  font-size: 0.8em;
  color: #fff;
  text-align: center;
  padding: 2em 4em;
  line-height: 1.7em;
}
.s_button{
  width: 60%;
  height: 40px;
  border-radius: 24px;
  border: 1px solid #fff;
  outline: none;
  background-color: transparent;
  color: #fff;
  font-size: 0.9em;
  cursor: pointer;
}
.register_button{
  width: 60%;
  height: 40px;
  border-radius: 24px;
  border: 1px solid #fff;
  outline: none;
  background-color: rgb(57,167,176);
  color: #fff;
  font-size: 0.9em;
  cursor: pointer;
}

.big-box.active{
  left: 0;
  transition: all 0.5s;
}
.small-box.active{
  left: 100%;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: inherit;
  border-bottom-right-radius: inherit;
  transform: translateX(-100%);
  transition: all 1s;
}
/*验证码样式*/
.code{
  width:124px;
  height:31px;
  border:1px solid rgba(186,186,186,1);
}
.login-code{
  cursor: pointer;
}
.select{
  position: absolute;
  margin-top: 140px;
  color: #409EFF;
}
.radio{
  color: #fff;
}
.radio.active{
  color: #df5000;
}
</style>
