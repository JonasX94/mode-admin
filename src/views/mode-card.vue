<template>
  <div class="clearfix">
    <span class="golbal-module-title">{{title}}</span>
    <span class="operations">
      <slot name="operations"></slot>
    </span>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: [String, Number],
      required: false,
      default: '标题'
    }
  }
}
</script>
<style lang="scss" scoped>
    .clearfix {
        display: flex;
        // justify-content: space-between;
        align-items: center;
        height: 32px;
        .golbal-module-title {
            display: inline-flex;
            align-items: center;
            font-weight: 700;
            font-size: 14px;
            color: #374151;
            &:before {
                content: "";
                margin-right: 8px;
                background: #37f;
                display: inline-block;
                width: 4px;
                height: 14px;
            }
        }
        .operations {
            display: inline-flex;
            margin-left: 20px;
        }
    }
</style>
