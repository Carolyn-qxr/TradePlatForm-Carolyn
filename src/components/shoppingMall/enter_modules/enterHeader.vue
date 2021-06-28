<template>
    <div class="enter-header">
        <div class="header-line">
            <div class="enter-text-title">校园二手商城-商家</div>
            <el-dropdown class="enter-dropdown" @command="handleCommand">
                <span >{{this.loginName}}<i style="margin-left: 10px" class="el-icon-arrow-down el-icon--right"></i></span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item divided command="exit">退出登录</el-dropdown-item>
                    <el-dropdown-item divided command="change">切换账号</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <div class="line2"></div>
            <el-button type="text" class="btn" icon="iconfont icon-shouye" @click="toHome">首页</el-button>
        </div>
        <div>
            <el-menu
                    default-active="$router.path" router
                    style="top: -10px;height: 90%">
                <el-menu-item index="/enter/releaseGoods">
                    <i class="el-icon-menu"></i>
                    <span slot="title">商品发布</span>
                </el-menu-item>
                <el-menu-item index="/enter/goodsManage">
                    <i class="el-icon-menu"></i>
                    <span slot="title">商品管理</span>
                </el-menu-item>
                <el-menu-item index="/enter/enterReturnGoods">
                  <i class="el-icon-document"></i>
                  <span slot="title">退货管理</span>
                </el-menu-item>
                <el-menu-item index="/enter/enterWallet">
                    <i class="el-icon-document"></i>
                    <span slot="title">钱包</span>
                </el-menu-item>
            </el-menu>
            <el-main>
                <router-view></router-view>
            </el-main>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                loginName: 'qxr',
                loginRole: '商家',
                enterLoginState: '',
            }
        },
        created() {

            this.enterLoginState = sessionStorage.getItem("enterLoginState");
            let enter = JSON.parse(sessionStorage.getItem("enter"))
            this.loginName = enter.Enter_name;
            /*判断当前是否登录以及登录身份*/
            console.log("当前在商家页面："+this.enterLoginState)

        },
        methods:{
            handleCommand(command){
                //如果商家推出登录，则清楚当前商家在session中存储的所有信息
                if(command=="exit"){
                    sessionStorage.removeItem("enterLoginState")
                    sessionStorage.removeItem("enter")
                    this.$router.push({path: '/home'})
                }else if(command=="change"){
                    this.$router.push({path: '/login'})
                }
            },
            toHome(){
                this.$router.push({path: '/home'})
            }
        }
    }
</script>
<style>
    .enter-header{

    }

    .header-line{
        position: absolute;
        z-index: 1000;
        top:0px;
        left: 0px;
        width: 100%;
        height: 50px;
        border-radius: 0px;
        border-bottom: #eeeeee solid 2px;
    }
    .enter-text-title{
        color: #409EFF;
        text-decoration: none;
        position: relative;
        font-size: 24px;
        top: 7px;
        left: 20px;
    }
    .enter-dropdown{
        position: relative;
        float: right;
        top: -17px;
        right: 30px;
    }
    .line2{
        position: relative;
        float: right;
        width: 1px;
        height: 40px;
        background-color: #d4d4d4;
        top: -27px;
        margin-right: 50px;
    }
    .btn{
        position: relative;
        float: right;
        margin-right: 30px;
        top: -28.5px;
        color: #409EFF;
    }
    .enter-sidebar{
        position: absolute;
        height:1000px;

    }
</style>