<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <flightsFilters />

        <!-- 航班头部布局 -->
        <flightsListHead />

        <!-- 航班信息 -->
        <flightsItem v-for="(item,index) in dataList" :key="index" :data="item" />
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>
import flightsListHead from "@/components/air/flightsListHead";
import flightsItem from "@/components/air/flightsItem";
import flightsFilters from "@/components/air/flightsFilters";

export default {
  components: {
    flightsItem,
    flightsListHead,
    flightsFilters
  },
  data() {
    return {
      //航班总数据{ info, flights, options, total }
      flightsData: [],
      pageIndex: 1,
      pageSize: 5,
      total: 0
      //dataList: []
    };
  },
  //   监听
  computed: {
    dataList() {
      // 计算属性监听函数内部引用实例的属性变化，一旦发生了变化，该函数会重新计算，并且返回新的值
      // 请求如果还没完成，返回空数组
      if (!this.flightsData.flights) return [];
      // 计算分页的数据
      return this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      )
    }
  },
  mounted() {
    this.$axios({
      url: "/airs",
      params: this.$route.query
    }).then(res => {
      //   console.log(res);
      this.flightsData = res.data;
      //数据数量
      this.total = this.flightsData.total;
    });
  },
  methods: {
    handleSizeChange(val) {
      //   console.log(`每页 ${val} 条`);
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      //   console.log(`当前页: ${val}`);
      this.pageIndex = val;
    }
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>