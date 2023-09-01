
// export const CreateAreaDto = () => {
//   let dto = { 'xCode': null, 'xName': null, 'isEnabled': 'Y' }
//   return dto
// }
// export const CreateAreaLocationDetailDto = () => {
//   let dto = { 'areaId': '00000000-0000-0000-0000-000000000000', 'locationId': '00000000-0000-0000-0000-000000000000', 'locationCode': null, 'isEnabled': 'Y', 'index1': 0, 'index2': 0, 'index3': 0 }
//   return dto
// }
// export const CreateAreaMaterialDetailDto = () => {
//   let dto = { 'areaId': '00000000-0000-0000-0000-000000000000', 'materialId': '00000000-0000-0000-0000-000000000000', 'materialCode': null, 'materialName': null, 'materialSpec': null, 'materialUnit': null, 'isEnabled': 'Y' }
//   return dto
// }
// export const CreateAutoInWarehouseOrderDto = () => {
//   let dto = { 'identification': null, 'keyCode': null, 'billTypeCode': null, 'billDate': null, 'billNO': null, 'billState': 0, 'plainLocationNO': null, 'rackLocationNO': null, 'containerCode': null, 'serialNumber': null, 'packageUnit': null, 'materialCode': null, 'materialPropertyId': '00000000-0000-0000-0000-000000000000', 'rackLocationId': '00000000-0000-0000-0000-000000000000', 'qCStatus': 0, 'rowNo': 0, 'seqNumber': 0, 'isNominateRackLocation': false, 'isScattered': false, 'baseQuantity': 0.0, 'wMSState': 0, 'msg': null, 'commonts': null, 'str1': null, 'str2': null, 'str3': null, 'str4': null, 'str5': null, 'str6': null, 'str7': null, 'str8': null, 'str9': null, 'str10': null }
//   return dto
// }
// export const CreateAutoOutWarehouseOrderDto = () => {
//   let dto = { 'identification': null, 'keyCode': null, 'billTypeCode': null, 'billState': 0, 'billDate': null, 'billNO': null, 'shipmentPort': null, 'rackLocationNO': null, 'containerCode': null, 'materialCode': null, 'serialNumber': null, 'receivedAt': null, 'materialId': '00000000-0000-0000-0000-000000000000', 'materialPropertyId': '00000000-0000-0000-0000-000000000000', 'isNominateShipmentPort': false, 'isConfirmOut': false, 'isReturnOriRackLocation': false, 'baseQuantity': 0.0, 'wMSState': 0, 'msg': null, 'commonts': null, 'str1': null, 'str2': null, 'str3': null, 'str4': null, 'str5': null, 'str6': null, 'str7': null, 'str8': null, 'str9': null, 'str10': null }
//   return dto
// }
// export const CreateWmsEnumerableDto = () => {
//   let dto = { 'xCode': null, 'xType': null, 'xStatus': 'ENABLED', 'xName': null, 'xValue': null, 'str1': null, 'str2': null, 'str3': null, 'str4': null, 'str5': null, 'str6': null, 'str7': null, 'str8': null, 'str9': null, 'str10': null }
//   return dto
// }
export const CreateWmsEnumerableDto = () => {
    let dto = { 'xCode': null, 'xType': null, 'xStatus': 'ENABLED', 'xName': null, 'xValue': null, 'str1': null, 'str2': null, 'str3': null, 'str4': null, 'str5': null, 'str6': null, 'str7': null, 'str8': null, 'str9': null, 'str10': null }
    return dto
  }
  export const CreateBillTypeDto = () => {
  // let dto = { 'ownerId': '00000000-0000-0000-0000-000000000000', 'xCode': null, 'xName': null, 'xType': null, 'xStatus': 'ENABLED', 'description': null, 'shipLocation1': null, 'shipLocation2': null, 'shipLocation3': null, 'class1': null, 'class2': null, 'allocatRelationId': null, 'shipmentRuleId': null }
  let dto = {  'xName': null,'xCode': null,'xStatus': null,'warehouseId': null, 'str1': null, 'str2': null, 'str3': null, 'str4': null, 'str5': null}
  return dto
}

