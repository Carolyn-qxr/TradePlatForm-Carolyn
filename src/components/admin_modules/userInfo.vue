<template>
  <div class="admin-body">
    <div class="small-header">
      <el-button type="primary" size="small"  class="btn1" @click="showTable1"
                 :class="showmode ? 'active' : 'btn1'">用户管理</el-button>
      <el-button type="primary" size="small" class="btn2" @click="showTable2"
                 :class="!showmode ? 'active' : 'btn2'">商家管理</el-button>
    </div>
    <div class="el-icon-s-order">
      基础表格
    </div>
    <div class="el-table">
      <el-input v-model="input" placeholder="用户名" class="input"></el-input>
      <el-button type="primary"  class="btn-search" size="small" icon="el-icon-search" @click="search">搜索</el-button>
      <el-table :data="data1" v-show="t1">
        <el-table-column prop="User_id" label="用户序号" width="100px" align="center"></el-table-column>
        <el-table-column prop="User_name" label="用户名" width="200px" align="center"></el-table-column>
        <el-table-column prop="User_gender" label="性别" width="200px" align="center"></el-table-column>
        <el-table-column prop="User_city" label="城市" width="250px" align="center"></el-table-column>
        <el-table-column prop="" label="操作" width="350px" align="center">
          <template #default="scope">
            <el-button type="text" icon="el-icon-search" style="color: #409EFF" @click="userSearchInfo(scope.$index,scope.row)">查看</el-button>
            <el-button type="text" icon="el-icon-edit" style="color: #409EFF;margin-right: 5px" @click="userEditInfo(scope.$index,scope.row)" >编辑</el-button>
            <el-button type="text" icon="el-icon-delete" style="color: red" @click="userDeleteInfo(scope.$index,scope.row)">删除</el-button>
            <el-button type="text" icon="el-icon-coin" style="color: #55a532" @click="chongzhi(scope.row)">充值</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-table :data="data2" v-show="t2">
        <el-table-column prop="enter_name" label="商家姓名" width="150px" align="center"></el-table-column>
        <el-table-column prop="enter_gender" label="性别" width="150px" align="center"></el-table-column>
        <el-table-column prop="enter_city" label="城市" width="150px" align="center"></el-table-column>
        <el-table-column prop="enter_phone" label="电话号码" width="150px" align="center"></el-table-column>
        <el-table-column prop="enter_grade" label="商家等级" width="150px" align="center"></el-table-column>
        <el-table-column prop="" label="操作" width="250px" align="center">
          <template #default="scope">
            <el-button type="text" icon="el-icon-search" style="color: #409EFF" @click="enterSearchInfo(scope.$index,scope.row)">查看</el-button>
            <el-button type="text" icon="el-icon-edit" style="color: #409EFF" @click="enterEditInfo(scope.$index,scope.row)">编辑</el-button>
            <el-button type="text" icon="el-icon-delete" style="color: red" @click="enterDeleteInfo(scope.$index,scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
    <!--查看用户信息对话框-->
    <el-dialog  :visible.sync="userInfoVisible" class="dialog">
      <div class="title"> <h3 style="color: #409EFF">用户信息</h3></div>
      <div class="font" >
        <p>姓名： {{userData.User_name}}</p>
        <p>性别： {{userData.User_gender}}</p>
        <p>城市：{{userData.User_city}}</p>
        <p>电话： {{userData.User_phone}}</p>
        <p>邮箱： {{userData.User_email}}</p>
      </div>
    </el-dialog>
    <!--查看用户编辑信息对话框-->
    <el-dialog :visible.sync="userEditVisible" class="dialog">
      <div class="title"> <h3 style="color: #409EFF">修改用户信息</h3></div>
      <p>用户姓名： {{userData.User_name}}</p>
      <p>当前用户角色为： {{userData.User_role}}</p>
      <p>修改为：
        <template>
          <el-radio v-model="roleRadio" label="1" style="color: #409EFF;" >用户</el-radio>
          <el-radio v-model="roleRadio" label="2" style="color: #409EFF;" >管理员</el-radio>
        </template>
      </p>
      <br>
      <el-button type="primary" size="mini" @click="changeRole"
                 style="background: #409EFF; position:absolute;left: 98px;">
        确定修改</el-button>
      <br>
    </el-dialog>

    <!--查看商家信息对话框-->
    <el-dialog  :visible.sync="enterInfoVisible" class="dialog">
      <div class="title"> <h3 style="color: #409EFF">商家信息</h3></div>
      <div class="font" >
        <p>姓名： {{enterData.Enter_name}}</p>
        <p>性别： {{enterData.Enter_gender}}</p>
        <p>城市：{{enterData.Enter_city}}</p>
        <p>电话： {{enterData.Enter_phone}}</p>
        <p>等级：{{enterData.Enter_grade}}</p>
        <p>身份证：</p>
        <el-image style="width: 100px;height: 100px" :src="enterData.Enter_identity"></el-image>
        <p>营业执照：</p>
        <el-image style="width: 100px;height: 100px" :src="enterData.Enter_license"></el-image>
      </div>
    </el-dialog>

    <!--查看商家编辑信息对话框-->
    <el-dialog :visible.sync="enterEditVisible" class="dialog">
      <div class="title"> <h3 style="color: #409EFF">修改商家信息</h3></div>
      <p>商家姓名： {{enterData.Enter_name}}</p>
      <p>当前商家等级为： {{enterData.Enter_grade}}</p>
      <p>修改为：
        <template>
          <el-select v-model="grade" placeholder="请选择">
            <el-option v-for="item in gradeOptions"
                       :key="item.grade" :label="item.grade" :value="item.grade">

            </el-option>
          </el-select>
        </template>
      </p>
      <br>
      <el-button type="primary" size="mini" @click="changeGrade"
                 style="background: #409EFF; position:absolute;left: 98px;">
        确定修改</el-button>
      <br>
    </el-dialog>
    <el-dialog :visible.sync="chongzhiVisible" class="dialog">
      <div class="title"> <h3 style="color: #409EFF">请进行充值：</h3></div>
      <el-input v-model="inputMoney"></el-input>
      <el-button plain size="mini" round style="margin-top: 10px" @click="confirmChongzhi">确认充值</el-button>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data(){
    return{
      input: '',
      data1: [],
      data2: [],
      t1:1,
      t2:0,
      showmode: true,
      userInfoVisible: false,//标识当前用户信息对话框是否为可见状态
      userEditVisible: false,//标识当前用户编辑信息对话框是否为可见状态
      enterInfoVisible: false,//标识当前商家信息对话框是否为可见状态
      enterEditVisible: false,//标识当前商家编辑信息对话框是否为可见状态
      chongzhiVisible:false,//标识当前用户充值对话框是否为可见状态

      userData: {},
      enterData: {},
      roleRadio: '1',
      searchName: '',
      identityUrl: '',
      licenseUrl: '',

      grade: '',
      inputMoney:'',
      gradeOptions:
          [
            {grade: 1},{grade: 2},{grade: 3},{grade: 4},{grade: 5},
          ],
      state: '',
      user_uuid : ''
    }
  },
  created() {
    this.queryTable()
  },
  methods: {
    /*查询所有用户以及商家信息*/
    queryTable() {
      var _this = this
      _this.axios.get("/admin/userList").then((res) => {
        console.log(res.data)
        _this.data1 = res.data;
        console.log(_this.data)
      })
      _this.axios.get("/admin/enterList").then((res) => {
        _this.data2 = res.data;
        console.log(_this.data)
      })

    },
    chongzhi(row){
      this.chongzhiVisible = true;
      this.user_id = row.User_id;
      console.log(this.user_id)
    },
    confirmChongzhi(){
      this.axios.post("/admin/setCurrentMoney?currentMoney="+this.inputMoney+"&userId="+this.user_id).
      then((res)=>{
        console.log(res.data)
        if(res.data==="success"){
          this.$message.success("充值成功")
          this.chongzhiVisible = false
        }else{
          this.$message.error("请选择正确的金额")
        }
      })
    },
    showTable1() {
      this.t1 = 1;
      this.t2 = 0;
      this.showmode = true;
    },
    showTable2() {
      this.t1 = 0;
      this.t2 = 1
      this.showmode = false
    },
    /*实现输入用户名进行查找，支持模糊查询*/
    search() {
      this.axios.post("/admin/getUserByName?userName=" + this.input).then((res) => {
        this.data1 = res.data
      })
    },
    /*查看某一行用户的具体查找*/
    userSearchInfo(index, row) {
      this.userInfoVisible = true;
      this.axios.post("/admin/getUserInformation?userName=" + row.User_name).then((res) => {
        console.log(res.data)
        if (res.data.flag === "success") {
          this.userData = res.data.user

        }
      })
    },
    /*查看某一行商家的信息具体查找*/
    enterSearchInfo(index, row) {
      this.enterInfoVisible = true;
      this.axios.post("/admin/getEnterInformation?enterName="+row.enter_name).then((res)=>{
       console.log(res.data)
        if(res.data.flag==="success"){
          this.enterData = res.data.enter
        }
      })
    },

    /*编辑用户信息，可以修改用户角色*/
    userEditInfo(index, row) {
      this.userEditVisible = true;
      this.axios.post("/admin/getUserInformation?userName=" + row.User_name).then((res) => {
        if (res.data.flag === "success") {
          this.userData = res.data.user
          this.searchName = this.userData.User_name
        }

      })
    },
    /*编辑商家信息，可以修改商家等级*/
    enterEditInfo(index, row) {
      this.enterEditVisible = true;
      this.axios.post("/admin/getEnterInformation?enterName=" + row.enter_name).then((res) => {
        if (res.data.flag === "success") {
          this.enterData = res.data.enter
          this.searchName = this.enterData.Enter_name
          console.log(this.searchName)
        }
      })
    },
    /*用户删除操作*/
    userDeleteInfo(index, row) {
      this.$confirm('确定永久删除该用户，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.delete("/admin/deleteUser?userName=" + row.User_name).then((res) => {
          if (res.data === 'success') {
            this.$message.success('删除成功')
            this.queryTable()
            sessionStorage.removeItem("user")
            sessionStorage.setItem("userLoginState",false)

          } else {
            this.$message.error('删除失败')
          }
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
        });
      });
    },
    /* 商家删除操作*/
    enterDeleteInfo(index,row){
      this.$confirm('确定永久性删除该商家，是否继续？','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        this.axios.delete("/admin/deleteEnter?enterName="+row.enter_name).then((res)=>{
          console.log(row.enter_name)
          if(res.data==='success'){
            this.$message.success('删除成功')
            this.queryTable()
            sessionStorage.removeItem("enter")
            sessionStorage.setItem("enterLoginState",false)
          }else{
            this.$message.error('删除失败')
          }
        })
      }).catch(()=>{
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    /*修改用户角色*/
    changeRole() {
      if (this.roleRadio === '1') return;
      else {
        this.axios.put("/admin/updateUser?userName=" + this.searchName + "&userRole=管理员").then((res) => {
          if (res.data === "success") {
            this.$message.success("修改成功")
            this.queryTable()
          } else {
            this.$message.error("修改失败")
          }
        })

      }
    },
    /*修改商家等级*/
    changeGrade() {
      console.log(this.grade)
      this.axios.post("/admin/upgrade?enterName="+this.searchName+"&enterGrade="+this.grade).then((res)=>{
        if (res.data === "success") {
          this.$message.success("修改成功")
          this.queryTable()
          this.enterEditVisible = false
        } else {
          this.$message.error("修改失败")
        }
      });

    }

  }
}
</script>

