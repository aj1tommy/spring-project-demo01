<template>
  <div class="login">

      <div class="login_context">
          
          <div class="login_logo">
              <img src="../../assets/logo.png">
          </div>
          <h3>登录</h3>
          
          <el-form :model="loginForm" :rules="loginFormRul" ref="loginFormRel" class="login_box">
              <el-form-item prop="username">
                <el-input  prefix-icon="el-icon-user" v-model="loginForm.username"></el-input>
              </el-form-item>

              <el-form-item  prop="password">
                <el-input prefix-icon="el-icon-lock" type="password" v-model="loginForm.password"></el-input>
              </el-form-item>
              
              <el-form-item prop="captcha">
                <el-input v-model="loginForm.captchaInput" placeholder="请输入验证码"></el-input>
                <img :src="loginForm.captcha" alt="验证码图片">  <!-- 展示验证码图片 -->
                <el-button type="text" @click="getCaptchaImage">获取验证码</el-button>  <!-- 获取验证码图片的按钮 -->
                 <!-- Form -->
                 <el-button type="text" @click="dialogFormVisible = true">点击注册</el-button>
              </el-form-item>
             


              <el-form-item class="btns">
                <el-button type="primary" @click="Onsubmit">登录</el-button> 
                <el-button type="info" @click="resetForm('loginFormRel')">重置</el-button>
              </el-form-item>
          </el-form>

          
      
      </div>
      <el-dialog title="系统注册" :visible.sync="dialogFormVisible">
              <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="username" prefix-icon="el-icon-user-solid">
            <el-input v-model.number="ruleForm.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="请确认密码"></el-input>
          </el-form-item>
          <el-form-item label="权限" :label-width="formLabelWidth" prop="rolePlay" >
            <el-select v-model="ruleForm.rolePlay" placeholder="请选择角色权限">
                <el-option label="管理员" value="1"></el-option>
                <el-option label="普通用户" value="0"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
     
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data(){
    var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
    }
    return{
      dialogFormVisible:false,
      ruleForm:{
        username:"",
        password:"",
        checkPass:"",
        rolePlay:""
      },
      //login表单请求数据
      loginForm:{
          username:"",
          password:"",
          captcha:'',
          captchaInput:''
      },
      rules: {
          username:[
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          
        },
      //表单验证规则
      loginFormRul:{
        username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
      }
    };
  },
  methods:{
    getCaptchaImage() {
      axios.get('http://localhost:8080/user/getImage', { responseType: 'arraybuffer' })
        .then(response => {
          const imageData = 'data:image/png;base64,' + btoa(
            new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
          );
          this.loginForm.captcha = imageData;  // 将获取到的验证码图片数据赋值给前端变量
        })
        .catch(error => {
          console.error(error);
        });
    },
    submitForm(){
      if(!this.ruleForm.username){
        alert("用户名不能为空！")
        return;
      }
      const { username, password, rolePlay } = this.ruleForm;
      const user = { username, password, rolePlay };
      let usernameExists = false;

  axios.get('http://localhost:8080/user/checkUsername/' + user.username)
    .then(response => {
      console.log(response.data.data);
      if (response.data.data === username) {
        this.$message.error('该用户名已存在');
        usernameExists = true;
      }
    })
    .then(() => {
      if (!usernameExists) {
        axios.post('http://localhost:8080/user/regist', user)
          .then(response => {
            console.log(response.data);
            if (response.data.code === 1) {
              this.$message({
                message: '注册成功',
                type: 'success'
              });
              this.dialogFormVisible = false;
            }
          });
      }
    });
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    Onsubmit(){
      axios.post('http://localhost:8080/user/login', {
        username: this.loginForm.username,
        password: this.loginForm.password,
        captcha: this.loginForm.captchaInput
      })
      .then(response => {
      console.log(response)
        // 处理登录成功的逻辑
        if (response.data.code === 1 && response.data.msg === 'success') {
          this.$message({
        message: '登录成功',
        type: 'success'
        })
        this.$store.commit('SET_USER_INFO', {  
          username: response.data.data.username,  
          rolePlay: response.data.data.rolePlay  
        });  
        this.$router.push({
          path:'/home',
         });
      }
      
        else if(response.data.msg==='Invalid username or password')
          alert("登陆失败")
        // else if(response.data.msg==="验证码错误")
        //   alert("验证码错误")
      })
      .catch(error => {
        // 处理登录失败的逻辑
        console.error(error)
      });
    }

  } 

}
</script>
// scoped="scoped"
<style>
  h3 {
    text-align: center;
    color: rgb(43, 75, 107); /* Match the background color of the login container */
    font-size: 24px;
    margin-top: 55px; /* Increase the margin-top value to move the text down */
    text-transform: uppercase;
    letter-spacing: 2px;
  }
  .login{
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgb(43, 75,107);
  }
  *{		/* CSS Reset */
	margin : 0;
	padding : 0;
}
  .login_context{
    width: 500px;
    height: 350px;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border-radius: 8px;
    box-shadow: 0 0 5px 2px #ddd;
  }
  .login_logo{
    width: 100px;
    height: 100px;
    position: absolute;
    top: -60px;
    left: 53%;
    margin-left: -70px;
    border: 1px solid #eee;
    border-radius: 50%;
    background: #fff;
    padding: 5px;
    box-shadow: 0 0 3px 2px #fff;
  }
  .login_logo img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: rgb(238, 238, 238);
  }
  .login_box{
    width: 100%;
    position: absolute;
    bottom: 0;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .btns{
    display: flex;
    justify-content: flex-end;
  }
</style>