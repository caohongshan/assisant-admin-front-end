// 表单校验规则由 schema2code 生成，不建议直接修改校验规则，而建议通过 schema2code 生成, 详情: https://uniapp.dcloud.net.cn/uniCloud/schema



const validator = {
	"component_id": {
		"rules": [{
			"format": "string"
		}],
		"label": "组件ID"
	},
	"title": {
		"rules": [{
			"format": "string"
		}],
		"label": "组件名称"
	},
	"thumb": {
		"rules": [{
				"format": "string"
			},
			{
				"pattern": "^(http://|https://|/|./|@/)\\S"
			}
		],
		"label": "缩略图地址"
	},
	"attributes": {
		"rules": [{
			"format": "object"
		}],
		"label": "属性配置"
	},
	"state": {
		"rules": [{
				"format": "int"
			},
			{
				"range": [{
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
		"label": "是否显示"
	},
	"is_page": {
		"rules": [{
			"format": "bool"
		}],
		"defaultValue": false,
		"label": "是否页面"
	},
	"shop_decoration": {
		"rules": [{
			"format": "bool"
		}],
		"defaultValue": false,
		"label": "店铺装修"
	},
	"posid": {
		"rules": [{
			"format": "int"
		}],
		"defaultValue": 0,
		"label": "排序，正序"
	}
}

const enumConverter = {
	"state_valuetotext": {
		"0": "否",
		"1": "是"
	}
}

export {
	validator,
	enumConverter
}
