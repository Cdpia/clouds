<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        @click="handleSearchTab(item, index)"
        :class="{active: index === currentTab}"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>

    <el-form class="search-form-content" ref="form" label-width="80px">
      <el-form-item label="出发城市">
        <!-- fetch-suggestions 返回输入建议的方法 -->
        <!-- select 点击选中建议项时触发 -->
        <el-autocomplete
          :fetch-suggestions="queryDepartSearch"
          placeholder="请搜索出发城市"
          @select="handleDepartSelect"
          class="el-autocomplete"
          v-model="form.departCity"
          @blur="handleDepartChange"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市">
        <el-autocomplete
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索到达城市"
          @select="handleDestSelect"
          class="el-autocomplete"
          v-model="form.destCity"
          @blur="handleDestChange"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="出发时间">
        <el-date-picker
          v-model="form.departDate"
          type="date"
          placeholder="请选择日期"
          style="width: 100%;"
          @change="handleDate"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label>
        <el-button style="width:100%;" type="primary" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      currentTab: 0,
      form: {
        departCity: "", //出发城市
        departCode: "", //出发城市代码
        destCity: "", //目标城市
        destCode: "", //目标城市代码
        departDate: "" //日期 2019-05-01
      },
      departData: [],
      dastData: [],
      // 禁止选择今天以前的日期
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() + 3600 * 1000 * 24 < Date.now();
        }
      }
    };
  },
  methods: {
    // tab切换时触发
    handleSearchTab(item, index) {
      if (index === 1) {
        this.$message.error("暂无往返票");
        return;
      }
    },
    // 失去焦点获取第一个出发城市
    handleDepartChange() {
      if (this.departData.length > 0) {
        this.form.departCity = this.departData[0].value;
        this.form.departCode = this.departData[0].sort;
      }
    },
    // 失去焦点获取第一个到达城市
    handleDestChange() {
      if (this.dastData.length > 0) {
        this.form.destCity = this.dastData[0].value;
        this.form.destCode = this.dastData[0].sort;
      }
    },
    // 出发城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDepartSearch(value, callback) {
      if (value.trim() === "") {
        callback([]);
        return;
      }
      this.$axios({
        url: "/airs/city",
        params: {
          name: value
        }
      }).then(res => {
        const { data } = res.data;
        this.departData = data.map(v => {
          v.value = v.name.replace("市", "");
          return v;
        });
        callback(this.departData);
      });
    },

    // 目标城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDestSearch(value, callback) {
      if (value.trim() === "") {
        callback([]);
        return;
      }
      this.$axios({
        url: "/airs/city",
        params: {
          name: value
        }
      }).then(res => {
        const { data } = res.data;
        this.dastData = data.map(v => {
          v.value = v.name.replace("市", "");
          return v;
        });
        callback(this.dastData);
      });
    },

    // 出发城市下拉选择时触发
    handleDepartSelect(item) {
      // console.log(item);
      this.form.departCode = item.sort;
      // console.log(this.form);
    },

    // 目标城市下拉选择时触发
    handleDestSelect(item) {
      //  console.log(item);
      this.form.destCode = item.sort;
      // console.log(this.form);
    },

    // 确认选择日期时触发
    handleDate(value) {
      console.log(value);
      this.form.departDate = moment(value).format("YYYY-MM-DD");
      // value
    },

    // 触发和目标城市切换时触发
    handleReverse() {
      const { departCity,departCode,destCity,destCode } = this.form
        this.form.departCity = destCity
        this.form.departCode = destCode
        this.form.destCity = departCity
        this.form.destCode = departCode
    },

    // 提交表单是触发
    handleSubmit() {
      // console.log(this.form);

      // 自定义校验
      const rules = {
        departCity: {
          value: this.form.departCity,
          err_message: "出发城市不能为空"
        },
        destCity: {
          value: this.form.destCity,
          err_message: "到达城市不能为空"
        },
        departDate: {
          value: this.form.departDate,
          err_message: "出发日期不能为空"
        }
      };

      let valid = true
      Object.keys(rules).forEach(key=>{
        if(!rules[key].value.trim()){
          this.$message.error(rules[key].err_message)
          valid = false
          return
        }
      })
      if(!valid) return

      this.$router.push({
        path: "/air/flights",
        query: this.form
      });
    }
  },
  mounted() {}
};
</script>

<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>
