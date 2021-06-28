<template>
  <div class="header">
    <div class="header-container">
      <div class="app-name">
        <router-link to="/">校园二手交易平台</router-link>
      </div>
      <div class="search-container">
        <el-input placeholder="搜闲置..." v-model="searchValue">
          <el-dropdown slot="prepend" style="width: 40px" @command="handleCommand1">
            <div style="background:#F0F8FF;">
              <el-button type="primary" style="background:#F0F8FF;width: 30px">
                {{this.currentClickName}}<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item divided command="goodsClick">宝贝</el-dropdown-item>
              </el-dropdown-menu>
            </div>
          </el-dropdown>
          <el-button slot="append" icon="el-icon-search" @click="search" style="background:#F0F8FF;"></el-button>
        </el-input>
      </div>
      <el-button type="primary" icon="el-icon-plus"  size="medium"
                 class="release-goods" @click="release" >发布闲置
      </el-button>
        <el-button type="text" class="cart-menu" icon="el-icon-shopping-cart-2" @click="toCart">购物车</el-button>

      <el-button type="text" class="btn-home" icon="i
      confont icon-shouye" @click="toHome">首页</el-button>
      <el-dropdown  class="app-header-dropdown" @command="handleCommand" >
        <span >{{this.loginName}}<i style="margin-left: 10px" class="el-icon-arrow-down el-icon--right"></i></span>

        <el-dropdown-menu slot="dropdown">
          <div style=";margin-left:12px;font-size: 14px ">身份：{{this.loginRole}}</div>

          <el-button type="text" icon="iconfont icon-qianbao"
                     style="margin-left: 20px;color: #409EFF"
                     @click="toWallet">钱包</el-button>

          <el-dropdown-item  divided command="myOrders">我的订单</el-dropdown-item>
          <el-dropdown-item divided command="login">前往登录</el-dropdown-item>
          <el-dropdown-item  divided command="exit">退出登录</el-dropdown-item>
          <el-dropdown-item divided command="changeLogin">切换账号</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="app-header-line"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return{
      checkLogin: '',//存储当前登录状态
      loginName: '未登录',
      loginRole: '登录显示',
      userLoginState: '',
      enterLoginState: '',
      wallet: '20',
      dialogVisible: false,
      searchValue: '',
      currentClickName:'宝贝'

    }
  },
  created() {
    this.query()
  },
  methods: {
    query() {
      this.userLoginState = sessionStorage.getItem("userLoginState");
      this.enterLoginState = sessionStorage.getItem("enterLoginState");
      console.log(sessionStorage)
      /*判断当前是否登录以及登录身份*/
      if(this.userLoginState==='true'){
        let user = JSON.parse(sessionStorage.getItem("user"))
        this.loginName = user.User_name
        this.loginRole = '普通用户'
      }else if(this.enterLoginState==='true'){
        let enter = JSON.parse(sessionStorage.getItem("enter"))
        this.loginName = enter.Enter_name
        this.loginRole = "商家"
      }
      console.log(this.loginName)
    },
    handleCommand1(command){
      if(command=="enterClick"){
        this.currentClickName="店铺"
      }else{
        this.currentClickName="宝贝"
      }
    },
    search(){
      if(this.currentClickName==="宝贝"){
        if(this.searchValue===""){
        }else{
          this.$router.push({path: '/goodsSearch'})
          sessionStorage.setItem("goodsSearchName",this.searchValue)
        }
      }
    },
    login(){
      this.$router.push({path: '/login'})
    },
    handleCommand(command){
      if(command==="exit"){
        if(this.userLoginState==="true"){
          sessionStorage.removeItem("user")
          sessionStorage.setItem("userLoginState",false)
          this.$message.success("已退出登录")
          this.loginName="未登录"
          this.query()
        }else if(this.enterLoginState==="true"){
          sessionStorage.removeItem("enter")
          sessionStorage.setItem("enterLoginState",false)
          this.loginName="未登录"
          this.$message.success("已退出登录")
        }

      }else if(command==="changeLogin"){
        if(this.userLoginState==="true"){
          sessionStorage.removeItem("user")
          this.$router.push({path: '/login'})

        }else if(this.enterLoginState==="true"){
          sessionStorage.removeItem("enter")
          this.$router.push({path: '/login'})
        }
      }else if(command==="login"){
        this.$router.push({path: '/login'})
      }else if(command==="myOrders"){
        if(this.userLoginState==="true"){
          this.$router.push({path: '/userOrders'})
        }else if(this.enterLoginState==="true"){
          this.$message.error("用户登录即可查看我的订单")
        }else{
          this.$message.error("当前未登录，登录即可查看我的订单！")
        }

      }
    },
    toHome(){
      this.$router.push({path: '/home'})
    },
    toWallet(){
      if(this.userLoginState==="true"){
        this.$router.push({path: '/userWallet'})
      }else if(this.enterLoginState==="true"){
        this.$router.push({path: '/enter/enterWallet'})
      }else{
        this.$message.error("当前未登录，登录即可查看钱包！")
      }
    },
    toCart(){
      if(this.userLoginState==="true"){
        this.$router.push({path: '/goodsCart'})
      }else if(this.enterLoginState==="true"){
        this.$confirm('当前登录状态为商家,用户登录才可查看购物车，是否切换账号','提示',{
          confirmButtonText: '确定' ,
          cancelButtonText: '取消',
          type:"warning"
        }).then(()=>{
          sessionStorage.removeItem("enter")
          sessionStorage.setItem("enterLoginState",false)
          this.$router.push({path: '/login'})
        }).catch(()=>{
        })
      }else{
        this.$confirm('用户登录即可查看购物车,请前往登录','提示',{
          confirmButtonText: '确定' ,
          cancelButtonText: '取消',
          type:"warning"
        }).then(()=>{
          this.login()
        }).catch(()=>{
        })
      }
    }
    ,
    release(){
      /*判断当前登录状态*/

      if(this.enterLoginState==="false" && this.userLoginState==="false"){
        this.$confirm('商家登录即可发布商品,请前往登录','提示',{
          confirmButtonText: '确定' ,
          cancelButtonText: '取消',
          type:"warning"
        }).then(()=>{
          this.login()
        }).catch(()=>{
        })
      }else if(this.userLoginState==="true"){
        this.$confirm('当前登录状态为用户,商家登录才可发布商品，是否切换账号','提示',{
          confirmButtonText: '确定' ,
          cancelButtonText: '取消',
          type:"warning"
        }).then(()=>{
          sessionStorage.removeItem("user")
          sessionStorage.setItem("userLoginState",false)
          this.$router.push({path: '/login'})
        }).catch(()=>{
        })
      }else if(this.enterLoginState==="true"){
        this.$message.success("欢迎回来~商家："+this.loginName)
        this.$router.push({path: 'enter/releaseGoods'})
      }
    },

  }
}
</script>
<style scoped>
.header {
  position: fixed;
  width: 100%;
  height: 58px;
  background: #ffffff;
  display: flex;
  justify-content: center;
  border-bottom: #eeeeee solid 2px;
  z-index: 1000;
}

.header-container {
  width: 1000px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.app-name a {
  color: #409EFF;
  font-size: 24px;
  text-decoration: none;
  margin-left: -100px;
}

.search-container {
  position: absolute;
  width: 400px;
  margin-left: 300px;
}
.release-goods{
  position: absolute;
  margin-left: 730px;
  background: #409EFF;
  border-color: #409EFF;
}
.cart-menu{
  position: absolute;
  margin-left: 930px;
  color: #409EFF;
  font-weight: 400;
  margin-top: 0px;
  font-size: 15.3px;
}
.user-name-text{
  font-size: 16px;
  font-weight: 600;
  color: #409EFF;
  cursor: pointer;
  text-decoration: none;
}
.app-header-dropdown{
  position: absolute;
  left:93%;
  top: 20px;
}
.btn-home{
  position: absolute;
  margin-left: 1010px;
  color: #409EFF;
}
.app-header-line{
  position: absolute;
  width: 1px;
  height: 40px;
  background-color: #d4d4d4;
  top: 10px;
  left: 91%;
  margin-right: 50px;
}
</style>
