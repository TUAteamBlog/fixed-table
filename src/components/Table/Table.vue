<template>
<div :class="`${classPrefix}`" :style="tableStyle">
  <template v-if="scrollX && scrollY">
    <div :class="`${classPrefix}-fixed-middle`">
      <TuaTableMainY
        @scroll="scrollXHandler"
        @scrollVertical="scrollVerticalHandler"
        @cellClick="cellClickHandler"
        @headCellClick="headCellClickHandler"
        v-bind="$props"
      />
    </div>
    <div :class="`${classPrefix}-fixed-left`" ref="fixedLeftSection" v-if="leftFixedColumns.length">
      <TuaTableMainY
        @cellClick="cellClickHandler"
        @headCellClick="headCellClickHandler"
        v-bind="$props"
        :columns="leftFixedColumns"
        :rightColumnFixedNum="0"
        :scrollX="widthObj.leftFixedWidth"
        ref="fixedLeftTable"
      />
    </div>
    <div :class="`${classPrefix}-fixed-right`" ref="fixedRightSection"  v-if="rightFixedColumns.length">
      <TuaTableMainY
        @cellClick="cellClickHandler"
        @headCellClick="headCellClickHandler"
        v-bind="$props"
        :columns="rightFixedColumns"
        :rightColumnFixedNum="0"
        :scrollX="widthObj.rightFixedWidth"
        ref="fixedRightTable"
      />
    </div>
  </template>
  <TuaTableMainY
    v-else-if="scrollY"
    @scroll="scrollHandler"
    @cellClick="cellClickHandler"
    @headCellClick="headCellClickHandler"
    v-bind="$props"
  />
  <TuaTableMainX
    v-else
    @scroll="scrollHandler"
    @cellClick="cellClickHandler"
    @headCellClick="headCellClickHandler"
    v-bind="$props"
  />
</div>
</template>

<script>
import TuaTableMainX from './TableMainX.vue';
import TuaTableMainY from './TableMainY.vue';
import debounce from 'lodash.debounce';

const classPrefix = 'table';

