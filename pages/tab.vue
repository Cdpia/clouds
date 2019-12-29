<template>
  <div class="tab">
    <div>
      <span v-for="(item,index) in ['新闻','体育','娱乐']" :key="index" @click="add(index)">{{item}}</span>
    </div>
    <div>
      <ul v-show="aaa === 0">
        <li>普通新闻1</li>
        <li>普通新闻2</li>
        <li>普通新闻3</li>
      </ul>
      <ul v-show="aaa === 1"> 
        <li>体育新闻1</li>
        <li>体育新闻2</li>
        <li>体育新闻3</li>
      </ul>
      <ul v-show="aaa === 2">
        <li>娱乐新闻1</li>
        <li>娱乐新闻2</li>
        <li>娱乐新闻3</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            aaa:0
        }
    },
    methods:{
        add(index){
            this.aaa = index
        }
    }
};
</script>

<style>
</style>