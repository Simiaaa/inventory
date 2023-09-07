<template>
  <div>
    <div class="main">
      <el-breadcrumb
        separator-class="el-icon-arrow-right"
        v-show="$route.path != '/home' && $route.path != '/'"
      >
        <el-breadcrumb-item
          v-show="$route.path == '/goodstype' || $route.path == '/goodsinfo'"
          >商品信息管理</el-breadcrumb-item
        >
        <el-breadcrumb-item
          v-show="
            $route.path == '/inventory' ||
              $route.path == '/storage' ||
              $route.path == '/outbound'
          "
          >商品库存管理</el-breadcrumb-item
        >
        <el-breadcrumb-item :to="{ path: $route.path }">{{
          $route.meta.title
        }}</el-breadcrumb-item>
      </el-breadcrumb>
      <router-view></router-view>
    </div>
  </div>
</template>
<script></script>
<style>
.main {
  position: absolute;
  left: 250px;
  right: 0px;
  bottom: 0px;
  top: 50px;
  padding: 5px;
  overflow-y: auto;
}
.el-breadcrumb {
  height: 10px;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 10px gray;
  margin-bottom: 10px;
}
</style>
