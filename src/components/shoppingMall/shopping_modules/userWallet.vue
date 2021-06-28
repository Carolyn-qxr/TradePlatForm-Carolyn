<template>
    <div class="user-wallet">
        <AppHeader></AppHeader>
        <div class="user-body">
            <span class=user-title>用户钱包</span>
            <el-divider class="user-divider"></el-divider>
            <el-card class="user-card" style="color: #fff">
                <p >用户名：{{this.user_name}}</p>
                <p>用户积分：{{this.user_intergral}}</p>
                <p>充值钱数：{{this.total_money}}</p>
                <p>余额：{{this.current_money}}</p>
            </el-card>
        </div>

        <div class="user-foot">
            校园二手交易平台
        </div>

    </div>
</template>
<script>
    import AppHeader from "./AppHeader";
    export default {
        components:{
            AppHeader,
        },
        data(){
            return{
                user_name:'qxr',
                user_intergral: '20',
                total_money: 50,
                current_money: 30,

            }
        },
        created() {
            let user = JSON.parse(sessionStorage.getItem("user"))
            // eslint-disable-next-line no-undef
            let user_id = user.User_id;
            // eslint-disable-next-line no-undef
            this.user_name = user.User_name;
            this.axios.post("/user/getWalletUser?userId="+user_id).
            then((res)=>{
                this.user_intergral = res.data.user_intergral;
                this.total_money = res.data.total_money;
                this.current_money = res.data.current_money.toFixed(2);
            })
        },
    }
</script>