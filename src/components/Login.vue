<template>
    <div>
        <h1>Login</h1>
    </div>
</template>

<script>
export default {
    name: "Login",
    mounted(){
        let cookie = this.$route.params.token
        if (cookie != "") {
            this.$cookie.set("SESSIONID", cookie);
            this.$router.push("/csr")
        }
    }
}
</script>