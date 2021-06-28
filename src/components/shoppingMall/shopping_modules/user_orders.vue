<template>
    <div class="user-orders">
        <AppHeader></AppHeader>
        <div class="user-body">
            <span class=user-title>我的订单</span>
            <el-divider class="user-divider"></el-divider>
            <el-card class="user-card" style="color: #fff">
              <el-table :data="userOrdersData" header-cell-style="background:#B0C4DE;color: #333"
               class="user-orders-background" height="450px" :row-class-name="tableRowClassName">
                <el-table-column prop="goods_name" label="商品名称" width="150px" align="center"></el-table-column>
                <el-table-column prop="enter_name" label="商家名称" width="150px" align="center"></el-table-column>
                <el-table-column prop="deal_assess" label="商品评分" width="150px" align="center"></el-table-column>
                <el-table-column prop="deal_time" label="交易时间" width="250px" align="center"></el-table-column>
                <el-table-column prop="deal_status" label="交易状态" width="150px" align="center"></el-table-column>
                <el-table-column prop="deal_amount" label="交易金额" align="center" width="170px"></el-table-column>
                <el-table-column label="操作" align="center" width="150px" >
                  <template #default="scope">
                    <el-button size="small" type="primary" round @click="shouhuo(scope.row)">收货</el-button>
                    <el-button size="small" type="danger" round @click="tuihuo(scope.row)">退货</el-button>
                  </template>
                </el-table-column>
              </el-table>
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
              userOrdersData: []


            }
        },
        created() {
          this.query()
        },
      methods:{
          query(){
            let user = JSON.parse(sessionStorage.getItem("user"))
            // eslint-disable-next-line no-undef
            let user_uuid = user.User_uuid;
            this.axios.post("/user/getUserDeal?userUuid="+user_uuid).
            then((res)=>{
              this.userOrdersData = res.data
              console.log(this.userOrdersData)
              for(let i=0;i<this.userOrdersData.length;i++){
                if(this.userOrdersData[i].deal_status===1){
                  this.userOrdersData[i].deal_status ="已完成"
                }else if(this.userOrdersData[i].deal_status===0){
                  this.userOrdersData[i].deal_status ="进行中"
                }else if(this.userOrdersData[i].deal_status===2){
                  this.userOrdersData[i].deal_status ="退货申请中"
                }else if(this.userOrdersData[i].deal_status===3){
                  this.userOrdersData[i].deal_status ="退货被拒绝"
                }
                else{
                  this.userOrdersData[i].deal_status="已退货"
                }
              }
            })
          },
        tuihuo(row){
          this.axios.post("/user/requestRefund?dealUuid="+row.deal_uuid).
          then((res)=>{
            console.log(res.data)
                if(res.data==="success") {
                  this.$message.success("已发送退货申请")
                }else if(res.data==="error1"){
                  this.$message.error("已超过24小时，不能发起退货")
                }else if(res.data==="error2"){
                  this.$message.error("当前状态不能发起退货")
                }else if(res.data==="error3"){
                  this.$message.error("请勿重复发送申请")
                }
                else{
                  this.$message.error("未知错误")
                }
          })
        },
        shouhuo(row){
          sessionStorage.setItem("deal_uuid",row.deal_uuid)
          this.axios.post("/user/getMoney?dealUuid="+row.deal_uuid).
            then((res)=>{
              if(res.data==="error1"){
                this.$message.error("已完成订单请勿重复操作")
              }else if(res.data==="error2"){
                this.$message.error("已退货订单请勿重复操作")
              }else if(res.data==="error3"){
                this.$message.error("正在申请退货中，不能进行收货")
              }
              else if (res.data==="error"){
                this.$message.error("未知错误")
              }else{
                this.$message.success("已收货,请前往评价")
                this.$router.push({path: '/goodsComment'})
                this.query()
              }
          })
        },
        tableRowClassName({row}) {
          if (row.deal_status === "退货被拒绝") {
            return 'warning-row';
          }
          return '';
        }
      }
    }
</script>
<style>
.user-orders-background{
  background-color: rgba(255,250, 250, 0.3);
  width: 100%;
  margin-top: -90px;
  margin-left :-22px;
  border-radius: 20px;

}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

</style>