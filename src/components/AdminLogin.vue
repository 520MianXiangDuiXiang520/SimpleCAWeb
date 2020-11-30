<template id="login-body">
  <div class="datas">
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card data-input">
          <h3>登录</h3>
          <div class="input">
            <el-input placeholder="请输入内容" v-model="username" clearable></el-input>
          </div>
          <div class="input">
            <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
          </div>
          <div class="button">
            <el-button type="primary" @click="login()">登录</el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      this: null,
      username: "",
      password: "",
      token: "",
    };
  },
  methods: {
    login() {
      let self = this;
      if (this.username == "" || this.password == "") {
        alert("you mast input password and username");
      } else {
        this.axios({
          method: "post",
          url: "/auth/login",
          data: {
            username: this.username,
            password: this.password,
          },
        }).then(function (response) {
          if (response.data["header"]["code"] != 200) {
            alert("用户名或密码错误");
          } else {
            self.token = response.data["token"];
            self.$cookie.set("SESSIONID", response.data["token"]);
            self.$router.push("/admin");
          }
        });
      }
    },
  },
  mounted() {},
};
</script>

<style scoped>
#login-body {
  background-color: #fffefa;
}
.button {
  text-align: center;
}
.datas {
  margin-top: 12%;
}
.text {
  font-size: 14px;
}
.item {
  padding: 18px 0;
}
.box-card {
  width: 480px;
}
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
}
.input {
  margin: 20px;
}
</style>