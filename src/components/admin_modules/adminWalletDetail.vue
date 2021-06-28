<template>
  <div class="admin-body">
    <div class="small-header">
      <el-tag style="margin-top: 6px;margin-left: 5px" type="success" size="medium" closable @click="adminWallet">钱包</el-tag>
      <el-tag style="margin-top: 6px;margin-left: 5px" type="warning" size="medium" closable @click="mingxi">交易明细</el-tag>
    </div>
    <el-card v-show="t1" style="width: 85%;height: 500px;margin-left: 50px;border-radius: 20px;margin-top: 70px">
      <p style="font-size: 20px;font-weight: 400">管理员名:{{"\xa0"+this.adminName}}</p>
      <p style="font-size: 20px;font-weight: 400">钱包余额:{{"\xa0"+this.wallet.wallet_amount}}</p>
    </el-card>
    <el-table v-show="t2" :data="tableData" style="margin-top: -35px;width:98%;margin-left: -15px" height="530px"
              :row-class-name="tableRowClassName">
      <el-table-column prop="tran_id" label="编号" align="center"></el-table-column>
      <el-table-column prop="user_name" label="用户名称" align="center"></el-table-column>
      <el-table-column prop="enter_name" label="商家名称" align="center"></el-table-column>
      <el-table-column prop="tran_type" label="详情" align="center"></el-table-column>
      <el-table-column prop="tran_amount" label="交易金额" align="center"></el-table-column>
      <el-table-column prop="post_time" label="支出时间" align="center"></el-table-column>
      <el-table-column prop="get_time" label="到账时间" align="center"></el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  created() {
    this.queryTable();
  },

  data() {
    return {
      adminName:'qxr',
      t1:1,
      t2:0,
      tableData: [
      ],
      wallet:''
    };
  },
  methods: {
    adminWallet(){
      this.t1=1;
      this.t2=0;
    },
    mingxi(){
      this.t1=0;
      this.t2=1;
    },
    queryTable(){
      this.axios.get("/admin/getWalletSystem").then((res)=>{
        this.wallet = res.data
        this.wallet.wallet_amount = this.wallet.wallet_amount.toFixed(2)
      })
      this.axios.get("admin/getSystemTran").then((res)=>{
        this.tableData = res.data
        for(let i=0;i<this.tableData.length;i++){
          if(this.tableData[i].tran_type===1){
            this.tableData[i].tran_type="系统收入"
          }else{
            this.tableData[i].tran_type="系统支出"
          }
        }
      })
    },
    tableRowClassName({row}) {
      if (row.tran_type === "收入") {
        return 'success-row';
      }else{
        return 'warning-row'
      }
      return '';
    }

  }
}
</script>
<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

</style>