<template>
  <div class="main-container">
    <div class="main-content">
      <el-image :src="img_car" class="app-body-img-car"></el-image>
      <div class="app-body-title-text">您的需求就是我的需求，您的满意就是我的满意！</div>
      <el-carousel trigger="click" height="620px" style="width: 90%;margin-left:3.5%;margin-top: 8px"  >
        <el-carousel-item v-for="item in imgList" :key="item">
          <el-image :src="item.goods_firstP" style="height: 620px;width: 100%" @click="toGoodsDetail(item.goods_name)"></el-image>
        </el-carousel-item>
      </el-carousel>
      <div class="fenglei">
        <el-button  size="medium" class="fenglei-btn" @click="query">全部</el-button>
        <el-button  size="medium" class="fenglei-btn" @click="shu">书籍</el-button>
        <el-button  size="medium" class="fenglei-btn" @click="yifu">衣服</el-button>
        <el-button  size="medium" class="fenglei-btn" @click="xie">鞋</el-button>
        <el-button  size="medium" class="fenglei-btn" @click="shuma">数码</el-button>
        <el-button  size="medium" class="fenglei-btn" @click="shipin">食品</el-button>
      </div>
      <el-divider class="app-header-divider"></el-divider>
      <div class="goods-show">
        <el-container style="margin-left: 100px">
          <div style="width: 95%;height: 800px;margin-left: -70px">
            <el-col span="600" v-for="item in goods_List" :key="item">
              <el-card class="card">
                <el-image :src="item.goods_firstP"
                          style="width: 300px;height: 200px;margin-left: -20px;margin-top: -20px"
                          @click="toGoodsDetail(item.goods_name)">
                </el-image>
                <div style="margin-top: 10px;margin-left: -10px">
                  <span>{{item.goods_name}}</span>
                  <span class="currentPrice-text">¥{{"\xa0"+item.goods_currentPrice.toFixed(2)}}</span>
                  <span class="price-text">¥{{"\xa0"+item.goods_price}}</span><br>
                  <span class="enter-text">商家：{{item.enter_name}}</span>
                  <span class="volume-text">销量：{{item.goods_volume}}</span>
                  <span class="praise-rate-text">好评率:{{item.goods_praise_rate}}%</span>
                </div>
              </el-card>
            </el-col>
          </div>
        </el-container>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageBody",
  created() {
    this.query()
  },
  data(){
    return{
      img_car:'https://cdn.jsdelivr.net/gh/Carolyn-qxr/image-bucket/货车.png',
      imgList:[],
      goods_List:[]
    }
  },
  methods: {
    query(){
      this.axios.get("/shop/getGoodsOnSale").
      then((res)=>{
        this.goods_List = res.data
        console.log(this.goods_List)
      })
      this.axios.get("/shop/getLunbotu").
      then((res)=>{
        this.imgList = res.data
      })
    },
    toGoodsDetail(goodsName){
      sessionStorage.setItem("goodsDetailName",goodsName);
      this.$router.push({path: '/goodsDetail'})
    },
    shu(){
      this.axios.post("/shop/getGoodsByType?goodsType=书")
          .then((res)=>{
            this.goods_List = res.data
          })
    },
    yifu(){
      this.axios.post("/shop/getGoodsByType?goodsType=衣服")
          .then((res)=>{
            this.goods_List = res.data
          })
    },
    xie(){
      this.axios.post("/shop/getGoodsByType?goodsType=鞋")
          .then((res)=>{
            this.goods_List = res.data
          })
    },
    shuma(){
      this.axios.post("/shop/getGoodsByType?goodsType=数码")
          .then((res)=>{
            this.goods_List = res.data
          })

    },
    shipin(){
      this.axios.post("/shop/getGoodsByType?goodsType=食品")
          .then((res)=>{
            this.goods_List = res.data
          })
    }
  }
}
</script>

<style scoped>
.main-container{
  position: absolute;
  top: 51px;
  left: 0px;
  height: 380%;
  width: 100%;
  background:#F0F8FF;
  min-height: 90vh;
}

.main-content{
  position: absolute;
  left: -10px;
  width: 105%;
  top: 2.5%;
  min-height: 90vh;

}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
.goods-show{
  position: absolute;
  top: 100%;
  width: 100%;
  height: 130%;
  margin-left: 33px;
}
.card{
  position: relative;
  height: 350px;
  width:300px;
  margin-left: 30px;
  margin-top: 20px;
  border-radius: 20px;
  background-color: rgba(255,250, 250, 0.5);
}
.price-text{
  float: right;
  font-size: 14px;
  color: #909399;
  text-decoration: line-through;
  margin-right: 5px;
  margin-top: 2px;
}
.currentPrice-text{
  float: right;
  color: #df5000;
}
.enter-text{
  position: absolute;
  font-size: 14px;
  color: #606266;
  top: 325px;
}
.volume-text{
  position: absolute;
  font-size: 14px;
  color: #606266;
  top: 325px;
  left: 140px;
}
.praise-rate-text{
  position: absolute;
  font-size: 14px;
  color: #606266;
  top: 325px;
  left: 210px;
  color: #409EFF;
}
.app-body-img-car{
  position: absolute;
  width: 30px;
  height: 30px;
  margin-top: -2.4%;
  margin-left: 36%;
}
.app-body-title-text{
  margin-top: -2.0%;
  margin-left: 39%;
  color: #606266;
  font-size: 15px;
}
.fenglei{
  position: absolute;
  width: 80%;
  height: 50px;
  margin-left: 115px;
  margin-top: 1%;
}
.fenglei-btn{

  background: #fff;
  margin-left: 0px;
  color: #606266;
  width: 70px;
}
.app-header-divider{
  position:absolute;
  margin-left: 8%;
  width: 80%;
  margin-top: 3.6%
}
</style>