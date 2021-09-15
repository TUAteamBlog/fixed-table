<template>
  <div
    :class="`${classPrefix}`"
    @scroll="scrollHandler"
    ref="table"
    :style="{
      ...tableStyle,
      paddingTop: `${headerFixedHeight}${this.unit}`,
      paddingBottom: `${tailFixedHeight}${this.unit}`,
    }">
    <div
      :class="`${classPrefix}-middle`"
      :style="{
        top: `${headerFixedHeight}${this.unit}`,
        bottom: `${tailFixedHeight}${this.unit}`,
      }"
      @scroll="scrollVerticalHandler"
      ref="middleArea"
    >
      <table cellspacing="0" cellpadding="0" border="0">
        <tbody :class="`${classPrefix}-tbody area-middile`" ref="middleMiddleArea">
          <tr
            :class="`${classPrefix}-tbody-tr`"
            v-for="(rowData, rowIndex) in list.slice(0, rowFixedSpliceLength)"
            :key="rowIndex"
          >
            <td
              v-for="(column, columnIndex) in columns"
              :key="column.field"
              @click="cellClickHandler(rowData, rowIndex, column.field, columnIndex)"
              :class="setColumnCellClass({
                rowData, rowIndex, field: column.field, columnIndex,
              })"
              :style="{
                width: `${column.width}${unit}`,
              }"
            >
              <div
                :class="`${classPrefix}-tbody-cell-content`"
                v-html="getCell(rowData, rowIndex, column)"
              ></div>
            </td>
          </tr>
        </tbody>
        <tbody :class="`${classPrefix}-tbody area-left`" ref="middleLeftArea" :style="{
          width: `${widthObj.leftFixedWidth}${unit}`,
        }">
          <tr
            :class="`${classPrefix}-tbody-tr`"
            v-for="(rowData, rowIndex) in list.slice(0, rowFixedSpliceLength)"
            :key="rowIndex"
          >
            <td
              v-for="(column, columnIndex) in leftFixedColumns"
              :key="column.field"
              @click="cellClickHandler(rowData, rowIndex, column.field, columnIndex)"
              :class="setColumnCellClass({
                rowData, rowIndex, field: column.field, columnIndex,
              })"
              :style="{
                width: `${column.width}${unit}`,
              }"
            >
              <div
                :class="`${classPrefix}-tbody-cell-content`"
                v-html="getCell(rowData, rowIndex, column)"
              ></div>
            </td>
          </tr>
        </tbody>
        <tbody :class="`${classPrefix}-tbody area-right`"  ref="middleRightArea" :style="{
          width: `${widthObj.rightFixedWidth}${unit}`,
        }">
          <tr
            :class="`${classPrefix}-tbody-tr`"
            v-for="(rowData, rowIndex) in list.slice(0, rowFixedSpliceLength)"
            :key="rowIndex"
          >
            <td
              v-for="(column, columnIndex) in rightFixedColumns"
              :key="column.field"
              @click="cellClickHandler(rowData, rowIndex, column.field, columnIndex + rightColumnSpliceLength)"
              :class="setColumnCellClass({
                rowData, rowIndex, field: column.field, columnIndex: columnIndex + rightColumnSpliceLength,
              })"
              :style="{
                width: `${column.width}${unit}`,
              }"
            >
              <div
                :class="`${classPrefix}-tbody-cell-content`"
                v-html="getCell(rowData, rowIndex, column)"
              ></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      :class="`${classPrefix}-top`"
      :style="{
        height: `${headerFixedHeight}${this.unit}`,
      }"
      ref="topArea"
    >
      <table cellspacing="0" cellpadding="0" border="0">
        <thead :class="`${classPrefix}-header area-middile`" ref="topMiddleArea">
          <tr>
            <th
              v-for="(column, columnIndex) in columns"
              :key="column.field"
              @click="headCellClickHandler(column.field, columnIndex)"
              :style="{
                width: `${column.width}${unit}`,
              }"
              :class="column.titleCellClass"
            >
              <div :class="`${classPrefix}-header-cell-content`" v-html="column.title || ''"></div>
            </th>
          </tr>
        </thead>
        <thead :class="`${classPrefix}-header area-left`" ref="topLeftArea" :style="{
          width: `${widthObj.leftFixedWidth}${unit}`,
        }">
          <tr>
            <th
              v-for="(column, columnIndex) in leftFixedColumns"
              :key="column.field"
              @click="headCellClickHandler(column.field, columnIndex)"
              :style="{
                width: `${column.width}${unit}`,
              }"
              :class="column.titleCellClass"
            >
              <div :class="`${classPrefix}-header-cell-content`" v-html="column.title || ''"></div>
            </th>
          </tr>
        </thead>
        <thead :class="`${classPrefix}-header area-right`" ref="topRightArea" :style="{
          width: `${widthObj.rightFixedWidth}${unit}`,
        }">
          <tr>
            <th
              v-for="(column, columnIndex) in rightFixedColumns"
              :key="column.field"
              @click="headCellClickHandler(column.field, columnIndex + rightColumnSpliceLength)"
              :style="{
                width: `${column.width}${unit}`,
              }"
              :class="column.titleCellClass"
            >
              <div :class="`${classPrefix}-header-cell-content`" v-html="column.title || ''"></div>
            </th>
          </tr>
        </thead>
      </table>
    </div>
    <div
      :class="`${classPrefix}-bottom`"
      :style="{
        height: `${tailFixedHeight}${this.unit}`,
      }"
      ref="bottomArea"
    >
      <table cellspacing="0" cellpadding="0" border="0">
        <tbody :class="`${classPrefix}-tbody area-middle`" ref="bottomMiddleArea">
          <tr
            :class="`${classPrefix}-tbody-tr`"
            v-for="(rowData, rowIndex) in list.slice(rowFixedSpliceLength, listLength)"
            :key="rowIndex"
          >
            <td
              v-for="(column, columnIndex) in columns"
              :key="column.field"
              @click="cellClickHandler(rowData, rowIndex + rowFixedSpliceLength, column.field, columnIndex)"
              :class="setColumnCellClass({
                rowData, rowIndex: rowIndex + rowFixedSpliceLength, field: column.field, columnIndex,
              })"
              :style="{
                width: `${column.width}${unit}`,
              }"
            >
              <div
                :class="`${classPrefix}-tbody-cell-content`"
                v-html="getCell(rowData, rowIndex + rowFixedSpliceLength, column)"
              ></div>
            </td>
          </tr>
        </tbody>
        <tbody :class="`${classPrefix}-tbody area-left`" ref="bottomLeftArea" :style="{
          width: `${widthObj.leftFixedWidth}${unit}`,
        }">
          <tr
            :class="`${classPrefix}-tbody-tr`"
            v-for="(rowData, rowIndex) in list.slice(rowFixedSpliceLength, listLength)"
            :key="rowIndex"
          >
            <td
              v-for="(column, columnIndex) in leftFixedColumns"
              :key="column.field"
              @click="cellClickHandler(rowData, rowIndex + rowFixedSpliceLength, column.field, columnIndex)"
              :class="setColumnCellClass({
                rowData, rowIndex: rowIndex + rowFixedSpliceLength, field: column.field, columnIndex,
              })"
              :style="{
                width: `${column.width}${unit}`,
              }"
            >
              <div
                :class="`${classPrefix}-tbody-cell-content`"
                v-html="getCell(rowData, rowIndex + rowFixedSpliceLength, column)"
              ></div>
            </td>
          </tr>
        </tbody>
        <tbody :class="`${classPrefix}-tbody area-right`" ref="bottomRightArea" :style="{
          width: `${widthObj.rightFixedWidth}${unit}`,
        }">
          <tr
            :class="`${classPrefix}-tbody-tr`"
            v-for="(rowData, rowIndex) in list.slice(rowFixedSpliceLength, listLength)"
            :key="rowIndex"
          >
            <td
              v-for="(column, columnIndex) in rightFixedColumns"
              :key="column.field"
              @click="cellClickHandler(rowData, rowIndex + rowFixedSpliceLength, column.field, columnIndex + rightColumnSpliceLength)"
              :class="setColumnCellClass({
                rowData, rowIndex: rowIndex + rowFixedSpliceLength, field: column.field, columnIndex: columnIndex + rightColumnSpliceLength
              })"
              :style="{
                width: `${column.width}${unit}`,
              }"
            >
              <div
                :class="`${classPrefix}-tbody-cell-content`"
                v-html="getCell(rowData, rowIndex + rowFixedSpliceLength, column)"
              ></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash.debounce';
