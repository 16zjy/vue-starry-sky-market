<template>
  <div>
    <header-part />
    <search />
    <div class="content card" align="center">
      <category></category>
      <rotation />
      <erect-rotation />
      <serve />
      <sec-kill />
      <recommend />
    </div>
    <my-footer />
  </div>
</template>
 
<script>
import HeaderPart from '@/views/PC/header/HeaderPart';
import Search from '@/views/PC/search/Search';
import Rotation from '@/views/PC/rotation/Rotation';
import ErectRotation from '@/views/PC/erectRotation/ErectRotation.vue';
import SecKill from '@/views/PC/secKill/SecKill.vue';
import Recommend from '@/views/PC/recommend/Recommend.vue';
import MyFooter from '@/views/PC/footer/MyFooter.vue';
import Category from '@/views/PC/category/Category';
import Serve from '@/views/PC/serve/Serve';

export default {
  name: 'Index',
  components: {
    HeaderPart,
    Search,
    Rotation,
    ErectRotation,
    SecKill,
    Recommend,
    MyFooter,
    Serve,
    Category,
  },
  beforeCreate() {
    // 加载默认值
    this.$store.commit('loadDefaultUsers');
  },
};
</script>

<style scoped>
.content {
  width: 1200px;
  margin: 10px auto;
}
</style>