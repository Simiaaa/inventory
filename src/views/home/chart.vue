<template>
    <div class="chart">
      <div ref="chartDemodiv" style="width: 100%; height: 400px;"></div>
    </div>
</template>
<script>
import echarts from "echarts";
import goodsinfoApi from "@/api/goodsinfo.js";
export default {
  data() {
    return {
      chartDemo: null,
      goodsTypeData: {
        goodsType: [],
        quantitySum: []
      }
    };
  },
  mounted() {
    this.drawLine();
  },
  created() {
    this.getGoodsTypeSum();
  },
  methods: {
    getGoodsTypeSum() {
      goodsinfoApi.getTypeSum().then(response => {
        const resp = response.data;
        if (resp.flag) {
          this.goodsTypeData.goodsType = resp.data.goodsType;
          this.goodsTypeData.quantitySum = resp.data.quantitySum;
          console.log(resp.data.goodsType);
          console.log(resp.data.quantitySum);
        } else {
          this.$message({
            message: resp.message,
            type: "warning"
          });
        }
      });
    },
    drawLine() {
      this.chartDemo = echarts.init(this.$refs["chartDemodiv"]);
      this.chartDemo.setOption(this.options, true);
      window.addEventListener("resize", this.chartDemo.resize);
    }
  },
  computed: {
    options() {
      const options = {
        title: {
          text: "各种款式商品库存数量",
          left: "center",
          textStyle: {
            color: "red"
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          top: 30,
          data: [
            {
              name: "库存数量",
              icon: "circle",
              textStyle: {
                color: "#545c64",
                fontFamily: "微软雅黑",
                fontSize: 16
              }
            }
          ]
        },
        xAxis: {
          type: "category",
          data: this.goodsTypeData.goodsType
        },
        yAxis: {
          type: "value",
          min: 100,
          interval: 500
        },
        series: [
          {
            name: "库存数量",
            data: this.goodsTypeData.quantitySum,
            type: "line"
          }
        ]
      };
      return options;
    }
  },
  watch: {
    options(newVal, oldVal) {
      if (newVal != oldVal) {
        this.chartDemo.setOption(newVal);
      }
    }
  }
};
</script>
<style scoped>
h1 {
  text-align: center;
}

</style>
