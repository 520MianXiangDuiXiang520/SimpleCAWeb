<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
    >
      <el-form-item label="国家" prop="country">
        <el-input
          type="text"
          v-model="ruleForm.country"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="省/州" prop="province">
        <el-input
          type="text"
          v-model="ruleForm.checkPass"
          autocomplete="off"
        ></el-input>
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
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
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
      },
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
</style>