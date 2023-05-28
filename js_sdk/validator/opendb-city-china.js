
// 表单校验规则由 schema2code 生成，不建议直接修改校验规则，而建议通过 schema2code 生成, 详情: https://uniapp.dcloud.net.cn/uniCloud/schema



const validator = {
  "code": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      }
    ],
    "label": "编码"
  },
  "parent_code": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "父级编码"
  },
  "name": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      }
    ],
    "label": "城市"
  },
  "type": {
    "rules": [
      {
        "format": "int"
      },
      {
        "range": [
          {
            "text": "省",
            "value": 0
          },
          {
            "text": "市",
            "value": 1
          },
          {
            "text": "区",
            "value": 2
          }
        ]
      }
    ],
    "defaultValue": 0,
    "label": "城市类型"
  },
  "first_letter": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "首字母"
  },
  "is_recommend": {
    "rules": [
      {
        "format": "bool"
      }
    ],
    "label": "是否推荐"
  },
  "pinyin": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "拼音"
  },
  "zip_code": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "邮编"
  }
}

const enumConverter = {
  "type_valuetotext": {
    "0": "省",
    "1": "市",
    "2": "区"
  }
}

export { validator, enumConverter }
