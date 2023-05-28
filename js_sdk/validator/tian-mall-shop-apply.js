// 表单校验规则由 schema2code 生成，不建议直接修改校验规则，而建议通过 schema2code 生成, 详情: https://uniapp.dcloud.net.cn/uniCloud/schema


const validator = {
  "id": {
    "rules": [
      {
        "format": "int"
      }
    ],
    "label": "编号"
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
    "label": "店铺名称"
  },
  "phone": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      }
    ],
    "label": "联系电话"
  },
  "src": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      }
    ],
    "label": "店铺logo"
  },
  "business_license": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      }
    ],
    "label": "营业执照"
  },
  "food_license": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "食品经营许可"
  },
  "legal_person_license": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      }
    ],
    "label": "法人身份证正面"
  },
  "legal_person_license_back": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      }
    ],
    "label": "法人身份证反面"
  },
  "apply_result": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "审核结果"
  },
  "state": {
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
          }
        ]
      }
    ],
    "defaultValue": 0,
    "label": "状态"
  },
  "modified": {
    "rules": [
      {
        "format": "timestamp"
      }
    ],
    "defaultValue": {
      "$env": "now"
    }
  },
  "address": {
    "rules": [
      {
        "format": "object"
      }
    ],
    "label": "地址"
  },
  "uid": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "创建者"
  }
}

const enumConverter = {
  "state_valuetotext": {
    "0": "审核中",
    "1": "通过",
    "2": "拒绝"
  }
}

function filterToWhere(filter, command) {
  let where = {}
  for (let field in filter) {
    let { type, value } = filter[field]
    switch (type) {
      case "search":
        if (typeof value === 'string' && value.length) {
          where[field] = new RegExp(value)
        }
        break;
      case "select":
        if (value.length) {
          let selectValue = []
          for (let s of value) {
            selectValue.push(command.eq(s))
          }
          where[field] = command.or(selectValue)
        }
        break;
      case "range":
        if (value.length) {
          let gt = value[0]
          let lt = value[1]
          where[field] = command.and([command.gte(gt), command.lte(lt)])
        }
        break;
      case "date":
        if (value.length) {
          let [s, e] = value
          let startDate = new Date(s)
          let endDate = new Date(e)
          where[field] = command.and([command.gte(startDate), command.lte(endDate)])
        }
        break;
      case "timestamp":
        if (value.length) {
          let [startDate, endDate] = value
          where[field] = command.and([command.gte(startDate), command.lte(endDate)])
        }
        break;
    }
  }
  return where
}

export { validator, enumConverter, filterToWhere }
