<template>
    <div class="goods-return">
        <el-table :data="goodsReturnData" style="width:90%;margin-left:8.5%" :row-class-name="tableRowClassName">
            <el-table-column prop="goods_name" label="商品名称" align="center"></el-table-column>
            <el-table-column prop="user_name" label="申请人" align="center"></el-table-column>
            <el-table-column prop="deal_count" label="商品数量" align="center"></el-table-column>
            <el-table-column prop="deal_status" label="商品状态" align="center"></el-table-column>
            <el-table-column prop="deal_amount" label="交易金额" align="center" style="color: red"></el-table-column>
            <el-table-column prop="deal_time" label="申请时间" align="center"></el-table-column>
            <el-table-column  label="操作" align="center">
                <template #default="scope">
                  <el-button type="danger" size="mini" round @click="refuseReturn(scope.row)">拒绝</el-button>
                    <el-button type="primary" size="mini" round @click="agreeReturn(scope.row)">同意</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                goodsReturnData:[],
            }
        },
        created() {
            this.query()

        },
        methods:{
            query(){
                let enter = JSON.parse(sessionStorage.getItem("enter"))
                let enter_uuid = enter.Enter_uuid
                this.axios.post("/enter/getRefundRequest?enterUuid="+enter_uuid).
                then((res)=>{
                    this.goodsReturnData = res.data
                    for(let i=0;i<this.goodsReturnData.length;i++){
                        this.goodsReturnData[i].deal_status="申请退货"
                    }
                })

            },
            agreeReturn(row){
              this.$confirm('确定同意该申请吗,是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.axios.post("/user/refund?dealUuid="+row.deal_uuid).
                then((res)=>{
                  if(res.data==="success"){
                    this.$message.success('已同意该申请')
                    this.query()
                  }else{
                    this.$message.error("错误操作")
                  }
                })

              }).catch(() => {
                this.$message.info('已取消')
              });
            },
          refuseReturn(row){
            this.$confirm('确定拒绝该申请吗,是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.axios.post("/user/rejectRefund?dealUuid="+row.deal_uuid).
              then((res)=>{
                if(res.data==="success"){
                  this.$message.success('已拒绝该申请')
                  this.query()
                }else{
                  this.$message.error("错误操作")
                }
              })
            }).catch(() => {
              this.$message.info('已取消')
            });
          },
            tableRowClassName({row}) {
                if (row.deal_status === "申请退货") {
                    return 'warning-row';
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