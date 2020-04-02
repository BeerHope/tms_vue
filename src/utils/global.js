import XLSX from 'xlsx'

/* 递归处理树(渠道商) */
export function sortCompanyTree(array) {
  if (!array.length) {
    return []
  }
  return _.map(array, (item) => {
    item.label = item.shortName
    if (item.child && item.child.length) {
      item.children = sortCompanyTree(item.child)
    }
    return item
  })
}

/**
 * @export jsonToExcel
 * @param {Array(json)} jsonData (json类型的数组)
 * @param {String} FileName (导出的文件名)
 * @param {Array} header (导出第一行标题)
 */
export function jsonToExcel(jsonData, FileName, header) {
  let excel = '<table id="exportTable">'
  // 设置表头
  let row = '<tr>'
  for (const i in header) {
    row += "<th align='center' style='width: auto;'>" + header[i] + '</th>'
  }
  row += '</tr>'

  // 设置数据
  for (let m = 0; m < jsonData.length; m++) {
    row += '<tr>'
    for (const key in jsonData[m]) {
      row += "<td align='center' style='width: auto;'>" + jsonData[m][key] + '</td>'
    }
    row += '</tr>'
  }
  excel += row + '</table>'

  const objE = document.createElement('div')
  objE.innerHTML = excel
  const sheet = XLSX.utils.table_to_sheet(objE.childNodes[0], { raw: true })
  download(sheet2blob(sheet, FileName), FileName)
}
/* 
  将一个sheet转成最终的excel文件的blob对象，
  然后利用URL.createObjectURL下载
*/
function sheet2blob(sheet, sheetName) {
  sheetName = sheetName || 'sheet1'
  var workbook = {
    SheetNames: [sheetName],
    Sheets: {}
  }
  workbook.Sheets[sheetName] = sheet // 生成excel的配置项
 
  var wOpts = {
    bookType: 'xlsx', // 要生成的文件类型
    bookSST: false, // 如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
    type: 'binary'
  }
  var wbOut = XLSX.write(workbook, wOpts)
  var blob = new Blob([s2ab(wbOut)], {
    type: 'application/octet-stream'
  })
  return blob
}
function s2ab(s) {
  var buf = new ArrayBuffer(s.length)
  var view = new Uint8Array(buf)
  for (var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
  return buf
}

/* 将json转为sheet，导出excel */
export function exportExcel(jsonData, header, fileName) {
  const ws = XLSX.utils.json_to_sheet(jsonData, header)
  // format header
  const range = XLSX.utils.decode_range(ws['!ref']);
  const wsCols = []
  for (let C = range.s.c; C <= range.e.c; ++C) {
    const address = XLSX.utils.encode_col(C) + "1"; // <-- first row, column number C
    if (!ws[address]) continue;
    ws[address].v = header[C];
    if (C !== header.length - 1) {
      wsCols.push({ wch: 20 })
    } else {
      wsCols.push({ wch: 40 })
    }
  }
  ws['!cols'] = wsCols;
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, fileName)
  XLSX.writeFile(wb, `${fileName}.xlsx`)
}

export function download(blob, fileName) {
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `${fileName}.xlsx`
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  link.remove();
}
