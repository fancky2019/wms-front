<template>
  <div style="display: inline">
      <Input placeholder=">=" class="inputNum" v-model="value1" type="number" @on-change="onChange" clearable/>
      <Input placeholder="<=" class="inputNum" v-model="value2" type="number" @on-change="onChange" clearable/>
  </div>
</template>
<script>
export default {
  model: {
    prop: 'value',
    event: 'on-change'
  },
  computed: {
    value () {
      return [this.value1, this.value2]
    }
  },
  data () {
    return {
      value1: undefined,
      value2: undefined
    }
  },
  methods: {
    onChange (v) {
      this.$emit('on-change', this.value)
    }
  }
}
</script>
<style scoped>
.operator {
    margin-right: 2px;
}
.inputNum {
    margin: 0 0 0 2px;
    width: 49%;
}
</style>
