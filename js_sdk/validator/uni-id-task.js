// 表单校验规则由 schema2code 生成，不建议直接修改校验规则，而建议通过 schema2code 生成, 详情: https://uniapp.dcloud.net.cn/uniCloud/schema



const validator = {
	"name": {
		"rules": [{
				"required": true
			},
			{
				"format": "string"
			}
		],
		"label": "任务名称"
	},
	"comment": {
		"rules": [{
			"format": "string"
		}],
		"label": "任务描述"
	},
	"bounty": {
		"rules": [{
			"format": "int"
		}],
		"label": "奖励积分"
	},
	"per_amount": {
		"rules": [{
			"format": "int"
		}],
		"defaultValue": 1,
		"label": "操作次数"
	},
	"multiple": {
		"rules": [{
			"format": "int"
		}],
		"defaultValue": 0,
		"label": "加倍倍数"
	},
	"middle_getout": {
		"rules": [{
			"format": "bool"
		}]
	},
	"icon": {
		"rules": [{
			"format": "string"
		}]
	},
	"open_url": {
		"rules": [{
			"format": "string"
		}],
		"label": "点击目标地址"
	},
	"sort": {
		"rules": [{
			"format": "int"
		}],
		"label": "序号"
	},
	"enable": {
		"rules": [{
			"format": "bool"
		}],
		"label": "是否启用"
	},
	"max_per_hour": {
		"rules": [{
			"format": "int"
		}]
	},
	"max_per_day": {
		"rules": [{
			"format": "int"
		}]
	},
	"max_per_week": {
		"rules": [{
			"format": "int"
		}]
	},
	"create_date": {
		"rules": [{
			"format": "timestamp"
		}],
		"defaultValue": {
			"$env": "now"
		}
	}
}

const enumConverter = {}

export {
	validator,
	enumConverter
}
