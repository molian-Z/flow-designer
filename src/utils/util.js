export const deepClone = function(origin) {
  if (origin === undefined) {
    return undefined
  }

  return JSON.parse(JSON.stringify(origin))
}

export const getElementByAttr = function(aElements, dataAttr, value) {
  var aEle = [];
  for(var i = 0; i < aElements.length; i++) {
    var ele = aElements[i].getAttribute(dataAttr);
    if(value === ele) {
        aEle.push(aElements[i]);
    }
  }
  return aEle;
}