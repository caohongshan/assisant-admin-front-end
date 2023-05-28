
// 表单校验规则由 schema2code 生成，不建议直接修改校验规则，而建议通过 schema2code 生成, 详情: https://uniapp.dcloud.net.cn/uniCloud/schema



const validator = {
  "create_time": {
    "rules": [
      {
        "format": "timestamp"
      }
    ]
  },
  "operater_log": {
    "rules": [
      {
        "format": "array"
      }
    ],
    "label": "后台操作日志，0最新操作"
  },
  "address": {
    "rules": [
      {
        "format": "object"
      }
    ],
    "label": "用户收货地址"
  },
  "body": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "内容"
  },
  "cancel_apply": {
    "rules": [
      {
        "format": "array"
      }
    ],
    "label": "取消订单请求列表"
  },
  "cancel_style": {
    "rules": [
      {
        "format": "string"
      },
      {
        "range": [
          {
            "text": "自动",
            "value": "auto"
          },
          {
            "text": "用户",
            "value": "user"
          },
          {
            "text": "商家",
            "value": "shop"
          }
        ]
      }
    ],
    "label": "取消类型"
  },
  "cart_count": {
    "rules": [
      {
        "format": "int"
      }
    ],
    "label": "购物车数量"
  },
  "delivery_hour": {
    "rules": [
      {
        "format": "object"
      }
    ],
    "label": "配送时间"
  },
  "delivery_type": {
    "rules": [
      {
        "format": "string"
      },
      {
        "range": [
          {
            "text": "配送到家",
            "value": "get_home"
          },
          {
            "text": "快递",
            "value": "express"
          },
          {
            "text": "到店/自提点自提",
            "value": "self_extraction"
          }
        ]
      }
    ],
    "label": "配送方式"
  },
  "freight": {
    "rules": [
      {
        "format": "double"
      }
    ],
    "label": "运费"
  },
  "goods": {
    "rules": [
      {
        "format": "array"
      }
    ],
    "label": "商品"
  },
  "is_delete": {
    "rules": [
      {
        "format": "int"
      },
      {
        "range": [
          {
            "text": "否",
            "value": 0
          },
          {
            "text": "是",
            "value": 1
          }
        ]
      }
    ],
    "defaultValue": 0,
    "label": "是否删除"
  },
  "juli": {
    "rules": [
      {
        "format": "int"
      }
    ],
    "label": "距离，米"
  },
  "last_pay_time": {
    "rules": [
      {
        "format": "timestamp"
      }
    ],
    "label": "最后支付时间"
  },
  "platform": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "操作平台"
  },
  "remarks": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "备注"
  },
  "state": {
    "rules": [
      {
        "format": "int"
      }
    ],
    "label": "订单状态"
  },
  "discount": {
    "rules": [
      {
        "format": "int"
      }
    ],
    "label": "优惠金额"
  },
  "total_fee": {
    "rules": [
      {
        "format": "int"
      }
    ],
    "label": "订单总金额"
  },
  "invoice": {
    "rules": [
      {
        "format": "string"
      }
    ]
  },
  "score": {
    "rules": [
      {
        "format": "int"
      }
    ],
    "label": "使用积分"
  },
  "user_id": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "用户"
  }
}

const enumConverter = {
  "cancel_style_valuetotext": {
    "auto": "自动",
    "user": "用户",
    "shop": "商家"
  },
  "delivery_type_valuetotext": {
    "get_home": "配送到家",
    "express": "快递",
    "self_extraction": "到店/自提点自提"
  },
  "is_delete_valuetotext": {
    "0": "否",
    "1": "是"
  }
}

export { validator, enumConverter }
