
// 表单校验规则由 schema2code 生成，不建议直接修改校验规则，而建议通过 schema2code 生成, 详情: https://uniapp.dcloud.net.cn/uniCloud/schema



const validator = {
  "address": {
    "rules": [
      {
        "format": "object"
      }
    ],
    "label": "地址"
  },
  "banner": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "banner"
  },
  "deliveryTypes": {
    "rules": [
      {
        "format": "array"
      },
      {
        "range": [
          {
            "text": "配送到家",
            "value": "deliveryHome"
          },
          {
            "text": "快递",
            "value": "express"
          },
          {
            "text": "到店/自提点自提",
            "value": "selfRaising"
          }
        ]
      }
    ],
    "defaultValue": "deliveryHome",
    "label": "配送方式"
  },
  "isPrint": {
    "rules": [
      {
        "format": "bool"
      }
    ],
    "label": "是否开启打印"
  },
  "month_sell": {
    "rules": [
      {
        "format": "int"
      }
    ],
    "label": "月售"
  },
  "name": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "店铺名称"
  },
  "online": {
    "rules": [
      {
        "format": "bool"
      }
    ],
    "label": "是否营业"
  },
  "phone": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "联系电话"
  },
  "score": {
    "rules": [
      {
        "format": "double"
      }
    ],
    "label": "评分"
  },
  "serviceTime": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "服务时间"
  },
  "src": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "店铺logo"
  },
  "state": {
    "rules": [
      {
        "format": "bool"
      }
    ],
    "label": "是否启用"
  }
}

const enumConverter = {
  "deliveryTypes_valuetotext": [
    {
      "text": "配送到家",
      "value": "deliveryHome"
    },
    {
      "text": "快递",
      "value": "express"
    },
    {
      "text": "到店/自提点自提",
      "value": "selfRaising"
    }
  ]
}

export { validator, enumConverter }
