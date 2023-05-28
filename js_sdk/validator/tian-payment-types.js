// 表单校验规则由 schema2code 生成，不建议直接修改校验规则，而建议通过 schema2code 生成, 详情: https://uniapp.dcloud.net.cn/uniCloud/schema


const validator = {
	"payment_id": {
		"rules": [{
			"format": "string"
		}],
		"label": "支付ID"
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
	"thumb_size": {
		"rules": [{
			"format": "string"
		}],
		"label": "缩略图尺寸"
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
	"posid": {
		"rules": [{
			"format": "int"
		}],
		"defaultValue": 0,
		"label": "排序，正序"
	},
	"attributes": {
		"rules": [{
			"format": "string"
		}],
		"label": "属性配置"
	},
	"applyment": {
		"rules": [{
			"format": "string"
		}],
		"label": "属性配置"
	}
}

const enumConverter = {
	"state_valuetotext": {
		"0": "否",
		"1": "是"
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
