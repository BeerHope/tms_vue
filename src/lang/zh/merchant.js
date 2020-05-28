export default {
  merchant: {
    list: {
      search: '搜索',
      typeIn: '录入商户',
      batch: '批量录入',
      merchantNo: '商户编号',
      company: '所属渠道商：',
      createTime: '创建时间：',
      edit: '编辑',
      details: '详情',
      manageTerminal: '管理终端',
      manageMachine: '管理机具',
      filter: {
        merchantNo: '商户编号',
        merchantName: '商户名称',
        company: '渠道商',
      }
    },
    batch: {
      title: '批量录入',
      templateTips: '请先点击下载模板${模板名称}',
      templateName: '商户录入模板',
      uploadTips: '将文件拖到此处，或点击上传',
      fileCheckTips: '只能选择excel文件，仅支持xlsx后缀 ，且不超过5M',
      fileCheckType: '只能选择excel文件，仅支持xlsx后缀',
      fileCheckSize: '上传文件不能超过5M',
      cancel: '取消',
      import: '导入',
      /* 上传后的操作提示 */
      uploadRes: {
        title: '操作提示',
        totalMerchant: '清单文件中商户总数：',
        successAmount: '导入成功数量：',
        failureText: '是否需要导出失败清单'
      },
      /* 导出表头数据 */
      header: [
        '商户名称',
        '商户编号',
        '原因'
      ],
      failedList: '商户导入失败清单'
    },
    add: {
      title: '录入商户',
      typeIn: '录入',
      tips: {
        typeInSuccess: '录入成功'
      }
    },
    edit: {
      save: '保 存',
      title: '录入商户',
    },
    details: {
      title: '商户详情',
    },
    form: {
      label: {
        merchantNo: '商户编号',
        merchantName: '商户名称',
        contactName: '联系人姓名',
        contactPhone: '联系电话',
        address: '经营地址',
        terminalNos: '终端号',
        remark: '备注',
        createBy: '创建人'
      },
      tips: {
        merchantNo: '请输入商户编号',
        merchantName: '请输入商户名称',
        contactPhone: '联系电话格式不符',
        contactName: '姓名不符合要求，请重新输入'
      }
    }
  }
}
