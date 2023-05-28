// 表单校验规则由 schema2code 生成，不建议直接修改校验规则，而建议通过 schema2code 生成, 详情: https://uniapp.dcloud.net.cn/uniCloud/schema



const validator = {
	"user_id": {
		"rules": [{
				"required": true
			},
			{
				"format": "string"
			}
		]
	},
	"task_id": {
		"rules": [{
				"required": true
			},
			{
				"format": "string"
			}
		]
	},
	"result": {
		"rules": [{
			"format": "bool"
		}]
	},
	"bounty": {
		"rules": [{
			"format": "int"
		}]
	},
	"amount": {
		"rules": [{
			"format": "int"
		}],
		"label": "已完成次数"
	},
	"hour_times": {
		"rules": [{
			"format": "object"
		}]
	}
}

const enumConverter = {}

export {
	validator,
	enumConverter
}
