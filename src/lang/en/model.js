export default {
  model: {
    list: {
      search: 'Search',
      add: 'Add',
      edit: 'Edit',
      filter: {
        type: 'Type',
        name: 'Model name',
        vendorName: 'Vendor name',
      },
      table: {
        picUrl: 'Picture',
        name: 'Model Name',
        type: 'Type',
        resolution: 'Resolution',
        vendorName: 'Vendor Name',
        remark: 'Model Description'
      }
    },
    add: {
      title: 'Add model',
    },
    edit: {
      title: 'Edit model'
    },
    form: {
      label: {
        type: 'Type',
        name: 'Model Name',
        vendorId: 'Vendor',
        resolution: 'Resolution',
        resolutionX: 'Width',
        resolutionY: 'Height',
        picUrl: 'Model Picture',
        remark: 'Model Description'
      },
      placeholder: {
        resolutionX: 'Width',
        resolutionY: 'Height'
      },
      tips: {
        types: 'Please select a type',
        name: 'Please input the model name',
        vendorId: 'Please select a vendor',
        resolutionX: 'Please input the width',
        resolutionY: 'Please input the height',
        picUrl: 'Please upload a picture',
        checkPicType: 'Image only support JPG, PNG, jpeg format!',
        checkPicSize: 'Image size cannot exceed 200KB!'
      }
    }
  }
}
