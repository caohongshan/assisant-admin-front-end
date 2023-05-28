// 表单校验规则由 schema2code 生成，不建议直接修改校验规则，而建议通过 schema2code 生成, 详情: https://uniapp.dcloud.net.cn/uniCloud/schema



const validator = {
	"key": {
		"rules": [{
			"format": "string"
		}],
		"label": "关键字"
	},
	"name": {
		"rules": [{
			"format": "string"
		}],
		"label": "名称"
	},
	"value": {
		"rules": [{
			"format": "int"
		}],
		"label": "值"
	},
	"data": {
		"rules": [{
			"format": "string"
		}],
		"label": "内容"
	},
	"dcloud_appid": {
		"rules": [{
			"format": "array"
		}],
		"label": "客户端"
	},
	"options": {
		"rules": [{
			"format": "string"
		}],
		"label": "选项"
	},
	"is_key_value": {
		"rules": [{
			"format": "bool"
		}],
		"label": "键值对"
	},
	"create_date": {
		"rules": [{
			"format": "timestamp"
		}]
	},
	"update_date": {
		"rules": [{
			"format": "timestamp"
		}]
	}
}

const enumConverter = {}

export {
	validator,
	enumConverter
}
