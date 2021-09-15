
import { mount } from '@vue/test-utils';

import Table from '.';
import { columns, columns1, columns2, columns3, list } from '../../mockData/table';

const { classPrefix } = Table;

describe('Table', () => {
  let wrapper;

  it('should be rendered table x', () => {
    wrapper = mount(Table, {
      propsData: {
        columns,
        list,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should be rendered table x', () => {
    wrapper = mount(Table, {
      propsData: {
        columns,
        list,
        scrollX: 500,
        setColumnCellClass: () => {},
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should emit scroll event if table x scroll', async () => {
    wrapper = mount(Table, {
      propsData: {
        columns: columns2,
        list,
        scrollX: '500px',
        rightColumnFixedNum: 1,
      },
    });
    await wrapper.vm.$nextTick();

    wrapper.find(`.${classPrefix}-x`).trigger('scroll');
    expect(wrapper.emitted().scroll).toBeTruthy();
  });

  it('should emit click event if click row', async () => {
    wrapper = mount(Table, {
      propsData: {
        columns: columns2,
        list,
        scrollX: 500,
        tailRowFixedNum: 1,
        rightColumnFixedNum: 1,
      },
    });
    await wrapper.vm.$nextTick();

    const $cell = 'td';
    wrapper.find($cell).trigger('click');
    expect(wrapper.emitted().cellClick).toBeTruthy();

    const $headCell = 'th';
    wrapper.find($headCell).trigger('click');
    expect(wrapper.emitted().headCellClick).toBeTruthy();
  });

  it('should be rendered table y', () => {
    wrapper = mount(Table, {
      propsData: {
        columns,
        list,
        scrollY: 200,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  describe('fixed', () => {
    it('should be rendered table1 for header and column fixed', () => {
      wrapper = mount(Table, {
        propsData: {
          columns: columns1,
          list,
          scrollX: 500,
          scrollY: 200,
          tailRowFixedNum: 1,
          rightColumnFixedNum: 1,
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('rem', () => {
    it('should be rendered table2 for rem', () => {
      wrapper = mount(Table, {
        propsData: {
          columns: columns3,
          list,
          scrollX: 2,
          scrollY: 1,
          unit: 'rem',
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('customize', () => {
    it('should be rendered table3 for column formatter', () => {
      wrapper = mount(Table, {
        propsData: {
          columns: columns2,
          list,
          scrollX: '500px',
          scrollY: '200px',
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should emit click event if click row', async () => {
      wrapper = mount(Table, {
        propsData: {
          columns: columns2,
          list,
          scrollX: 500,
          scrollY: 200,
          tailRowFixedNum: 1,
          rightColumnFixedNum: 1,
        },
      });
      await wrapper.vm.$nextTick();

      const $cell = 'td';
      wrapper.find($cell).trigger('click');
      expect(wrapper.emitted().cellClick).toBeTruthy();

      const $headCell = 'th';
      wrapper.find($headCell).trigger('click');
      expect(wrapper.emitted().headCellClick).toBeTruthy();
    });

    it('should emit scroll event if table y scroll', async () => {
      wrapper = mount(Table, {
        propsData: {
          columns,
          list,
          scrollX: 500,
          scrollY: 200,
        },
      });
      await wrapper.vm.$nextTick();

      wrapper.find(`.${classPrefix}-y`).trigger('scroll');
      expect(wrapper.emitted().scroll).toBeTruthy();
      wrapper.find(`.${classPrefix}-y-middle`).trigger('scroll');
      expect(wrapper.emitted().scrollVertical).toBeTruthy();
    });

    it('should emit scroll event if table y scroll', async () => {
      wrapper = mount(Table, {
        propsData: {
          columns: columns2,
          list,
          scrollX: 500,
          scrollY: 200,
        },
      });
      await wrapper.vm.$nextTick();

      wrapper.find(`.${classPrefix}-y`).trigger('scroll');
      expect(wrapper.emitted().scroll).toBeTruthy();
      wrapper.find(`.${classPrefix}-y-middle`).trigger('scroll');
      expect(wrapper.emitted().scrollVertical).toBeTruthy();
    });

    it('should emit scroll event if table y scroll', async () => {
      wrapper = mount(Table, {
        propsData: {
          columns: columns2,
          list,
          scrollX: 500,
          scrollY: 200,
          tailRowFixedNum: 1,
          rightColumnFixedNum: 1,
        },
      });
      await wrapper.vm.$nextTick();

      wrapper.find(`.${classPrefix}-y`).trigger('scroll');
      expect(wrapper.emitted().scroll).toBeTruthy();
      wrapper.find(`.${classPrefix}-y-middle`).trigger('scroll');
      expect(wrapper.emitted().scrollVertical).toBeTruthy();
    });
  });
});
