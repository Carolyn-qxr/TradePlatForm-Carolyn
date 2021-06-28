<template>
  <div class="admin-body">
    <div class="small-header">
      <el-button type="primary" size="small"  class="btn1" @click="showTable1"
                 :class="showmode ? 'active' : 'btn1'">用户审核</el-button>
      <el-button type="primary" size="small" class="btn2" @click="showTable2"
                 :class="!showmode ? 'active' : 'btn2'">商家审核</el-button>
    </div>
    <div class="el-icon-s-order">
      申请列表
    </div>
    <form class="el-table">
      <el-input  v-model="searchInput" type="text" placeholder="用户名" class="input"></el-input>
      <el-button type="primary"  class="btn-search" size="small" icon="el-icon-search">搜索</el-button>
      <!--用户申请列表-->
      <el-table :data="data1" v-show="t1">
        <el-table-column prop="user_name" label="用户名" width="150px" align="center"></el-table-column>
        <el-table-column prop="user_gender" label="性别" width="150px" align="center"></el-table-column>
        <el-table-column prop="user_city" label="城市" width="150px" align="center"></el-table-column>
        <el-table-column prop="user_phone" label="电话" width="150px" align="center"></el-table-column>
        <el-table-column prop="user_role" label="申请身份" width="200px" align="center"></el-table-column>
        <el-table-column prop="" label="申请状态" width="150px" align="center">
          <template #default="scope">
            <el-button size="mini" @click="handleUserAgree(scope.$index,scope.row)"
                       style="background: #409EFF;color:#fff;border-color: #409EFF">同意</el-button>
            <el-button size="mini" type="danger" @click="handleUserRefuse(scope.$index,scope.row)">拒绝</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--商家申请列表-->
      <el-table :data="data2" v-show="t2">
        <el-table-column prop="enter_name" label="商家姓名" width="150px" align="center"></el-table-column>
        <el-table-column prop="enter_gender" label="性别" width="150px" align="center"></el-table-column>
        <el-table-column prop="enter_phone" label="电话" width="200px" align="center"></el-table-column>
        <el-table-column prop="enter_role" label="申请身份" width="150px" align="center"></el-table-column>
        <el-table-column prop="" label="证件信息" width="150px" align="center">
          <template #default="scope">
            <i class="el-icon-zoom-in" style="font-size: 17px" @click="lookImage(scope.$index,scope.row)"></i>
          </template>
        </el-table-column>
        <el-table-column prop="" label="申请状态" width="200px" align="center">
          <template #default="scope">
            <el-button size="mini"  type="primary" style="background: #409EFF;color:#fff;border-color: #409EFF"
                       @click="handleEnterAgree(scope.$index,scope.row)">同意</el-button>
            <el-button size="mini" type="danger" @click="handleEnterRefuse(scope.$index,scope.row)">拒绝</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :visible.sync="dialogVisible" width="30%">
        <div class="title"><h3 style="color: #409EFF">证件信息</h3></div>
        <p>身份证：</p>
        <el-image style="width: 130px; height: 130px"
                  :src="identityUrl">
        </el-image>
        <p>营业执照</p>
        <el-image style="width: 130px; height: 130px"
                  :src="licenseUrl">
        </el-image>
      </el-dialog>
    </form>
  </div>
</template>

<script>
export default {
  created(){
    this.queryTable();
  },
  data(){
    return{
      identityUrl: '',
      licenseUrl: '',
      /* 用户申请表单*/
      data1:[],
      /*商家申请表单*/
      data2:[],
      enterData:'',/*当点击某一行时存储某一行用户的具体信息*/
      items: [],
      t1:1,
      t2:0,
      showmode: true,
      dialogVisible: false,
      searchInput: '',

    }
  },
  methods: {
    showTable1(){
      this.t1=1;
      this.t2=0
      this.showmode = true;
    },
    showTable2(){
      this.t1=0;
      this.t2=1
      this.showmode = false
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleCommand(command){
      if(command == "exit"){
        this.$router.push("/admin")
      }
    },
    /*同意用户注册申请*/
    handleUserAgree(index,row){
      if(row.user_name!==null){
        this.axios.post("/register/addSuccess?userName="+row.user_name).
        then((res)=>{
          if(res.data==="success"){
            this.$message.success("已同意申请")
            this.queryTable()

          }else{
            this.$message.error("资料不通过")
          }
        })
      }
    },
    /*同意商家注册申请*/
    handleEnterAgree(index,row){
      if(row.enter_name!==null){
        this.axios.post("/register/addEnterSuccess?enterName="+row.enter_name).
        then((res)=>{
          if(res.data==="success"){
            this.$message.success("已同意申请");
            this.queryTable()
          }else{
            this.$message.error("资料不通过")
          }
        })
      }
    },
    /*拒绝用户注册申请*/
    handleUserRefuse(index,row){
      this.$confirm('确定拒绝该用户申请，是否拒绝？','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.post("/register/userAddFailed?userName="+row.user_name).
        then((res)=>{
          if(res.data==="error"){
            this.queryTable()
            this.$message.success('已拒绝')
            console.log("已删除该申请")
          }
        })
      }).catch(()=>{
        this.$message({
          type : 'info',
          message: '已取消'
        })
      })
    },
    handleEnterRefuse(index,row){
      this.$confirm('确定拒绝该商家申请，是否拒绝？','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.post("/register/enterAddFailed?enterName="+row.enter_name).
        then((res)=>{
          if(res.data==="error"){
            this.queryTable()
            this.$message.success('已拒绝')
            console.log("已删除该申请")
          }
        })
      }).catch(()=>{
        this.$message({
          type : 'info',
          message: '已取消'
        })
      })
    },
    /* 从后端查询所有申请信息，并绑定到前端表格*/
    queryTable(){
      this.axios.get("/admin/registUser").
      then((res)=>{
        console.log(res.data)
        this.data1 = res.data;
        res = null
      })
      this.axios.get("/admin/registEnter").
      then((res)=>{
        this.data2 = res.data;
        res=null;
      })
    },
    lookImage(index,row){
      this.dialogVisible = true
      // eslint-disable-next-line no-undef
      this.axios.post("/admin/getEnterRequestPhoto?enterName="+row.enter_name).then((res)=>{
        console.log(res.data)
          this.identityUrl = res.data.enterIdentity
          this.licenseUrl = res.data.enterLicense


      })
    }



  }
}
</script>

<style>
.admin-body{
  position: absolute;
  background:#F5F5F5;
  width: 90%;
  height: 95%;
  left: 140px;
  top: 68px;
}
.small-header{
  width: 100%;
  height: 40px;
  background: #fff;
  margin-bottom: 30px;
  box-shadow:2px 2px 5px gray;
}
.title{
  margin-top: -50px;
  font-size: 1.3em;
}
.font{
  font-family: 'PingFang SC', "Helvetica Neue", Helvetica, "microsoft yahei", arial, STHeiTi, sans-serif;
  font-size: 1.1em;
}
</style>