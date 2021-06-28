<template>
  <div class="body">
    <div class="goods-manage-header">
      <el-button type="primary" @click="showTable1" class="btn1"
                 :class="showmode ? 'active' : 'btn1'" size="mini">已上架</el-button>
      <el-button type="primary" @click="showTable2" class="btn2"
                 :class="!showmode ? 'active' : 'btn2'" size="mini">已下架</el-button>
    </div>
    <el-table style="margin-top:-40px;height: 100%;width: 96.5%;left: 0px"
              :data="data1" v-show="t1" >
      <el-table-column prop="Goods_name" label="商品名称" align="center"></el-table-column>
      <el-table-column prop="Goods_type" label="商品类别" align="center"></el-table-column>
      <el-table-column prop="Goods_price" label="商品价格" align="center"></el-table-column>
      <el-table-column prop="Goods_flag" label="商品状态" align="center"></el-table-column>
      <el-table-column prop="Goods_score" label="评分" align="center" width="100px"></el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button type="text" @click="xiajia(scope.$index,scope.row)" style="color: red">下架</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-table style="margin-top:-40px;height: 100%;width: 96.5%;left: 0px"
              :data="data2" v-show="t2" >
      <el-table-column prop="Goods_name" label="商品名称" align="center"></el-table-column>
      <el-table-column prop="Goods_type" label="商品类别" align="center"></el-table-column>
      <el-table-column prop="Goods_price" label="商品价格" align="center"></el-table-column>
      <el-table-column prop="Goods_flag" label="商品状态" align="center"></el-table-column>
      <el-table-column prop="Goods_stock" label="商品库存" align="center"></el-table-column>
      <el-table-column prop="Goods_score" label="评分" align="center" width="100px"></el-table-column>
      <el-table-column prop="Goods_praise_rate" label="好评度" align="center" width="100px"></el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data(){
    return{
      t1:1,
      t2:0,
      showmode: true,
      activeName: 'second',
      data1: [],
      data2: [],

    }
  },
  created() {
    this.queryTable();
  },
  methods:{
    queryTable(){
      let enter = JSON.parse(sessionStorage.getItem("enter"))
      let enter_uuid = enter.Enter_uuid
      this.axios.post("enter/onSaleGoods?enterUuid="+enter_uuid).
      then((res)=>{
        if(res.data.flag==="success"){
          this.data1 = res.data.goodsList
          for(var i = 0; i<this.data1.length;i++){
            this.data1[i].Goods_flag = '已上架'
            this.data1[i].Goods_score =this.data1[i].Goods_score.toFixed(2)
          }


        }else{
          this.data1=null
        }
      });
      this.axios.post("/enter/droppedGoods?enterUuid="+enter_uuid).
      then((res)=>{
        if(res.data.flag==="success"){
          console.log(res.data)
          this.data2 = res.data.goodsList
          for(var i = 0; i<this.data2.length;i++){
            this.data2[i].Goods_flag = '已下架'
            this.data2[i].Goods_score =this.data2[i].Goods_score.toFixed(2)
            this.data2[i].Goods_praise_rate = this.data2[i].Goods_praise_rate+"%"
          }
        }else{
          this.data2=null
        }
      });

    },
    showTable1(){
      this.t1=1;
      this.t2=0
      this.showmode = true;
    },
    showTable2(){
      this.t1=0;
      this.t2=1
      this.showmode = false
    },
    xiajia(index,row){
      this.$confirm('确定下架该商品,是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.post("/enter/dropGoods?goodsName="+row.Goods_name).
        then((res)=>{
          if(res.data==="success"){
            this.$message.success('已下架该商品')
            this.queryTable()
          }else{
            this.$message.error("错误操作")
          }
        })

      }).catch(() => {
        this.$message.info('已取消')
      });
    },
  }
}
</script>

<style>
.goods-manage-header{
  position: absolute;
  top: -15px;
  width: 100%;
  height: 40px;
  background: #fff;
  box-shadow:2px 2px 5px gray;
}

</style>