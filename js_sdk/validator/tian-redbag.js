// 表单校验规则由 schema2code 生成，不建议直接修改校验规则，而建议通过 schema2code 生成, 详情: https://uniapp.dcloud.net.cn/uniCloud/schema


const validator = {
	"title": {
		"rules": [{
			"format": "string"
		}],
		"defaultValue": "送您一个红包",
		"label": "标题"
	},
	"blessing": {
		"rules": [{
			"format": "string"
		}],
		"defaultValue": "恭喜发财",
		"label": "祝福语"
	},
	"open": {
		"rules": [{
			"format": "string"
		}],
		"defaultValue": "開",
		"label": "打开词"
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
	"position": {
		"rules": [{
				"format": "string"
			},
			{
				"range": [{
						"text": "左上",
						"value": "leftTop"
					},
					{
						"text": "左下",
						"value": "leftDown"
					},
					{
						"text": "右上",
						"value": "rightTop"
					},
					{
						"text": "右下",
						"value": "rightDown"
					}
				]
			}
		],
		"defaultValue": "leftTop",
		"label": "展示位置"
	},
	"auto_show": {
		"rules": [{
			"format": "bool"
		}],
		"defaultValue": true,
		"label": "自动展示"
	},
	"status": {
		"rules": [{
			"format": "bool"
		}],
		"defaultValue": true,
		"label": "生效状态"
	},
	"background": {
		"rules": [{
			"format": "file"
		}],
		"label": "红包背景"
	},
	"avatar": {
		"rules": [{
			"format": "file"
		}],
		"label": "默认头像"
	},
	"dcloud_appid": {
		"rules": [{
			"format": "string"
		}],
		"label": "应用id"
	},
	"platforms": {
		"rules": [{
			"format": "array"
		}, ],
		"defaultValue": "",
		"label": "平台"
	},
	"housing_appid": {
		"rules": [{
			"format": "string"
		}],
		"label": "小区id"
	},
	"stock": {
		"rules": [{
			"format": "int"
		}],
		"defaultValue": 100,
		"label": "限定数量"
	},
	"get_count": {
		"rules": [{
			"format": "int"
		}],
		"defaultValue": 0,
		"label": "已领取"
	},
	"get_limit": {
		"rules": [{
			"format": "int"
		}],
		"defaultValue": 1,
		"label": "领取限制"
	},
	"moneys": {
		"rules": [{
			"format": "string"
		}],
		"label": "领取金额"
	}
}

const enumConverter = {
	"type_valuetotext": {
		"newpeople": "新人注册",
		"addcircle": "小区圈发帖"
	},
	"payment_valuetotext": {
		"balance": "余额",
		"wxpay": "微信",
		"alipay": "支付宝"
	},
	"position_valuetotext": {
		"leftTop": "左上",
		"leftDown": "左下",
		"rightTop": "右上",
		"rightDown": "右下"
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
