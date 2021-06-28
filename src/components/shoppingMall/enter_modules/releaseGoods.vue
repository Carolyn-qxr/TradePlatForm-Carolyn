<template>
  <div class="body">
    <el-form ref="productForm"
             :model="productForm"  :rules="goods_rule"
             style="position:absolute;left: 20px;top: 30px"
             label-width="80px;" inline="true">
      <el-form-item label="商品名称" prop="goods_name">
        <el-input v-model="productForm.goods_name" size="medium"></el-input>
      </el-form-item>
      <el-row>
        <el-form-item label="商品类别" prop="goods_type" >
          <el-select v-model="productForm.goods_type" size="medium">
            <el-option v-for="item in goodsType" :key="item.goods_type" :label="item.goods_type" :value="item.goods_type"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格" prop="goods_price" >
          <el-input v-model="productForm.goods_price" size="medium"></el-input>
        </el-form-item>
        <el-form-item label="商品折扣" prop="goods_discount" >
          <el-select v-model="productForm.goods_discount" size="medium">
            <el-option v-for="item in goodsDiscount" :key="item.goods_discount" :label="item.goods_discount" :value="item.goods_discount"></el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="尺寸大小" prop="goods_size" >
          <el-select v-model="productForm.goods_size" size="medium">
            <el-option v-for="item in goodsSize" :key="item.goods_size" :label="item.goods_size" :value="item.goods_size"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="允许议价" prop="goods_bargain">
          <el-select v-model="productForm.goods_bargain" size="medium">
            <el-option v-for="item in goodsBargain" :key="item.goods_bargain" :label="item.goods_bargain" :value="item.goods_bargain"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="新旧程度" prop="goods_state" >
          <el-select v-model="productForm.goods_state" size="medium">
            <el-option v-for="item in goodsState" :key="item.goods_state" :label="item.goods_state" :value="item.goods_state"></el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="商品数量" prop="goods_stock" >
          <el-input v-model="productForm.goods_stock" size="medium"></el-input>
        </el-form-item>
        <el-form-item label="使用说明" style="margin-left: 24px">
          <el-input v-model="productForm.goods_introduction" size="medium"></el-input>
        </el-form-item><br>
        <el-form-item label="商品图片" style="margin-left: 8px">
          <el-upload  action="/upload" list-type="picture-card" :auto-upload="false"
                      :http-request="goodsPicture" ref="upload">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </el-row>
      <el-row style="margin-left: 75px">
        <el-form-item>
          <el-button style="background: #409EFF;color: #fff;border-radius: 10px"   size="mini" @click="uploadPicture('productForm')">上传图片</el-button>
          <el-button style="background: #409EFF;color: #fff;border-radius: 10px" @click="onSubmit('productForm')" size="mini">创建</el-button>
          <el-button style="border-radius: 10px" @click="resetForm('productForm')" size="mini">清空</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  created() {
    this.enter = JSON.parse(sessionStorage.getItem("enter"))
    this.enterId = this.enter.Enter_uuid

  },
  data(){
    return{
      formData: '',
      enter: '',//存储当前登录的商家信息
      enterId: '',//存储当前登录的商家ID
      productForm: {
        goods_name: '',
        goods_type: '',
        goods_price: '',
        goods_stock: '',//库存
        goods_size: '',
        goods_introduction: '',
        goods_bargain:'',//是否允许议价 是，否
        goods_state: '',//新旧程度
        goods_discount: '',

      },
      goodsType: [
        {goods_type: '书'},{goods_type: '衣服'},{goods_type: '鞋'},{goods_type: '数码'},{goods_type: '食品'}
      ],
      goodsDiscount: [
        {goods_discount: 5},{goods_discount: 6},{goods_discount: 7},{goods_discount: 8},{goods_discount: 9}
      ],
      goodsSize: [
        {goods_size: '大'}, {goods_size: '中'}, {goods_size: '小'},
      ],
      goodsBargain: [{goods_bargain: '是'},{goods_bargain: '否'}],
      goodsState: [{goods_state: '全新'},{goods_state: '九成新'},{goods_state: '八成新'},{goods_state: '七成新'},{goods_state: '六成新'},{goods_state: '五成新'}],
      goods_rule:{
        goods_name: [{required: true,message: '商品名称为必填项',trigger: 'blur'}],
        goods_type: [{required: true,message: '商品类别为必选项',trigger: 'change'}],
        goods_price: [{required: true,message: '商品价格为必填项',trigger: 'blur'}],
        goods_discount: [{required: true,message: '商品折扣为必选项',trigger: 'blur'}],
        goods_size: [{required: true,message: '商品尺寸为必选项',trigger: 'blur'}],
        goods_bargain: [{required: true,message: '是否可以议价',trigger: 'blur'}],
        goods_state: [{required: true,message: '商品新旧程度为必选项',trigger: 'blur'}],
        goods_stock: [{required: true,message: '商品数量为必填项',trigger: 'blur'}],

      },
    }
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    goodsPicture(file){
      this.formData.append('goodsPhoto',file.file)
    },
    uploadPicture(formName){
      this.formData = new FormData();
      this.$refs.upload.submit();
      console.log(this.formData)
      this.$refs[formName].validate((valid)=>{
        if(valid){
          this.axios.post("/enter/uploadGoods?goodsName="+this.productForm.goods_name,this.formData).
          then((res)=>{
            if(res.data==="上传成功"){
              this.$message.success("照片上传成功")
            }
          });
        }else{
          return false
        }
      })
    },
    onSubmit(formName){
      this.$refs[formName].validate((valid)=>{
        if(valid){
          this.axios.post("/enter/goodsRequest?goodsName="+this.productForm.goods_name+"&goodsType="+this.productForm.goods_type+
              "&goodsPrice="+this.productForm.goods_price+"&goodsSize="+this.productForm.goods_size+
              "&goodsStock="+this.productForm.goods_stock+"&goodsIntroduction="+this.productForm.goods_introduction+
              "&goodsBargain="+this.productForm.goods_bargain+"&goodsState="+this.productForm.goods_state+
              "&goodsDiscount="+this.productForm.goods_discount+"&enterUuid="+this.enterId).
          then((res)=>{
            if(res.data.flag==="success"){
              this.$message.success("上传成功，等待管理员审核！")
            }else if(res.data.flag==="error"){
              this.$message.error("上传失败，请重新输入")
              this.resetForm()
            }

          });
        }else{
          return false
        }
      })

    }
  }
}
</script>
<style>
.body{
  position: absolute;
  width: 90%;
  height: 88%;
  left: 160px;
  top: 70px;
}
</style>