<template>
  <div class="form">
    <h1>待审核列表</h1>
    <el-dialog
      title="公钥"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <div>
        <p>{{ thisPK }}</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-table :data="crs_list" style="width: 100%">
      <el-table-column fixed prop="id" label="ID" width="80"> </el-table-column>
      <el-table-column prop="country" label="Country" width="80">
      </el-table-column>
      <el-table-column prop="province" label="Province" width="180">
      </el-table-column>
      <el-table-column prop="locality" label="Locality"> </el-table-column>
      <el-table-column prop="organization" label="Organization" width="180">
      </el-table-column>
      <el-table-column
        prop="organizational_unit"
        label="Organization Unit"
        width="180"
      >
      </el-table-column>
      <el-table-column prop="common_name" label="Common Name" width="180">
      </el-table-column>
      <el-table-column prop="email_address" label="Email" width="180">
      </el-table-column>
      <el-table-column label="Public Key" width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="getPK(scope.$index)">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column fixed="right" prop="name" label="Option" width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="pass(scope.$index)">通过</el-button>
          <el-button size="mini" @click="unpass(scope.$index)" type="danger"
            >驳回</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "Name",
  data() {
    return {
      crs_list: [],
      dialogVisible: false,
      thisPK: "",
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    pass(index) {
      let self = this;
      this.$axios({
        method: "post",
        url: "/audit/pass",
        data: {
          csr_id: self.crs_list[index]["id"],
        },
        headers: {
          Token: self.$cookie.get("SESSIONID"),
        },
      }).then(function (response) {
        if (response.data["header"]["code"] == 200) {
          self.$message.success("已通过");
        }
      });
    },
    unpass(index) {
      let self = this;
      this.$axios({
        method: "post",
        url: "/audit/unpass",
        data: {
          csr_id: self.crs_list[index]["id"],
        },
        headers: {
          Token: self.$cookie.get("SESSIONID"),
        },
      }).then(function (response) {
        if (response.data["header"]["code"] == 200) {
          self.$message.success("已驳回");
        }
      });
    },
    getPK(index) {
      this.dialogVisible = true;
      this.thisPK = this.crs_list[index]["public_key"];
    },
    getList() {
      let self = this;
      this.$axios({
        method: "post",
        url: "/audit/list",
        data: {},
        headers: {
          Token: self.$cookie.get("SESSIONID"),
        },
      }).then(function (response) {
        console.log(response);
        self.crs_list = response.data["crs_list"];
      });
    },
  },
};
</script>

<style scoped>
.form {
  widows: 80%;
}
</style>