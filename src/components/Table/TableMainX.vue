<template>
  <div :class="`${classPrefix}`" :style="tableStyle" ref="table" @scroll="scrollHandler">
    <div
      :class="`${classPrefix}-middle`"
      :style="{
        marginLeft: `${widthObj.leftFixedWidth}${this.unit}`,
        marginRight: `${widthObj.rightFixedWidth}${this.unit}`,
      }"
    >
      <table cellspacing="0" cellpadding="0" border="0">
        <thead :class="`${classPrefix}-header`" ref="tableHeaderMiddle">
          <tr>
            <th
              v-for="(column, columnIndex) in middleColumns"
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
        <tbody :class="`${classPrefix}-tbody`">
          <tr
            :class="`${classPrefix}-tbody-tr`"
            v-for="(rowData, rowIndex) in list.slice(0, rowFixedSpliceLength)"
            :key="rowIndex"
          >
            <td
              v-for="(column, columnIndex) in middleColumns"
              :key="column.field"
              @click="cellClickHandler(rowData, rowIndex, column.field, columnIndex)"
              :class="setColumnCellClass({
                rowData, rowIndex, field: column.field, columnIndex,
              })"
            >
              <div
                :class="`${classPrefix}-tbody-cell-content`"
                v-html="getCell(rowData, rowIndex, column)"
              ></div>
            </td>
          </tr>
        </tbody>
        <tbody :class="`${classPrefix}-tbody tbody-tail`" ref="tbodyTailMiddle">
          <tr
            :class="`${classPrefix}-tbody-tr`"
            v-for="(rowData, rowIndex) in list.slice(rowFixedSpliceLength, listLength)"
            :key="rowIndex"
          >
            <td
              v-for="(column, columnIndex) in middleColumns"
              :key="column.field"
              @click="cellClickHandler(rowData, rowIndex + rowFixedSpliceLength, column.field, columnIndex)"
              :class="setColumnCellClass({
                rowData, rowIndex: rowIndex + rowFixedSpliceLength, field: column.field, columnIndex,
              })"
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
    <div
      :class="`${classPrefix}-left`"
      :style="{
            width: `${widthObj.leftFixedWidth}${this.unit}`,
        }"
    >
      <table cellspacing="0" cellpadding="0" border="0">
        <thead :class="`${classPrefix}-header`" ref="tableHeaderLeft">
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
        <tbody :class="`${classPrefix}-tbody`">
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
            >
              <div
                :class="`${classPrefix}-tbody-cell-content`"
                v-html="getCell(rowData, rowIndex, column)"
              ></div>
            </td>
          </tr>
        </tbody>
        <tbody :class="`${classPrefix}-tbody tbody-tail`" ref="tbodyTailLeft">
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
    <div
      :class="`${classPrefix}-right`"
      :style="{
        width: `${widthObj.rightFixedWidth}${this.unit}`,
      }"
    >
      <table cellspacing="0" cellpadding="0" border="0">
        <thead :class="`${classPrefix}-header`" ref="tableHeaderRight">
          <tr>
            <th
              v-for="(column, columnIndex) in rightFixedColumns"
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
        <tbody :class="`${classPrefix}-tbody`">
          <tr
            :class="`${classPrefix}-tbody-tr`"
            v-for="(rowData, rowIndex) in list.slice(0, rowFixedSpliceLength)"
            :key="rowIndex"
          >
            <td
              v-for="(column, columnIndex) in rightFixedColumns"
              :key="column.field"
              @click="cellClickHandler(rowData, rowIndex, column.field, columnIndex)"
              :class="setColumnCellClass({
                rowData, rowIndex, field: column.field, columnIndex,
              })"
            >
              <div
                :class="`${classPrefix}-tbody-cell-content`"
                v-html="getCell(rowData, rowIndex, column)"
              ></div>
            </td>
          </tr>
        </tbody>
        <tbody :class="`${classPrefix}-tbody tbody-tail`" ref="tbodyTailRight">
          <tr
            :class="`${classPrefix}-tbody-tr`"
            v-for="(rowData, rowIndex) in list.slice(rowFixedSpliceLength, listLength)"
            :key="rowIndex"
          >
            <td
              v-for="(column, columnIndex) in rightFixedColumns"
              :key="column.field"
              @click="cellClickHandler(rowData, rowIndex + rowFixedSpliceLength, column.field, columnIndex)"
              :class="setColumnCellClass({
                rowData, rowIndex: rowIndex + rowFixedSpliceLength, field: column.field, columnIndex,
              })"
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
const classPrefix = 'table-x';

