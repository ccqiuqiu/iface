<!--Created by 熊超超 on 2018/6/6.-->
<template>
  <div class="input-icon" flex="cross:center">
    <el-popover ref="popover" placement="bottom" trigger="click" v-model="show">
      <div class="icon-con">
        <span v-for="name in icons" :key="name" flex="dir:top cross:center" :class="['icon-warp', {select: name === value}]" @click="select(name)">
          <span class="icon" flex="cross:center"><cc-icon :name="name"></cc-icon></span>
          <span class="to">{{name}}</span>
        </span>
      </div>
    </el-popover>
    <div v-popover:popover flex="cross:center box:last" flex-box="1" class="content">
      <span v-if="value">
        <cc-icon :name="value" size="20"></cc-icon>
      </span>
      <span v-else class="c-info">{{placeholder}}</span>
      <i class="el-icon-circle-close m-r-10" v-if="value" @click.stop="$emit('input', '')"></i>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'
  import iconPath from '../assets/icons/icon'

  @Component
  export default class CcInputIcon extends Vue {
    /*vue-props*/
    @Prop(String) public value: string
    @Prop({type: String, default: '请选择图标'}) public placeholder: string
    /*vue-vuex*/
    /*vue-data*/
    public show: boolean = false
    /*vue-compute*/
    get icons() {
      const reg = /^.*\/(.*)\.svg$/
      return iconPath.map((path: string) => path.replace(reg, '$1'))
    }
    /*vue-watch*/
    /*vue-lifecycle*/
    /*vue-method*/
    public select(name: string) {
      this.$emit('input', name)
      this.show = false
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/css/vars";
  .input-icon{
    height: 32px;
    line-height: 32px;

    svg{
      cursor: pointer;
    }

    .content i {
      cursor: pointer;
      display: none;
      color: rgba($color-info, 0.5);
    }
    .content:hover i {
      display: block;
    }
  }
  .icon-con{
    width: 400px;
    display: flex;
    flex-wrap: wrap;

    svg{
      transition: all 0.3s;
    }
    .icon-warp{
      flex: 0 0 20%;
      padding: 10px 0;
    }
    .icon-warp.select, .icon-warp:hover{
      background-color: rgba($color-info, 0.2);
      border-radius: 6px;
      svg{
        font-size: 30px!important;
      }
    }
    .icon{
      height: 30px;
      cursor: pointer;
    }
    .to{
      text-align: center;
      width: 80px;
    }
  }
</style>