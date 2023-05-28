// 表单校验规则由 schema2code 生成，不建议直接修改校验规则，而建议通过 schema2code 生成, 详情: https://uniapp.dcloud.net.cn/uniCloud/schema



const validator = {
	"goods_id": {
		"rules": [{
				"required": true
			},
			{
				"format": "string"
			}
		]
	},
	"sku_name": {
		"rules": [{
				"required": true
			},
			{
				"format": "string"
			}
		]
	},
	"price": {
		"rules": [{
				"required": true
			},
			{
				"format": "int"
			}
		]
	},
	"market_price": {
		"rules": [{
			"format": "int"
		}]
	},
	"goods_thumb": {
		"rules": [{
				"format": "string"
			},
			{
				"pattern": "^(http://|https://|/|./|@/)\\S"
			}
		],
		"label": "缩略图地址"
	},
	"stock": {
		"rules": [{
				"required": true
			},
			{
				"format": "int"
			}
		]
	},
	"create_date": {
		"rules": [{
				"required": true
			},
			{
				"format": "timestamp"
			}
		]
	},
	"update_date": {
		"rules": [{
				"required": true
			},
			{
				"format": "timestamp"
			}
		]
	}
}

const enumConverter = {}

export {
	validator,
	enumConverter
}
