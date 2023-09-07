<template>
  <div>
    <div class="board">
      <rollup></rollup>
    </div>
    <div class="board">
      <chart></chart>
    </div>
  </div>
</template>
<script>
import rollup from "./rollup.vue";
import chart from "./chart.vue";
export default{
  components:{
    chart,
    rollup
  }
}
</script>
<style scoped>
.board{
  width: 95%;
  padding: 10px;
  margin: 0 auto;
  background-color: #ffffff;
  margin-bottom: 20px;
}
</style>
