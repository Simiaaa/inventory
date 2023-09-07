<template>
  <div>
    <app-header>   
    </app-header>
    <app-main></app-main>
    <app-navbar></app-navbar>
  </div>
</template>
<script>
import AppHeader from "./AppHeader/index.vue";
import AppMain from "./AppMain/index.vue";
import AppNavbar from "./AppNavbar/index.vue";
export default {
  components: {
    AppHeader,
    AppMain,
    AppNavbar
  }
};
</script>
<style>
.header {
  position: absolute;
  line-height: 50px;
  background-color: #5c6060;
  left: 0px;
  right: 0px;
  top: 0px;
}
.navbar {
  position: absolute;
  width: 200px;
  left: 0px;
  bottom: 0px;
  top: 50px;
  overflow-y: auto;
  background-color: rgb(224, 224, 224);
  box-shadow: 5px 5px 7px gray;
}
.main {
  position: absolute;
  background-color: #f3f3f3;
  left: 202px;
  right: 0px;
  bottom: 0px;
  top: 50px;
  padding: 10px;
  overflow-y: auto;
}
</style>
