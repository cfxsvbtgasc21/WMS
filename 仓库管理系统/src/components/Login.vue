<template>
  <div class="loginBody">
    <div class="loginBackground"></div>
    <div class="loginDiv">
      <div class="login-content">
        <div class="logo-container">
          <i class="el-icon-s-home logo-icon"></i>
          <h1 class="login-title">仓库管理系统</h1>
        </div>
        <el-form :model="loginForm" label-width="100px"
                 :rules="rules" ref="loginForm">
          <el-form-item label="用户账号" prop="no">
            <el-input prefix-icon="el-icon-user" style="width: 280px" type="text" v-model="loginForm.no"
                      autocomplete="off" size="medium" placeholder="请输入您的账号"></el-input>
          </el-form-item>
          <el-form-item label="登录密码" prop="password">
            <el-input prefix-icon="el-icon-lock" style="width: 280px" type="password" v-model="loginForm.password"
                      show-password autocomplete="off" size="medium" placeholder="请输入您的密码" @keyup.enter.native="confirm"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="confirm" :disabled="confirm_disabled || requestProcessing"
                       style="width: 280px; height: 40px; font-size: 16px;">
              <i class="el-icon-right"></i> 登 录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      confirm_disabled: false,
      requestProcessing: false,
      loginForm: {
        no: '',
        password: ''
      },
      rules: {
        no: [
          { required: true, message: '请输入用户账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' }
        ],
      },
      loginTimeout: null,
      TIMEOUT_DURATION: 5000, // 设置超时时间为5秒
      // 新增：用于跟踪请求状态
      requestAborted: false
    }
  },
  methods: {
    confirm() {
      this.confirm_disabled = true;
      this.requestProcessing = true;
      this.requestAborted = false; // 重置状态

      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          // 设置请求超时计时器
          this.loginTimeout = setTimeout(() => {
            this.requestProcessing = false;
            this.confirm_disabled = false;
            this.requestAborted = true; // 标记请求已超时
            this.$message.error('登录请求超时，请检查网络连接');
          }, this.TIMEOUT_DURATION);

          // 发送登录请求
          this.$axios.post(this.$httpUrl + '/user/login', this.loginForm)
              .then(res => res.data)
              .then(res => {
                // 如果请求已被标记为超时，则不再处理
                if (this.requestAborted) return;

                // 清除超时计时器
                clearTimeout(this.loginTimeout);

                if (res.code == 200) {
                  sessionStorage.setItem("CurUser", JSON.stringify(res.data.user));
                  sessionStorage.setItem("MenuData", JSON.stringify(res.data.menu));
                  this.$store.commit("setMenu", res.data.menu);
                  this.$router.replace('/Index').catch(() => {});
                } else {
                  this.requestProcessing = false;
                  this.confirm_disabled = false;
                  this.$message.error('用户名或密码错误，请重新输入');
                }
              })
              .catch(error => {
                // 移除问题代码：if (this.requestAborted) return;

                clearTimeout(this.loginTimeout); // 仍然需要清除定时器

                if (error.response) {
                  // 处理HTTP错误响应
                  const status = error.response.status;
                  if (status === 400) {
                    this.$message.error('用户名或密码错误');
                  } else if (status >= 500) {
                    this.$message.error('服务器内部错误：' + error.response.data.message);
                  }
                } else if (error.request) {
                  // 请求已发出但无响应
                  if (error.code === 'ECONNABORTED') {
                    this.$message.error('请求超时，请检查网络');
                  } else {
                    this.$message.error('网络连接异常');
                  }
                } else {
                  // 其他错误
                  this.$message.error('请求失败：' + error.message);
                }

                this.requestProcessing = false;
                this.confirm_disabled = false;
              });
        } else {
          this.confirm_disabled = false;
          this.$message.error('表单验证失败，请检查输入内容');
        }
      });
    }
  },
  beforeDestroy() {
    // 组件销毁前清除超时计时器
    if (this.loginTimeout) {
      clearTimeout(this.loginTimeout);
    }
  }
}
</script>

<style scoped>
/* 整体页面样式 */
.loginBody {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #F5F7FA;
  overflow: hidden;
  z-index: 100;
}

/* 背景装饰 */
.loginBackground {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #165DFF 0%, #0A3CA0 100%);
  opacity: 0.05;
  z-index: -1;
  background-size: cover;
  background-position: center;
}

/* 登录卡片样式 */
.loginDiv {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 420px;
  height: 360px; /* 高度减少，适应内容 */
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.loginDiv:hover {
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

/* 标题区域样式 */
.logo-container {
  text-align: center;
  margin-bottom: 30px;
}

.logo-icon {
  font-size: 48px;
  color: #165DFF;
  margin-bottom: 15px;
}

.login-title {
  font-size: 24px;
  font-weight: 600;
  color: #303133;
  margin: 0;
  letter-spacing: 1px;
}

/* 表单内容区域 */
.login-content {
  width: 100%;
}

/* 表单元素样式 */
.el-form-item {
  margin-bottom: 20px;
  width: 100%;
}

.el-input {
  transition: all 0.2s ease;
  width: 100%;
}

.el-input:focus {
  border-color: #165DFF;
  box-shadow: 0 0 0 2px rgba(22, 93, 255, 0.2);
}

.el-button {
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.2s ease;
  width: 100%;
}

.el-button:hover {
  background-color: #0D50E8;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(22, 93, 255, 0.3);
}

/* 禁用状态样式 */
.el-button:disabled {
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}
</style>