export default {
  company: {
    list: {
      search: '搜索',
      add: '添加渠道商',
      edit: '编辑',
      freeze: '冻结',
      activate: '激活',
      viewLevel: '查看层级',
      customerCode: '渠道商编号',
      createdTime: '创建时间：',
      filter: {
        company: '渠道商',
        level: '归属',
        state: '状态'
      },
      tips: {
        freezeTitle: '冻结',
        freezeContent: '请确认是否冻结渠道商',
        freezeSuccess: '冻结成功',
        activateTitle: '激活',
        activateContent: '请确认是否激活渠道商',
        activateSuccess: '激活成功',
      }
    },
    add: {
      title: '新增渠道商',
    },
    edit: {
      title: '编辑渠道商',
    },
    level: {
      title: '查看层级',
      close: '关闭',
      /* 后期可能注释 */
      level1: '一级渠道商',
      level2: '二级渠道商',
      level3: '三级渠道商',
      level4: '四级渠道商',
      level5: '五级渠道商'
    },
    form: {
      label: {
        parentId: '父级渠道商',
        customerCode: '渠道商编号',
        name: '渠道商名称',
        shortName: '简称',
        timezone: '时区',
        address: '经营地址',
        area: '国家区域',
        remark: '备注'
      },
      tips: {
        company: '请输入渠道商名称',
        shortName: '请输入渠道商简称',
        timezoneId: '请选择时区'
      }
    },
    states: [
      {
        value: null,
        label: '全部'
      },
      {
        value: 1,
        label: '激活'
      },
      {
        value: 2,
        label: '冻结'
      }
    ],
    levels: [
      {
        label: '全部',
        value: null,
      },
      {
        label: '直接下级',
        value: 1,
      },
      {
        label: '间接下级',
        value: 2
      }
    ],
  }
}
