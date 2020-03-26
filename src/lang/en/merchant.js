export default {
  merchant: {
    list: {
      search: 'Search',
      typeIn: 'Type-in merchant',
      batch: 'Batch import',
      merchantNo: 'Merchant number',
      company: 'attributive company：',
      createTime: 'Created time',
      edit: 'Edit',
      details: 'Details',
      manageTerminal: 'Manage terminal',
      manageMachine: 'Manage machine'
    },
    batch: {
      title: 'Batch Import',
      templateTips: 'Please click to download the template first${模板名称}',
      templateName: 'merchant-template',
      uploadTips: 'Drag the file here, or click upload',
      fileCheckTips: 'You can only choose excel files, only support XLSX suffix, and no more than 5M',
      cancel: 'Cancel',
      import: 'Import',
      /* 上传后的操作提示 */
      uploadRes: {
        title: 'Operation tips',
        totalMerchant: 'The total number of merchants in the manifest file：',
        successAmount: 'The number of successful imports:',
        failureText: 'Whether you need to export the failure list?'
      }
    },
    add: {
      title: 'Type-in merchant',
      typeIn: 'TypeIn',
      tips: {
        typeInSuccess: 'Type-in successfully'
      }
    },
    details: {
      title: 'Merchant details'
    },
    edit: {
      edit: 'Save',
      title: 'Edit merchant'
    },
    form: {
      label: {
        merchantNo: 'Merchant Number',
        merchantName: 'Merchant Name',
        contactName: 'Contact',
        contactPhone: 'Contact Phone',
        address: 'Business Address',
        terminalNos: 'Terminal Number',
        remark: 'Remark',
        createBy: 'Creator'
      },
      tips: {
        merchantNo: 'Please input merchant number',
        merchantName: 'Please input merchant name',
        contactPhone: 'the Contact phone number format is inconsistent',
        contactName: 'The name format does not meet the requirements, please enter again'
      }
    }
  }
}
