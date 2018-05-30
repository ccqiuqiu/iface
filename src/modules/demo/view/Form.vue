<!--Created by 熊超超 on 2018/5/30.-->
<template>
  <cc-form :data="formObj"></cc-form>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class Form extends Vue {
    /*vue-props*/
    /*vue-vuex*/
    /*vue-data*/
    private formObj: any = {
      model: {
        name: '123',
        area: 1,
      },
      items: [
        {
          label: '活动名称',
          field: 'name',
          type: 'text',
        },
        {
          label: '活动区域',
          field: 'area',
          type: 'select',
          props: [
            {
              label: '区域一',
              value: 1,
            },
            {
              label: '区域二',
              value: 2,
            },
          ],
        },
        {
          label: '活动日期',
          field: 'data',
          type: 'daterange',
          props: {rangeSeparator: '至'},
        },
        {
          label: '即时配送',
          field: 'delivery',
          type: 'switch',
        },
      ],
    }
    /*vue-compute*/
    /*vue-watch*/
    /*vue-lifecycle*/
    /*vue-method*/
  }
</script>

<style lang="scss" scoped>
</style>