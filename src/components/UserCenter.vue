<template>
  <div>
    <active />
    <div class="from">
      <!-- 用户个人信息 -->
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="grid-content bg-purple userinfo"></div>
        </el-col>
      </el-row>
      <!-- 证书列表 -->
      <el-row :gutter="20">
        <el-col :span="6" v-for="(i, index) in cers" :key="i.serial_number" class="cerBox">
          <div class="grid-content bg-purple cer" style="padding-bottom: 15px">
            <div class="header">
              <div v-if="i.statue == 1">
                <i v-if="i.type == 1" class="el-icon-set-up icon"></i>
                <i v-if="i.type == 2" class="el-icon-s-check icon"></i>
                <p v-if="i.type == 1" class="title">代码签名证书（使用中）</p>
                <p v-if="i.type == 2" class="title">SSL 证书（使用中）</p>
              </div>
              <!-- 证书被撤销 -->
              <div v-if="i.statue == 2">
                <i v-if="i.type == 1" class="el-icon-set-up icon2"></i>
                <i v-if="i.type == 2" class="el-icon-s-check icon2"></i>
                <p v-if="i.type == 1" class="title2">代码签名证书（已吊销）</p>
                <p v-if="i.type == 2" class="title2">SSL 证书（已吊销）</p>
              </div>
              <!-- 证书过期 -->
              <div v-if="i.statue == 3">
                <i v-if="i.type == 1" class="el-icon-set-up icon3"></i>
                <i v-if="i.type == 2" class="el-icon-s-check icon3"></i>
                <p v-if="i.type == 1" class="title">代码签名证书（已过期）</p>
                <p v-if="i.type == 2" class="title">SSL 证书（已过期）</p>
                i.issuer
              </div>
            </div>

            <div class="body">
              <b>序列号：</b>
              <p class="line">{{ i.serial_number.toString(16) }}</p>
              <br />
              <b>颁发者：</b>
              <p class="line">{{ i.issuer.split(",")[0] }}</p>
              <br />
              <b>颁发给：</b>
              <p class="line">{{ i.subject.split(",")[0] }}</p>
              <br />
              <b>开始于：</b>
              <p class="line">{{ getExactTime(i.not_before) }}</p>
              <br />
              <b>截止到：</b>
              <p class="line">{{ getExactTime(i.not_after) }}</p>
              <br />
            </div>

            <div class="footer">
              <el-row :gutter="20">
                <el-col :span="12"
                  ><el-button type="primary" @click="detail(index)"
                    >证书详情</el-button
                  ></el-col
                >
                <el-col :span="12">
                  <el-button
                    type="danger"
                    @click="dialogVisible2 = true"
                    v-if="i.statue == 1"
                    >注销证书</el-button
                  >
                  <el-button type="danger" plain disabled v-else
                    >注销证书</el-button
                  >
                </el-col>
                <el-dialog
                  title="警告"
                  :visible.sync="dialogVisible2"
                  width="30%"
                >
                  <b>此操作不可逆，您是否确定要继续？</b>
                  <p>
                    您的证书注销后，我们将会在一天时间内更新 CRL
                    列表，这时您的证书将不被信任。
                  </p>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible2 = false">取 消</el-button>
                    <el-button type="danger" @click="crl(i.serial_number)"
                      >确认注销</el-button
                    >
                  </span>
                </el-dialog>
              </el-row>
            </div>

            <el-dialog title="证书详情" :visible="dialogVisible" width="70%">

              <el-collapse>
                <div class="body" v-if="JSON.stringify(cer) != '{}'">
                  <b>序列号：</b>
                  <p class="line">{{ cer.serial_number.toString(16) }}</p>
                  <br />
                  <b>颁发者：</b>
                  <p class="line">{{ cer.issuer }}</p>
                  <br />
                  <b>颁发给：</b>
                  <p class="line">{{ cer.subject }}</p>
                  <br />
                  <b>签名算法：</b>
                  <p class="line">{{ cer.signature_algorithm }}</p>
                  <br />
                  <b>签名哈希算法：</b>
                  <p class="line">{{ cer.public_key_algorithm }}</p>
                  <br />
                  <b>密钥用法：</b>
                  <p class="line">{{ cer.key_usage }}</p>
                  <br />
                  <b>增强型密钥用法：</b>
                  <p class="line">{{ cer.ext_key_usage }}</p>
                  <br />
                  <b>CRL 分发点：</b>
                  <p class="line">{{ cer.crl_distribution_points }}</p>
                  <br />
                  <b>证书下载路径：</b>
                  <p class="line">{{ cer.download_link }}</p>
                  <br />
                  <b>使用者可选名称：</b>
                  <p class="line">{{ cer.dns_name }}</p>
                  <br />
                  <b>公钥：</b>
                  <el-collapse-item title="点击展开" name="4">
                    {{ i.public_key }}
                  </el-collapse-item>
                  <br />
                </div>
              </el-collapse>

              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
              </span>

            </el-dialog>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Active from "./Active.vue";
export default {
  components: { Active },
  name: "UserCenter",
  data() {
    return {
      cers: [],
      dialogVisible: false,
      dialogVisible2: false,
      cer: {},
    };
  },
  mounted() {
    let self = this;
    let token = this.$cookie.get("SESSIONID");
    console.log(token);
    this.$axios({
      method: "post",
      url: "/user/cer",
      data: {},
      headers: {
        Token: token,
      },
    }).then(function (response) {
      console.log(response);
      self.cers = response.data["certificates"];
      if(self.cers.length > 0) {
        self.cer = self.cers[0]
      }
    });
  },
  methods: {
    // 证书详情
    detail(i) {
      this.cer = this.cers[i]
      this.dialogVisible = true;
    },
    // 吊销证书
    crl(serial) {
      let self = this;
      this.$axios({
        method: "post",
        url: "/ca/revoke",
        data: {
          serial_number: serial,
        },
        headers: {
          Token: self.$cookie.get("SESSIONID"),
        },
      }).then(function (response) {
        if (response.data["header"]["code"] == 200) {
          self.$message.success("已吊销");
        }
      });
    },
    getExactTime(time) {
      var date = new Date(time * 1000);
      var year = date.getFullYear() + "-";
      var month =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var dates =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      var hour =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var min =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
      var second =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return year + month + dates + hour + min + second;
    },
  },
};
</script>

<style scoped>
.footer {
  margin: 10px 15px 10px 15px;
}
.line {
  display: inline-block;
}
.body {
  text-align: left;
  margin-left: 29px;
}
.font {
  color: #303133;
}
.header {
  padding: 20px;
}
.title {
  color: #67c23a;
  font-size: 16px;
  text-align: center;
  padding: 7px;
  margin: 0px;
}
.title2 {
  color: #909399;
  font-size: 16px;
  text-align: center;
  padding: 7px;
  margin: 0px;
}
.title3 {
  color: #f56c6c;
  font-size: 16px;
  text-align: center;
  padding: 7px;
  margin: 0px;
}
.icon {
  font-size: 50px;
  text-align: center;
  color: #67c23a;
}
.icon2 {
  font-size: 50px;
  text-align: center;
  color: #909399;
}
.icon3 {
  font-size: 50px;
  text-align: center;
  color: #f56c6c;
}
.from {
  width: 75%;
  margin: 30px auto;
}
.userinfo {
  height: 200px;
}
.cerBox {
  margin-bottom: 15px;
}
.cer {
  padding-bottom: 20px;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>