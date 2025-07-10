<template>
  <div style="display: flex; line-height: 60px; background-color: #F5F7FA; padding: 0 16px; height: 60px; box-sizing: border-box;">
    <!-- 左侧折叠按钮 - 固定宽度确保布局稳定 -->
    <div style="display: flex; align-items: center; margin-right: 16px; width: 40px; justify-content: center;">
      <i :class="icon" style="font-size: 20px; cursor: pointer;" @click="collapse"></i>
    </div>

    <!-- 中间标题 - 优化居中算法 -->
    <div style="flex: 1; display: flex; justify-content: center; align-items: center; position: relative;">
      <span style="font-size: 20px; font-weight: 600; display: inline-block;">仓库管理系统</span>
    </div>

    <!-- 右侧日期和用户菜单 - 固定右侧元素宽度 -->
    <div style="display: flex; align-items: center; gap: 24px; min-width: 240px; justify-content: flex-end;">
      <DateUtils style="font-size: 14px; color: #606266;"></DateUtils>
      <el-dropdown style="display: flex; align-items: center;">
        <span style="font-size: 14px; font-weight: 500; display: flex; align-items: center;">
          {{user.name}}
          <i class="el-icon-arrow-down" style="margin-left: 5px;"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="toUser">个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import DateUtils from "./DateUtils";
export default {
  name: "Header",
  components: {DateUtils},
  data(){
    return {
      user : JSON.parse(sessionStorage.getItem('CurUser'))
    }
  },
  props:{
    icon:String
  },
  methods:{
    toUser(){
      console.log('to_user')

      this.$router.push("/Home")
    },
    logout(){
      console.log('logout')

      this.$confirm('您确定要退出登录吗?', '提示', {
        confirmButtonText: '确定',  //确认按钮的文字显示
        type: 'warning',
        center: true, //文字居中显示

      })
          .then(() => {
            this.$message({
              type:'success',
              message:'退出登录成功'
            })

            this.$router.push("/")
            sessionStorage.clear()
          })
          .catch(() => {
            this.$message({
              type:'info',
              message:'已取消退出登录'
            })
          })

    },
    collapse(){
      this.$emit('doCollapse')
    }

  },
  created(){
    this.$router.push("/Home")
  }

}
</script>

<style scoped>

</style>