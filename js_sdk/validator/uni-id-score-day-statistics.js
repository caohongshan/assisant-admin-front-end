
// 表单校验规则由 schema2code 生成，不建议直接修改校验规则，而建议通过 schema2code 生成, 详情: https://uniapp.dcloud.net.cn/uniCloud/schema



const validator = {
  "day": {
    "rules": [
      {
        "format": "timestamp"
      }
    ],
    "label": "日期时间戳"
  },
  "money": {
    "rules": [
      {
        "format": "int"
      }
    ],
    "label": "分红金额，单位分"
  },
  "value": {
    "rules": [
      {
        "format": "double"
      }
    ],
    "label": "值"
  },
  "status": {
    "rules": [
      {
        "format": "int"
      },
      {
        "range": [
          {
            "text": "禁用",
            "value": 0
          },
          {
            "text": "启用",
            "value": 1
          }
        ]
      }
    ],
    "defaultValue": 0,
    "label": "用户状态"
  }
}

const enumConverter = {
  "status_valuetotext": {
    "0": "禁用",
    "1": "启用"
  }
}

export { validator, enumConverter }
