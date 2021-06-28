<template>
    <div id="shopping-cart" class="page-shopping-cart">
        <h4 class="cart-title">购物清单</h4>
        <div class="cart-product-title clearfix">
            <div class="td-product fl">商品</div>
            <div class="td-num fl">数量</div>
            <div class="td-price fl">单价(元)</div>
            <div class="td-total fl">金额(元)</div>
            <div class="td-do fl">操作</div>
        </div>

        <div  v-show="t1" style="height: 300px;text-align: center;margin-top: 150px">
          购物车空空如也，快去选购商品吧
        </div>
        <div class="cart-product clearfix" v-show="t2">
            <table>
                <tbody>
                <tr v-for='(item,index) in productList'>
                    <td class="td-product">

                        <div style="position: absolute;left: 50px;margin-top: 0px;margin-bottom: 10px">
                          <img :src="item.goods_firstP" width="120" height="98">
                          <div class="product-info">
                            <h6>{{item.goods_name}}</h6>
                            <p>品牌：{{item.enter_name}}</p>
                          </div>
                        </div>
                        <br><br><br><br>
                        <div class="clearfix"></div>
                      <br>
                    </td>
                    <td style="margin-left: 100px">
                        <el-input-number v-model="item.goods_count" @change="handleChange" :min="0" style="width: 120px" ></el-input-number>
                        <el-button style="margin-left: 10px" type="text" size="mini" @click="changeCount(item.goods_count,item.car_id)">修改</el-button>
                    </td>
                    <td class="td-price">
                        <p style="margin-left: 34px" class="red-text">￥<span>{{item.goods_currentPrice}}</span>.00</p>
                    </td>
                    <td class="td-total">
                        <p style="margin-left: 45px" class="red-text">￥<span>{{item.goods_currentPrice*item.goods_count}}</span>.00</p>
                    </td>
                    <td class="td-do">
                        <a  style="margin-left: 60px;color: #409EFF" class="product-delete" @click='deleteOneProduct(item.car_id)'> <span class="el-icon-delete"></span>删除</a>
                        <a  style="margin-left:4px;color: red" class="product-delete" @click='buyOneProduct(item.car_id)'> <span class="el-icon-delete"></span>确定</a>
                    </td>
                </tr>

                </tbody>
            </table>
        </div>

        <div class="cart-product-info">
            <a  class="keep-shopping" @click="toHome"><span class="el-icon-goods"></span>继续购物</a>
            <el-button class="fr btn-buy" @click="toBuy">去结算</el-button>
            <a class="fr product-total">￥<span>{{getTotal.totalPrice}}</span></a>
            <a class="fr check-num"><span>{{getTotal.totalNum}}</span>件商品总计（不含运费）:</a>
        </div>


    </div>
</template>