// export const CreateBolOrderDto = () => {
//   let dto = { 'ownerId': null, 'customerId': null, 'warehouseId': '00000000-0000-0000-0000-000000000000', 'xCode': null, 'xStatus': null, 'shipOrderId': '00000000-0000-0000-0000-000000000000', 'moveDocId': '00000000-0000-0000-0000-000000000000', 'dockId': null, 'vehicleId': null, 'carrierId': null, 'driver': null, 'loadBeginTime': null, 'loadEndTime': null, 'volumnLimit': 0.0, 'weightLimit': 0.0, 'router': null, 'originBillCode': null, 'relatedBill1': null, 'relatedBill2': null, 'relatedBill3': null, 'shipToName': null, 'contactCountry': null, 'contactProvince': null, 'contactCity': null, 'contactAddress': null, 'contactPostcode': null, 'contactName': null, 'contactMobile': null, 'contactTelephone': null, 'contactFax': null, 'contactEmail': null, 'receivedBy': null, 'relationCode': null, 'erpStatus': null, 'tradingCompany': null, 'trusteeBy': null, 'allRules': null, 'isOffLine': null, 'priority': null, 'destination': null, 'tipMsg': null, 'comments': null, 'str1': null, 'str2': null, 'str3': null, 'str4': null, 'str5': null }
//   return dto
// }
// export const CreateBolOrderItemDto = () => {
//   let dto = { 'bolOrderId': '00000000-0000-0000-0000-000000000000', 'rowNo': 0, 'materialId': '00000000-0000-0000-0000-000000000000', 'materialPropertyId': '00000000-0000-0000-0000-000000000000', 'packageUnitId': '00000000-0000-0000-0000-000000000000', 'loadedPkgQuantity': 0.0, 'pallet': null, 'carton': null, 'serialNo': null, 'originalBillCode': null, 'relatedBill': null, 'fromLocId': null, 'fromLocCode': null, 'toLocId': null, 'toLocCode': null, 'inventoryStatus': null, 'srcInventoryId': null, 'destInventoryId': null, 'str1': null, 'str2': null, 'str3': null, 'str4': null, 'str5': null, 'str6': null, 'str7': null, 'str8': null, 'str9': null, 'str10': null }
//   return dto
// }
// export const CreateSamplingRecordDto = () => {
//   let dto = { 'originBillCode': null, 'relatedBill1': null, 'relatedBill2': null, 'relatedBill3': null, 'inventoryId': '00000000-0000-0000-0000-000000000000', 'locationId': '00000000-0000-0000-0000-000000000000', 'pallet': null, 'carton': null, 'serialNo': null, 'backPallet': null, 'toPallet': null, 'backCarton': null, 'toCarton': null, 'materialId': '00000000-0000-0000-0000-000000000000', 'materialPropertyId': '00000000-0000-0000-0000-000000000000', 'packageUnitId': '00000000-0000-0000-0000-000000000000', 'samplingPkgQuantity': 0.0, 'samplingTime': null, 'qCStatus': null, 'description': null, 'isCreateMovedoc': null }
//   return dto
// }
// export const CreateCodeRuleDto = () => {
//   let dto = { 'creator': null, 'lastModifier': null, 'xType': null, 'xHead': null, 'xTail': null, 'midModel': null, 'sqLength': null, 'formatSq': null, 'comments': null, 'str1': null, 'str2': null, 'str3': null, 'str4': null, 'str5': null }
//   return dto
// }
export const CreateCountDetailDto = () => {
  let dto = { 
    'whid': '',  
    'xCode': null, 
    'xStatus': 1, 
    'billTypeId': null, 
    'dockId': null, 
    'destination': null,
    'isOutBoundWork': '',
    'comments': '',
    'str1': '', 
    'str2': '', 
    'str3': '', 
    'str4': '', 
    'str5': '',
  }
  return dto
}
export const CreateCountPlanDto = () => {
  let dto = { 
    'whid': '',  
    'xCode': null, 
    'xStatus': 1, 
    'billTypeId': null, 
    'dockId': null, 
    'destination': null,
    'isOutBoundWork': '',
    'comments': '',
    'rowNo':'',
    'str1': '', 
    'str2': '', 
    'str3': '', 
    'str4': '', 
    'str5': '', 
    'countOrderId':'', 
    'inventoryItemDetailId': null }
  return dto
}
// export const CreateCountingDto = () => {
//   let dto = { 'xCode': null, 'startAt': null, 'materialId': null, 'materialPropertyId': null, 'warehouseId': null, 'lanewayIds': null, 'rackIds': null, 'productionStartTime': null, 'receivedStartTime': null, 'inboundStartTime': null, 'expiredStartTime': null, 'productionEndTime': null, 'receivedEndTime': null, 'inboundEndTime': null, 'expiredEndTime': null, 'xStatus': 'OPEN', 'countingMode': null, 'isAutoCorrect': null, 'isOriLocation': null, 'comments': null, 'str1': null, 'str2': null, 'str3': null, 'str4': null, 'str5': null, 'str6': null, 'str7': null, 'str8': null, 'str9': null, 'str10': null }
//   return dto
// }
// export const CreateCountingInventoryDto = () => {
//   let dto = { 'countingId': '00000000-0000-0000-0000-000000000000', 'unifiedInventoryId': null, 'inventoryId': null, 'containerCode': null, 'isDifference': null, 'isSpotCheck': null, 'countingUserName': null, 'spotCheckUserName': null, 'toLocationUserCode': null, 'icStatus': null }
//   return dto
// }
export const CreateCountingInventoryItemDto = () => {
  let dto = { 
    'material': null,
    'serialNo': null, 
    'packageUnit': null,
    'xStatus': null,
    'qcStatus': null,
    "batchNo": "",
    "batchNo2": "",
    "batchNo3": "",
    'allocatedPackageQuantity': 0, 
    'allocatedSmallUnitQuantity': 0,
    'smallUnitQuantity': 0, 
    'packageQuantity': 0, 
    'isLocked': null, 
    'isSealed': null, 
    'isScattered': null, 
    'isExpired': null, 
    'expiredTime': null, 
    'comments': null, 
    'm_Str1': null, 
    'm_Str2': null, 
    'm_Str3': null, 
    'm_Str4': null, 
    'm_Str5': null, 
    'm_Str6': null, 
    'm_Str7': null, 
    'm_Str8': null, 
    'm_Str9': null, 
    'm_Str10': null, 
    'm_Str11': null, 
    'm_Str12': null, 
    'm_Str13': null, 
    'm_Str14': null, 
    'm_Str15': null, 
    'm_Str16': null, 
    'm_Str17': null, 
    'm_Str18': null,  
    'm_Str19': null,
    'm_Str20': null,
    'm_Str21': null, 
    'm_Str22': null, 
    'm_Str23':null, 
    'm_Str24': null, 
    'm_Str25': null, 
    'm_Str26': null, 
    'm_Str27': null, 
    'm_Str28': null, 
    'm_Str29': null, 
    'm_Str30': null, 
    'm_Str31': null, 
    'm_Str32': null, 
    'm_Str33': null, 
    'm_Str34': null, 
    'm_Str35': null, 
    'm_Str36': null, 
    'm_Str37': null, 
    'm_Str38': null,  
    'm_Str39': null,
    'm_Str40': null,
  }
  return dto
}
// export const CreateFlowRecordDto = () => {
//   let dto = { 'creator': null, 'lastModifier': null, 'businessType': null, 'isRed': false, 'inventoryId': '00000000-0000-0000-0000-000000000000', 'containerCode': null, 'materialId': '00000000-0000-0000-0000-000000000000', 'materialPropertyId': null, 'serialNumber': null, 'xOwner': null, 'batchNo': null, 'flowDirection': null, 'qNumber': 0.0, 'qUnit': null, 'packageNumber': 0.0, 'packageUnit': null, 'relationType': null, 'relationId': null, 'relationCode': null, 'materialPropertyValue': null, 'comments': null, 'workGroup': null, 'wldw': null, 'str1': null, 'str2': null, 'str3': null, 'str4': null, 'str5': null, 'str6': null, 'str7': null, 'str8': null, 'str9': null, 'str10': null }
//   return dto
// }
// export const CreateApplyReceiptOrderDto = () => {
//   let dto = { 'creator': null, 'xCode': null, 'billTypeId': '00000000-0000-0000-0000-000000000000', 'xStatus': 'OPEN', 'operateStatus': 'OPEN', 'isOffline': null, 'whid': '00000000-0000-0000-0000-000000000000', 'trusteeBy': null, 'qcby': null, 'storekeeper': null, 'tradingCompany': null, 'relationCode': null, 'tipMsg': null, 'comments': null, 'str1': null, 'str2': null, 'str3': null, 'str4': null, 'str5': null, 'str6': null, 'str7': null, 'str8': null, 'str9': null, 'str10': null, 'auditStatus': 'PASS', 'auditorId': '00000000-0000-0000-0000-000000000000', 'auditTime': null }
//   return dto
// }
// export const CreateApplyReceiptOrderItemDto = () => {
//   let dto = { 'applyReceiptOrderId': '00000000-0000-0000-0000-000000000000', 'materialId': '00000000-0000-0000-0000-000000000000', 'packageUnitId': '00000000-0000-0000-0000-000000000000', 'expectedNumber': 0.0, 'expectedUnit': null, 'receivedNumber': 0.0, 'receivedUnit': null, 'registeredNumber': 0.0, 'registeredUnit': null, 'allocatedNumber': 0.0, 'allocatedUnit': null, 'unitId': '00000000-0000-0000-0000-000000000000', 'rowNo': null, 'tRelationCode': null, 'tRelationType': null, 'tRelationWarehouseInId': null, 'relationId': null, 'ownerUser': null, 'comments': null, 'str1': null, 'str2': null, 'str3': null, 'str4': null, 'str5': null, 'str6': null, 'str7': null, 'str8': null, 'str9': null, 'str10': null, 'productionTime': null, 'receivedTime': null, 'inboundTime': null, 'expiredTime': null, 'aStartTime': null, 'qcStartTime': null, 'preservationDays': null, 'sourceOrderCode': null, 'batchNo': null, 'supplierId': null, 'customerId': null, 'm_Str1': null, 'm_Str2': null, 'm_Str3': null, 'm_Str4': null, 'm_Str5': null, 'm_Str6': null, 'm_Str7': null, 'm_Str8': null, 'm_Str9': null, 'm_Str10': null, 'm_Str11': null, 'm_Str12': null, 'm_Str13': null, 'm_Str14': null, 'm_Str15': null, 'm_Str16': null, 'm_Str17': null, 'm_Str18': null, 'm_Str19': null, 'm_Str20': null, 'm_Str21': null, 'm_Str22': null, 'm_Str23': null, 'm_Str24': null, 'm_Str25': null, 'm_Str26': null, 'm_Str27': null, 'm_Str28': null, 'm_Str29': null, 'm_Str30': null, 'm_Str31': null, 'm_Str32': null, 'm_Str33': null, 'm_Str34': null, 'm_Str35': null, 'm_Str36': null, 'm_Str37': null, 'm_Str38': null, 'm_Str39': null, 'm_Str40': null }
//   return dto
// }
// export const CreateReceiptApplyDto = () => {
//   let dto = { 'applyReceiptOrderItemId': '00000000-0000-0000-0000-000000000000', 'receiptOrderItemId': '00000000-0000-0000-0000-000000000000', 'amount': 0.0 }
//   return dto
// }
export const CreateReceiptOrderDto = () => {
  let dto = {  'xCode':'',
  "applyReceiptOrderCode": "",
  "xStatus": 1,
  "billTypeId": '',
  "organiztion": "",
  "expectedPkgQuantity": '',
  "receivedPkgQuantity": '',
  "movedPkgQuantity": "0", 
  "comments": "",
  "str1": "",
  "str2": "",
  "str3": "",
  "str4": "",
  "str5": "",
  "str6": "",
  "str7": "",
  "str8": "",
  "str9": "",
  "str10": "",
  "str11": "",
  "str12": "",
  "str13": "",
  "str14": "",
  "str15": "",
  "str16": "",
  "str17": "",
  "str18": "",
  "str19": "",
  "str20": "" 
}
  return dto
}
export const CreateReceiptOrderItemDto = () => {
  let dto = {
    "receiptOrderId": '',
    "applyReceiptOrderCode": "",
    "expectedPkgQuantity": '',
    "receivedPkgQuantity": 0,
    "movedPkgQuantity": 0,
    "rowNo": '',
    "thirdPartyRowNo": "",
    "xStatus": 1,
    "materialId": '',
    "batchNo": "",
    "batchNo2": "",
    "batchNo3": "",
    "packageUnitId": '',
    "expectedNumber": 0,
    "expectedUnit": "",
    "receivedNumber": '',
    "receivedUnit": "",
    "qcStatus": "",
    "comments": "",
    "str1": "",
    "str2": "",
    "str3": "",
    "str4": "",
    "str5": "",
    "str6": "",
    "str7": "",
    "str8": "",
    "str9": "",
    "str10": "",
    "str11": "",
    "str12": "",
    "str13": "",
    "str14": "",
    "str15": "",
    "str16": "",
    "str17": "",
    "str18": "",
    "str19": "",
    "str20": "",
    "m_Str1": "",
    "m_Str2": "",
    "m_Str3": "",
    "m_Str4": "",
    "m_Str5": "",
    "m_Str6": "",
    "m_Str7": "",
    "m_Str8": "",
    "m_Str9": "",
    "m_Str10": "",
    "m_Str11": "",
    "m_Str12": "",
    "m_Str13": "",
    "m_Str14": "",
    "m_Str15": "",
    "m_Str16": "",
    "m_Str17": "",
    "m_Str18": "",
    "m_Str19": "",
    "m_Str20": "",
    "m_Str21": "",
    "m_Str22": "",
    "m_Str23": "",
    "m_Str24": "",
    "m_Str25": "",
    "m_Str26": "",
    "m_Str27": "",
    "m_Str28": "",
    "m_Str29": "",
    "m_Str30": "",
    "m_Str31": "",
    "m_Str32": "",
    "m_Str33": "",
    "m_Str34": "",
    "m_Str35": "",
    "m_Str36": "",
    "m_Str37": "",
    "m_Str38": "",
    "m_Str39": "",
    "m_Str40": ""
  }
  return dto
}
export const CreateReceivedRecordDto = () => {
  let dto = { 
    "receiptOrderId": 0,
    "receiptOrderItemId": 0,
    "pallet": "string",
    "materialId": 0,
    "batchNo": "string",
    "batchNo2": "string",
    "batchNo3": "string",
    "carton": "string",
    "serialNo": "string",
    "locationId": 0,
    "locationCode": "string",
    "xStatus": 0,
    "packageUnitId": 0,
    "receivedSmallUnitQuantity": 0,
    "receivedPkgQuantity": 0,
    "movedPkgQuantity": 0,
    "isCreateMovedoc": false,
    "isWeipan": false,
    "inventoryId": 0,
    "inventoryDetailId": 0,
    "qcStatus": "",
    "comments": "",
    "str1": "",
    "str2": "",
    "str3": "",
    "str4": "",
    "str5": "",
    "str6": "",
    "str7": "",
    "str8": "",
    "str9": "",
    "str10": "",
    "str11": "",
    "str12": "",
    "str13": "",
    "str14": "",
    "str15": "",
    "str16": "",
    "str17": "",
    "str18": "",
    "str19": "",
    "str20": "",
    "m_Str1": "",
    "m_Str2": "",
    "m_Str3": "",
    "m_Str4": "",
    "m_Str5": "",
    "m_Str6": "",
    "m_Str7": "",
    "m_Str8": "",
    "m_Str9": "",
    "m_Str10": "",
    "m_Str11": "",
    "m_Str12": "",
    "m_Str13": "",
    "m_Str14": "",
    "m_Str15": "",
    "m_Str16": "",
    "m_Str17": "",
    "m_Str18": "",
    "m_Str19": "",
    "m_Str20": "",
    "m_Str21": "",
    "m_Str22": "",
    "m_Str23": "",
    "m_Str24": "",
    "m_Str25": "",
    "m_Str26": "",
    "m_Str27": "",
    "m_Str28": "",
    "m_Str29": "",
    "m_Str30": "",
    "m_Str31": "",
    "m_Str32": "",
    "m_Str33": "",
    "m_Str34": "",
    "m_Str35": "",
    "m_Str36": "",
    "m_Str37": "",
    "m_Str38": "",
    "m_Str39": "",
    "m_Str40": ""

  }
  return dto
}
export const CreateContainerDto = () => {
  let dto = {  'xCode': null, 'xName': null,'xStatus': null, 'agvType': null,'weight': 0.0, 'length': 0.0, 'width': 0.0, 'height': 0.0,  'str1': null, 'str2': null, 'str3': null , 'str4': null , 'str5': null  }
  return dto
}
// export const CreateInventoryDetailDto = () => {
//   let dto = { 'creator': null, 'lastModifier': null, 'inventoryId': '00000000-0000-0000-0000-000000000000', 'countingId': null, 'locationId': '00000000-0000-0000-0000-000000000000', 'materialId': '00000000-0000-0000-0000-000000000000', 'materialPropertyId': '00000000-0000-0000-0000-000000000000', 'packageUnitId': '00000000-0000-0000-0000-000000000000', 'locationCode': null, 'pallet': null, 'carton': null, 'serialNo': null, 'sequenceNo': 0, 'allocatedPackageQuantity': 0.0, 'packageQuantity': 0.0, 'qCStatus': null, 'hashCode': null, 'isSealed': null, 'isScattered': null, 'scatterType': null, 'sealedComments': null, 'xType': null }
//   return dto
// }
// export const CreateInventoryDto = () => {
//   let dto = { 'ownerId': '00000000-0000-0000-0000-000000000000', 'warehouseId': '00000000-0000-0000-0000-000000000000', 'locationId': '00000000-0000-0000-0000-000000000000', 'materialId': '00000000-0000-0000-0000-000000000000', 'materialPropertyId': '00000000-0000-0000-0000-000000000000', 'packageUnitId': '00000000-0000-0000-0000-000000000000', 'quantity': 0.0, 'packageQuantity': 0.0, 'putawayPackageQuantity': 0.0, 'allocatedPackageQuantity': 0.0, 'isLocked': 'N', 'qCStatus': 'WaitToQualified', 'isSealed': 'N', 'isScattered': 'N', 'scatterType': null, 'sealedComments': null, 'featureCode': null, 'isKeeping': null, 'hashCode': null }
//   return dto
// }
// export const CreateInventoryLogDto = () => {
//   let dto = { 'warehouseId': '00000000-0000-0000-0000-000000000000', 'logType': null, 'inOrOut': null, 'billCode': null, 'billTypeId': '00000000-0000-0000-0000-000000000000', 'locationId': '00000000-0000-0000-0000-000000000000', 'locationCode': null, 'packageUnit': null, 'inventoryStatus': null, 'quantity': 0.0, 'pkgQuantity': 0.0, 'materialId': '00000000-0000-0000-0000-000000000000', 'materialCode': null, 'materialName': null, 'materialSpec': null, 'materialPropertyId': '00000000-0000-0000-0000-000000000000', 'packageUnitId': '00000000-0000-0000-0000-000000000000', 'm_Str1': null, 'm_Str2': null, 'm_Str3': null, 'm_Str4': null, 'm_Str5': null, 'm_Str6': null, 'm_Str7': null, 'm_Str8': null, 'm_Str9': null, 'm_Str10': null, 'm_Str11': null, 'm_Str12': null, 'm_Str13': null, 'm_Str14': null, 'm_Str15': null, 'm_Str16': null, 'm_Str17': null, 'm_Str18': null, 'm_Str19': null, 'm_Str20': null, 'm_Str21': null, 'm_Str22': null, 'm_Str23': null, 'm_Str24': null, 'm_Str25': null, 'm_Str26': null, 'm_Str27': null, 'm_Str28': null, 'm_Str29': null, 'm_Str30': null, 'm_Str31': null, 'm_Str32': null, 'm_Str33': null, 'm_Str34': null, 'm_Str35': null, 'm_Str36': null, 'm_Str37': null, 'm_Str38': null, 'm_Str39': null, 'm_Str40': null, 'company': null, 'description': null }
//   return dto
// }
// export const CreateDockDto = () => {
//   let dto = { 'zoneId': null, 'xCode': null, 'xStatus': 'ENABLED', 'isReceive': 'Y', 'isShip': 'Y', 'receiveLocId': null, 'shipLocId': null, 'stockArea': null, 'str1': null, 'str2': null, 'str3': null, 'str4': null, 'str5': null, 'str6': null, 'str7': null, 'str8': null, 'str9': null, 'str10': null }
//   return dto
// }
export const CreateLanewayDto = () => {
   let dto = { 
   'xCode': null, 
   'xName': null,
   'xType': null,  
   'warehouseId':  null,
   'lanwayNo':0,
   'usageRate':0,
   'usageRateUpper':0,
   'disallowWcsToClearError':null,
   'totalLocationCount':0,
   'loadLocationCount':0,
   'relateDeviceCode':'',
   'str1': '', 
   'str2': '', 
   'str3': '', 
   'str4': '', 
   'str5': '', 
    }
  return dto
}
export const CreateLocationDto = () => {
  let dto = { 'xCode': null, 'xName': null, 'xStatus': 1, 'xType': null, 'lanwayId': null, 'rackId': null, 'xRack': null, 'xColumn': null, 'xLevel': null, 'xDepth':null, 'maxLength': null, "maxWidth": null,"maxHeight":null,  "maxWeight": null, "exceptionComments":null, "isLocked": false,  "isLoaded": false, "isCountLocked": false, "forbidInbound": false, "forbidInboundComments": null, "forbidOutbound": false,  "forbidOutboundComments": null, "str1": null, "str2": null, "str3": null, "str4": null, "str5": null }
  return dto
}
export const CreateWarehouseDto = () => {
  // let dto = { 'xCode': null, 'xName': null, 'telephone': null, 'address': null, 'postCode': null,  'allocatRelationId': null, 'shipmentRuleId': null, 'xType': '' }
  let dto = { 'xCode': null, 'xName': null, 'xStatus': null, 'xType': null, 'inIsAuto': null, 'outIsAuto': null, 'str1': null, 'str2': null,  }
  return dto
}
export const CreateConveyorDto = () => {
  // let dto = { 'xCode': null, 'xName': null, 'telephone': null, 'address': null, 'postCode': null,  'allocatRelationId': null, 'shipmentRuleId': null, 'xType': '' }
  let dto = { 'warehouseId': null, 'xCode': null, 'xName': null, 'xStatus': null, 'xType': null, 'inIsAuto': null, 'outIsAuto': null, 'str1': null, 'str2': null, 'str3': null, 'str4': null, 'str5': null  }
  return dto
}
export const CreateZoneDto = () => {
  let dto = { 'warehouseId': '00000000-0000-0000-0000-000000000000', 'xCode': null, 'xName': null, 'xStatus': 'ENABLED', 'description': null, 'lowTemperature': 0.0, 'highTemperature': 0.0 }
  return dto
}
// export const CreateLocationUnitDto = () => {
//   let dto = { 'xCode': null, 'lanewayId': null, 'side': 0, 'xRack': 0, 'xColumn': 0, 'xLevel': 0, 'locationId': '00000000-0000-0000-0000-000000000000', 'locationCode': null, 'xGroup': null, 'locationId1': null, 'locationId2': null, 'locationId3': null, 'locationId4': null }
//   return dto
// }
// export const CreateDUnitDto = () => {
//   let dto = { 'xCode': null, 'lanewayId': '00000000-0000-0000-0000-000000000000', 'side': 0, 'xColumn': 0, 'xLevel': 0, 'nearEndId': '00000000-0000-0000-0000-000000000000', 'farEndId': '00000000-0000-0000-0000-000000000000', 'location': null, 'location1': null, 'laneway': null }
//   return dto
// }
// export const CreateLaynewayOrderDto = () => {
//   let dto = { 'creator': null, 'lastModifier': null, 'laneId': null, 'iorder': null }
//   return dto
// }
// export const CreateLocationStrategyDto = () => {
//   let dto = { 'creator': null, 'lastModifier': null, 'locationId': '00000000-0000-0000-0000-000000000000', 'allocatRelationId': '00000000-0000-0000-0000-000000000000', 'allocatRelation': null, 'location': null }
//   return dto
// }
// export const CreateLocation_DisconnectedDto = () => {
//   let dto = { 'creator': null, 'lastModifier': null, 'locationId': '00000000-0000-0000-0000-000000000000', 'disconnectedLocationId': '00000000-0000-0000-0000-000000000000', 'location': null, 'location1': null }
//   return dto
// }
export const CreateRackDto = () => {
  let dto = { 'xCode': null,'xName': null, 'xStatus': null, 'lanewayId': null,'usageRate': null,'totalLocationCount': null,'loadLocationCount':null, 'usageRateUpper': null, 'deep': null, 'column': null, 'level': null, 'str1': null, 'str2': null, 'str3': null, 'str4': null, 'str5': null }
  return dto
}
// export const CreateTianDto = () => {
//   let dto = { 'lanewayId': '00000000-0000-0000-0000-000000000000', 'side': 0, 'xLevel': 0, 'n1': '00000000-0000-0000-0000-000000000000', 'n2': '00000000-0000-0000-0000-000000000000', 'f1': '00000000-0000-0000-0000-000000000000', 'f2': '00000000-0000-0000-0000-000000000000', 'laneway': null, 'location': null, 'location1': null, 'location2': null, 'location3': null }
//   return dto
// }
export const CreateMaterialCategoryDto = () => {
  let dto = { 'xCode': null, 'xName': null, 'materialPropertyRuleId': null, 'isForbidden': 'N', 'forbiddenComments': null, 'forbiddenUserId': null, 'comments': null, 'str1': null, 'str2': null, 'str3': null, 'str4': null, 'str5': null }
  return dto
}
export const CreateMaterialDto = () => {
  let dto = { 'xCode': null, 'xName': null, 'shortName': null, 'barcode': null, 'isForbidden': 'N', 'forbiddenComments': null, 'forbiddenUserId': null, 'smallestUnit': 'PCS','mnemonicCode': null, 'upper': null, 'lower': null, 'days': null, 'spec': null, 'materialCategoryId': null,  'comments': null, 'str1': null, 'str2': null, 'str3': null, 'str4': null, 'str5': null, 'str6': null, 'str7': null, 'str8': null, 'str9': null, 'str10': null, 'str11': null, 'str12': null, 'str13': null, 'str14': null, 'str15': null, 'str16': null, 'str17': null, 'str18': null, 'str19': null, 'str20': null,}
  return dto
}
export const CreateMaterialPropertyDto = () => {
  let dto = { 'propertyRuleId': null, 'materialId': null, 'xType': 'RECEIVE', 'productionTime': null, 'receivedTime': null, 'inboundTime': null, 'expiredTime': null, 'aStartTime': null, 'qcStartTime': null, 'preservationDays': null, 'sourceOrderCode': null, 'batchNo': null, 'supplierId': null, 'm_Str1': null, 'm_Str2': null, 'm_Str3': null, 'm_Str4': null, 'm_Str5': null, 'm_Str6': null, 'm_Str7': null, 'm_Str8': null, 'm_Str9': null, 'm_Str10': null, 'm_Str11': null, 'm_Str12': null, 'm_Str13': null, 'm_Str14': null, 'm_Str15': null, 'm_Str16': null, 'm_Str17': null, 'm_Str18': null, 'm_Str19': null, 'm_Str20': null, 'm_Str21': null, 'm_Str22': null, 'm_Str23': null, 'm_Str24': null, 'm_Str25': null, 'm_Str26': null, 'm_Str27': null, 'm_Str28': null, 'm_Str29': null, 'm_Str30': null, 'm_Str31': null, 'm_Str32': null, 'm_Str33': null, 'm_Str34': null, 'm_Str35': null, 'm_Str36': null, 'm_Str37': null, 'm_Str38': null, 'm_Str39': null, 'm_Str40': null, 'hashCode': null }
  return dto
}
export const CreateMaterialPropertyRuleDto = () => {
  let dto = { 'xCode': null, 'xName': null, 'productionTime': 0, 'receivedTime': 2, 'inboundTime': 2, 'expiredTime': 0, 'aStartTime': 0, 'qcStartTime': 0, 'preservationDays': 0, 'sourceOrderCode': 2, 'supplierId': 2, 'batchNo': 0, 'm_Str1': 0, 'm_Str2': 0, 'm_Str3': 0, 'm_Str4': 0, 'm_Str5': 0, 'm_Str6': 0, 'm_Str7': 0, 'm_Str8': 0, 'm_Str9': 0, 'm_Str10': 0, 'm_Str11': 0, 'm_Str12': 0, 'm_Str13': 0, 'm_Str14': 0, 'm_Str15': 0, 'm_Str16': 0, 'm_Str17': 0, 'm_Str18': 0, 'm_Str19': 0, 'm_Str20': 0, 'm_Str21': 0, 'm_Str22': 0, 'm_Str23': 0, 'm_Str24': 0, 'm_Str25': 0, 'm_Str26': 0, 'm_Str27': 0, 'm_Str28': 0, 'm_Str29': 0, 'm_Str30': 0, 'm_Str31': 0, 'm_Str32': 0, 'm_Str33': 0, 'm_Str34': 0, 'm_Str35': 0, 'm_Str36': 0, 'm_Str37': 0, 'm_Str38': 0, 'm_Str39': 0, 'm_Str40': 0 }
  return dto
}
// export const CreateMaterialStrategyDto = () => {
//   let dto = { 'materialProperty': '00000000-0000-0000-0000-000000000000', 'str1': null, 'str2': null, 'str3': null, 'str4': null, 'str5': null, 'typeName': null, 'fieldName': null, 'allocatRelationId': '00000000-0000-0000-0000-000000000000', 'creator': null, 'lastModifier': null }
//   return dto
// }
export const CreatePackageUnitDto = () => {
  let dto = { 'materialId': null, 'unit': null,'length': null, 'width': null, 'height': null, 'weight': null, 'volume': null, 'fullPalletQuantity': null, 'convertFigureSmallUnit': null, 'str1': null, 'str2': null, 'str3': null, 'str4': null, 'str5': null }
  return dto
}
// export const CreateMoveDocDetailDto = () => {
//   let dto = { 'rowNo': 0, 'relatedId': '00000000-0000-0000-0000-000000000000', 'moveDocId': '00000000-0000-0000-0000-000000000000', 'materialId': '00000000-0000-0000-0000-000000000000', 'materialPropertyId': '00000000-0000-0000-0000-000000000000', 'fromLocId': '00000000-0000-0000-0000-000000000000', 'fromLocCode': null, 'srcCountingId': '00000000-0000-0000-0000-000000000000', 'countingStatus': null, 'toLocId': '00000000-0000-0000-0000-000000000000', 'toLocCode': null, 'destCountingId': '00000000-0000-0000-0000-000000000000', 'pallet': '-', 'carton': '-', 'serialNo': '-', 'planPkgQuantity': 0.0, 'allocatedPkgQuantity': 0.0, 'movedPkgQuantity': 0.0, 'shippedPkgQuantity': 0.0, 'processPkgQuantity': 0.0, 'packagingPkgQuantity': 0.0, 'packageUnitId': '00000000-0000-0000-0000-000000000000', 'productionTime': null, 'receivedTime': null, 'inboundTime': null, 'expiredTime': null, 'aStartTime': null, 'qcStartTime': null, 'preservationDays': null, 'sourceOrderCode': null, 'batchNo': null, 'supplierId': null, 'customerId': null, 'm_Str1': null, 'm_Str2': null, 'm_Str3': null, 'm_Str4': null, 'm_Str5': null, 'm_Str6': null, 'm_Str7': null, 'm_Str8': null, 'm_Str9': null, 'm_Str10': null, 'm_Str11': null, 'm_Str12': null, 'm_Str13': null, 'm_Str14': null, 'm_Str15': null, 'm_Str16': null, 'm_Str17': null, 'm_Str18': null, 'm_Str19': null, 'm_Str20': null, 'm_Str21': null, 'm_Str22': null, 'm_Str23': null, 'm_Str24': null, 'm_Str25': null, 'm_Str26': null, 'm_Str27': null, 'm_Str28': null, 'm_Str29': null, 'm_Str30': null, 'm_Str31': null, 'm_Str32': null, 'm_Str33': null, 'm_Str34': null, 'm_Str35': null, 'm_Str36': null, 'm_Str37': null, 'm_Str38': null, 'm_Str39': null, 'm_Str40': null, 'hashCode': null }
//   return dto
// }
// export const CreateMoveDocDto = () => {
//   let dto = { 'proirity': 0, 'code': null, 'warehouseId': '00000000-0000-0000-0000-000000000000', 'ownerId': '00000000-0000-0000-0000-000000000000', 'shipmentOrderId': '00000000-0000-0000-0000-000000000000', 'receiptOrderId': '00000000-0000-0000-0000-000000000000', 'waveDocId': '00000000-0000-0000-0000-000000000000', 'billTypeId': '00000000-0000-0000-0000-000000000000', 'type': null, 'status': null, 'shipStatus': null, 'materialId': '00000000-0000-0000-0000-000000000000', 'materialPropertyId': '00000000-0000-0000-0000-000000000000', 'billOriginalTypeId': '00000000-0000-0000-0000-000000000000', 'originalBillCode': null, 'relatedBill1': null, 'relatedBill2': null, 'relatedBill3': null, 'planPkgQuantity': 0.0, 'allocatedPkgQuantity': 0.0, 'movedPkgQuantity': 0.0, 'shippedPkgQuantity': 0.0, 'processPkgQuantity': 0.0, 'packagingPkgQuantity': 0.0, 'productionTime': null, 'receivedTime': null, 'inboundTime': null, 'expiredTime': null, 'aStartTime': null, 'qcStartTime': null, 'preservationDays': null, 'sourceOrderCode': null, 'batchNo': null, 'supplierId': null, 'customerId': null, 'm_Str1': null, 'm_Str2': null, 'm_Str3': null, 'm_Str4': null, 'm_Str5': null, 'm_Str6': null, 'm_Str7': null, 'm_Str8': null, 'm_Str9': null, 'm_Str10': null, 'm_Str11': null, 'm_Str12': null, 'm_Str13': null, 'm_Str14': null, 'm_Str15': null, 'm_Str16': null, 'm_Str17': null, 'm_Str18': null, 'm_Str19': null, 'm_Str20': null, 'm_Str21': null, 'm_Str22': null, 'm_Str23': null, 'm_Str24': null, 'm_Str25': null, 'm_Str26': null, 'm_Str27': null, 'm_Str28': null, 'm_Str29': null, 'm_Str30': null, 'm_Str31': null, 'm_Str32': null, 'm_Str33': null, 'm_Str34': null, 'm_Str35': null, 'm_Str36': null, 'm_Str37': null, 'm_Str38': null, 'm_Str39': null, 'm_Str40': null, 'moveDocDetail': null, 'packageUnitId': '00000000-0000-0000-0000-000000000000', 'packageUnit': null }
//   return dto
// }
// export const CreateWmsTaskDto = () => {
//   let dto = { 'proirity': 0, 'workDocId': '00000000-0000-0000-0000-000000000000', 'moveDocDetailId': '00000000-0000-0000-0000-000000000000', 'type': null, 'status': null, 'originalBillCode': null, 'relatedBill': null, 'materialId': '00000000-0000-0000-0000-000000000000', 'materialPropertyId': '00000000-0000-0000-0000-000000000000', 'pallet': '-', 'carton': '-', 'serialNo': '-', 'srcCountingId': '00000000-0000-0000-0000-000000000000', 'fromLocId': '00000000-0000-0000-0000-000000000000', 'fromLocCode': null, 'desCountingId': '00000000-0000-0000-0000-000000000000', 'toLocId': '00000000-0000-0000-0000-000000000000', 'toLocCode': null, 'planQuantity': 0.0, 'planPkgQuantity': 0.0, 'movedPkgQuantity': 0.0, 'packageUnitId': '00000000-0000-0000-0000-000000000000', 'workerId': '00000000-0000-0000-0000-000000000000', 'isManual': 0, 'srcPackageQuantity': null, 'inventoryStatus': null, 'srcInventoryId': null, 'destInventoryId': null }
//   return dto
// }
// export const CreateWmsTaskLogDto = () => {
//   let dto = { 'taskId': '00000000-0000-0000-0000-000000000000', 'type': null, 'originalBillCode': null, 'relatedBill': null, 'fromLocId': '00000000-0000-0000-0000-000000000000', 'fromLocCode': null, 'fromPallet': null, 'fromCarton': null, 'fromSerialNo': null, 'srcInventoryId': null, 'destInventoryId': null, 'toLocId': '00000000-0000-0000-0000-000000000000', 'toLocCode': null, 'toPallet': null, 'toCarton': null, 'toSerialNo': null, 'materialId': '00000000-0000-0000-0000-000000000000', 'materialPropertyId': '00000000-0000-0000-0000-000000000000', 'packageUnitId': '00000000-0000-0000-0000-000000000000', 'inventoryStatus': null, 'movedPkgQuantity': 0.0, 'movedQuantity': 0.0, 'pickbackPkgQuantity': 0.0, 'shippedPkgQuantity': 0.0, 'isPickback': null, 'workerId': null, 'storageDate': null, 'productDate': null, 'receivedDate': null, 'expireDate': null, 'warnDate': null }
//   return dto
// }
// export const CreateWorkDocDto = () => {
//   let dto = { 'workerId': '00000000-0000-0000-0000-000000000000', 'workder': null, 'code': null, 'type': null, 'status': null, 'originalBillCode': null, 'expectPkgQuantity': 0.0, 'movedPkgQuantity': 0.0, 'printTimes': 0.0, 'relatedBill1': null }
//   return dto
// }
// export const CreateOneTableDto = () => {
//   let dto = { 'xCode': null, 'xType': null, 'xStatus': null, 'xName': null, 'xValue': null, 'isRoot': 0, 'parentId': null, 'str1': null, 'str2': null, 'str3': null, 'str4': null, 'str5': null, 'str6': null, 'str7': null, 'str8': null, 'str9': null, 'str10': null, 'str11': null, 'str12': null, 'str13': null, 'str14': null, 'str15': null, 'str16': null, 'str17': null, 'str18': null, 'str19': null, 'str20': null, 'str21': null, 'str22': null, 'str23': null, 'str24': null, 'str25': null, 'str26': null, 'str27': null, 'str28': null, 'str29': null, 'str30': null, 'str31': null, 'str32': null, 'str33': null, 'str34': null, 'str35': null, 'str36': null, 'str37': null, 'str38': null, 'str39': null, 'str40': null, 'str41': null, 'str42': null, 'str43': null, 'str44': null, 'str45': null, 'str46': null, 'str47': null, 'str48': null, 'str49': null, 'str50': null, 'str51': null, 'str52': null, 'str53': null, 'str54': null, 'str55': null, 'str56': null, 'str57': null, 'str58': null, 'str59': null, 'str60': null }
//   return dto
// }
// export const CreateCustomerDto = () => {
//   let dto = { 'xCode': null, 'xName': null, 'linkUser': null, 'linkPhone': null, 'linkAddress': null, 'email': null, 'comments': null, 'str1': null, 'str2': null, 'str3': null, 'str4': null, 'str5': null }
//   return dto
// }
export const CreateDepartmentDto = () => {
  let dto = { 'xCode': null, 'xName': null, 'linkUser': null, 'linkPhone': null, 'linkAddress': null, 'email': null, 'forbiddenUserId': null, 'comments': null, 'str1': null, 'str2': null, 'str3': null, 'str4': null, 'str5': null }
  return dto
}
export const CreateOrgnizationDto = () => {
  let dto = { 'xCode': null, 'xName': null, 'xStatus': '0', 'country': null, 'province': null, 'city': null, 'address': null, 'postcode': null, 'contactName': null, 'mobile': null, 'telephone': null,  'email': null, 'type': '', 'str1': '', 'str2': '', 'str3': '', 'str4': '', 'str5': ''}
  return dto
}
// export const CreateSupplierDto = () => {
//   let dto = { 'xCode': null, 'xName': null, 'shortName': null, 'linkUser': null, 'linkPhone': null, 'linkAddress': null, 'email': null, 'comments': null, 'str1': null, 'str2': null, 'str3': null, 'str4': null, 'str5': null }
//   return dto
// }
// export const CreateAlertOperationRecordDto = () => {
//   let dto = { 'creator': null, 'lastModifier': null, 'userId': '00000000-0000-0000-0000-000000000000', 'isHaveNew': 0, 'closingTime': null, 'comments': null, 'str1': null, 'str2': null, 'str3': null, 'str4': null, 'str5': null }
//   return dto
// }
// export const CreateAllocatRelationDto = () => {
//   let dto = { 'creator': null, 'lastModifier': null, 'primaryStrategy': 0, 'forkStrategy': 0, 'isWeight': 0, 'isheight': 0, 'isFeatureCode': 0, 'isPLPattern': 0, 'str1': null, 'str2': null, 'str3': null, 'str4': null, 'str5': null, 'code': null, 'name': null, 'materialStrategy': null, 'locationStrategy': null, 'estrategyLaneway': null }
//   return dto
// }
// export const CreateArchivedTaskDto = () => {
//   let dto = { 'creator': null, 'lastModifier': null, 'taskCode': null, 'fromLocationId': '00000000-0000-0000-0000-000000000000', 'toLocationId': '00000000-0000-0000-0000-000000000000', 'direction': null, 'isWcsTask': false, 'isSuspend': false, 'priority': 0, 'wcsRequestId': null, 'wasSentToWcs': false, 'sentToWcsAt': null, 'taskType': null, 'additionalInfo': null, 'comments': null, 'completedAt': '0001-01-01T00: 00: 00', 'completeStatus': null }
//   return dto
// }
// export const CreateArchivedTask_UnitLoadDto = () => {
//   let dto = { 'creator': null, 'lastModifier': null, 'taskId': '00000000-0000-0000-0000-000000000000', 'unitLoadId': '00000000-0000-0000-0000-000000000000', 'listIndex': 0 }
//   return dto
// }
// export const CreateBasicCategoryDto = () => {
//   let dto = { 'creator': null, 'lastModifier': null, 'xCategory': null, 'xProperty': null, 'xCode': null, 'xName': null, 'comments': null }
//   return dto
// }
// export const CreateContainerTypeDto = () => {
//   let dto = { 'creator': null, 'lastModifier': null, 'xCode': null, 'xName': null, 'length': null, 'weight': 0.0, 'width': 0.0, 'height': 0.0, 'usage': null, 'codeRuleId': null, 'comments': null, 'str1': null, 'str2': null, 'str3': null, 'str4': null, 'str5': null }
//   return dto
// }
// export const CreateDeviceStatusDto = () => {
//   let dto = { 'creator': null, 'lastModifier': null, 'deviceName': null, 'comments': null, 'deviceValue': null, 'deviceUp': 0.0, 'deviceDown': 0.0, 'isError': false, 'createdUser': null }
//   return dto
// }
// export const CreateErpMappingDto = () => {
//   let dto = { 'creator': null, 'lastModifier': null, 'serviceName': null, 'listPosition': null, 'erpField': null, 'erpFieldPosition': null, 'field': null, 'displayName': null, 'isList': 0, 'isNameSyn': 0, 'isAdd': 0 }
//   return dto
// }
// export const CreateErrorCodeDto = () => {
//   let dto = { 'creator': null, 'lastModifier': null, 'xCode': null, 'xLevel': null, 'errorCode1': null, 'description': null, 'timeSpan': null, 'comments': null, 'str1': null, 'str2': null, 'str3': null, 'str4': null, 'str5': null }
//   return dto
// }
// export const CreateEstrategyLanewayDto = () => {
//   let dto = { 'creator': null, 'lastModifier': null, 'allocatRelationId': null, 'lanewaysId': null, 'sort': null, 'name': null, 'code': null, 'allocatRelation': null, 'laneway': null }
//   return dto
// }
// export const CreateFieIdSettingItemDto = () => {
//   let dto = { 'creator': null, 'lastModifier': null, 'fieldSettingId': '00000000-0000-0000-0000-000000000000', 'colName': null, 'colCode': null, 'colType': null, 'colTab': null, 'colTabUrl': null, 'displayName': null, 'width': null, 'isNull': false, 'isShow': null, 'isEdit': null, 'isAdd': null, 'defaultValue': null, 'sort': null, 'comments': null, 'fieldSetting': null }
//   return dto
// }
// export const CreateFieldSettingDto = () => {
//   let dto = { 'creator': null, 'lastModifier': null, 'tabName': null, 'tableDisplayName': null, 'featureCode': null, 'comments': null, 'fieIdSettingItem': null }
//   return dto
// }
// export const CreateGroupDto = () => {
//   let dto = { 'creator': null, 'lastModifier': null, 'gName': null, 'showName': null, 'color': null, 'comments': null, 'str1': null, 'str2': null, 'str3': null, 'str4': null, 'str5': null }
//   return dto
// }
// export const CreateGroupToSubCodeDto = () => {
//   let dto = { 'creator': null, 'lastModifier': null, 'gid': 0, 'mid': 0, 'group': null, 'material': null }
//   return dto
// }
// export const CreateInternalXgroupDto = () => {
//   let dto = { 'creator': null, 'lastModifier': null, 'parentXgId': null, 'childXgId': null, 'sort': null, 'str1': null, 'str2': null }
//   return dto
// }
// export const CreateLineGroupDto = () => {
//   let dto = { 'creator': null, 'lastModifier': null, 'lineId': null, 'groupId': null, 'str1': null, 'str2': null, 'workLine': null }
//   return dto
// }
// export const CreateMachineStatusDto = () => {
//   let dto = { 'creator': null, 'lastModifier': null, 'statusID': 0, 'projectCode': null, 'path': null, 'device': null, 'status': 0 }
//   return dto
// }
// export const CreateMenusDto = () => {
//   let dto = { 'creator': null, 'lastModifier': null, 'menuName': null, 'url': null, 'comments': null, 'upperId': 0, 'rootFlag': 0, 'orderId': 0 }
//   return dto
// }
// export const CreateOperationClassDto = () => {
//   let dto = { 'creator': null, 'lastModifier': null, 'xCode': null, 'description': null, 'str1': null, 'str2': null, 'str3': null, 'str4': null, 'str5': null }
//   return dto
// }
// export const CreateOperationRecordDto = () => {
//   let dto = { 'creator': null, 'lastModifier': null, 'operationModel': null, 'businessType': null, 'keyCode': null, 'relationId': '00000000-0000-0000-0000-000000000000', 'comments': null, 'ip': null, 'mac': null, 'str1': null, 'str2': null, 'str3': null, 'str4': null, 'str5': null }
//   return dto
// }
// export const CreateReportFormDto = () => {
//   let dto = { 'creator': null, 'lastModifier': null, 'xName': null, 'viewName': null, 'orderNo': null, 'comments': null, 'str1': null, 'str2': null, 'str3': null, 'str4': null, 'str5': null }
//   return dto
// }
// export const CreateRolesDto = () => {
//   let dto = { 'creator': null, 'lastModifier': null, 'roleName': null, 'isSystem': false, 'comments': null, 'str1': null, 'str2': null, 'str3': null, 'str4': null, 'str5': null, 'role_ErrorCode': null, 'menus': null, 'operationClass': null, 'users': null }
//   return dto
// }
// export const CreateRole_ErrorCodeDto = () => {
//   let dto = { 'creator': null, 'lastModifier': null, 'roleId': '00000000-0000-0000-0000-000000000000', 'errorCodeId': '00000000-0000-0000-0000-000000000000', 'errorCode': null, 'roles': null }
//   return dto
// }
// export const CreateRouteDetailDto = () => {
//   let dto = { 'creator': null, 'lastModifier': null, 'detailID': 0, 'projectCode': null, 'path': null, 'device': null }
//   return dto
// }
// export const CreateRouteHeadDto = () => {
//   let dto = { 'creator': null, 'lastModifier': null, 'headID': 0, 'projectCode': null, 'projectName': null, 'no': 0, 'direction': null, 'device': null }
//   return dto
// }
// export const CreateRouteRelationDto = () => {
//   let dto = { 'creator': null, 'lastModifier': null, 'relationID': 0, 'projectCode': null, 'adjoins': 0 }
//   return dto
// }
// export const CreateSellOrderDto = () => {
//   let dto = { 'creator': null, 'lastModifier': null, 'xSDDH': null, 'status': null, 'kHBH': null, 'kHMC': null, 'sellOrderItem': null }
//   return dto
// }
// export const CreateSellOrderItemDto = () => {
//   let dto = { 'creator': null, 'lastModifier': null, 'sellOrder': null, 'wLBM': null, 'wLMC': null, 'sB': null, 'gGXH': null, 'dJSL': null, 'cD': null, 'kD': null, 'jS': null, 'alloctedSL': null, 'sL': null, 'lD': null, 'zLDJ': null, 'cJBM': null, 'materialId': '00000000-0000-0000-0000-000000000000', 'workShopId': null, 'material': null, 'selllOrder1': null }
//   return dto
// }
// export const CreateUatRunDto = () => {
//   let dto = { 'creator': null, 'lastModifier': null, 'unitLoadAllocationTableType': null, 'unitLoadAllocationTableId': '00000000-0000-0000-0000-000000000000', 'destination': null, 'createdAt': '0001-01-01T00: 00: 00', 'xMessage': null, 'lastCheckedAt': '0001-01-01T00: 00: 00', 'additionalInfo': null, 'priority': 0 }
//   return dto
// }
// export const CreateUserProfileDto = () => {
//   let dto = { 'creator': null, 'lastModifier': null, 'userId': '00000000-0000-0000-0000-000000000000', 'xValue': null, 'xKey': null, 'users': null }
//   return dto
// }
// export const CreateUsersDto = () => {
//   let dto = { 'creator': null, 'lastModifier': null, 'xCode': null, 'userName': null, 'realName': null, 'password': null, 'passwordSalt': null, 'isBuiltIn': false, 'comments': null, 'email': null, 'isProduction': null, 'workShop': null, 'isSystem': null, 'linkPhone': null, 'linkAddress': null, 'str1': null, 'str2': null, 'str3': null, 'str4': null, 'str5': null }
//   return dto
// }
// export const CreateViewFieldSettingDto = () => {
//   let dto = { 'creator': null, 'lastModifier': null, 'viewName': null, 'dataSourceTableName': null, 'dataSourceField': null, 'field': null, 'displayName': null, 'isSelectShow': 0, 'isSelectShowType': 0, 'selectDateShowType': null, 'isShow': 0, 'isSummary': 0, 'isTargetSummary': 0, 'isDate': 0, 'dateShowType': null, 'dataSummaryType': null, 'updatedAt': null, 'createdAt': null, 'reportFormId': '00000000-0000-0000-0000-000000000000', 'orderNo': null, 'summaryType': 0, 'sortNo': null, 'associatedLogin': 0, 'isSum': 0 }
//   return dto
// }
// export const CreateWaitLockDto = () => {
//   let dto = { 'creator': null, 'lastModifier': null, 'xType': null, 'reason': null, 'additionalInfo': null, 'comments': null, 'rackLocationId': null, 'unitLoadId': null, 'containerCode': null, 'location': null }
//   return dto
// }
// export const CreateWCSTaskDto = () => {
//   let dto = { 'creator': null, 'lastModifier': null, 'taskCode': null, 'fromLocationId': '00000000-0000-0000-0000-000000000000', 'toLocationId': '00000000-0000-0000-0000-000000000000', 'direction': null, 'isWcsTask': null, 'isSuspend': false, 'priority': 0, 'wcsRequestId': null, 'wasSentToWcs': false, 'sentToWcsAt': null, 'taskType': null, 'additionalInfo': null, 'comments': null, 'location': null, 'location1': null }
//   return dto
// }
// export const CreateWorkGroupDto = () => {
//   let dto = { 'creator': null, 'lastModifier': null, 'xCode': null, 'xName': null, 'groupModel': null, 'startAt': null, 'endAt': null, 'comments': null, 'str1': null, 'str2': null, 'str3': null, 'str4': null, 'str5': null }
//   return dto
// }
// export const CreateWorkLineBackupDto = () => {
//   let dto = { 'creator': null, 'lastModifier': null, 'workLineId': null, 'xCode': null, 'xName': null, 'linePlainLocation': 0, 'materialId': null, 'materialPropertyId': '00000000-0000-0000-0000-000000000000', 'packageUnit': null, 'fullQuantity': 0.0, 'deadLineDate': null, 'archivedAt': '0001-01-01T00: 00: 00', 'comments': null, 'str1': null, 'str2': null, 'str3': null, 'str4': null, 'str5': null, 'location': null, 'materialProperty': null, 'material': null, 'workLine': null }
//   return dto
// }
// export const CreateWorkLineDto = () => {
//   let dto = { 'xCode': null, 'xName': null, 'linePlainLocationId': null, 'materialId': null, 'materialPropertyId': null, 'packageUnitId': null, 'fullQuantity': 0.0, 'deadLineDate': null, 'isForbidden': 'N', 'forbiddenComments': null, 'forbiddenUserId': null, 'comments': null, 'str1': null, 'str2': null, 'str3': null, 'str4': null, 'str5': null }
//   return dto
// }
// export const CreateWorkLine_WorkGroupDto = () => {
//   let dto = { 'creator': null, 'lastModifier': null, 'workLineId': null, 'workGroupId': null, 'comments': null, 'str1': null, 'str2': null, 'str3': null, 'str4': null, 'str5': null, 'workGroup': null, 'workLine': null }
//   return dto
// }
// export const CreateWorkShopDto = () => {
//   let dto = { 'creator': null, 'lastModifier': null, 'xCode': null, 'xName': null, 'linkUser': null, 'linkPhone': null, 'linkAddress': null, 'email': null, 'comments': null, 'str1': null, 'str2': null, 'str3': null, 'str4': null, 'str5': null }
//   return dto
// }
// export const CreateWUnitsDto = () => {
//   let dto = { 'creator': null, 'lastModifier': null, 'rackId': 0, 'side': 0, 'xLevel': 0, 'n1': 0, 'n2': 0, 'location': null, 'location1': null }
//   return dto
// }
// export const CreateXGruopDto = () => {
//   let dto = { 'creator': null, 'lastModifier': null, 'gName': null, 'showName': null, 'color': null, 'content': null, 'str1': null, 'str2': null, 'str3': null, 'minValue': 0, 'maxValue': 0, 'internalXgroup': null, 'internalXgroup1': null }
//   return dto
// }
// export const CreatexSelectOptionsDto = () => {
//   let dto = { 'creator': null, 'lastModifier': null, 'selectTypeId': '00000000-0000-0000-0000-000000000000', 'xValue': null, 'xText': null, 'comments': null, 'ordering': 0, 'xSelectTypes': null }
//   return dto
// }
// export const CreatexSelectTypesDto = () => {
//   let dto = { 'creator': null, 'lastModifier': null, 'xName': null, 'comments': null, 'xSelectOptions': null }
//   return dto
// }
// export const CreatexSequencesDto = () => {
//   let dto = { 'creator': null, 'lastModifier': null, 'xName': null, 'xValue': 0 }
//   return dto
// }
// export const CreatexSettingsDto = () => {
//   let dto = { 'creator': null, 'lastModifier': null, 'xName': null, 'xType': null, 'xValue': null }
//   return dto
// }
export const CreatePackageUnitsDto = () => {
  let dto = { 
    'whId': '00000000-0000-0000-0000-000000000000', 
    'billTypeId': '00000000-0000-0000-0000-000000000000', 
    'xCode': null, 'xStatus': null, 'operateStatus': null, 
    'receivedBy': null, 
    'tradingCompany': null, 
    'trusteeBy': null, 
    'isOffLine': null, 
    'destination': null, 
    'tipMsg': null, 
    'comments': null, 
    'str1': null, 
    'str2': null, 
    'str3': null, 
    'str4': null, 
    'str5': null
   }
  return dto
}
export const CreateApplyShipOrderItemDto = () => {
  let dto = { 
     'rowNo': null,
     'thirdPartyRowNo': '',
     'shipOrderId': '', 
     'erpCode': '', 
     'xStatus': 1,
     'batchNo': '',
     'batchNo2': '',
     'batchNo3': '',
     'materialId': '', 
     'packageUnitId': '',
     'requiredPkgQuantity': 0.0,
     'requiredUnit': '',  
     'alloactedPkgQuantity': 0.0,  
     'pickedPkgQuantity': 0.0,  
     'comments': '',
     'str1': '', 
     'str2': '', 
     'str3': '', 
     'str4': '', 
     'str5': '', 
     'str6': '', 
     'str7': '', 
     'str8': '', 
     'str9': '',
     'str10': '', 
     'str11': '', 
     'str12': '', 
     'str13': '', 
     'str14': '', 
     'str15': '', 
     'str16': '', 
     'str17': '', 
     'str18': '', 
     'str19': '',
     'str20': '',
     'm_Str1': '', 
     'm_Str2': '', 
     'm_Str3': '', 
     'm_Str4': '', 
     'm_Str5': '', 
     'm_Str6': '', 
     'm_Str7': '', 
     'm_Str8': '', 
     'm_Str9': '', 
     'm_Str10': '', 
     'm_Str11': '', 
     'm_Str12': '', 
     'm_Str13': '', 
     'm_Str14': '', 
     'm_Str15': '', 
     'm_Str16': '', 
     'm_Str17': '', 
     'm_Str18': '', 
     'm_Str19': '', 
     'm_Str20': '', 
     'm_Str21': '', 
     'm_Str22': '', 
     'm_Str23': '', 
     'm_Str24': '', 
     'm_Str25': '', 
     'm_Str26': '', 
     'm_Str27': '', 
     'm_Str28': '', 
     'm_Str29': '', 
     'm_Str30': '', 
     'm_Str31': '', 
     'm_Str32': '', 
     'm_Str33': '', 
     'm_Str34': '', 
     'm_Str35': '', 
     'm_Str36': '', 
     'm_Str37': '', 
     'm_Str38': '', 
     'm_Str39': '', 
     'm_Str40': '' }
  return dto
}
// export const CreatePickedRecordDto = () => {
//   let dto = { 'materialId': '00000000-0000-0000-0000-000000000000', 'materialPropertyId': '00000000-0000-0000-0000-000000000000', 'packageUnitId': '00000000-0000-0000-0000-000000000000', 'warehouseId': '00000000-0000-0000-0000-000000000000', 'inventoryId': '00000000-0000-0000-0000-000000000000', 'shipOrderId': '00000000-0000-0000-0000-000000000000', 'originBillTypeId': '00000000-0000-0000-0000-000000000000', 'pkgQuantity': 0.0, 'pickCode': '', 'pallet': null, 'carton': null, 'backPallet': null, 'shipPallet': null, 'backCarton': null, 'shipCarton': null, 'shipLocation': null, 'isCreateMovedoc': null, 'workerId': '00000000-0000-0000-0000-000000000000', 'workTime': null }
//   return dto
// }
export const CreateShipApplyDto = () => {
  let dto = {   'whId': null, 'billTypeId': null, 'xCode': null, 'xStatus': 1,   'organiztion': null,  'auditStatus': null, 'auditorId': null, 'auditTime': null, 'destination': null,  'comments': null, 'str1': null, 'str2': null, 'str3': null, 'str4': null, 'str5': null, 'shipOrderItem': [] }
  return dto
}
export const CreateShipPickOrderItemDto = () => {
  let dto = { 'shipPickOrderId': null, 'shipOrderItemId': null, 'planPkgQuantity': null, 'allocatedPkgQuantity': null, 'movedPkgQuantity': null, 'fromLocId': null, 'fromLocCode': null, 'toLocId': null, 'toLocCode': null  }
  return dto
}
export const CreateShipPickOrderDto = () => {
  let dto = { 'warehouseId': null, 'shipOrderId': null, 'billTypeId': null, 'status': 1, 'allocatedPkgQuantity': null, 'movedPkgQuantity': null, 'planPkgQuantity': null  }
  return dto
}
export const CreateShipOrderDto = () => {
  let dto = { 'whid': '','xCode': '','xStatus': 1, 'applyShipOrderCode': '','creator': '','lastModifier': '', 'billTypeId': '',  'expectedPkgQuantity': '0', 'alloactedPkgQuantity': '0','pickedPkgQuantity': '0',  'destination': '', 'comments': '', 'str1': '','str2': '', 'str3': '', 'str4': '', 'str5': '', 'shipOrderItem': [] }
  return dto
}
export const CreateShipOrderItemDto = () => {
  let dto = { 'rowNo': null, 'xStatus': null, 'shipOrderId': null, 'erpCode': null, 'materialId': null, 'thirdPartyRowNo': null, 'packageUnitId': null, 'requiredPkgQuantity': null, 'requiredUnit': null, 'alloactedPkgQuantity': null, 'pickedPkgQuantity': null, 'batchNo': null, 'batchNo2': null, 'batchNo3': null,  'comments': null, 'str1': null, 'str2': null, 'str3': null, 'str4': null, 'str5': null, 'str6': null, 'str7': null, 'str8': null, 'str9': null, 'str10': null }
  return dto
}
// export const CreateBillMergeRuleDto = () => {
//   let dto = { 'creator': null, 'xCode': null, 'xName': null, 'xType': null, 'isForbidden': 'N', 'forbiddenComments': null, 'forbiddenUserId': '00000000-0000-0000-0000-000000000000', 'comments': null }
//   return dto
// }
// export const CreateBillMergeRuleItemDto = () => {
//   let dto = { 'ruleId': '00000000-0000-0000-0000-000000000000', 'rowNo': 0, 'tableName': null, 'columnName': null }
//   return dto
// }
// export const CreateWaveDistributeRuleDto = () => {
//   let dto = { 'creator': null, 'xCode': null, 'xName': null, 'ruleContens': null, 'ruleShowContens': null, 'comments': null, 'isEnable': 'Y' }
//   return dto
// }
// export const CreateAutoApplyReceiveDto = () => {
//   let dto = { 'pallet': '-', 'str1': null, 'str2': null, 'str3': null, 'str4': null, 'str5': null, 'str6': null, 'str7': null, 'str8': null, 'str9': null, 'str10': null, 'paramerters': null }
//   return dto
// }
// export const CreateAutoReceiveDto = () => {
//   let dto = { 'receiptOrderId': null, 'receiptOrderItemId': null, 'relatedBill1': null, 'relatedBill2': null, 'relatedBill3': null, 'billTypeCode': null, 'ownerId': null, 'materialCode': null, 'materialId': null, 'expectedPkgQuantity': 0.0, 'packageUnitId': null, 'receivedLocationId': null, 'pallet': '-', 'carton': '-', 'serialNo': '-', 'workerId': null, 'inventoryStatus': 'WaitToQualified', 'isWeipan': 'N', 'productionTime': null, 'receivedTime': null, 'inboundTime': null, 'expiredTime': null, 'aStartTime': null, 'qcStartTime': null, 'preservationDays': null, 'sourceOrderCode': null, 'batchNo': null, 'supplierId': null, 'm_Str1': null, 'm_Str2': null, 'm_Str3': null, 'm_Str4': null, 'm_Str5': null, 'm_Str6': null, 'm_Str7': null, 'm_Str8': null, 'm_Str9': null, 'm_Str10': null, 'm_Str11': null, 'm_Str12': null, 'm_Str13': null, 'm_Str14': null, 'm_Str15': null, 'm_Str16': null, 'm_Str17': null, 'm_Str18': null, 'm_Str19': null, 'm_Str20': null, 'm_Str21': null, 'm_Str22': null, 'm_Str23': null, 'm_Str24': null, 'm_Str25': null, 'm_Str26': null, 'm_Str27': null, 'm_Str28': null, 'm_Str29': null, 'm_Str30': null, 'm_Str31': null, 'm_Str32': null, 'm_Str33': null, 'm_Str34': null, 'm_Str35': null, 'm_Str36': null, 'm_Str37': null, 'm_Str38': null, 'm_Str39': null, 'm_Str40': null, 'paramerters': null }
//   return dto
// }
// export const CreateAutoShipDto = () => {
//   let dto = { 'relatedBill1': null, 'relatedBill2': null, 'relatedBill3': null, 'cutstomerId': null, 'materialCode': null, 'materialId': null, 'expectedPkgQuantity': 0.0, 'packageUnitId': null, 'toDockId': null, 'pallet': '-', 'carton': '-', 'serialNo': '-', 'workerId': null, 'inventoryStatus': 'WaitToQualified', 'productionTime': null, 'receivedTime': null, 'inboundTime': null, 'expiredTime': null, 'aStartTime': null, 'qcStartTime': null, 'preservationDays': null, 'sourceOrderCode': null, 'batchNo': null, 'supplierId': null, 'm_Str1': null, 'm_Str2': null, 'm_Str3': null, 'm_Str4': null, 'm_Str5': null, 'm_Str6': null, 'm_Str7': null, 'm_Str8': null, 'm_Str9': null, 'm_Str10': null, 'm_Str11': null, 'm_Str12': null, 'm_Str13': null, 'm_Str14': null, 'm_Str15': null, 'm_Str16': null, 'm_Str17': null, 'm_Str18': null, 'm_Str19': null, 'm_Str20': null, 'm_Str21': null, 'm_Str22': null, 'm_Str23': null, 'm_Str24': null, 'm_Str25': null, 'm_Str26': null, 'm_Str27': null, 'm_Str28': null, 'm_Str29': null, 'm_Str30': null, 'm_Str31': null, 'm_Str32': null, 'm_Str33': null, 'm_Str34': null, 'm_Str35': null, 'm_Str36': null, 'm_Str37': null, 'm_Str38': null, 'm_Str39': null, 'm_Str40': null }
//   return dto
// }
// export const CreateCountPlanBySkuDto = () => {
//   let dto = { 'materialProperty': null, 'countPlan': null }
//   return dto
// }
// export const CreateCountTaskDto = () => {
//   let dto = { 'taskId': '00000000-0000-0000-0000-000000000000', 'countPkgQuntity': 0.0, 'backPallet': null, 'isCorrectNow': 'N' }
//   return dto
// }
// export const CreateMoveDocByLocation = () => {
//   let dto = { 'originalBillCode': null, 'priority': 0, 'autoAllocate': false, 'moveDocType': 'MV_PICKTICKET_PICKING', 'moveDocDetails': null }
//   return dto
// }
// export const CreateMoveDocDetailWithPropertyDto = () => {
//   let dto = { 'moveDocDetail': null, 'materialProperty': null }
//   return dto
// }
// export const CreateMultiReceiptOrderItemDto = () => {
//   let dto = { 'item': null, 'applyOrderItems': null }
//   return dto
// }
// export const CreateMultiShipOrderItemDto = () => {
//   let dto = { 'shipOrderItem': null, 'applyItems': null }
//   return dto
// }
// export const CreatePickTaskDto = () => {
//   let dto = { 'taskId': '00000000-0000-0000-0000-000000000000', 'movedPkgQty': 0.0, 'toPallet': null, 'toCarton': null, 'newToLocationId': null, 'backPallet': null, 'backCarton': null, 'pickedbackPkgQty': null, 'isPickBack': 'Y' }
//   return dto
// }
// export const CreatePutawayDto = () => {
//   let dto = { 'pallet': null, 'paramerters': null }
//   return dto
// }
// export const CreateReceiptOrderItemWithPropertyDto = () => {
//   let dto = { 'receiptOrderItem': null, 'materialProperty': null }
//   return dto
// }
// export const CreateReceiveDto = () => {
//   let dto = { }
//   return dto
// }
// export const CreateShipOrderItemWithPropertyDto = () => {
//   let dto = { 'shipOrderItem': null, 'materialProperty': null }
//   return dto
// }
// export const CreateInventoryCompareDto = () => {
//   let dto = { 'locationCode': null, 'materialCode': null, 'pallet': null, 'packageQuantity': 0.0 }
//   return dto
// }
// export const CreateMonthStatItemDto = () => {
//   let dto = { 'creator': null, 'lastModifier': null, 'monthStatId': '00000000-0000-0000-0000-000000000000', 'dailyStatId': '00000000-0000-0000-0000-000000000000' }
//   return dto
// }
// export const CreateStatDailyDto = () => {
//   let dto = { 'creator': null, 'lastModifier': null, 'materialId': '00000000-0000-0000-0000-000000000000', 'materialPropertyId': '00000000-0000-0000-0000-000000000000', 'year': 0, 'month': 0, 'day': 0, 'received': 0.0, 'deliveried': 0.0, 'beginningNumber': 0.0, 'endNumber': 0.0, 'statDailyItem': null, 'statMonthItem': null, 'statYearItem': null }
//   return dto
// }
// export const CreateStatDailyItemDto = () => {
//   let dto = { 'creator': null, 'lastModifier': null, 'statDailylId': '00000000-0000-0000-0000-000000000000', 'flowRecordId': '00000000-0000-0000-0000-000000000000', 'flowRecord': null, 'statDaily': null }
//   return dto
// }
// export const CreateStatMonthDto = () => {
//   let dto = { 'creator': null, 'lastModifier': null, 'materialId': '00000000-0000-0000-0000-000000000000', 'materialPropertyId': null, 'year': null, 'month': null, 'recordDate': null, 'received': null, 'deliveried': null, 'beginningNumber': null, 'endNumber': null, 'materialProperty': null, 'material': null, 'statMonthItem': null }
//   return dto
// }
// export const CreateStatMonthItemDto = () => {
//   let dto = { 'creator': null, 'lastModifier': null, 'statMonthId': null, 'statDailyId': null, 'statDaily': null, 'statMonth': null }
//   return dto
// }
// export const CreateStatYearDto = () => {
//   let dto = { 'creator': null, 'lastModifier': null, 'materialId': '00000000-0000-0000-0000-000000000000', 'materialPropertyId': '00000000-0000-0000-0000-000000000000', 'year': 0, 'recordDate': '0001-01-01T00: 00: 00', 'received': 0.0, 'deliveried': 0.0, 'beginningNumber': 0.0, 'endNumber': 0.0, 'materialProperty': null, 'material': null, 'statYearItem': null }
//   return dto
// }
// export const CreateStatYearItemDto = () => {
//   let dto = { 'creator': null, 'lastModifier': null, 'statYearId': null, 'statDailyId': null, 'statDaily': null, 'statYear': null }
//   return dto
// }
// export const CreateBasicStrategyDto = () => {
//   let dto = { 'xName': null, 'xType': null, 'storeProcedure': null, 'orderField': null, 'description': null }
//   return dto
// }
// export const CreateTask_UnitLoadDto = () => {
//   let dto = { 'creator': null, 'lastModifier': null, 'taskId': '00000000-0000-0000-0000-000000000000', 'listIndex': 0, 'unitLoadId': '00000000-0000-0000-0000-000000000000' }
//   return dto
// }
// export const CreateVehicleDto = () => {
//   let dto = { 'xType': null, 'xCode': null, 'xName': null, 'xStatus': 'ENABLED', 'plateNumber': null, 'length': null, 'width': null, 'height': null, 'weight': null, 'volume': null, 'str1': null, 'str2': null, 'str3': null, 'str4': null, 'str5': null, 'str6': null, 'str7': null, 'str8': null, 'str9': null, 'str10': null }
//   return dto
// }
// export const CreateUploadFilesDto = () => {
//   let dto = { 'xCode': null, 'xName': null, 'fileExt': null, 'filePath': null, 'sourceType': null, 'sourceId': null, 'baseCode': null, 'str0': null, 'str1': null, 'str2': null, 'str3': null, 'str4': null, 'str5': null, 'str6': null, 'str7': null, 'str8': null, 'str9': null }
//   return dto
// }
