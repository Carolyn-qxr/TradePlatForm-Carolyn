<template>
    <div class="goods-detail">
        <AppHeader></AppHeader>
        <div class="background">
            <el-image :src="img_car" class="img-car"></el-image>
            <div class="title-text">您的需求就是我的需求，您的满意就是我的满意！</div>
            <div class="goods">
                <div class="goods-header">
                    <div class="img-goods">
                        <el-carousel :autoplay="false" height="500px" style="width: 600px">
                            <el-carousel-item v-for="item in goods_List.Goods_picture" :key="item">
                                <el-image :src="item" style="height: 500px;width: 600px"></el-image>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                    <div class="goods-detail-text">
                        <div class="goods-name-text">{{this.goods_List.Goods_name}}</div>

                        <span class="goods-currentPrice-text">¥{{"\xa0"+this.goods_List.Goods_currentPrice.toFixed(2)}}</span>

                        <span class="goods-price-text">¥{{"\xa0"+this.goods_List.Goods_price.toFixed(2)}}</span><br><br>

                        <el-button size="mini" class="button" round @click="toEnterShop">店家</el-button>
                        <span class="text-goods">{{this.goods_List.Enter_name}}</span><br>

                        <el-button size="mini" class="button" round>分类</el-button>
                        <span class="text-goods">{{this.goods_List.Goods_type}}</span><br>

                        <el-button size="mini" class="button" round>能否议价</el-button>
                        <span class="text-goods">{{this.goods_List.Goods_bargain}}</span><br>

                        <el-button size="small" class="button" round>销量</el-button>
                        <span class="text-goods">{{this.goods_List.Goods_volume}}</span><br>

                        <el-button class="button-buy" round @click="toBuy">立即购买</el-button>
                        <el-button class="button" round @click="addCart">加入购物车</el-button>
                    </div>
                    <div class="option">
                        <div>
                            <el-button type="text">
                                <span class="font-color" @click="showDetail">详情</span>
                            </el-button>
                            <el-button type="text"  style="margin-left: 60px">
                                <span class="font-color" @click="showComment">评论</span></el-button>
                        </div>
                    </div>
                </div>
                <el-card v-show="t1" class="card">
                    <div style="margin-top: -25px">
                        <el-divider content-position="left" >
                            <span style="font-size: 18px;color: #606266">商品详情</span>
                        </el-divider>
                    </div>
                    <span style="margin-left: 420px;font-size: 18px">{{this.goods_List.goods_name}}</span><br><br>
                    <el-carousel :autoplay="false" height="390px" style="width: 600px;margin-left: 250px;margin-top: -30px">
                        <el-carousel-item v-for="item in goods_List.Goods_picture" :key="item">
                            <el-image :src="item" style="height: 390px;width: 600px"></el-image>
                        </el-carousel-item>
                    </el-carousel>
                    <div class="goods-detail">
                        <span style="position: relative;margin-left: 20px;top: 50px;font-weight: 600;color: #606266;">产品参数</span>
                        <el-row style="top: 70px;margin-left:20px">
                            <span>品牌：{{this.goods_List.Enter_name}}</span><br>
                            <span>功能：无</span><br>
                            <span>材质：其他</span><br>
                            <span>尺寸：{{this.goods_List.Goods_size}}</span><br>
                            <span>库存：{{this.goods_List.Goods_stock}}</span><br>
                            <span>类型：{{this.goods_List.Goods_type}}</span><br>
                            <span>状态：{{this.goods_List.Goods_state}}</span><br>
                            <span>是否议价：{{this.goods_List.Goods_bargain}}</span><br>
                            <span>销量：{{this.goods_List.Goods_volume}}</span><br>
                            <span>评分：{{this.goods_List.Goods_score}}</span><br>
                            <span>好评率：{{this.goods_List.Goods_praise_rate}}</span><br>
                            <span>描述：{{this.goods_List.Goods_introduction}}</span><br>
                        </el-row>
                    </div>
                </el-card>
                <div class="foot">
                    校园二手交易平台
                </div>
                <el-card v-show="t2" class="card">
                    <div style="margin-top: -25px">
                        <el-divider content-position="left" >
                            <span style="font-size: 18px;color: #606266">商品评论</span>
                        </el-divider>
                    </div>
                    <div class="comment">
                        <div style="font-size: 30px;color: #ff9900;font-weight: 600;margin-left: 25px" >
                            {{this.goods_List.Goods_score}}分</div>
                        <div class="rate">
                          <el-rate
                              v-model="this.goods_List.Goods_score"
                              disabled
                              text-color="#ff9900">
                          </el-rate>
                            <el-divider></el-divider>
                        </div>
                        <div v-for="item in goods_List.Goods_comment" :key="item">
                            <el-card style="margin-top: 20px">
                                <p>用户：{{item.user_Name}}</p>
                                <p>{{item.Comment_content}}</p>
                                <p>{{item.Comment_time}}</p>
                            </el-card>
                        </div>
                    </div>
                </el-card>
            </div>
            <el-divider class="divider"></el-divider>
           <el-dialog
              title="提示"
              :visible.sync="dialogVisible"
              width="30%">
            <span style="margin-top: -20px">请选择购买数量:</span>
            <el-input-number v-model="goods_count" @change="handleChange" :min="1" :max="10" label="请选择" size="mini" style="width: 100px;margin-left: 20px"></el-input-number>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" size="medium">取 消</el-button>
                <el-button type="primary" size="medium" @click="AddCartConfirm">确 定</el-button>
            </span>
          </el-dialog>


        </div>
    </div>