export default {
  classPrefix,
  name: 'TuaTable',
  components: {
    TuaTableMainX,
    TuaTableMainY,
  },
  props: {
    // 表头信息
    // 每个元素必传<br>
    // * `title` （列名称）<br>
    // * `field` （列数据在数据项中对应的字段名<br>
    // * `width` （列宽度）<br>
    // * `fixed`（此列是否固定）<br>
    // * `formatter`（列显示的格式化函数）Function(rowData, rowIndex, field)，返回值为html字符串<br>
    // * `titleCellClass`（表头的单元格的class）<br>
    columns: {
      type: Array,
      required: true,
    },
    // 列表数据
    list: {
      type: Array,
      required: true,
    },
    // 设置横向滚动，也用于指定滚动区域的宽 string
    scrollX: {
      type: [Number, String],
    },
    // 设置纵向滚动，也用于指定滚动区域的高 string
    scrollY: {
      type: [Number, String],
    },
    // 所有高度或者宽度的计量单位
    unit: {
      type: String,
      default: 'px',
    },
    // 给表列的单元格设置class
    // :arg { rowData, rowIndex, field, columnIndex } 当前点击单元格所在行的数据、行下标、列field、列下标
    setColumnCellClass: {
      type: Function,
    },
    // 行尾固定的行数，不需要行尾固定则不传
    tailRowFixedNum: {
      type: Number,
      default: 0,
    },
    // 列尾固定的列数，不需要列尾固定则不传
    rightColumnFixedNum: {
      type: Number,
      default: 0,
    },
    headerFixedHeight: {
      type: Number,
      default: 35,
    },
    tailFixedRowHeight: {
      type: Number,
      default: 60,
    },
  },
  data() {
    return {
      classPrefix,
    };
  },
  computed: {
    leftFixedColumns() {
      return this.columns.filter(column => column.fixed).map(column => ({
        ...column,
        fixed: false,
      }));
    },
    rightFixedColumns() {
      const columnsLength = this.columns.length;
      return this.columns.slice(
        columnsLength - this.rightColumnFixedNum,
        columnsLength,
      );
    },
    widthObj() {
      let leftFixedWidth = 0;
      let rightFixedWidth = 0;

      this.columns.forEach((column, index) => {
        if (column.fixed) {
          leftFixedWidth += column.width;
        }

        if (this.columns.length - index <= this.rightColumnFixedNum) {
          rightFixedWidth += column.width;
        }
      });

      return {
        leftFixedWidth,
        rightFixedWidth,
      };
    },
    tableStyle() {
      const tableStyle = {};

      if (this.scrollX) {
        tableStyle.width =          typeof this.scrollX === 'number'
          ? `${this.scrollX}${this.unit}`
          : this.scrollX;
      }

      if (this.scrollY) {
        tableStyle.height =          typeof this.scrollY === 'number'
          ? `${this.scrollY}${this.unit}`
          : this.scrollY;
      }

      return tableStyle;
    },
  },
  methods: {
    cellClickHandler({ rowData, rowIndex, field, columnIndex }) {
      // 表体单元格点击
      // :arg { rowData, rowIndex, field, columnIndex } 当前点击单元格所在行的数据、行下标、列field、列下标
      this.$emit('cellClick', { rowData, rowIndex, field, columnIndex });
    },
    headCellClickHandler({ field, columnIndex }) {
      // 表头单元格点击
      // :arg { field, columnIndex } 当前点击表头单元格所在列field、列下标
      this.$emit('headCellClick', { field, columnIndex });
    },
    scrollHandler(event) {
      this.$emit('scroll', event);
    },
    scrollXHandler(event) {
      this.$emit('scroll', event);

      const { scrollLeft, scrollWidth, clientWidth } = event.target;
      // 到达边界后，不再切换显示
      /* istanbul ignore next */
      if (scrollLeft < 0) {
        this.setFixedVisibility('hidden', 'left');
        this.setFixedVisibility('visible', 'right');
        return;
      };

      /* istanbul ignore next */
      if (scrollLeft > scrollWidth - clientWidth) {
        this.setFixedVisibility('hidden', 'right');
        this.setFixedVisibility('visible', 'left');
        return;
      }

      this.setFixedVisibility('visible');

      this.visibleHandler(event.target);
    },
    visibleHandler: debounce(/* istanbul ignore next */ function ({ scrollLeft, scrollWidth, clientWidth }) {
      if (scrollLeft < 0 || scrollLeft > scrollWidth - clientWidth) {
        return;
      }

      this.setFixedVisibility('hidden');
    }, 100),
    scrollVerticalHandler(event) {
      this.$emit('scrollVertical', event);

      const { target } = event;
      const { fixedLeftTable, fixedRightTable } = this.$refs;

      if (fixedLeftTable) {
        const fixedLeftScroller = fixedLeftTable.$refs.middleArea;
        fixedLeftScroller.firstChild.style.transform = `translateY(-${target.scrollTop}px)`;
      }

      if (fixedRightTable) {
        const fixedRightScroller = fixedRightTable.$refs.middleArea;
        fixedRightScroller.firstChild.style.transform = `translateY(-${target.scrollTop}px)`;
      }

      this.setFixedVisibility('hidden');
    },
    setFixedVisibility(visibility, position) {
      const { fixedLeftSection, fixedRightSection } = this.$refs;

      if (fixedLeftSection && position !== 'right') {
        fixedLeftSection.style.visibility = visibility;
      }

      if (fixedRightSection && position !== 'left') {
        fixedRightSection.style.visibility = visibility;
      }
    },
  },
};
</script>

<style lang="scss">
@import "../../styles/index";

.#{$uiPrefix}-table {
  position: relative;

  &-fixed-left,
  &-fixed-right {
    position: absolute;
    top: 0;
    visibility: hidden;
    height: 100%;
    td {
      background: #fff;
    }
  }

  &-fixed-left {
    left: 0;
  }

  &-fixed-right {
    right: 0;
  }

  &-fixed-middle {
    height: 100%;
    width: 100%;
  }
}
</style>
