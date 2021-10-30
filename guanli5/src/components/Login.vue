<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <el-form
        :model="loginForm"
        :rules="loginRules"
        ref="loginFormRef"
        class="login_form"
      >
        <el-form-item prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="infp" @click="resetLoginForm">重置</el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123456",
      },
      loginRules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6 到 10个字符", trigger: "blur" },
        ],
      },
    };
  },
  created() {},
  methods: {
      login(){
          this.$refs.loginFormRef.validate(async valid=>{
            //   console.log(valid)
            if(!valid) return
            const {data: res} = await this.$http.post('login',this.loginForm)
            if(res.meta.status !== 200 ){
                return this.$message.error('获取失败')
            }
            this.$message.success('登录成功')
            window.sessionStorage.setItem('token',res.data.token)
            this.$router.push('/home')
          })
        //   this.$http.post('login',)
      },
      resetLoginForm(){
          this.$refs.loginFormRef.resetFields()
      }

  },
};
</script>
<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
  .login_box {
    width: 450px;
    height: 300px;
    background-color: white;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .avatar_box {
      border-radius: 50%;
      height: 130px;
      width: 130px;
      padding: 10px;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;
      box-shadow: 0 0 10px #ddd;
      border: 1px solid #eee;
      img {
        height: 100%;
        width: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }
    .login_form{
        position: absolute;
        width: 100%;
        bottom: 0;
        
        box-sizing: border-box;
        padding: 0 20px;
        .btn{
            display: flex;
            justify-content: flex-end;
        }
    }
  }

}
</style>