/* hex转RGB */
export const HEX2RGB = function (hex : string) { //十六进制转为RGB
  var rgb = []; // 定义rgb数组
  if (/^\#[0-9A-F]{3}$/i.test(hex)) { //判断传入是否为#三位十六进制数
    let sixHex = '#';
    hex.replace(/[0-9A-F]/ig, function (kw) {
      sixHex += kw + kw; //把三位16进制数转化为六位
    });
    hex = sixHex; //保存回hex
  }
  if (/^#[0-9A-F]{6}$/i.test(hex)) { //判断传入是否为#六位十六进制数
    hex.replace(/[0-9A-F]{2}/ig, function (kw) {
      rgb.push(eval('0x' + kw)); //十六进制转化为十进制并存如数组
    });
    return `rgb(${rgb.join(',')})`; //输出RGB格式颜色
  } else {
    return hex;
  }
}

export const rgbaToArray = function (colorString : string) {
  var rgbOrgbaJudgeTag = /^([^\(]+)\([^\)]+\)$/i;
  var aaa = rgbOrgbaJudgeTag.exec(colorString);
  if (aaa !== null) {
    if (aaa[1].trim() === "rgb") {
      var str = colorString;
      var strTag = /^rgb[a]*\s*\(([^,]+),([^,]+),([^\)]+)\)$/i;
      var result = strTag.exec(str);
      if (result === null || result[1].trim() === "" || result[2].trim() === "" || result[3].trim() === "") {
        return null;
      }
      var returnArray = [];
      for (var i = 1; i <= result.length - 1; i++) {
        returnArray[i - 1] = Number(result[i].trim());
      } return returnArray;
    } else if (aaa[1].trim() === "rgba") {
      var str = colorString;
      var strTag = /^rgb[a]*\s*\(([^,]+),([^,]+),([^,]+),([^\)]+)\)$/i;
      var result = strTag.exec(str);
      if (result === null || result[1].trim() === "" || result[2].trim() === "" || result[3].trim() === "") {
        return null;
      }
      var returnArray = [];
      for (var i = 1; i <= result.length - 1; i++) {
        returnArray[i - 1] = Number(result[i].trim());
      } return returnArray;
    } else { return null; }
  } else { return null; }
}


export const deepAssign : any = function () {
  let data = JSON.parse(JSON.stringify(arguments[0]))
  const recall = function (originalData : any, obj : any) {
    for (let key in obj) {
      if (typeof obj[key] === 'object') {
        if (!originalData[key]) {
          originalData[key] = {}
        }
        recall(originalData[key], obj[key])
      } else {
        originalData[key] = obj[key]
      }
    }
    return originalData
  }
  for (var i = 1; i < arguments.length; i++) {
    const obj = arguments[i]
    data = recall(data, obj)
  }
  return data
}

export const getParentNodes:any = function (parentNode : any, classes : string[]) {
  const isBtn = classes.findIndex(item =>{
    return parentNode?.classList?.contains(item) || parentNode?.__vnode?.scopeId === item
  })
  if (isBtn == -1) {
    if (!parentNode) {
      return null
    }
    return getParentNodes(parentNode.parentNode, classes)
  } else {
    return parentNode
  }
}