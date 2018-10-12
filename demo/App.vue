<template>
  <div id="app">
    <div class='container'>
      <div class='title'>el-input-number-only</div>
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="0-9 only">
          <el-input-number-only v-model="form.v1" placeholder="0-9 only" />
        </el-form-item>
        <el-form-item label="1-9 only">
          <el-input-number-only v-model="form.v2" :pattern="/[^1-9]/g" placeholder="1-9 only" />
        </el-form-item>
        <!-- <el-form-item label="a-zA-Z only">
          <el-input-number-only
            v-model="form.v3"
            :pattern="/[^a-zA-Z]/g"
            placeholder="a-zA-Z only" />
        </el-form-item>
        <el-form-item label="steam only">
          <el-input-number-only v-model="form.v4" :pattern="/[^steam]/g" placeholder="steam only" />
        </el-form-item> -->
      </el-form>
    </div>
  </div>
</template>

<script>
import ElInputNumberOnly from '../src';

export default {
  name: 'app',
  components: {
    ElInputNumberOnly,
  },
  data() {
    return {
      form: {
        v1: '',
        v2: '',
        v3: '',
        v4: '',
      },
    };
  },
};
</script>
<style>
  .container{
    max-width: 500px;
    text-align: center;
    margin: 0 auto;
  }
  .container .title{
    margin: 20px auto;
    font-weight: bold;
  }
</style>
