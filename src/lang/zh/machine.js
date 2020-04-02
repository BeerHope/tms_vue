export default {
  machine: {
    list: {
      search: '搜索',
      add: '添加机具',
      batchImport: '批量导入机具',
      filter: {
        sn: '机身号',
        state: '绑定状态',
        companyId: '归属渠道商',
        merchantNo: '商户编号',
        merchantName: '商户名称'
      },
      edit: '编辑',
      details: '详情',
      remote: '远程控制',
      bind: '绑定',
      unbind: '解绑',
      merchant: '商户：',
      terminalNo: '终端号：',
      companyName: '所属渠道商：',
      createTime: '创建时间：',
      bindTimeText: '绑定时间：',
      unbindTimeText: '解绑时间：',
    },
    batchImport: {
      title: '批量导入',
      templateName: '机具导入模板',
      fileName: '机具导入失败清单',
      header: [
        '机身号',
        '原因'
      ]
    },
    add: {
      title: '添加机具'
    },
    edit: {
      title: '编辑机具'
    },
    details: {
      machineDetails: '机具详情',
      basicInfo: '基本信息',
      model: '型号：',
      sn: '机身号：',
      reportCycle: '报到周期(分钟)：',
      heartbeatCycle: '心跳周期(秒)：',
      createPerson: '创建人：',
      remark: '备注:',
      runningInfo: '运行信息'
    },
    bind: {
      title: '绑定商户终端',
      selectionTitle: '选择商户终端',
      label: {
        sn: '机身号',
        merchant: '绑定商户终端',
      },
      placeholder: {
        merchant: '请输入商户编号或名称'
      },
      thead: {
        merchantNo: '商户编号',
        merchantName: '商户名称',
        terminalNo: '终端号',
        selection: '选择'
      },
      tips: {
        merchant: '请点击搜索按钮选择终端',
        selection: '只支持绑定一个商户终端'
      }
    },
    unbind: {
      content1: '请确认是否解除设备',
      content2: '与',
      content3: '终端号',
      content4: '的绑定关系',
      title: '提示'
    },
    form: {
      label: {
        model: '型号',
        sn: '机身号',
        reportCycle: '报到周期(分钟)',
        heartbeatCycle: '心跳周期(秒)',
        remark: '备注'
      },
      tips: {
        sn1: '请输入机身号',
        sn2: '支持大小写英文、数字，11~20个字符',
        model: '请选择机型',
        reportCycle: '请输入报到周期',
        heartbeatCycle: '请输入心跳周期'
      }
    },
    states: [
      {
        value: null,
        label: '全部'
      },
      {
        value: 1,
        label: '已绑定'
      },
      {
        value: 2,
        label: '未绑定'
      }
    ]
  }
}