export default {
  classPrefix,
  name: 'TuaTableMainX',
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
  },
  data() {
    return {
      classPrefix,
    };
  },
  mounted() {
    // 初始吸底状态设置
    setTimeout(() => {
      /* istanbul ignore next */
      this.scrollHandler({
        target: this.$refs.table,
      });
    }, 200);
  },
  methods: {
    /* istanbul ignore next */
    scrollHandler(event) {
      /* istanbul ignore next */
      const { target } = event;
      const { scrollTop } = target;
      const { scrollHeight } = target;
      const { clientHeight } = target;

      // 滚动非法时，直接拦截
      if (!this.$refs.tableHeaderMiddle) return;
      if (scrollTop < 0 || scrollTop > scrollHeight - clientHeight) return;

      const scrollTopValue = `${scrollTop}px`;
      const tailBottomValue = `${scrollHeight - clientHeight - scrollTop}px`;

      const headers = [
        this.$refs.tableHeaderMiddle,
        this.$refs.tableHeaderLeft,
        this.$refs.tableHeaderRight,
      ];
      const tails = [
        this.$refs.tbodyTailMiddle,
        this.$refs.tbodyTailLeft,
        this.$refs.tbodyTailRight,
      ];

      headers.forEach((item) => {
        // eslint-disable-next-line no-param-reassign
        item.style.transform = `translateY(${scrollTopValue})`;
      });
      tails.forEach((item) => {
        // eslint-disable-next-line no-param-reassign
        item.style.transform = `translateY(-${tailBottomValue})`;
      });

      this.$emit('scroll', event);
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
    middleColumns() {
      const columnsLength = this.columns.length;
      return this.columns.slice(
        this.leftColumnFixedNum,
        columnsLength - this.rightColumnFixedNum,
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
        tableStyle.width = typeof this.scrollX === 'number'
          ? `${this.scrollX}${this.unit}`
          : this.scrollX;
      }

      /* istanbul ignore next */
      if (this.scrollY) {
        /* istanbul ignore next */
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
    leftColumnFixedNum() {
      return this.columns.filter(column => column.fixed).length;
    },
  },
};
</script>

<style lang="scss">
@import "../../styles/index";
$borderColor: #f5f5f5;
.#{$uiPrefix}-table-x {
  position: relative;

  overflow-x: hidden;
  overflow-y: auto;
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
  }

  tr:nth-child(2n) {
    background-color: inherit;
  }

  &-header {
    height: 35px;

    background-color: #f9f9f9;

    font-size: 12px;
    line-height: 35px;
    position: sticky;
    z-index: 2;
  }

  .tbody-tail {
    position: sticky;
    z-index: 1;
    background: #fff;
  }

  &-tbody-tr {
    height: 60px;

    line-height: 100%;

    td {
      padding: 0 6px;

      border-bottom: 1px solid $borderColor;
    }
  }

  &-middle {
    position: relative;

    overflow-x: auto;
    overflow-y: hidden;

    box-sizing: border-box;
  }

  &-left,
  &-right {
    position: absolute;
    top: 0;

    border-right: 1px solid $borderColor;
    background: #fff;
    z-index: 2;
  }

  &-left {
    left: 0;
  }

  &-right {
    right: 0;
  }
}
</style>
