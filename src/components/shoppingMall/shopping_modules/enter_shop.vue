<template>
    <div class="enter-shop">
        <AppHeader></AppHeader>
        <div class="enter-shop-body">
            <div class="enter-shop-body-header">
                <span class=enter-shop-title>{{enter.enter_name}}</span>
                <span class="enter-shop-grade">店铺等级：{{enter.enter_grade}}</span>
              <span class="enter-shop-count">店铺销量：{{enter.enter_deal_count}}</span>
                <div class="enter-shop-score"><span>综合好评：{{enter.enter_score}}
                    <el-rate v-model="enter.enter_score" disabled style="width: 120px">
                    </el-rate></span>
                </div>
            </div>
            <el-divider class="enter-shop-divider"></el-divider>
            <el-card class="enter-shop-card" style="color: #fff" v-show="t1">
              <div style="margin-left: 80%">
                <el-button type="primary" size="mini" @click="showGoods2"  class="btn-style" plain>已下架</el-button>
                <el-button type="primary" size="mini" @click="showGoods1" class="btn-style" plain>已上架</el-button>

              </div>
                <el-col span="200" v-for="item in goods_List1" :key="item">
                    <div class="enter-shop-goods-card">
                        <el-image :src="item.goods_firstP" style="width:230px;height: 200px" @click="shopToGoodsDetail(item.goods_name)"></el-image>
                      <span style="color: #404040;">{{item.goods_name}}</span><br>
                      <span class="enter-shop-currentPrice">¥{{item.goods_currentPrice.toFixed(2)}}</span>
                      <span class="enter-shop-price">¥{{item.goods_price}}</span>
                    </div>
                  <br><br>
                </el-col>
              <br><br><br>
            </el-card>
          <el-card class="enter-shop-card" style="color: #fff" v-show="t2">
            <div style="margin-left: 80%">
              <el-button type="primary" size="mini" @click="showGoods2"  class="btn-style" plain>已下架</el-button>
              <el-button type="primary" size="mini" @click="showGoods1" class="btn-style" plain>已上架</el-button>

            </div>
            <el-col span="200" v-for="item in goods_List2" :key="item">
              <div class="enter-shop-goods-card">
                <el-image :src="item.goods_firstP" style="width:230px;height: 200px" @click="shopToGoodsDetail(item.goods_name)"></el-image>
                <span style="color: #404040;">{{item.goods_name}}</span><br>
                <span class="enter-shop-currentPrice">¥{{item.goods_currentPrice}}</span>
                <span class="enter-shop-price">¥{{item.goods_price}}</span>
              </div>
            </el-col>
          </el-card>
        </div>

        <div class="enter-shop-foot">
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
                goods_List1: [],
                goods_List2:[],
                enter_List1: '',
                enter_List2:'',
                enter: [],
                t1:1,
                t2:0,
                goods_List:[],
            }
        },
        created() {
            this.goods_List=JSON.parse(sessionStorage.getItem("goodsDetail"))
            let enter_uuid = this.goods_List.Enter_uuid;
            console.log(enter_uuid)
            this.axios.post("/shop/EnterHomePage?enterUuid="+enter_uuid)
                .then((res)=>{
                  this.enter = res.data
                  this.goods_List = res.data.goods_List
                  this.enter.enter_score = this.enter.enter_score.toFixed(2)

                    for(let i=0,j=0,k=0;i<this.goods_List.length;i++){
                      if(this.goods_List[i].goods_flag===1){
                         this.goods_List1[j]=this.goods_List[i]
                         j++
                      }else{
                        this.goods_List2[k]=this.goods_List[i]
                        k++
                      }
                    }
                  console.log(this.goods_List2)


                })
        },
        methods: {
          test(){
            console.log(111)
          },
            shopToGoodsDetail(goodsName){
                sessionStorage.setItem("goodsDetailName",goodsName);
                this.$router.push({path: '/goodsDetail'})
            },
            showGoods1(){
              this.t1=1;
              this.t2=0;
            },
            showGoods2(){
              this.t1=0;
              this.t2=1;
            }
        }
    }
</script>
<style>
    .enter-shop-body{
        width:101%;
        height: 180%;
        position: absolute;
        top: 7%;
        margin-left: -1%;
        background: url("../../../assets/shoppingMall.png");
    }
    .enter-shop-body-header{
        position: absolute;
        top: 20px;
        width: 40%;
        height: 5%;
        left: 5%;
    }
    .enter-shop-divider{
        position: absolute;
        top: 110px;
        width: 90%;
        margin-left: 5%;
    }
    .enter-shop-title{
        position: absolute;
        left: 8.5%;
        font-size: 28px;
        color:	#FFDAB9;
        margin-top: 6%;

    }
    .enter-shop-card{
        position: absolute;
        width: 90%;
        height: 80%;
        top: 30px;
        left: 5%;
        border-radius: 20px;
        background-color: rgba(255,250, 250, 0.3);
    }
    .enter-shop-foot{
        position: absolute;
        top: 178%;
        left: 43%;
        font-size: 18px;
    }
    .enter-shop-grade{
        position: absolute;
        left: 40%;
        margin-top: 6%;
        font-size: 14px;
        color:#FFA07A ;
    }
    .enter-shop-count{
      position: absolute;
      left: 55%;
      margin-top: 6%;
      font-size: 14px;
      color:#FFA07A ;
    }
    .enter-shop-score{
        font-size: 14px;
        position: absolute;
        left: 40%;
        margin-top:10%;
        color:	#FFA07A;
    }
    .enter-shop-goods-card{
        width: 230px;
        height: 210px;
        margin-right: 40px;
        margin-top: 100px;
        margin-left: 40px;
        background-color: rgba(255,250, 250, 0);
    }
    .enter-shop-currentPrice{
        position: absolute;
        margin-left: 5px;
        margin-top: 5px;
        color: red;
    }
    .enter-shop-price{
        position: absolute;
        margin-left: 100px;
        margin-top: 5px;
        color: #606266;
        text-decoration: line-through;
    }

    .btn-style{
      position: absolute;
      margin-left: 6.5%;
      margin-top: 50px
    }
</style>