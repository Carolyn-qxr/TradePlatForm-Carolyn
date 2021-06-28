<template>
    <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="merchantname">
		    <el-input v-model="form.merchantname"></el-input>
		</el-form-item>
        <el-form-item label="密码" prop="merchantpassword">
			<el-input type="password" v-model="form.merchantpassword" auto-complete="off"></el-input>
		</el-form-item>
		<el-form-item label="姓名" prop="merchantrealname">
			<el-input v-model="form.merchantrealname"></el-input>
		</el-form-item>
		<el-form-item label="性别" prop="merchantsex">
			<el-input v-model="form.merchantsex"></el-input>
		</el-form-item>
		<el-form-item label="手机号" prop="merchantphone">
			<el-input v-model="form.merchantphone"></el-input>
		</el-form-item>
		<el-form-item label="银行卡" prop="merchantbankcard">
			<el-input v-model="form.merchantbankcard"></el-input>
		</el-form-item>
		<el-row>
		<el-form-item label="营业执照" prop="businesslicense">
   	    <el-upload :multiple="multiple" action="/uploadPics" list-type="picture-card" :auto-upload="false"
          :http-request="businesslicenseuploadFile" ref="uploadPic1" 
		  :on-remove="Removelicense" 
          :on-change="Changelicense"
          :class="{hide:hideUpload}">
        <i class="el-icon-plus"></i>
        </el-upload>
		</el-form-item>
		</el-row>
		<el-row>
		<el-form-item label="身份证正反面" prop="identitycard">
   	     <el-upload :multiple="multiple" action="/uploadPics" list-type="picture-card" :auto-upload="false"
          :http-request="identitycarduploadFile" ref="uploadPic2"
		  :on-remove="Removecard" 
          :on-change="Changecard"
		  :class="{hide:hideUploadcard}">
        <i class="el-icon-plus"></i>
        </el-upload>
		</el-form-item>
		</el-row>
		<el-row>
		</el-row>
           <el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
			</el-form-item>
	</el-form>
</template>
 
<script>

//import identify from '@/views/login/identify';

import Qs from 'qs';
export default {
	data() {
		return {
			form: {
				merchantname: '',
				merchantpassword: '',
				merchantrealname: '',
				merchantsex: '',
				merchantbankcard: '',
				merchantphone: ''
			},
			    formPicsData: '',
			    // businesslicenseData: "",
                multiple: true,
				// identitycardData: "",
			rules: {
			    merchantname: [
                    {required: true, message: "用户名不能为空", trigger: 'blur'},
                    {min: 3, max: 5, message: "用户名3-5位", trigger: 'blur'}
                ],
                merchantpassword: [
                    {required: true, message: "密码不能为空", trigger: 'blur'},
                    {min: 3, max: 5, message: "密码3-5位", trigger: 'blur'}
                ],
			    merchantbankcard: [
					{required: true, message: "银行卡不能为空", trigger: "blur"},
					{min: 16, max: 16, message: "银行卡需16位卡号", trigger: "blur"}
				],
                merchantrealname:[
					 {required: true, message: "姓名不能为空", trigger: 'blur'},
                     {min: 1, max: 10, message: "姓名最长10位", trigger: 'blur'}
				],
				merchantsex:[
					{required: true, message: "性别不能为空", trigger: 'blur'},
				],
				identify:[
					{required: true ,message: "验证码不能为空", trigger: 'blur'},
                    
				]
			},
		    identifyCode: '',
			identifyCodes: '1234567890abcdefjhijklinopqrsduvwxyz',
			hideUpload: false,
			hideUploadcard: false,
		};
	},
	methods: {
		Removelicense(file, fileList) {
            this.hideUpload = fileList.length >= 1;     // 上传的项目截图 < 1时，显示上传按钮
            this.change=true;

      },
        Changelicense(file, fileList) {
        this.hideUpload = fileList.length >= 1; // 上传的项目截图 >= 1时，隐藏上传按钮
      },
	  Removecard(file, fileList) {
            this.hideUploadcard = fileList.length >= 2;     // 上传的项目截图 < 2时，显示上传按钮
            this.change=true;

      },
        Changecard(file, fileList) {
        this.hideUploadcard = fileList.length >= 2; // 上传的项目截图 >= 2时，隐藏上传按钮
      },
        refreshCode () {
            this.identifyCode = ''
            this.makeCode(this.identifyCodes, 4)
        },
        makeCode (o, l) {
            for (let i = 0; i < l; i++) {
                this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
         }
        },
        randomNum (min, max) {
             return Math.floor(Math.random() * (max - min) + min)
    },
	    businesslicenseuploadFile(file) {
        this.formPicsData.append('businesslicense', file.file);
      },
	    identitycarduploadFile(file) {
        this.formPicsData.append('identitycard', file.file);
      },
	    submitForm(formName) {
		    this.$refs[formName].validate( valid => {
				if(!valid) return;
				if (this.form.identify.toLowerCase() !== this.identifyCode.toLowerCase()) {
                this.$message({
                    message: '验证码错误请重新输入',
                    type: 'error',
                    center: true,
                    offset: 50
                    });
                this.refreshCode()
                return
				}   
				let self = this;
                this.formPicsData = new FormData();
                this.$refs.uploadPic1.submit();
				this.$refs.uploadPic2.submit();
                let config = {
                       headers: {
                         'Content-Type': 'multipart/form-data'
                         }
                         }; 			   
        this.formPicsData.append('merchantname',this.form.merchantname);
		this.formPicsData.append('type',"merchant");
		this.formPicsData.append('merchantpassword',this.form.merchantpassword);
	    this.formPicsData.append('merchantrealname',this.form.merchantrealname);
	    this.formPicsData.append('merchantsex',this.form.merchantsex);
	    this.formPicsData.append('merchantphone',this.form.merchantphone);
		this.formPicsData.append('merchantbankcard',this.form.merchantbankcard);
	    this.axios.post("/register", this.formPicsData, config).then(res => {
			//1: 等待管理员同意
			//0: 用户名被占用
			//2：没有营业执照
			//3：请检查身份证上传是否符合要求
	    // this.axios.post("/upload", this.formPicsData, config).then(res => {
			if(res.data == "1"){
				  this.$message({
					    type: 'success',
					    message: '已将您的信息提交，请等待管理员审核',
					    center: true,
                        offset: 50
				    });
				    this.$router.push({path: '/login'});
			}else if(res.data == "3") {
				 this.$message({
                    message: '请检查身份证上传是否符合要求',
                    type: 'error',
                    center: true,
                    offset: 50
                    });
			}else if(res.data =="2"){
				 this.$message({
                    message: '请检查营业执照上传是否符合要求',
                    type: 'error',
                    center: true,
                    offset: 50
                    });
			}else{
				 this.$message({
                    message: '用户名已被注册，请重新输入',
                    type: 'error',
                    center: true,
                    offset: 50
                    });
			}
        }).catch(res => {
          this.$message.info("服务器走丢了!");
        });       
	 }); 
	},
	},
};
</script>
<style  scoped>
.hide .el-upload--picture-card {
    display: none;
}
</style>