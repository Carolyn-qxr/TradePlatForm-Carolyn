<template>
    <div class="enter-wallet">
      <div class="enter-wallet-card">
        <el-button type="text" class="enter-wallet-title" @click="wallet">我的钱包</el-button>
        <el-divider direction="vertical" class="enter-wallet-divider1"></el-divider>
        <el-button type="text" class="enter-wallet-title" style="margin-left: 100px" @click="details">交易明细</el-button>
        <el-divider class="enter-wallet-divider2"></el-divider>
        <div style="margin-left: 5%;margin-top: 8%" v-show="t1">
          <p>商家名：{{this.enter_name}}</p >
          <p>余额：{{this.wallet_amount}}</p >
        </div>
        <el-table v-show="t2" :data="dealDetailData" class="enter-wallet-table" height="500px">
          <el-table-column prop="tran_id" label="交易编号" align="center" ></el-table-column>
          <el-table-column prop="tran_amount" label="交易金额" align="center" ></el-table-column>
          <el-table-column prop="tran_start" label="开始时间" align="center" ></el-table-column>
          <el-table-column prop="tran_arrive" label="结束时间" align="center" ></el-table-column>
          <el-table-column prop="tran_type" label="交易状态" align="center" ></el-table-column>

        </el-table>
      </div>
    </div>
</template>
<script>
    import axios from "axios";

    export default {
        data(){
            return{
                enter_name: 'qxr',
                wallet_amount:1000,
                t1:1,
                t2:0,
                dealDetailData:[],

            }
        },
        created() {
          let enter = JSON.parse(sessionStorage.getItem("enter"))
          let enter_uuid = enter.Enter_uuid
          console.log(enter)
          this.axios.post("/enter/getWalletEnter?enterUuid="+enter_uuid)
              .then((res)=>{
                    this.wallet_amount = res.data.wallet_amount.toFixed(2)
                    this.enter_name = enter.Enter_name
                })
          this.axios.post("enter/getTransactionEnter?enterUuid="+enter_uuid).
          then((res)=>{
            this.dealDetailData = res.data
            for(let i=0;i<this.dealDetailData.length;i++){
              if(this.dealDetailData[i].tran_type===1){
                this.dealDetailData[i].tran_type = "收入"
              }else{
                this.dealDetailData[i].tran_type = "支出"
              }
            }
          })
        },

        methods:{
          wallet(){
            this.t1=1;
            this.t2=0;
          },
          details(){
            this.t1=0;
            this.t2=1;
          }
        }
    }
</script>
<style>
.enter-wallet-title{
  position: absolute;
  left: 2%;
  top: 2%;
  font-size: 18px;
  color: #409EFF;
}
.enter-wallet-card{
  position: absolute;
  width: 80%;
  height: 70%;
  left: 15%;
  top: 12%;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.enter-wallet-divider1{
  position: absolute;
  left: 9%;
  top: 4%;
  width: 1px;
  height: 30px;

}
.enter-wallet-divider2{
  position: absolute;
  top: 8%;
}
.enter-wallet-table{
  position: absolute;
  top:15%;
  width: 100%;
  left: 0%;
  height: 86%;

}
</style>