const classPrefix = 'table-y';

export default {
  classPrefix,
  name: 'TuaTableMainY',
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
    // @arg { rowData, rowIndex, field, columnIndex } 当前点击单元格所在行的数据、行下标、列field、列下标
    setColumnCellClass: {
      type: Function,
      default: () => '',
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
      scrollWidth: 0,
      clientWidth: 0,
    };
  },
  mounted() {
    // 初始吸底状态设置
    setTimeout(() => {
      /* istanbul ignore next */
      this.scrollPositionCal({
        target: this.$refs.table,
      });
    }, 200);
  },
  methods: {
    /* istanbul ignore next */
    scrollHandler(event) {
      this.$emit('scroll', event);

      document.querySelectorAll('.area-left').forEach((item) => {
        // eslint-disable-next-line no-param-reassign
        item.style.visibility = 'hidden';
      });
      document.querySelectorAll('.area-right').forEach((item) => {
        // eslint-disable-next-line no-param-reassign
        item.style.visibility = 'hidden';
      });

      this.fixedHandler(event);
    },
    /* istanbul ignore next */
    fixedHandler: debounce(/* istanbul ignore next */ function (event) {
      this.scrollPositionCal(event);
    }, 50),
    /* istanbul ignore next */
    scrollPositionCal(event) {
      const { target } = event;
      const { scrollLeft } = target;

      if (!this.scrollWidth || !this.clientWidth) {
        this.scrollWidth = target.scrollWidth;
        this.clientWidth = target.clientWidth;
      }

      // 滚动非法时，直接拦截
      if (!this.$refs.middleLeftArea && !this.$refs.middleRightArea) return;

      const scrollLeftValue = `${scrollLeft < 0 ? 0 : scrollLeft}px`;
      const scrollRightValue = `${scrollLeft > this.scrollWidth - this.clientWidth
        ? 0
        : this.scrollWidth - this.clientWidth - scrollLeft}px`;

      this.$refs.table.querySelectorAll('.area-left').forEach((item) => {
        // eslint-disable-next-line no-param-reassign
        item.style.transform = `translateX(${scrollLeftValue})`;
        // eslint-disable-next-line no-param-reassign
        item.style.visibility = 'visible';
      });
      this.$refs.table.querySelectorAll('.area-right').forEach((item) => {
        // eslint-disable-next-line no-param-reassign
        item.style.transform = `translateX(-${scrollRightValue})`;
        // eslint-disable-next-line no-param-reassign
        item.style.visibility = 'visible';
      });
    },
    getCell(rowData, rowIndex, column) {
      return typeof column.formatter === 'function'
        ? column.formatter(rowData, rowIndex, column.field)
        : rowData[column.field];
    },
    cellClickHandler(rowData, rowIndex, field, columnIndex) {
      // 表体单元格点击
      // @arg { rowData, rowIndex, field, columnIndex } 当前点击单元格所在行的数据、行下标、列field、列下标
      this.$emit('cellClick', { rowData, rowIndex, field, columnIndex });
    },
    headCellClickHandler(field, columnIndex) {
      // 表头单元格点击
      // @arg { field, columnIndex } 当前点击表头单元格所在列field、列下标
      this.$emit('headCellClick', { field, columnIndex });
    },
    scrollVerticalHandler() {
      this.$emit('scrollVertical', event);
    },
  },
  computed: {
    leftFixedColumns() {
      return this.columns.filter(column => column.fixed);
    },
    rightFixedColumns() {
      const columnsLength = this.columns.length;
      return this.columns.slice(
        columnsLength - this.rightColumnFixedNum,
        columnsLength,
      );
    },
    tableStyle() {
      const tableStyle = {};

      if (this.scrollX) {
        tableStyle.width = typeof this.scrollX === 'number'
          ? `${this.scrollX}${this.unit}`
          : this.scrollX;
      }

      /* istanbul ignore next */
      if (this.scrollY) {
        tableStyle.height = typeof this.scrollY === 'number'
          ? `${this.scrollY}${this.unit}`
          : this.scrollY;
      }

      return tableStyle;
    },
    listLength() {
      return this.list.length;
    },
    rowFixedSpliceLength() {
      return this.listLength - this.tailRowFixedNum;
    },
    tailFixedHeight() {
      return this.tailFixedRowHeight * this.tailRowFixedNum;
    },
    rightColumnSpliceLength() {
      return this.columns.length - this.rightColumnFixedNum;
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
  },
};
</script>

