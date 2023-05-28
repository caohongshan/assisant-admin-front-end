
// 表单校验规则由 schema2code 生成，不建议直接修改校验规则，而建议通过 schema2code 生成, 详情: https://uniapp.dcloud.net.cn/uniCloud/schema



const validator = {
  "total_fee": {
    "rules": [
      {
        "format": "int"
      }
    ],
    "label": "付款金额"
  },
  "rebate": {
    "rules": [
      {
        "format": "int"
      }
    ],
    "label": "返利金额"
  },
  "user_id": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "用户"
  },
  "shop_id": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "店铺"
  },
  "src": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "logo"
  },
  "title": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "标题"
  },
  "body": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "内容"
  },
  "outTradeNo": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "支付订单号"
  },
  "shop": {
    "rules": [
      {
        "format": "object"
      }
    ],
    "label": "商户信息"
  },
  "payment": {
    "rules": [
      {
        "format": "object"
      }
    ],
    "label": "商户支付配置"
  },
  "payInfo": {
    "rules": [
      {
        "format": "object"
      }
    ],
    "label": "支付信息"
  },
  "state": {
    "rules": [
      {
        "format": "int"
      },
      {
        "range": [
          {
            "text": "未付款",
            "value": 0
          },
          {
            "text": "已付款",
            "value": 1
          }
        ]
      }
    ],
    "defaultValue": 0,
    "label": "状态"
  },
  "id": {
    "rules": [
      {
        "format": "int"
      }
    ],
    "label": "订单id"
  },
  "create_time": {
    "rules": [
      {
        "format": "timestamp"
      }
    ]
  },
  "update_time": {
    "rules": [
      {
        "format": "timestamp"
      }
    ]
  }
}

const enumConverter = {
  "state_valuetotext": {
    "0": "未付款",
    "1": "已付款"
  }
}

export { validator, enumConverter }
