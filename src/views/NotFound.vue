<template>
  <h1>{{path}}未找到，请联系管理员</h1>
</template>

<script>
export default {

    data(){
        return {
            path : null
        };
    },
    beforeRouteUpdate (to, from, next) {
        this.setPath(to.fullPath)
        next();
    },
    beforeRouteEnter (to, from, next) {
        console.log();
        next((vm) => {
            vm.setPath(to.fullPath)
        });
    },
    methods : {
        setPath(path) {
            this.path = path;
        }
    }
}
</script>

<style>

</style>