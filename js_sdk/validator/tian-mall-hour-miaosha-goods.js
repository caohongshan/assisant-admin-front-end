// 表单校验规则由 schema2code 生成，不建议直接修改校验规则，而建议通过 schema2code 生成, 详情: https://uniapp.dcloud.net.cn/uniCloud/schema


const validator = {
  "miaosha_id": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "秒杀场次"
  },
  "goods_id": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "商品"
  },
  "sku_id": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "商品规格"
  },
  "posid": {
    "rules": [
      {
        "format": "int"
      }
    ],
    "defaultValue": 0,
    "label": "排序，正序"
  },
  "discount": {
    "rules": [
      {
        "format": "int"
      },
      {
        "minimum": 1,
        "maximum": 99
      }
    ],
    "defaultValue": 80,
    "label": "折扣"
  },
  "is_limit": {
    "rules": [
      {
        "format": "bool"
      }
    ],
    "defaultValue": false,
    "label": "是否限购"
  },
  "limit_stock": {
    "rules": [
      {
        "format": "int"
      }
    ],
    "defaultValue": 0,
    "label": "总库存"
  },
  "limit_order_count": {
    "rules": [
      {
        "format": "int"
      }
    ],
    "defaultValue": 0,
    "label": "订单限购数量"
  },
  "limit_user_count": {
    "rules": [
      {
        "format": "int"
      }
    ],
    "defaultValue": 0,
    "label": "用户限购数量"
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
            "text": "已发布",
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
  "miaosha": {
    "rules": [
      {
        "format": "object"
      }
    ],
    "label": "秒杀信息"
  },
  "sku": {
    "rules": [
      {
        "format": "object"
      }
    ],
    "label": "商品规格"
  },
  "goods": {
    "rules": [
      {
        "format": "object"
      }
    ],
    "label": "商品信息"
  }
}

const enumConverter = {
  "state_valuetotext": {
    "0": "审核中",
    "1": "已发布",
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
