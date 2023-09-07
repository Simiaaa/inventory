<template>
  <div class="goodstype">
    <el-table :data="typesData" stripe style="width: 100%">
      <el-table-column prop="id" label="序号" width="50"></el-table-column>
      <el-table-column prop="image" label="图片" width="180">
        <template slot-scope="scope">
          <el-image
            style="width: 60px; height: 80px"
            :src="scope.row.goodsImg"
            fit="cover"
          ></el-image>
        </template>
      </el-table-column>
<!--       <el-table-column prop="type" label="款式">
        <template slot-scope="scope">
          <span>{{ scope.row.type | typeFilter }}</span>
        </template>
      </el-table-column> -->
      <el-table-column prop="type" label="款式" width="180">
        <template slot-scope="scope">
          <router-link
          :to="{path:'/goodsinfo',query:{type:scope.row.type} }"
        >{{ scope.row.type | typeFilter }}</router-link>
        </template>
      </el-table-column>
      <el-table-column prop="intro" label="款式介绍" width="280"></el-table-column>
      <el-table-column prop="quantity" label="总库存量" width="280"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="handleEdit(scope.row.id)"
          >
            编辑
          </el-button>
          <el-button
            type="danger"
            size="mini"
            @click="handleDelete(scope.row.id)"
          >
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import goodsinfoApi from "@/api/goodsinfo.js";
const goodsTypeOptions = [
  { type: "1", name: "抽带" },
  { type: "2", name: "4m抽带配蕾丝" },
  { type: "3", name: "纽扣" },
  { type: "4", name: "抽带配蕾丝125" },
  { type: "5", name: "抽带配蕾丝120" },
  { type: "6", name: "抽带配蕾丝160" },
  { type: "7", name: "打孔165" },
  { type: "8", name: "蕾丝" },
  { type: "9", name: "厨房" }
];
export default {
  data() {
    return {
      typesData: [],
      goodsTypeOptions
    };
  },
  created(){
    this.getTypesData();
  },
  methods: {
    getTypesData() {
      goodsinfoApi.getTypes().then(response=>{
        const resp = response.data;
        if (resp.flag) {
          this.typesData = resp.data;
        } else {
          this.$message({
            message: resp.message,
            type: "warning"
          });
        }
        console.log(this.typesData);
      })
    }
  },
  filters: {
    typeFilter(type) {
      const typeobj = goodsTypeOptions.find(obj => obj.type === type);
      return typeobj ? typeobj.name : null;
    }
  }
};
</script>
<style>
.goodstype .el-table .el-table__cell{
  text-align: center;
}
</style>
