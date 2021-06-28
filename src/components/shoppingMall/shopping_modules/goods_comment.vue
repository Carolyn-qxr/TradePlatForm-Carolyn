<template>
    <div class="goods-comment">
        <AppHeader></AppHeader>
        <div class="user-body">
            <span class="user-title">请进行打分</span>
            <el-divider class="user-divider"></el-divider>
            <el-card class="user-card">
               <div style="margin-left: 30px">
                   <h4>请对商品进行打分</h4>
                   <div class="block">
                       <el-rate
                               v-model="goodsRateValue"
                               :colors="colors">
                       </el-rate>
                   </div>
                   <h4>请对商家服务进行打分</h4>
                   <div class="block">
                       <el-rate
                               v-model="enterRateValue"
                               :colors="colors">
                       </el-rate>
                   </div>
                 <h4>请对商品进行评论</h4>
                 <el-input type="textarea" :rows="3" placeholder="在此处填写你的评论" v-model="textarea" style="width:500px"></el-input>
                   <div style="margin-top: 30px">
                       <el-button style="background: #409EFF;color: #fff" round size="medium" @click="submitRate">提交</el-button>
                   </div>
               </div>
            </el-card>
        </div>
        <div class="buy-foot">
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
                textarea: '',
                goodsRateValue: null,
                enterRateValue: null,
                colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
                goods_List:'',
            }
        },
        created() {

        },
        methods: {
            submitRate(){
              let deal_uuid = sessionStorage.getItem("deal_uuid")
              if(this.goodsRateValue!=="0" && this.enterRateValue!=="0"){
                let user = JSON.parse(sessionStorage.getItem("user"))
                let user_uuid = user.User_uuid
                this.axios.post("/user/assessGoods?dealUuid="+deal_uuid+"&goodsScore="+this.goodsRateValue+
                    "&commentContent="+this.textarea+"&enterScore="+this.enterRateValue)
                    .then((res)=>{
                      if(res.data==="success"){
                        this.$confirm('评价成功！请返回首页,', '提示', {
                          confirmButtonText: '确定',
                          cancelButtonText: '取消',
                          type: 'success'
                        }).then(() => {
                          this.$router.push({path: '/home'})
                        }).catch(() => {
                          this.$message({
                            type: 'info',
                            message: '已取消'
                          });
                        });
                      }else{
                        this.$message.error("出现未知错误")
                      }
                    })

              }else{
                this.$message.warning("分数不可以为0哦～")
              }

            },



        }
    }
</script>
<style>
    .comment-body{
        width: 80%;
        height: 80%;
        position: absolute;
        top: 10%;
        left: 10%;
    }
    .divider-comment{
        position: absolute;
        top: 40px;
        width: 100%;
    }
    .card-comment{
        position: absolute;
        width: 98%;
        height: 70%;
        top: 80px;
        left: 0%;
        border-radius: 20px;
    }
    .buy-foot{
        position: absolute;
        top: 90%;
        left: 43%;
        font-size: 18px;
    }
</style>