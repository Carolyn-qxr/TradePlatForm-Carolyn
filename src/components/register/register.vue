<template>
    <div class="register">
        <div class="contain">
            <div class="big-box" >
                <div class="big-contain" >
                    <div class="b_title"></div>
                    <el-form ref="registerRef"
                             class="register_form"
                             :rules="login_rules"
                             :model="form" >
                        <el-form-item prop="name">
                            <el-input  placeholder="请输入用户名" v-model="form.name" prefix-icon="iconfont icon-denglu"  ></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input v-model="form.password" prefix-icon="iconfont icon-mima" placeholder="用户密码"></el-input>
                        </el-form-item>
                        <el-form-item prop="phone">
                            <el-input v-model="form.phone" prefix-icon="iconfont icon-dianhuahaoma" placeholder="电话号码"></el-input>
                        </el-form-item>
                        <el-form-item prop="email">
                            <el-input v-model="form.email" prefix-icon="iconfont icon-dianziyouxiang" placeholder="电子邮箱"></el-input>
                        </el-form-item>
                        <el-form-item prop="city">
                            <el-input v-model="form.city" prefix-icon="iconfont icon-chengshi" placeholder="城市"></el-input>
                        </el-form-item>
                        <el-form-item prop="sex">
                            <el-input v-model="form.sex" prefix-icon="iconfont icon-xingbie" placeholder="性别"></el-input>
                        </el-form-item>
                        <el-form-item prop="account">
                            <el-input v-model="form.account" prefix-icon="iconfont icon-yinhangzhanghu" placeholder="银行账户"></el-input>
                        </el-form-item>

                        <!-- 添加验证码-->
                        <el-form-item prop="code">
                            <el-input  class="input_code" type="text" v-model="form.code" placeholder="验证码">
                                <template slot="append">
                                    <div class="code" @click="refreshCode">
                                        <SIdentify :identify-code="identifyCode"></SIdentify>
                                    </div>
                                </template>
                            </el-input>
                        </el-form-item>
                    </el-form>
                    <button class="register_button" @click="register">注册</button>
                </div>
            </div>
            <div class="small-box" >
                <div class="small-contain">
                    <div class="s_title">Welcome！</div>
                    <p class="s_content">与我们保持联系，请登录你的账户</p>
                    <button class="s_button" @click="login">登录</button><br>
                    <button class="s_button" @click="enterRegister">商家注册</button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import SIdentify from '../util/identify'
    export default{
        // eslint-disable-next-line vue/no-unused-components
        components: {SIdentify},

        data(){
            return {
                //表单数据对象
                identifyCodes: "12345678910",
                identifyCode:"",
                form:{
                    name:'',
                    password:'',
                    phone:'',
                    email:'',
                    city:'',
                    sex:'',
                    account:'',
                    code: '',//text框输入的验证码
                },
                //验证对象
                login_rules:{
                    name:[
                        {required: true,message:'用户密码为必填项',trigger: 'blur'},//必填项验证
                        {min :5,max :12,message: '长度在5到12个字符',trigger: 'blur'}//长度验证
                    ],
                    password:[
                        {required: true, message:'用户密码为必填项',trigger: 'blur'},//必填项验证
                        {min :6,max :10,message: '长度在6到10个字符',trigger: 'blur'}//长度验证
                    ],
                    phone:[
                        {required: true,message:'电话号码为必填项',trigger:'blur'},
                        {min: 11,max:11,message: '长度为11位电话号码',trigger: 'blur'},
                    ],
                    email:[
                        {required: true,message:'邮箱为必填项',trigger:'blur'},
                    ],
                    city:[{required: true ,message:'城市为必填项',trigger:'blur'}],
                    account:[
                        {required: true,message:'银行账户为必填项',trigger:'blur'},
                        {min: 16,max:16,message: '长度为16位银行账户',trigger: 'blur'},
                    ]
                },
            }
        },
        mounted(){
            this.identifyCode="";
            this.makeCode(this.identifyCodes,4);
        },
        methods:{
            login(){
                this.$router.push({path: '/login'})
            },
            enterRegister() {
              this.$router.push({path: '/enterRegister'})
            },
          /**
             * 提交注册信息
             */
            register(){
                if(this.form.code !== this.identifyCode){
                    this.$message.error('请填写正确验证码！')
                    return
                }
                // eslint-disable-next-line no-unused-vars
                this.$refs.registerRef.validate((valid =>{
                    this.axios.post("/register/regist?userName="+this.form.name+
                        "&userPassword="+this.form.password+"&userGender="+this.form.sex+
                        "&userCity="+this.form.city+"&userEmail="+this.form.email+
                        "&userPhone="+this.form.phone+"&userAccount="+this.form.account+"").
                        // eslint-disable-next-line no-unused-vars
                    then((res)=>{
                        if(res.data.flag==="success"){
                            this.registerSuccess()
                            this.$message.success("注册申请已发送，请等待审核")
                        }else{
                            this.register_Fail()
                        }
                        // eslint-disable-next-line no-console
                        console.log(res.data)
                    })
                }))

            },

            //验证码
            randomNum(min, max) {
                return Math.floor(Math.random() * (max - min) + min);
            },

            refreshCode() {
                this.identifyCode = "";
                this.makeCode(this.identifyCodes, 4);
            },
            makeCode(o, l) {
                for (let i = 0; i < l; i++) {
                    this.identifyCode += this.identifyCodes[
                        this.randomNum(0, this.identifyCodes.length)
                        ];
                }
                // eslint-disable-next-line no-console
                console.log(this.identifyCode);
            },
            /**
             * 注册提示信息
             */
            registerSuccess(){
                this.$alert('注册申请已发送，请等待审核',{
                    confirmButtonText: '确定',
                    // eslint-disable-next-line no-unused-vars

                })
            },
            register_Fail(){
                this.$notify.error({
                    title: '注册失败',
                    message :'请填写正确注册信息'
                })
            },
        }
    }