</template>

<script>
    import AppHeader from "./AppHeader";
    export default {
        components:{
            AppHeader,
        },
        created() {
            this.goods_name = sessionStorage.getItem("goodsDetailName")
            this.axios.post("/shop/getGoodsDetail?goodsName="+this.goods_name).
            then((res)=>{
                this.goods_List = res.data
                sessionStorage.setItem("goodsDetail",JSON.stringify(res.data))
                this.goods_List.Goods_praise_rate = this.goods_List.Goods_praise_rate+"%"
                 this.goods_List.Goods_score = this.goods_List.Goods_score.toFixed(2)
            })

        },
        data(){
            return{
                goods_name: '',
                img_car:'https://cdn.jsdelivr.net/gh/Carolyn-qxr/image-bucket/货车.png',
                activeName: 'second',
                t1:1,
                t2:0,
                goods_List:{},
                dialogVisible: false,
                goods_count :1,
              value:0.0,
            }
        },
        methods:{
            handleClick(tab, event) {
                console.log(tab, event);
            },
            showDetail(){
                this.t1=1
                this.t2=0
            },
            showComment(){
                this.t1=0;
                this.t2=1
            },
            toEnterShop(){
              this.$router.push({path: '/enterShop'})
            },
            toBuy(){
                let userLoginState = sessionStorage.getItem("userLoginState")
                let enterLoginState = sessionStorage.getItem("enterLoginState")
                if(userLoginState==="true"){
                    this.$router.push({path: '/goodsBuy'})
                }else{
                    if(enterLoginState==="true"){
                        this.$confirm('当前为商家登录，用户登录才可购买商品,请前往登录','提示',{
                            confirmButtonText: '确定' ,
                            cancelButtonText: '取消',
                            type:"warning"
                        }).then(()=>{
                            localStorage.removeItem("enter")
                            this.$router.push({path: '/login'})
                        }).catch(()=>{
                        })
                    }else{
                        this.$confirm('当前未登录,用户登录才可购买商品，请前往登录','提示',{
                            confirmButtonText: '确定' ,
                            cancelButtonText: '取消',
                            type:"warning"
                        }).then(()=>{
                            this.$router.push({path: '/login'})
                        }).catch(()=>{
                        })
                    }

                }
            },
          addCart(){
            let userLoginState = sessionStorage.getItem("userLoginState")
            let enterLoginState = sessionStorage.getItem("enterLoginState")
            if(userLoginState==="true"){
              this.dialogVisible=true
            }else{
              if(enterLoginState==="true"){
                this.$confirm('当前为商家登录，用户登录才可加入购物车,请前往登录','提示',{
                  confirmButtonText: '确定' ,
                  cancelButtonText: '取消',
                  type:"warning"
                }).then(()=>{
                  localStorage.removeItem("enter")
                  this.$router.push({path: '/login'})
                }).catch(()=>{
                })
              }else{
                this.$confirm('当前未登录,用户登录才可加入购物车，请前往登录','提示',{
                  confirmButtonText: '确定' ,
                  cancelButtonText: '取消',
                  type:"warning"
                }).then(()=>{
                  this.$router.push({path: '/login'})
                }).catch(()=>{
                })
              }
            }
          },
          AddCartConfirm(){
            this.dialogVisible = false
            let user =JSON.parse(sessionStorage.getItem("user"))
            let user_uuid = user.User_uuid
            console.log(user_uuid)
            this.axios.post("user/insertCar?goodsUuid="+this.goods_List.Goods_uuid+"&userUuid="+user_uuid+"&goodCount="+this.goods_count).
            then((res)=>{
              console.log(res.data)
              if(res.data==="success"){
                this.$message.success("加购成功！")
              }else if(res.data==="error"){
                this.$message.error("获取不到商品信息或用户信息")
              }else if(res.data==="error1"){
                this.$message.error("库存不足！")
              }
            })
          }

        },
    }
