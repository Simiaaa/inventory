import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/login/index.vue";
import Layout from "@/components/Layout.vue";
import Home from "@/views/home/index.vue";
import Goodstype from "@/views/goods/goodstype.vue";
import Goodsinfo from "@/views/goods/goodsinfo.vue";
import Inventory from "@/views/inventory/inventory.vue";
import Storage from "@/views/inventory/storage.vue";
import Outbound from "@/views/inventory/outbound.vue";
import User from "@/views/user/user.vue";
import Orders from "@/views/orders/index.vue";
import Finance from "@/views/finance/index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/",
    name: "layout",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "/home",
        component: Home,
        meta: { title: "首页" }
      },
      {
        path: "/goodstype",
        component: Goodstype,
        meta: { title: "商品类别管理" }
      },
      {
        path: "/goodsinfo",
        component: Goodsinfo,
        meta: { title: "商品信息管理" }
      },
      {
        path: "/inventory",
        component: Inventory,
        meta: { title: "库存查询" }
      },
      {
        path: "/storage",
        component: Storage,
        meta: { title: "出库查询" }
      },
      {
        path: "/outbound",
        component: Outbound,
        meta: { title: "入库查询" }
      },
      {
        path: "/orders",
        component: Orders,
        meta: { title: "订单管理" }
      },
      {
        path: "/finance",
        component: Finance,
        meta: { title: "财务" }
      },
      {
        path: "/user",
        component: User,
        meta: { title: "用户管理" }
      }
    ]
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.VUE_APP_BASE_URL,
  routes
});

export default router;
