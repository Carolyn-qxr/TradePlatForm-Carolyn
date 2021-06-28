<template>
    <div class="goods-search">
      <div class="header">
        <div class="header-container">
          <div class="app-name">
            <router-link to="/">校园二手交易平台</router-link>
          </div>
          <div class="search-container">
            <el-input placeholder="搜闲置..." v-model="searchName">
              <el-dropdown slot="prepend" style="width: 40px" @command="handleCommandType">
                <div style="background:#F0F8FF;">
                  <el-button type="primary" style="background:#F0F8FF;width: 30px">
                    {{this.currentClickName}}<i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item divided command="enterClick">店铺</el-dropdown-item>
                    <el-dropdown-item divided command="goodsClick">宝贝</el-dropdown-item>
                  </el-dropdown-menu>
                </div>
              </el-dropdown>
              <el-button slot="append" icon="el-icon-search" @click="search2" style="background:#F0F8FF;"></el-button>
            </el-input>
          </div>
          <el-button type="primary" icon="el-icon-plus"  size="medium"
                     class="release-goods" @click="release" >发布闲置
          </el-button>
          <el-button type="text" class="search-cart-menu" icon="el-icon-shopping-cart-2" @click="toCart">购物车</el-button>
          <el-button type="text" class="search-btn-home" icon="iconfont icon-shouye" @click="toHome">首页</el-button>
          <el-dropdown  class="app-header-dropdown" @command="handleCommandStatus" >
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
        </div>
        <div class="app-header-line"></div>
      </div>

        <div class="goods-search-main">
            <el-image :src="img_car" class="goods-search-img-car"></el-image>
            <div class="goods-search-title-text">您的需求就是我的需求，您的满意就是我的满意！</div>
            <div class="goods-search-header">
                <el-button plain size="medium" @click="search2">综合排序</el-button>
                <el-button plain size="medium" style="margin-left: 2px" @click="xiaoliang">销量</el-button>
                <el-button plain size="medium" style="margin-left: 2px" @click="haoping">好评度</el-button>
                <el-button plain size="medium" style="width: 80px;margin-left: 3px">
                    <el-dropdown @command="handleCommandPrice">
                        <span class="el-dropdown-link" style="color: #606266">
                        价格<i class="el-icon-arrow-down el-icon--right"></i>
                         </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command="command1">从低到高</el-dropdown-item>
                                    <el-dropdown-item command="command2">从高到低</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                </el-button>
            </div>
                <div class="goods-search-small-card">
                    <el-container>
                        <el-col span="600" v-for="item in goods_List" :key="item">
                            <el-card class="goods-search-small-card" >
                                <el-image :src="item.goods_firstP"
                                          style="width: 300px;height: 200px;margin-left: -20px;margin-top: -20px"
                                          @click="toGoodsDetail(item.goods_name)">
                                </el-image>
                                <div style="margin-top: 10px;margin-left: -10px">
                                    <span>{{item.goods_name}}</span>
                                    <span class="currentPrice-text">¥{{"\xa0"+item.goods_currentPrice.toFixed(2)}}</span>
                                    <span class="price-text">¥{{"\xa0"+item.goods_price.toFixed(2)}}</span><br>
                                    <span class="enter-text">商家：{{item.enter_name}}</span>
                                    <span class="volume-text">销量：{{item.goods_volume}}</span>
                                  <span class="praise-rate-text">好评率:{{item.goods_praise_rate}}%</span>
                                </div>
                            </el-card>
                        </el-col>
                    </el-container>
                </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
              img_car:'https://cdn.jsdelivr.net/gh/Carolyn-qxr/image-bucket/货车.png',
              searchName:'',//存储从首页查找的商品名
              goods_List: [],
              checkLogin: '',//存储当前登录状态
              loginName: '未登录',
              loginRole: '登录显示',
              userLoginState: '',
              enterLoginState: '',
              dialogVisible: false,
              currentClickName:'宝贝',
            }
        },
        created() {
            console.log(sessionStorage)
            this.search1();
            this.query()
        },
        methods:{
          // 基于在home页进行查找
          search1(){
            this.searchName = sessionStorage.getItem("goodsSearchName")
            if(this.searchName==""){
              //this.$message.success(this.searchName)
            }else{
              this.axios.post("/shop/getGoodsByName?goodsName="+this.searchName).
              then((res)=>{
                this.goods_List = res.data
              })
            }

          },
          toGoodsDetail(goodsName){
            sessionStorage.setItem("goodsDetailName",goodsName);
            this.$router.push({path: '/goodsDetail'})
          },
          // 基于在本页面进行查找
          search2(){
            if(this.currentClickName==="宝贝"){
              if(this.searchName===""){
                this.searchName="";
              }
              else{
                this.axios.post("/shop/getGoodsByName?goodsName="+this.searchName).
                then((res)=>{
                  this.goods_List = res.data
                })
              }
            }else{
              this.$router.push({path: '/enterSearch'})
              sessionStorage.setItem("enterSearchName",this.searchValue)
            }
          },
          /*价格排序查找*/
          handleCommandPrice(command){
                if(command==="command1"){
                    this.axios.post("/shop/sortByLowPrice?goodsName="+this.searchName).
                    then((res)=>{
                        this.goods_List = res.data
                    })
                }else{
                    this.axios.post("/shop/sortByHighPrice?goodsName="+this.searchName)
                        .then((res)=>{
                            this.goods_List = res.data
                        })
                }
            },
          /*根据销量排序*/
          xiaoliang(){
            this.axios.post("/shop/sortByGoodsVolume?goodsName="+this.searchName).
            then((res)=>{
              this.goods_List = res.data
            })
          },
          /*根据好评排序*/
          haoping(){
            this.axios.post("/shop/sortByPraiseRate?goodsName="+this.searchName)
                .then((res)=>{
                  this.goods_List = res.data
                })
          },
          /*切换当前搜索状态*/
          handleCommandType(command){
            if(command=="enterClick"){
              this.currentClickName="店铺"
            }else{
              this.currentClickName="宝贝"
            }
          },
          /*前往登录*/
          login(){
            this.$router.push({path: '/login'})
          },
          /*登录状态相关事件*/
          handleCommandStatus(command){
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
          /*查看钱包*/
          toWallet(){
            if(this.userLoginState==="true"){
              this.$router.push({path: '/userWallet'})
            }else if(this.enterLoginState==="true"){
              this.$router.push({path: '/enter/enterWallet'})
            }else{
              this.$message.error("当前未登录，登录即可查看钱包！")
            }
          },
          /*前往购物车*/
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
          /*发布商品*/
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
          // 查询当前登录信息
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
          toHome(){
            this.$router.push({path:'/home'})
          }
        }

    }