<script>
    export default {
        name: 'cart',
        created() {
            this.query()
        },
        data(){
            return{
                num:1,
                t1:'',
                t2: '',
                productList:''
            }

        },
        computed:{
            getTotal:function(){
                let totalPrice = 0;
                for (let i = 0; i <this.productList.length; i++) {
                    totalPrice += this.productList[i].goods_count * this.productList[i].goods_currentPrice;
                }
                totalPrice = totalPrice.toFixed(2)
                return{totalPrice:totalPrice}
            }

        },
        methods:{
            query(){
                let user =JSON.parse(sessionStorage.getItem("user"))
                let user_uuid = user.User_uuid
                this.axios.post("/user/getCar?userUuid="+user_uuid)
                    .then((res)=>{
                        this.productList = res.data
                        console.log(res.data)
                        console.log(this.productList)
                      if(this.productList.length ===0){
                        this.t1=1
                        this.t2=0;
                      }else{
                        this.t1=0;
                        this.t2=1;
                      }
                    })

            },
            handleChange(value) {
                console.log(value);

            },
            changeCount(count,car_id){
                console.log(count,car_id)
                 this.axios.post("/user/setGoodCount?goodCount="+count+"&carId="+car_id).
                 then((res)=>{
                   if(res.data==="success"){
                       this.query()
                   }
               })
            },


            deleteProduct:function(){
                this.productList =this.productList.filter(function(item){return !item.select})
            },
           /* 删除单件商品*/
            deleteOneProduct(car_id){
                this.axios.post("/user/deleteCar?carId="+car_id).
                then((res)=>{
                    if(res.data==="success"){
                        this.query()
                    }
                })
            },
            /*购买单件商品*/
            buyOneProduct(car_id){
                this.axios.post("/user/placeOrder3?carId="+car_id).
                then((res)=>{
                    if(res.data==="null"){
                        this.$message.error("当前购物车无商品")
                    }else if(res.data==="error1"){
                        this.$message.error("未知错误")
                    }else if(res.data==="error2"){
                        this.$message.error("库存不足")
                    }else if(res.data==="error3"){
                        this.$message.error("余额不足，请充值")
                    }
                    else{
                      let user =JSON.parse(sessionStorage.getItem("user"))
                      let user_uuid = user.User_uuid
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
                        this.query()
                    }
                })
            },

            toBuy(){
                let user =JSON.parse(sessionStorage.getItem("user"))
                let user_uuid = user.User_uuid
                this.axios.post("/user/placeOrder2?userUuid="+user_uuid).
                then((res)=>{
                    let returnType=null;
                    for(let i=0; i<this.productList.length; i++){
                        let name = this.productList[i].goods_name
                        returnType = res.data[name]
                        if(returnType==="error"){
                          this.$message.error("未知错误");
                        }else if(returnType==="error2"){
                          this.$message.error(name+"商品库存不足，无法购买")
                        }else if(returnType==="error3"){
                          this.$message.error(name+"商品购买失败：原因：余额不足")
                        }else{
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
                          this.query()
                        }

                    }
                })
            },
          toHome(){
            this.$router.push({path: '/home'})
          }

        },

    };
</script>

