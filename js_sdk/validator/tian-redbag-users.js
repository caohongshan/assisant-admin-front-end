// 表单校验规则由 schema2code 生成，不建议直接修改校验规则，而建议通过 schema2code 生成, 详情: https://uniapp.dcloud.net.cn/uniCloud/schema


const validator = {
	"dcloud_appid": {
		"rules": [{
			"format": "string"
		}],
		"label": "应用id"
	},
	"user_id": {
		"rules": [{
			"format": "string"
		}],
		"label": "用户"
	},
	"redbag_id": {
		"rules": [{
			"format": "string"
		}],
		"label": "红包id"
	},
	"payment": {
		"rules": [{
				"format": "string"
			},
			{
				"range": [{
						"text": "余额",
						"value": "balance"
					},
					{
						"text": "微信",
						"value": "wxpay"
					},
					{
						"text": "支付宝",
						"value": "alipay"
					}
				]
			}
		],
		"defaultValue": "balance",
		"label": "支付方式"
	},
	"money": {
		"rules": [{
			"format": "int"
		}],
		"label": "金额"
	},
	"type": {
		"rules": [{
				"format": "string"
			},
			{
				"range": [{
						"text": "新人注册",
						"value": "newpeople"
					},
					{
						"text": "小区圈发帖",
						"value": "addcircle"
					}
				]
			}
		],
		"defaultValue": "newpeople",
		"label": "类型"
	},
	"type_text": {
		"rules": [{
			"format": "string"
		}],
		"label": "类型"
	},
	"update_date": {
		"rules": [{
			"format": "timestamp"
		}]
	},
	"create_date": {
		"rules": [{
			"format": "timestamp"
		}]
	}
}

const enumConverter = {
	"payment_valuetotext": {
		"balance": "余额",
		"wxpay": "微信",
		"alipay": "支付宝"
	},
	"type_valuetotext": {
		"newpeople": "新人注册",
		"addcircle": "小区圈发帖"
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
