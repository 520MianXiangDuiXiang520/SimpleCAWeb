<template>
  <div class="stepT">
    <el-steps :active="step" simple>
      <el-step title="证书类型选择" icon="el-icon-edit"></el-step>
      <el-step title="CSR 信息填写" icon="el-icon-edit"></el-step>
      <el-step title="公钥上传" icon="el-icon-upload"></el-step>
      <el-step title="证书颁发" icon="el-icon-picture"></el-step>
    </el-steps>
  </div>
</template>

<script>
export default {
  name: "Step",
  props: {
    step: Number,
  },
};
</script>

<style scoped>
.stepT {
  width: 55%;
  margin: 30px auto 30px;
}
</style>