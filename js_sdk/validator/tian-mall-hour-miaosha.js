// 表单校验规则由 schema2code 生成，不建议直接修改校验规则，而建议通过 schema2code 生成, 详情: https://uniapp.dcloud.net.cn/uniCloud/schema


const validator = {
	"name": {
		"rules": [{
			"format": "string"
		}],
		"label": "名称"
	},
	"description": {
		"rules": [{
			"format": "string"
		}],
		"label": "描述"
	},
	"hour": {
		"rules": [{
			"format": "string"
		}],
		"label": "小时"
	},
	"posid": {
		"rules": [{
			"format": "int"
		}],
		"defaultValue": 0,
		"label": "排序，正序"
	},
	"state": {
		"rules": [{
				"format": "int"
			},
			{
				"range": [{
						"text": "已停用",
						"value": 0
					},
					{
						"text": "已发布",
						"value": 1
					}
				]
			}
		],
		"defaultValue": 0,
		"label": "状态"
	},
	"begin_time": {
		"rules": [{
			"format": "timestamp"
		}],
		"label": "开始时间戳"
	},
	"end_time": {
		"rules": [{
			"format": "timestamp"
		}],
		"label": "结束时间戳"
	}
}

const enumConverter = {
	"state_valuetotext": {
		"0": "已停用",
		"1": "已发布"
	}
}

function filterToWhere(filter, command) {
	let where = {}
	for (let field in filter) {
		let {
			type,
			value
		} = filter[field]
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

export {
	validator,
	enumConverter,
	filterToWhere
}
