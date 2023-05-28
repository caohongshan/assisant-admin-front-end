
// 表单校验规则由 schema2code 生成，不建议直接修改校验规则，而建议通过 schema2code 生成, 详情: https://uniapp.dcloud.net.cn/uniCloud/schema



const validator = {
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
  },
  "user_id": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      }
    ],
    "label": "用户"
  },
  "user": {
    "rules": [
      {
        "format": "object"
      }
    ],
    "label": "用户"
  },
  "amount": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "int"
      }
    ],
    "label": "金额"
  },
  "balance": {
    "rules": [
      {
        "format": "int"
      }
    ],
    "label": "余额"
  },
  "status": {
    "rules": [
      {
        "format": "int"
      },
      {
        "range": [
          {
            "text": "审核中",
            "value": 0
          },
          {
            "text": "通过",
            "value": 1
          },
          {
            "text": "拒绝",
            "value": 2
          },
          {
            "text": "通过不付款",
            "value": 3
          }
        ]
      }
    ],
    "defaultValue": 0,
    "label": "状态"
  },
  "mode": {
    "rules": [
      {
        "format": "string"
      },
      {
        "range": [
          {
            "text": "微信",
            "value": "wxpay"
          },
          {
            "text": "支付宝",
            "value": "alipay"
          },
          {
            "text": "银行卡",
            "value": "bank"
          }
        ]
      }
    ],
    "defaultValue": "wxpay",
    "label": "提现方式"
  }
}

const enumConverter = {
  "status_valuetotext": {
    "0": "审核中",
    "1": "通过",
    "2": "拒绝",
    "3": "通过不付款"
  },
  "mode_valuetotext": {
    "wxpay": "微信",
    "alipay": "支付宝",
    "bank": "银行卡"
  }
}

export { validator, enumConverter }
