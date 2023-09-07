<template>
  <div class="goodsinfo">
    <!-- =============================查询================================== -->
    <el-form
      ref="searchForm"
      :inline="true"
      :model="searchWhere"
      class="demo-form-inline"
      style="margin-top: 20px;"
    >
      <el-form-item label="款式" size="mini" prop="goodstype">
        <el-select
          v-model="searchWhere.goodstype"
          placeholder="款式"
          style="
    width: 150px;"
        >
          <el-option
            v-for="option in goodsTypeOptions"
            :key="option.type"
            :label="option.name"
            :value="option.type"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称" size="mini" prop="goodsName">
        <el-input
          v-model="searchWhere.goodsName"
          placeholder="名称"
          style="width: 150px;"
        ></el-input>
      </el-form-item>
      <el-form-item size="mini">
        <el-button type="primary" @click="fetchData">查询</el-button>
        <el-button @click="resetForm('searchForm')">重置</el-button>
        <el-button type="primary" @click="addHandle()">新增</el-button>
        <el-dialog
          title="商品信息编辑"
          :visible.sync="dialogFormVisible"
          width="500px"
        >
          <el-form
            :model="form"
            :rules="rules"
            label-width="100px"
            ref="addForm"
            label-position="right"
            style="width:400px;margin-top: -20px;"
          >
            <el-form-item label="图片" prop="goodsImg">
              <el-input v-model="form.goodsImg" size="mini"> </el-input>
            </el-form-item>
            <el-form-item label="款式" prop="goodstype">
              <el-select
                v-model="form.goodstype"
                size="mini"
                placeholder="商品款式"
                style="width:120px"
              >
                <el-option
                  v-for="option in goodsTypeOptions"
                  :key="option.type"
                  :label="option.name"
                  :value="option.type"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="名称" prop="goodsName">
              <el-input v-model="form.goodsName" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="价格" prop="price">
              <el-input v-model="form.price" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="颜色" prop="color">
              <el-input v-model="form.color" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="库存量" prop="quantity">
              <el-input v-model.number="form.quantity" size="mini"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false" size="mini"
              >取 消</el-button
            >
            <el-button
              type="primary"
              @click="
                form.id === null ? addData('addForm') : updateData('addForm')
              "
              size="mini"
              >确 定</el-button
            >
          </div>
        </el-dialog>
      </el-form-item>
    </el-form>
    <!-- ========================商品信息============================ -->
    <el-table
      :data="goodsinfolist"
      style="width: 100%"
      max-height="100%"
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      :indent="indentNum"
    >
      <el-table-column fixed prop="id" label="序号" width="60">
      </el-table-column>
      <el-table-column prop="goodsImg" label="图片" width="100">
        <template slot-scope="scope">
          <el-image
            style="width: 60px; height: 80px"
            :src="scope.row.goodsImg"
            fit="cover"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="goodstype" label="款式" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.goodstype | goodsTypeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="goodsName" label="名称" width="250">
      </el-table-column>
      <el-table-column prop="price" label="价格" width="150"> </el-table-column>
      <el-table-column prop="color" label="颜色" width="150"> </el-table-column>
      <el-table-column prop="quantity" label="库存量" width="150">
      </el-table-column>
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
    <!-- =============================分页=============================== -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
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
      isHighlight: true,
      indentNum: 120,
      goodsinfolist: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      searchWhere: {
        goodstype: "",
        goodsName: ""
      },
      goodsTypeOptions,
      dialogFormVisible: false,
      form: {
        id: null,
        goodsImg: "",
        goodsName: "",
        goodstype: "",
        price: "",
        color: "",
        quantity: 500
      },
      rules: {
        goodsImg: [
          { required: true, message: "请传入商品图片", trigger: "blur" }
        ],
        goodstype: [
          { required: true, message: "请选择商品类型", trigger: "blur" }
        ],
        goodsName: [
          { required: true, message: "请输入商品名称", trigger: "blur" }
        ],
        price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
        color: [{ required: true, message: "请输入商品颜色", trigger: "blur" }],
        quantity: [
          { required: true, message: "库存量不能为空", trigger: "blur" },
          { type: "number", message: "库存量必须为数字值", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.fetchData();
  },
  mounted() {
    const data = this.$route.query.type;
    // 执行查询操作，使用传递的数据参数
    if(data){
      this.goodstype = data;
      this.fetchData();
    }
  },
  methods: {
    fetchData() {
      //goodsinfoApi.getGoodsInfoList().then(response=>{
      goodsinfoApi
        .search(this.currentPage, this.pageSize, this.searchWhere)
        .then(response => {
          const resp = response.data;
          this.goodsinfolist = resp.data.rows;
          this.total = resp.data.total;
        });
    },
    handleEdit(id) {
      console.log("编辑" + id);
      this.addHandle();
      goodsinfoApi.getGoodsById(id).then(response => {
        const resp = response.data;
        if (resp.flag) {
          this.form = resp.data;
        } else {
          this.$message({
            message: resp.message,
            type: "warning"
          });
        }
      });
    },
    updateData(formName) {
      //console.log("update")
      this.$refs[formName].validate(valid => {
        if (valid) {
          goodsinfoApi.updateGoods(this.form).then(response => {
            const resp = response.data;
            if (resp.flag) {
              this.fetchData();
              this.form.id = null;
              this.dialogFormVisible = false;
            } else {
              this.$message({
                message: resp.message,
                type: "warning"
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // eslint-disable-next-line no-unused-vars
    handleDelete(id) {
      this.$confirm("确认删除这条记录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          goodsinfoApi.deleteGoods(id).then(response => {
            const resp = response.data;
            this.$message({
              message: resp.message,
              type: resp.flag ? "success" : "error"
            });
            if (resp.flag) {
              this.fetchData();
            }
          });
        })
        .catch(() => {
          console.log("cancel");
        });
    },
    handleSizeChange(size) {
      //console.log(`每页 ${size} 条`);
      this.pageSize = size;
      this.fetchData();
    },
    handleCurrentChange(currentPage) {
      //console.log(`当前页: ${val}`);
      this.currentPage = currentPage;
      this.fetchData();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    addData(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          goodsinfoApi.add(this.form).then(response => {
            const resp = response.data;
            if (resp.flag) {
              this.fetchData();
              this.dialogFormVisible = false;
            } else {
              this.$message({
                message: resp.message,
                type: "warning"
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    addHandle() {
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["addForm"].resetFields();
      });
    }
  },
  filters: {
    goodsTypeFilter(type) {
      const goodstypeobj = goodsTypeOptions.find(obj => obj.type === type);
      return goodstypeobj ? goodstypeobj.name : null;
    }
  }
};
</script>
<style scoped>
::v-deep tr.el-table__row.el-table__row--level-1 {
  background-color: antiquewhite;
}
::v-deep .el-icon-arrow-right:before {
  color: #1890ff;
  font-size: 20px;
  font-weight: 700px;
}
.goodsinfo .el-table .el-table__cell{
  text-align: center;
}
</style>