</script>
<style>
    .background{
        position: absolute;
        background: #F5F5F5;
        height: 150%;
        width: 100%;
        left: 0px;
    }
    .img-car{
        position: absolute;
        width: 30px;
        height: 30px;
        margin-top: 2.6%;
        margin-left: 37%;
    }
    .title-text{
        margin-top: 3%;
        margin-left: 40%;
        color: #606266;
        font-size: 15px;
    }
    .goods{
        position: absolute;
        top: 6%;
        width: 100%;
        height: 100%;
        background: #fff;
    }
    .goods-header{
        position: absolute;
        top: 1%;
        left: 14%;
        width: 75%;
        height: 35%;
    }
    .img-goods{
        width: 650px;
        height: 370px;
    }
    .goods-detail-text{
        position: absolute;
        left: 650px;
        top: 10px;
        width: 300px;
        height: 350px;
    }
    .option{
        margin-top: 130px;
        margin-left: 360px;
        width: 210px;
        height: 25px;
    }
    .divider{
        width: 90%;
        margin-top: 39%;
        margin-left: 4%;
    }
    .card{
        position: absolute;
        margin-top: 40%;
        margin-left: 8%;
        height: 87%;
        width: 85%;

    }
    .font-color{
        color: #606266;
        font-size: 14px;
    }
    .goods-name-text{
        margin-top: 30px;
        margin-left: 20px;
        font-size: 23px;
        font-weight: 600;
    }
    .goods-currentPrice-text{
        color: #FF4500;
        float: left;
        font-size: 22px;
        margin-top: 10px;
        margin-left: 20px;
    }
    .goods-price-text{
        font-size: 14px;
        color: #909399;
        text-decoration: line-through;
        margin-top: 18px;
        float: left;
        margin-left: 10px;

    }
    .button{
        background:	#008B8B;
        color: #ffffff;
        margin-top: 10px;
        margin-left: 17px;
    }
    .text-goods{
        position: relative;
        font-size: 15px;
        top:2px;
        margin-left: 12px;
        color: #606266;
    }
    .button-buy{
        margin-top: 20px;
        margin-left: 15px;
        color: #fff;
        background:#FF7F50
    }
    .goods-detail{
        width: 650px;
        height: 400px;
        margin-left: 220px;
        margin-top: 20px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    }
    .foot{
        position: absolute;
        top: 137%;
        left: 43%;
        font-size: 18px;

    }
    .comment{
        width: 90%;
        height: 800px;
        margin-left: 20px;
    }
    .rate{
        width: 90%;
        height: 7%;
    }
</style>