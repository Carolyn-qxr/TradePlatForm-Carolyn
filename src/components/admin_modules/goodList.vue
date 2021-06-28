<template>
  <div class="admin-body">
    <div class="small-header">
      <el-tag style="margin-top: 6px;margin-left: 5px" size="medium" type="success" closable>商品列表</el-tag>
    </div>
    <el-table :data="goodsApplyData" style="margin-top: -35px;width:100%;margin-left: -22px;height: 86%">
      <el-table-column prop="goods_name" label="商品名称" align="center"></el-table-column>
      <el-table-column prop="enter_name" label="所属商家" align="center"></el-table-column>
      <el-table-column prop="goods_type" label="商品类别" align="center"></el-table-column>
      <el-table-column prop="goods_price" label="商品价格" align="center"></el-table-column>
      <el-table-column prop="goods_discount" label="商品折扣" align="center"></el-table-column>
      <el-table-column prop="goods_stock" label="库存" align="center"></el-table-column>
      <el-table-column prop="goods_flag" label="商品状态" align="center"></el-table-column>
      <el-table-column prop="goods_praise_rate" label="好评率" align="center"></el-table-column>



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
      goodsApplyData: [
      ]
    };
  },
  methods: {
    agree(index,row){
      this.$message.success("已同意申请")
      if(row.goods_name!==null){
        this.axios.post("").
        then((res)=>{
          if(res.data==="success"){
            this.$message.success("已同意申请")
            this.queryTable()
          }else{
            this.$message.error("资料不通过")
          }
        })
      }

    },
    refuse(){
      this.$confirm('确定拒绝该商品申请，是否拒绝?','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        this.axios.post("").
        then((res)=>{
          this.$message.success("已拒绝")
          this.queryTable()
        })
      }).catch(()=>{
        this.$message.info("已取消")
      })

    },
    queryTable(index,row){
      this.axios.get("/admin/goodsList").
      then((res)=>{
        this.goodsApplyData = res.data;
      })
    },

  }
}
</script>
<style>

</style>