<style lang="scss">
@import "../../styles/index";
$borderColor: #f5f5f5;
.#{$uiPrefix}-table-y {
  position: relative;

  overflow: auto hidden;
  -webkit-overflow-scrolling: touch;

  box-sizing: border-box;

  text-align: center;

  border: none;
  border: 1px solid $borderColor;

  font-size: 14px;

  table {
    display: table;
    border-collapse: separate;
    table-layout: fixed;
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  tr,
  th,
  td {
    position: relative;

    margin: 0;
    padding: 0;

    border: none;
    box-sizing: border-box;
  }

  tr:nth-child(2n) {
    background-color: inherit;
  }

  &-header {
    height: 35px;

    background-color: #f9f9f9;

    font-size: 12px;
    line-height: 35px;
    z-index: 1;
  }

  &-tbody-tr {
    height: 60px;

    line-height: 100%;

    td {
      padding: 0 6px;

      border-bottom: 1px solid $borderColor;
    }
  }


  &-top,
  &-bottom,
  &-middle {
    position: absolute;
    left: 0;

    border-bottom: 1px solid $borderColor;
    border-top: 1px solid #f5f5f5;
    z-index: 2;
  }

  &-middle {
    overflow: hidden auto;
    top: 0;
    bottom: 0;
  }

  &-top {
    top: 0;
    background-color: #f9f9f9;
  }

  &-bottom {
    bottom: 0;
    background: #fff;
  }

  .area-left,
  .area-right {
    position: absolute;
    top: 0;

    .table-y-tbody-tr {
      background: #fff;
    }
  }

  .area-left {
    left: 0;
  }
  .area-right {
    right: 0;
  }
}
</style>