</script>

<style scoped="scoped">
    .divIdentifyingCode {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 5;
        width: 102px; /*设置图片显示的宽*/
        height: 40px; /*图片显示的高*/
        background: #e2e2e2;
        margin: 0;
    }

    .register{
        background-image: url("../../assets/shoppingMall.png");
        width: 100%;
        height: 100%; /**宽高100%是为了图片铺满屏幕 */
        position: absolute;
        top: 0px; /*这里是设置与顶部的距离*/
        left: 0px; /*这里是设置与左边的距离*/
        bottom: 0px;
        right: 0px;

    }
    .contain{
        width: 50%;
        height: 100%;
        top: 50%;
        position: relative;
        left: 50%;
        transform: translate(-50%,-50%);
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 20px;
        box-shadow: 0 0 3px #f0f0f0,
        0 0 6px #f0f0f0;
    }
    .big-box{
        width: 70%;
        height: 100%;
        position: absolute;
        top: 0;
        transform: translateX(0%);
        transition: all 1s;
        left: 145px;
    }
    .big-contain{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .b_title{
        margin-top: -300px;
        font-size: 1.5em;
        font-weight: bold;
        position: absolute;
        color: rgb(57,167,176);
    }
    .login_form{
        width: 50%;
        height: 28%;
        padding: 2em;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        left: 70px;
    }
    .login_form input{
        width: 100%;
        height: 40px;
        border: none;
        outline: none;
        border-radius: 50px;
        padding-left: 2em;
        background-color: #f0f0f0;
    }
    .register_form{
        width: 100%;
        height: 60%;
        padding: 2em ;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }
    .register_form input{
        width: 50%;
        height: 30px;
        border: none;
        outline: none;
        border-radius: 10px;
        padding-left: 2em;
        background-color: #f0f0f0;
    }
    .small-box{
        width: 30%;
        height: 100%;
        background-color: rgba(255, 0, 0, 0);
        position: relative;
        top: -30px;
        left: 10px;
        transform: translateX(0%);
        transition: all 1s;
        border-top-left-radius: inherit;
        border-bottom-left-radius: inherit;
    }
    .small-contain{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .s_title{
        font-size: 1.5em;
        font-weight: bold;
        color: #fff;
    }
    .s_content{
        font-size: 0.8em;
        color: #fff;
        text-align: center;
        padding: 2em 4em;
        line-height: 1.7em;
    }
    .s_button{
        width: 60%;
        height: 40px;
        border-radius: 24px;
        border: 1px solid #fff;
        outline: none;
        background-color: transparent;
        color: #fff;
        font-size: 0.9em;
        cursor: pointer;
    }
    .register_button{
        width: 30%;
        margin-top: 45px;
        height: 35px;
        border-radius: 24px;
        border: 1px solid #fff;
        outline: none;
        background-color: rgb(57,167,176);
        color: #fff;
        font-size: 0.9em;
        cursor: pointer;
    }

    /*验证码样式*/
    .code{
        width:100px;
        height:30px;
        margin-left: -20px;
    }
    .input_code{
        width: 250px;
        border-radius: 30px;
        height: 20px;

    }
</style>
