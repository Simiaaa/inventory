<template>
  <div>
    <el-row :gutter="12">
      <el-col :span="8">
        <el-card shadow="hover">
          总销售额
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          支付笔数
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          利润
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="12">
      <el-col :span="8">
        <el-card shadow="hover">
          采购总额
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          总库存
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          当日支出
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
 
}
</script>
<style scoped>
.el-card{
  margin: 10px;
  height: 100px;
}
</style>
