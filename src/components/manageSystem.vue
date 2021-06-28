<template>
    <div class="Management">
        <div class="management-header">
            <div class="logo">后台管理系统</div>
            <div class="header-right">
                <!-- 用户头像 -->
                <div class="Img">
                    <img src="../assets/img/img.png" />
                </div>
                <!--用户名下拉菜单-->
                <el-dropdown class="admin-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        退出<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item divided command="exit">退出登录</el-dropdown-item>
                            <el-dropdown-item divided command="daima">代码仓库</el-dropdown-item>
                        </el-dropdown-menu>

                    </template>
                </el-dropdown>
            </div>
        </div>

    <div class="Sidebar">
        <el-col>
            <el-menu
                    class="el-menu"
                    :uniqueOpened="true"
                    default-active="$router.path" router
                    @open="handleOpen"
                    @close="handleClose"
                    background-color="#324157"
                    text-color="#fff"
                    active-text-color="#48D1CC">

                <el-menu-item index="/adminSystem/adminHome" class="el-menu-item">
                    <i class="el-icon-setting" ></i>
                    <template #title>系统首页</template>
                </el-menu-item>
                <el-menu-item index="/adminSystem/userInfo" >
                    <i class="el-icon-menu"></i>
                    <template #title>用户信息</template>
                </el-menu-item>
                <el-menu-item index="/adminSystem/userApply">
                    <i class="el-icon-menu"></i>
                    <template #title>审核注册</template>
                </el-menu-item>
                <el-menu-item index="/adminSystem/checkGoods"  class="el-menu-item" >
                    <i class="el-icon-document"></i>
                    <template #title>商品审核</template>
                </el-menu-item>
                <el-menu-item index="/adminSystem/goodList" class="el-menu-item">
                    <i class="el-icon-setting" ></i>
                    <template #title>商品列表</template>
                </el-menu-item>
              <el-menu-item index="/adminSystem/wallet" class="el-menu-item">
                <i class="el-icon-setting" ></i>
                <template #title>交易明细</template>
              </el-menu-item>

            </el-menu>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-col>
    </div>
    </div>
</template>

<script>
    export default {
      created(){
        this.queryTable();
      },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            handleCommand(command){
                if(command == "exit"){
                    this.$router.push("/login")
                    sessionStorage.removeItem("admin")
                }else{
                  window.location.href='https://github.com/zhengnaying/dealpf'
                }
            },
            /*同意用户注册申请*/
            handleAgree(index,row){

            },
            /*拒绝用户注册申请*/
            handleRefuse(){
                this.alert("确定拒绝吗？")
            },
            queryTable(){
                this.axios.post("/admin/registUser").
                then((res)=>{
                    this.data = res.data;
                })
            },

        }
    }
</script>

<style>
    .management-header {
        position: absolute;
        width: 100%;
        height: 70px;
        top: 0px;
        left: 0px;
        font-size: 22px;
        color: #fff;
        background:#242f42;
    }
    .management-header .logo {
        margin-left: 10px;
        width: 250px;
        line-height: 70px;
    }
    .header-right {
        float: right;
        padding-right: 50px;
    }
    .Img img {
        display: block;
        width: 40px;
        height: 40px;
        margin-top: -55px;
        position: absolute;
        border-radius: 50%;
        right: 90px;
    }
    .admin-name {
        right: 25px;
        margin-top: -45px;
        position: absolute;
    }
    .el-dropdown-link {
        color: #fff;
        cursor: pointer;

    }
    .el-menu{
        width: 10%;
        height: 95%;
        margin-top:60px;
        left: 0px;
        position: absolute;
    }
    .el-menu-item{
        margin-top: 30px;
    }
</style>