<template>
  <div style="text-align: center;background-color: #f1f1f3;height: 100%;padding: 10px;margin: 0px;">
    <el-descriptions   title="个人中心" :column="1" size="medium" border  >
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-s-custom"></i>
          账号
        </template>
        {{user.no}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile-phone"></i>
          电话
        </template>
        {{user.phone}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-location-outline"></i>
          性别
        </template>
        <el-tag
            :type="user.sex === '1' ? 'primary' : 'danger'"
            disable-transitions><i :class="user.sex==1?'el-icon-male':'el-icon-female'"></i>{{user.sex==1?"男":"女"}}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          角色
        </template>
        <el-tag
            type="success"
            disable-transitions>{{user.roleId==0?"超级管理员":(user.roleId==1?"管理员":"用户")}}</el-tag>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>
<script>
export default {
  name: "Home",
  data() {

    return {
      user:{}
    }
  },
  computed:{

  },
  methods:{
    init(){
      this.user = JSON.parse(sessionStorage.getItem('CurUser'))
    }
  },
  created(){
    this.init()
  }
}
</script>

<style scoped>
/* 修改 el-descriptions 的标题字体大小 */
::v-deep .el-descriptions__title {
  font-size: 20px;
}
</style>