<style scoped>
    .fl{
        float: left;
    }
    .fr{
        float: right;
    }
    blockquote, body, dd, div, dl, dt, fieldset, form, h1, h2, h3, h4, h5, h6, img, input, li, ol, p, table, td, textarea, th, ul {
        margin: 0;
        padding: 0;
    }
    .clearfix{
        zoom: 1;
    }
    .clearfix:after {
        clear: both;
    }
    .clearfix:after {
        content: '.';
        display: block;
        overflow: hidden;
        visibility: hidden;
        font-size: 0;
        line-height: 0;
        width: 0;
        height: 0;
    }
    a{
        text-decoration: none;
        color: #333;
    }
    img{vertical-align: middle;}
    .page-shopping-cart{
        width: 1400px;
        margin:0px auto;
        font-size: 14px;
        border:1px solid #e3e3e3;
        border-top:2px solid #317ee7;
    }
    .page-shopping-cart .cart-title{
        color:#317ee7;
        font-size: 16px;
        text-align: left;
        padding-left: 20px;
        line-height: 68px;
    }
    .page-shopping-cart .red-text {
        color: #e94826;
    }
    .page-shopping-cart .check-span{
        display: block;
        width: 24px;
        height: 25px;
        margin-top: 9px;
        background: url('https://t1.picb.cc/uploads/2021/05/12/Zo330D.png') no-repeat 0 -0px;

    }

    .page-shopping-cart .td-check{
        width:70px;
    }
    .page-shopping-cart .td-product{
        width:460px;
    }
    .page-shopping-cart .td-num, .page-shopping-cart .td-price, .page-shopping-cart .td-total{
        width:255px;
        left:-50px ;
    }
    .page-shopping-cart .td-do{
        width:150px;
    }
    .cart-product-title{
        text-align: center;
        height: 38px;
        line-height: 38px;
        padding: 0 20px;
        background-color: #f7f7f7;
        border-top: 1px solid #e3e3e3;
        border-bottom: 1px solid #e3e3e3;
    }
    .cart-product-title .td-product{
        text-align: center;
        font-size: 14px;
        margin-left: -100px;
    }
    .cart-product-title .td-check{
        text-align: left;
    }
    .cart-product-title .td-check .check-span .check-span{
        margin:9px 6px 0 0;
    }

    .cart-product{
        padding: 0 20px;
        text-align: center;
    }
    .cart-product table{
        width: 100%;
        text-align: center;
        font-size: 14px;
        margin-left: -100px;
    }
    .cart-product table td{
        padding: 20px 0;
    }
    .cart-product table tr{
        border-bottom:1px dashed #e3e3e3;
    }
    .cart-product table tr:last-child{
        border-bottom:none;
    }
    .cart-product table .product-num{
        border: 1px solid #e3e3e3;
        display: inline-block;
        text-align: center;
    }

    .cart-product table .product-num .num-reduce span{
        display: block;
        width: 6px;
        height: 2px;
        margin:30px auto 0 auto;
    }
    .cart-product table .product-num .num-add span{
        display: block;
        width: 8px;
        height: 8px;
        margin:10px auto 0 auto;

    }

    .cart-product table .td-product{
        text-align: center;
        font-size: 12px;
        line-height: 20px;
    }
    .cart-product table .td-product img{
        border:1px solid #e3e3e3;
        margin-right: 10px;
    }
    .cart-product table .td-product .product-info{
        display: inline-block;
        vertical-align: middle;
        text-align: left;
        width: 200px;
        left: 80px;
    }
    .cart-product table .td-do{
        font-size: 12px;
        margin-left: 30px;
    }


    .cart-product-info{
        height:50px;
        line-height: 50px;
        background: #f7f7f7;
        padding-left: 20px;
    }

    .cart-product-info .delete-product span{
        display: inline-block;
        vertical-align: top;
        margin:18px 8px 0 0;
        width:13px;
        height: 15px;

    }
    .cart-product-info .product-total{
        font-size: 14px;
        color:#e94826;
    }
    .cart-product-info .product-total span{
        font-size: 20px;
    }
    .cart-product-info .check-num{
        color:#333;
    }
    .cart-product-info .check-num span{
        color: #e94826;
    }
    .cart-product-info .keep-shopping{
        color: #666;
        margin-left: 40px;
    }
    .cart-product-info .keep-shopping span{
        display: inline-block;
        vertical-align: top;
        margin:18px 8px 0 0;
        width: 15px;
        height: 15px;

    }
    .cart-product-info .btn-buy{
        height: 50px;
        color: #fff;
        font-size: 20px;
        display: block;
        width: 110px;
        background: #ff7700;
        text-align: center;
        margin-left: 30px;
    }

    .page-shopping-cart .cart-worder .choose-worder span {
        display: inline-block;
        vertical-align: top;
        margin: 9px 10px 0 0;
        width: 22px;
        height: 22px;

    }

    .page-shopping-cart .cart-worder .worker-info img {
        border-radius: 100%;
        margin-right: 10px;
    }

    .page-shopping-cart .cart-worder .worker-info span {
        color: #000;
    }


    .choose-worker-box .box-title a {
        display: block;
        position: absolute;
        top: 15px;
        right: 16px;
        width: 10px;
        height: 10px;

    }
    .choose-worker-box .box-title a:hover {

    }

    .choose-worker-box .worker-list li {
        float: left;
        width: 25%;
        text-align: center;
        margin-bottom: 30px; }
    .choose-worker-box .worker-list li p {
        margin-top: 8px; }
    .choose-worker-box .worker-list li.cur a {
        color: #f70; }
    .choose-worker-box .worker-list li.cur a img {
        border: 1px solid #f70; }
    .choose-worker-box .worker-list li a:hover {
        color: #f70; }
    .choose-worker-box .worker-list li a:hover img {
        border: 1px solid #f70; }
    .choose-worker-box .worker-list li img {
        border: 1px solid #fff;
        border-radius: 100%; }
</style>
