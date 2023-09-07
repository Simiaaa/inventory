<template>
  <div>
    <div class="navbar">
      <el-menu
        :router="true"
        default-active="/home"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="rgb(224, 224, 224)"
        text-color="#5c6060"
        active-text-color="#409EFF"
      >
        <el-menu-item index="/home">
          <i class="el-icon-menu"></i>
          <span>首页</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>商品信息管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/goodstype">商品类别管理</el-menu-item>
            <el-menu-item index="/goodsinfo">商品信息管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-s-platform"></i>
            <span>商品库存管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/inventory">库存查询</el-menu-item>
            <el-menu-item index="/storage">入库查询</el-menu-item>
            <el-menu-item index="/outbound">出库查询</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="/orders">
          <i class="el-icon-s-check"></i>
          <span slot="title">订单管理</span>
        </el-menu-item>
        <el-menu-item index="/finance">
          <i class="el-icon-s-check"></i>
          <span slot="title">财务</span>
        </el-menu-item>
        <el-menu-item index="/user">
          <i class="el-icon-s-check"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>
<style>

</style>
<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