<style>
.userInfo_form{
  position: absolute;
  background:#F5F5F5;
  width: 90%;
  height: 88%;
  left: 140px;
  top: 68px;

}
.el-table{
  position: absolute;
  left: 23px;
  width: 96%;
  height: 80%;
  top: 90px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.btn1 {
  margin-right: -6px;
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: 0;
  margin-top: 5px;
  margin-left: 6px;
  color: #404040;
}
.btn2 {
  border: 2px solid #d9d9d9;
  border: 0;
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  color: #404040;
}
.btn2.active{
  background: #409EFF;
}
.btn1.active{
  background: #409EFF;
}
.small-header{
  position: absolute;
  width: 100%;
  height: 40px;
  background: #fff;
  margin-bottom: 30px;
  box-shadow:2px 2px 5px gray;
}
.el-icon-s-order{
  position: absolute;
  top: 60px;
  left: 30px;
  color: #808080;
}
.btn-search{
  position: absolute;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: 0;
  top: 27px;
  left: 240px;
  color: #fff;
  background: #409EFF;
}
.el-table input{
  position: absolute;
  top: 13px;
  left: 30px;
  width: 200px;
  height: 32px;
  display: inline-block;
}
.dialog{
  width: 700px;
  position: absolute;
  left:250px;
  height: 800px;
  top:-140px;

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