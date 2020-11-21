<template>
  <div>
    <!-- 顶部步骤条 -->
    <div class="steps">
      <el-steps :active="1">
        <el-step
          title="步骤 1"
          description="CRS 信息填写"
        ></el-step>
        <el-step
          title="步骤 2"
          description="公钥填写"
        ></el-step>
        <el-step title="步骤 3" description="填写完成"></el-step>
      </el-steps>
    </div>

    <!-- 表单 -->
    <cSRFrom />
  </div>
</template>

<script>
import CSRFrom from './CSRFrom.vue'

export default {
  name: "Application",
  components: {
    CSRFrom
  },
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