</script>
<style>
    .goods-search-main{
        position: absolute;
        top: 51px;
        left: 0px;
        height: 280%;
        width: 100%;
        background:#F0F8FF;
        min-height: 90vh;
    }
    .goods-search-img-car{
        position: absolute;
        width: 30px;
        height: 30px;
        margin-top: 1%;
        margin-left: 35%;
    }
    .goods-search-title-text{
        margin-top: 1.5%;
        margin-left: 38%;
        color: #606266;
        font-size: 15px;
    }
    .goods-search-card{
      position: relative;
      height: 350px;
      width:300px;
      margin-left: 30px;
      margin-top: 20px;
      border-radius: 20px;
      background-color: rgba(255,250, 250, 0.5);
    }
    .goods-search-header{
        position: absolute;
        margin-top: -1%;
        width: 90%;
        margin-left: 5%;
        height: 30px;

    }
   .goods-search-small-card{
     position: relative;
     height: 350px;
     width:300px;
     margin-left: 30px;
     margin-top: 20px;
     border-radius: 20px;
     background-color: rgba(255,250, 250, 0.5);
   }
    .price-text{
      position: absolute;
      font-size: 14px;
      color: #909399;
      text-decoration: line-through;
      top: 293px;
      left: 205px;

    }
    .currentPrice-text{
      position: absolute;
      top: 290px;
      left: 125px;
      color: #df5000;
    }
    .enter-text{
      position: absolute;
      font-size: 14px;
      color: #606266;
      top: 325px;
    }
    .volume-text{
      position: absolute;
      font-size: 14px;
      color: #606266;
      top: 325px;
      left: 140px;
    }
    .praise-rate-text{
      position: absolute;
      font-size: 14px;
      color: #606266;
      top: 325px;
      left: 210px;
      color: #409EFF;
    }
    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
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
      margin-left: 300px;
      width: 400px;
    }
    .release-goods{
      position: absolute;
      margin-left: 730px;
      background: #409EFF;
      border-color: #409EFF;
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
    .search-btn-home{
      position: absolute;
      left: 86%;
      color: #409EFF;
    }
    .search-cart-menu{
      position: absolute;
      left: 80.5%;
      color: #409EFF;
      font-weight: 400;
      margin-top: 0px;
      font-size: 15.3px;
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