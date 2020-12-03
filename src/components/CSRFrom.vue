<template>
  <div>
    <active />
    <step :step="step" />

    <!-- 选择证书类型 -->
    <div v-if="step == 1" class="form">
      <el-row :gutter="50">
        <!-- 代码签名 -->
        <el-col :span="12" >
          <el-card shadow="hover" >
            <div class="grid-content bg-purple choise codeSign" @click="choiseCodeSign">
              <div class="sslIcon">
                <i class="el-icon-set-up"></i>
              </div>
              <h3>代码签名证书</h3>
              <div class="use">
                <p align="left" class="info">
                  <i class="el-icon-info"></i> 代码签名证书为软件开发商提供了一个理想的解决方案，使得软件开发商能对其软件代码进行数字签名。
                </p>
                <p align="left" class="info">
                  <i class="el-icon-info"></i> 通过对代码的数字签名来标识软件来源以及软件开发者的真实身份，保证代码在签名之后不被恶意篡改。使用户在下载已经签名的代码时，能够有效的验证该代码的可信度。
                </p>
              </div>
            </div>
          </el-card>
        </el-col>

        <!-- ssl -->
        <el-col :span="12" >
          <el-card shadow="hover">
          <div class="grid-content bg-purple choise ssl" @click="choiseSSL">
            <div class="sslIcon">
              <i class="el-icon-s-check"></i>
            </div>
            <h3>SSL 证书</h3>
            <div class="use">
                <p align="left" class="info">
                  服务器部署了 SSL 证书后可以确保用户在浏览器上输入的机密信息和从服务器上查询的机密信息从用户电脑到服务器之间的传输链路上是高强度加密传输的，是不可能被非法篡改和窃取的。同时向网站访问者证明了服务器的真实身份，此真实身份是通过第三方权威机构验证的。
                  <br><br>
                  <b>即 SSL 证书的功能总结为：</b><br>
                  <i class="el-icon-info"></i> <b>数据加密</b> <br/>
                  <i class="el-icon-info"></i> <b>身份认证</b>
                </p>
              </div>
          </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 提交 CSR 信息 -->
    <div v-if="step == 2" class="form">
      <el-row :gutter="20">
        <el-col :span="12"
          ><div class="grid-content">
            <el-card class="box-card">
              <div class="tap">
                <p align="left">
                  <b>您需要提供您的必要信息，以便我们核验您的身份。</b>
                </p>
                <p align="left">
                  <i class="el-icon-info"></i> 如果您有自己的 CSR
                  文件，可以直接拖拽至下方上传，我们会帮您解析。
                </p>
                <p align="left">
                  <i class="el-icon-info"></i>
                  当然，您可以选择直接填写右侧表单提交。
                </p>
                <div class="code">
                  $ openssl req -new -nodes -keyout server.key -out server.csr
                </div>
              </div>
              <el-upload
                class="upload-demo"
                drag
                action="http://localhost:8080/api/ca/csr_file"
                name="CSR_FILE"
                :on-success="uploadSuccess"
                :with-credentials="true"
                multiple
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  将文件拖到此处，或<em>点击上传</em>
                </div>
                <div class="el-upload__tip" slot="tip">
                  请上传 csr 文件，大小不要超过 100 KB
                </div>
              </el-upload>
            </el-card>
          </div></el-col
        >
        <el-col :span="12"
          ><div class="grid-content">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              style="margin: 0 auto"
            >
              <el-form-item label="国家" prop="country">
                <el-input
                  type="text"
                  v-model="ruleForm.country"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="省/州" prop="province">
                <el-input v-model="ruleForm.province"></el-input>
              </el-form-item>
              <el-form-item label="市" prop="locality">
                <el-input v-model="ruleForm.locality"></el-input>
              </el-form-item>
              <el-form-item label="公司/组织" prop="organization">
                <el-input v-model="ruleForm.organization"></el-input>
              </el-form-item>
              <el-form-item label="部门" prop="organization_unit_name">
                <el-input v-model="ruleForm.organization_unit_name"></el-input>
              </el-form-item>
              <el-form-item label="姓名" prop="common_name">
                <el-input v-model="ruleForm.common_name"></el-input>
              </el-form-item>
              <el-form-item label="电子邮件" prop="email">
                <el-input v-model="ruleForm.email"></el-input>
              </el-form-item>
              <el-form-item label="域名信息" prop="dns" v-if="type == 2">
                <el-input v-model="ruleForm.dns" ></el-input>
                <i class="el-icon-info"></i> 多个域使用空格分割
              </el-form-item>
              <el-form-item>
                <el-button type="primary" v-if="type == 1" @click="submitForm('ruleForm')">提交</el-button>
                <el-button type="primary" v-if="type == 2" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </div></el-col
        >
      </el-row>
    </div>

    <!-- 提交公钥信息 -->
    <div v-if="step == 3" v-loading.fullscreen.lock="loading">
      <div class="form">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-card class="box-card tag" shadow="hover">
              <el-input
                type="textarea"
                :autosize="{ minRows: 15, maxRows: 15 }"
                placeholder="请输入内容"
                v-model="pk"
              >
              </el-input>
              <el-button type="primary" @click="autoGetKey" class="but"
                >自动生成</el-button
              >
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card class="box-card tag" shadow="hover">
              <el-input
                type="textarea"
                :autosize="{ minRows: 15, maxRows: 15 }"
                placeholder="请输入内容"
                v-model="pk"
              >
              </el-input>
              <el-button type="primary" class="but" @click="submitPublicKey"
                >手动提交</el-button
              >
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>

    <!-- 成功 -->
    <div v-if="step == 4">
      <div class="from">
        <i class="el-icon-success icon"></i>
        <p>您的申请信息以成功提交，正在等待 CA 审核</p>
        <p>审核通过后，证书将通过邮件发送给您，请您耐心等待。</p>
      </div>
    </div>
  </div>
