<template>
  <div>
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1" @click="toCSR">证书申请</el-menu-item>
      <el-menu-item index="2" @click="toMy">我的证书</el-menu-item>
      <el-menu-item index="3" style="float:right; margin: 0 10px"><el-link  target="_blank" href="https://github.com/520MianXiangDuiXiang520/SimpleCA" type="info">开源</el-link></el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Active",
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
    };
  },
  methods: {
    toCSR() {
        this.$router.push("/csr")
    },
    toMy() {
        this.$router.push("/user")
    }
  },
};
</script>

<style scoped>

</style>