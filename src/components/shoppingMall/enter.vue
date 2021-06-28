<template>
    <div class="enter">

        <enter-header></enter-header>


    </div>
</template>
<script>
   import enterHeader from '../shoppingMall/enter_modules/enterHeader';
   export default {
       components:{
           enterHeader,
       },
       data(){
           return{

               loginName: 'qxr',
               loginRole: '商家',
               enterLoginState: '',
               wallet: '20',
               isCollapse: true
           }
       },
       created() {
           this.enterLoginState = sessionStorage.getItem("enterLoginState");
           let enter = JSON.parse(sessionStorage.getItem("enter"))
           this.loginName = enter.enter_name;
           this.wallet = enter.wallet
           /*判断当前是否登录以及登录身份*/
           console.log("当前在商家页面："+this.enterLoginState)


       },
       methods: {
           // eslint-disable-next-line vue/no-dupe-keys
           goodsPicture(file){
               this.formData.append('goods_picture',file.file)
           },
           handleCommand(command){
               if(command=="exit"){
                   this.$router.push("/home")
               }
           },
           onSubmit(formName){
                this.formData = new FormData();
                this.$refs.upload.submit();
               console.log(this.formData)
                this.$refs[formName].validate((valid)=>{
                    if(valid){
                        alert('submit');
                        /*先上传图片*/
                        this.axios.post().
                        then((res)=>{
                            if(res.data==="上传成功"){
                                this.$message.success("照片上传成功")
                            }else if(res.data==="更新成功"){
                                this.$message.success("照片更新成功")
                            }
                        });
                        /*上传商品剩余信息*/
                        this.axios.post()
                    }else{
                        return false
                    }
                })
           },
           resetForm(formName) {
               this.$refs[formName].resetFields();
           },
           handleOpen(key, keyPath) {
               console.log(key, keyPath);
           },
           handleClose(key, keyPath) {
               console.log(key, keyPath);
           }
       }
   }
</script>

<style>

</style>