</template>

<script>
import Step from "./Step.vue";
import Active from "./Active.vue";
export default {
  components: { Step, Active },
  name: "CSRFrom",
  data() {
    return {
      ruleForm: {
        country: "",
        province: "",
        locality: "",
        organization: "",
        organization_unit_name: "",
        common_name: "",
        email: "",
        dns:""
      },
      step: 1,
      type: 0,
      requestID: "",
      loading: false,
      pk: "",
      rules: {
        country: [
          { required: true, message: "请输入国别编码", trigger: "blur" },
        ],
        province: [
          { required: true, message: "请输入省或州", trigger: "blur" },
        ],
        locality: [
          { required: true, message: "请输入地区或市", trigger: "blur" },
        ],
        organization: [
          { required: true, message: "请输入公司或组织名称", trigger: "blur" },
        ],
        organization_unit_name: [
          { required: true, message: "请输入部门名称", trigger: "blur" },
        ],
        common_name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
        ],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
      },
    };
  },
  methods: {
    // 选择代码签名证书
    choiseCodeSign() {
      this.type = 1
      this.step = 2
    },
    // 选择 SSL 证书
    choiseSSL() {
      this.type = 2
      this.step = 2
    },
    // 文件上传成功后的钩子
    uploadSuccess(response) {
      console.log(response);
      if (response["header"]["code"] == 200) {
        this.$message.success("上传成功");
        this.ruleForm.country = response["country"];
        this.ruleForm.province = response["province"];
        this.ruleForm.locality = response["locality"];
        this.ruleForm.organization = response["organization"];
        this.ruleForm.organization_unit_name = response["organizational_unit"];
        this.ruleForm.common_name = response["common_name"];
        this.ruleForm.email = response["email_address"];
        this.pk = response["public_key"];
      } else {
        this.$message.error(response["header"]["msg"]);
      }
    },
    // 自动生成公私钥console.log()
    autoGetKey: function () {
      this.loading = true;
      var key = this.RSA.KEYUTIL.generateKeypair("RSA", 2048);
      var pubKeyPEM = this.RSA.KEYUTIL.getPEM(key.pubKeyObj);
      let prvKeyPEM = this.RSA.KEYUTIL.getPEM(
        key.prvKeyObj,
        "PKCS5PRV",
        "password"
      );
      this.pk = pubKeyPEM;

      var element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(prvKeyPEM)
      );
      element.setAttribute("download", "private_key.pem");

      element.style.display = "none";
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
      this.loading = false;
    },

    // 提交 代码签名 CSR
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let self = this;
          this.$axios({
            method: "post",
            url: "/ca/code_sign_csr",
            data: {
              country: self.ruleForm.country,
              province: self.ruleForm.province,
              locality: self.ruleForm.locality,
              organization: self.ruleForm.organization,
              common_name: self.ruleForm.common_name,
              email_address: self.ruleForm.email,
              organizational_unit: self.ruleForm.organization_unit_name,
            },
            headers: {
              Token: self.$cookie.get("SESSIONID"),
            },
          }).then(function (response) {
            if (response.data["header"]["code"] == 200) {
              self.$message.success("提交成功");
              self.requestID = response.data["csr_id"];
              self.step = 3;
            } else {
              self.$message.error(response["header"]["msg"]);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

// 提交 SSL CRS

  submitSSLForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid && this.ruleForm.dns.length > 0) {
          let self = this;
          this.$axios({
            method: "post",
            url: "/ca/ssl_csr",
            data: {
              country: self.ruleForm.country,
              province: self.ruleForm.province,
              locality: self.ruleForm.locality,
              organization: self.ruleForm.organization,
              common_name: self.ruleForm.common_name,
              email_address: self.ruleForm.email,
              organizational_unit: self.ruleForm.organization_unit_name,
              dns_names: self.ruleForm.dns
            },
            headers: {
              Token: self.$cookie.get("SESSIONID"),
            },
          }).then(function (response) {
            if (response.data["header"]["code"] == 200) {
              self.$message.success("提交成功");
              self.requestID = response.data["csr_id"];
              self.step = 3;
            } else {
              self.$message.error(response["header"]["msg"]);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    // 提交公钥信息
    submitPublicKey: function () {
      let self = this;
      this.$axios({
        method: "post",
        url: "/ca/upload_pk",
        data: {
          csrid: self.requestID,
          public_key: self.pk,
        },
        headers: {
          Token: self.$cookie.get("SESSIONID"),
        },
      }).then(function (response) {
        if (response.data["header"]["code"] == 200) {
          self.$message.success("提交成功");
          self.step = 4;
        } else {
          self.$message.error(response["header"]["msg"]);
        }
      });
    },
  },
};
</script>

<style scoped>
.use {
  padding: 15px;
}
.code {
  background-color: #303133;
  color: aliceblue;
  padding: 20px;
  margin: 0 0 15px 10px;
}
.sslIcon {
  padding: 25px 0 0 0;
  font-size: 77px;
}
.el-card {
  margin-left: 10px;
}
.tap p {
  font-size: 14px;
  color: #303133;
  margin-left: 20px;
}
body {
  margin: 0;
}
.but {
  margin-top: 10px;
  width: 100%;
}
.form {
  width: 75%;
  margin: 30px auto 30px auto;
  color: #606266;
}
.pk_input {
  height: 100px;
}
.tag {
  height: 450px;
}
.choise {
  height: 450px;
}
.icon {
  font-size: 77px;
  color: #67c23a;
}
.bg-purple {
  background: #d3dce6;
}
.info {
  margin-left: 30px;
  color: #303133;
}
</style>