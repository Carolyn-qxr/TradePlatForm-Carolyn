<template xmlns:el-table="http://www.w3.org/1999/html">
  <div class="admin-body">
    <div class="small-header">
      <el-tag style="margin-top: 7px;margin-left: 5px;" size="medium" closable>
        系统首页</el-tag>
    </div>
    <el-card class="card-info">
      <img src="../../assets/img/avator.jpg" class="img-avator"/>
      <span class="big-text">{{this.adminName}}</span>
      <span class="small-text">超级管理员</span>
      <el-divider style="width: 10px"></el-divider>
      <span class="text1">上次登录时间：</span><span class="text1" style="margin-left: 80px">2021-5-9</span><br>
      <span class="text1">上次登录地点：</span><span class="text1" style="margin-left: 80px">中国-北京</span>
    </el-card>

    <el-card class="card-progress">
      vue<el-progress :percentage="50" color=" #409EFF"></el-progress>
      JavaScript<el-progress :percentage="35"  color="#e6a23c"></el-progress>
      Css<el-progress :percentage="15" color="#5cb87a"></el-progress>
      Java<el-progress :percentage="15" color="#e6a23c"></el-progress>
    </el-card>

    <el-card class="todoList">
      <span>待办事项</span>
      <i class="el-icon-plus" style="margin-left: 680px"></i>
      <el-divider></el-divider>
      <div style="margin-top: -10px">
        <div  v-for="item in todoList" :key="item" style="margin-top: 10px">
          <el-checkbox></el-checkbox>
          <span class="text-content" >{{ item.data }}</span>
        </div>
      </div>
    </el-card>

    <el-image :src="img" class="img"></el-image>

  </div>
</template>
<script>
export default {
  data(){
    return{
      todoList: [{data:'今天要修复10个bug'},{data:'目前项目进度为50%'},{data: '今天任务为商品审核'}],
      img: 'https://bucket-1305828836.cos.ap-beijing.myqcloud.com/admin-home-img.png',
      adminName:''
    }
  },
  methods:{

  },
  created() {
    console.log(JSON.parse(sessionStorage.getItem("admin")))
    let admin = JSON.parse(sessionStorage.getItem("admin"))
    this.adminName = admin.User_name

  }


}
</script>
<style>
.card-info{
  position: absolute;
  top: 50px;
  width: 400px;
  height: 270px;
  border-radius: 9px;
}
.card-progress{
  position: absolute;
  top: 350px;
  width: 400px;
  height: 250px;
}
.todoList{
  position: absolute;
  top: 50px;
  left: 430px;
  width: 825px;
  height: 200px;
  border-radius: 9px;
}
.img-avator{
  width: 130px;
  height: 130px;
  border-radius: 50%;
}
.big-text{
  position: absolute;
  margin-left: 65px;
  margin-top: 40px;
  font-size: 32px;
}
.small-text{
  position: absolute;
  color: #606266;
  margin-left: 65px;
  margin-top: 90px;
  font-size: 14px;

}
.text1{
  color: #606266;
  font-size: 14px;
}
.text-content {
  font-size: 15px;
  color:#606266;
  margin-left: 20px;
  margin-top: 30px;
}
.img{
  position: absolute;
  top: 260px;
  left: 430px;
  border-radius: 9px;
  width: 825px;
  height: 350px;
}






</style>