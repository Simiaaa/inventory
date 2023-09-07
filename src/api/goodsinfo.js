import myaxios from "@/utils/myanxios";
export default {
  getGoodsInfoList() {
    return myaxios({
      url: "/goodsinfo/list",
      method: "get"
    });
  },
  search(page, size, searchWhere) {
    return myaxios({
      url: "/bookinfo/list/search/${page}/${size}",
      method: "post",
      data: searchWhere //没有传值就是空值，即无条件分页查询
    });
  },
  add(goodsform) {
    return myaxios({
      url: "/addgoodsinfo",
      method: "post",
      data: goodsform
    });
  },
  // eslint-disable-next-line prettier/prettier, no-unused-vars
  getGoodsById(id){
    return myaxios({
      url: "/goodsinfo/${id}",
      method: "get"
    });
  },
  updateGoods(goodsObj) {
    return myaxios({
      url: "/goodsinfo/${goodsObj.id}",
      method: "put",
      data: goodsObj
    });
  },
  // eslint-disable-next-line prettier/prettier, no-unused-vars
  deleteGoods(id){
    return myaxios({
      url: "/goodsinfo/${id}",
      method: "delete"
    });
  },
  getTypeSum() {
    return myaxios({
      url: "/goods/getTypeSum",
      method: "get"
    });
  },
  getTypes(){
    return myaxios({
      url:"/goods/getTypes",
      method:"get"
    })
  }
};
