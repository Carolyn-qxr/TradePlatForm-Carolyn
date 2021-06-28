<template>
  <div class="goods-buy">
    <AppHeader></AppHeader>
    <div class="user-body">
      <span class="user-title">确认订单信息</span>
      <el-divider class="user-divider"></el-divider>
      <el-card class="user-card">
        <p>店铺宝贝：{{this.goods_List.Goods_name}}</p >
        <p>单价：{{this.goods_List.Goods_currentPrice}}</p >
        <p>数量：
          <el-input-number v-model="num" :step="1" @change="handleChange" :min="1" :max="10" label="描述文字" size="small"></el-input-number>
        </p >
        <p>小计：<span style="color: red;font-size: 20px;font-weight: 600">{{this.goods_List.Goods_currentPrice*num}}</span></p >
        <div style="margin-top: 30px">
          <el-button style="background: #409EFF;color: #fff" round size="medium" @click="submitBuy">提交订单</el-button>
          <el-button style="background: #FF7F50;color: #fff" round size="medium" @click="cancel">取消购买</el-button>
        </div>
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
                num: 1,
                goods_List:'',
            }
        },
        created() {
          this.goods_List = JSON.parse(sessionStorage.getItem("goodsDetail"))
        },
        methods: {
            submitBuy(){
              let user = JSON.parse(sessionStorage.getItem("user"))
              let goods = JSON.parse(sessionStorage.getItem("goodsDetail"))
              this.axios.post("/user/placeOrder1?goodsUuid="+goods.Goods_uuid+"&userUuid="+user.User_uuid+"&dealCount="+this.num).
              then((res)=>{
                console.log(this.num)
                if(res.data==="error2"){
                  this.$message.error("商品库存不足，无法购买")
                  this.$router.push({path: 'goodsDetail'})
                }else if(res.data==="error3"){
                  this.$message.error("余额不足，请充值")
                }else if(res.data==="success"){
                  this.$confirm('购买成功！请前往评价,', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'success'
                  }).then(() => {
                    this.$router.push({path: '/userOrders'})
                  }).catch(() => {
                    this.$message({
                      type: 'info',
                      message: '已取消'
                    });
                  });
                }
              })

            },
            cancel(){
                this.$router.push({path: '/goodsDetail'})
            }


        }
    }
</script>
<style>
.user-body{
  width: 102%;
  height: 100%;
  left: -20px;
  position: absolute;
  top: 8%;
  background: url("../../../assets/shoppingMall.png");
}
.user-divider{
  position: absolute;
  top: 40px;
  width: 80%;
  margin-left: 10%;
}
.user-title{
  position: absolute;
  left: 12%;
  font-size: 20px;
  color: #fff;
  margin-top: 2.5%;

}
.user-card{
  position: absolute;
  width: 80%;
  height: 70%;
  top: 80px;
  left: 10%;
  border-radius: 20px;
  background-color: rgba(255,250, 250, 0.3);
}
.user-foot{
  position: absolute;
  top: 93%;
  left: 43%;
  font-size: 18px;
}
</style>