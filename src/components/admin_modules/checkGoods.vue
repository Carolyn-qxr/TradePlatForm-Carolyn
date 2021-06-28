<template>
  <div class="admin-body">
    <div class="small-header">
      <el-tag style="margin-top: 6px;margin-left: 5px" closable size="medium">商品审核</el-tag>
    </div>
    <el-table :data="goodsApplyData" style="margin-top: -35px;width:100%;margin-left: -21px" height="86%">
      <el-table-column prop="goods_name" label="商品名称" align="center"></el-table-column>
      <el-table-column prop="enter_name" label="所属商家" align="center"></el-table-column>
      <el-table-column prop="goods_type" label="商品类别" align="center"></el-table-column>
      <el-table-column prop="goods_price" label="商品价格" align="center"></el-table-column>
      <el-table-column prop="goods_discount" label="商品折扣" align="center"></el-table-column>
      <el-table-column align="center" label="商品图片">
        <template #default="scope">
          <i class="el-icon-zoom-in" style="font-size: 17px" @click="lookImage(scope.$index,scope.row)"></i>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button size="mini"  @click="agree(scope.$index,scope.row)"
                     style="background: #409EFF;color:#fff;border-color: #409EFF;border-radius: 7px">同意</el-button>
          <el-button size="mini" @click="refuse(scope.$index,scope.row)" type="danger" style="border-radius: 7px">拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible" style="width: 100%;height: 100%" title="商品图片">
      <div class="block">
        <el-carousel trigger="click" height="300px" style="margin-top: -20px">
          <el-carousel-item v-for="item in imgList" :key="item">
            <el-image :src="item" ></el-image>
          </el-carousel-item>
        </el-carousel>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  created() {
    this.queryTable();
  },

  data() {

    return {
      dialogVisible: false,
      goodsApplyData: [
      ],
      imgList: [
      ]
    };
  },
  methods: {
    agree(index,row){
      //this.$message.success("已同意申请")
      if(row.goods_name!==null){
        this.axios.post("/admin/insertGoods?goodsName="+row.goods_name).
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
    refuse(index,row){
      this.$confirm('确定拒绝该用户申请，是否拒绝？','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.post("/admin/insertGoodsFailed?goodsName="+row.goods_name).
        then((res)=>{
          if(res.data==="success"){
            this.queryTable()
            this.$message.success('已拒绝')
            console.log("已删除该申请")
          }
        })
      }).catch(()=>{
        this.$message({
          type : 'info',
          message: '已取消'
        })
      })
    },
    lookImage(index,row){
      this.dialogVisible = true
      this.axios.post("/admin/getGoodsRequestPhoto?goodsName="+row.goods_name)
          .then((res)=>{
            if(res.data.flag==="success"){
              this.imgList = res.data.photoList
            }else{
              this.$message.error("加载失败")
            }

          })
    },
    queryTable(index,row){
      this.axios.get("/admin/getGoodsRequest").
      then((res)=>{
        this.goodsApplyData = res.data;
        console.log(res.data)
      })
    },

  }
}
</script>
<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>