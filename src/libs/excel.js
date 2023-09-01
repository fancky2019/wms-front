import { saveAs } from 'file-saver'
import XLSX from 'xlsx/dist/xlsx.full.min'
// 将json数据处理为xlsx需要的格式
function datenum(v, date1904) {
    if (date1904) v += 1462
    let epoch = Date.parse(v)
    return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000)
}
 
function data2ws(data) {
    const ws = {}
    const range = {s: {c: 10000000, r: 10000000}, e: {c: 0, r: 0}}
    for (let R = 0; R != data.length; ++R) {
        for (let C = 0; C != data[R].length; ++C) {
            if (range.s.r > R) range.s.r = R
            if (range.s.c > C) range.s.c = C
            if (range.e.r < R) range.e.r = R
            if (range.e.c < C) range.e.c = C
            const cell = { v: data[R][C] }
            if (cell.v == null) continue
            const cell_ref = XLSX.utils.encode_cell({c: C, r: R})
 
            if (typeof cell.v === 'number') cell.t = 'n'
            else if (typeof cell.v === 'boolean') cell.t = 'b'
            else if (cell.v instanceof Date) {
                cell.t = 'n'
                cell.z = XLSX.SSF._table[14]
                cell.v = datenum(cell.v)
            }
            else cell.t = 's'
 
            ws[cell_ref] = cell
        }
    }
    if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range)
    return ws
}

// 导出excel
function Workbook() {
    if (!(this instanceof Workbook)) return new Workbook()
    this.SheetNames = []
    this.Sheets = {}
}
 
function s2ab(s) {
    const buf = new ArrayBuffer(s.length)
    const view = new Uint8Array(buf)
    for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
    return buf
}
 
/*
* th => 表头
* data => 数据
* fileName => 文件名
* fileType => 文件类型
* sheetName => sheet页名
*/
export default function toExcel ({th, data, fileName, fileType, sheetName}) {
    data.unshift(th)
    const wb = new Workbook(), ws = data2ws(data)
    sheetName = sheetName || 'sheet1'
    wb.SheetNames.push(sheetName)
    wb.Sheets[sheetName] = ws
    fileType = fileType || 'xlsx'
    var wbout = XLSX.write(wb, {bookType: fileType, bookSST: false, type: 'binary'})
    fileName = fileName || '列表'
    saveAs(new Blob([s2ab(wbout)], {type: "application/octet-stream"}), `${fileName}.${fileType}`)
}

// 导入封装
export function Excel2Obj ({ file, callBack }) { 
    if (!file) {
      return
    }
    var wb // 读取完成的数据
    var reader = new FileReader()
    reader.readAsArrayBuffer(file)
    reader.onload = function (e) {
      var data = e.target.result
      wb = XLSX.read(btoa(fixdata(data)), { // 手动转化
        type: 'base64'
      })
      // wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
      // wb.Sheets[Sheet名]获取第一个Sheet的数据
      let json = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
      if (callBack) {
        callBack(json)
      }
    }
  }
  
  function fixdata (data) { // 文件流转BinaryString
    var o = ''
    let l = 0
    let w = 10240
    for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
    o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
    return o
  }