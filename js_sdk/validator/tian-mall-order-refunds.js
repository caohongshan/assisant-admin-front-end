// 表单校验规则由 schema2code 生成，不建议直接修改校验规则，而建议通过 schema2code 生成, 详情: https://uniapp.dcloud.net.cn/uniCloud/schema


const validator = {
	"create_time": {
		"rules": [{
			"format": "timestamp"
		}]
	},
	"update_time": {
		"rules": [{
			"format": "timestamp"
		}]
	},
	"operater_log": {
		"rules": [{
			"format": "array"
		}],
		"label": "后台操作日志，0最新操作"
	},
	"id": {
		"rules": [{
			"format": "int"
		}],
		"label": "编号"
	},
	"order_id": {
		"rules": [{
			"format": "string"
		}],
		"label": "订单编号"
	},
	"type": {
		"rules": [{
			"format": "string"
		}],
		"label": "售后类型"
	},
	"reason": {
		"rules": [{
			"format": "string"
		}],
		"label": "原因"
	},
	"goods_status": {
		"rules": [{
			"format": "string"
		}],
		"label": "商品状态"
	},
	"shop_id": {
		"rules": [{
			"format": "string"
		}],
		"label": "店铺id"
	},
	"describe": {
		"rules": [{
			"format": "string"
		}],
		"label": "描述"
	},
	"imgs": {
		"rules": [{
			"format": "array"
		}],
		"label": "图片描述"
	},
	"money": {
		"rules": [{
			"format": "int"
		}],
		"label": "退款金额，单位分"
	},
	"platform": {
		"rules": [{
			"format": "string"
		}],
		"label": "操作平台"
	},
	"state": {
		"rules": [{
			"format": "int"
		}],
		"label": "退款状态"
	},
	"user_id": {
		"rules": [{
			"format": "string"
		}],
		"label": "用户"
	},
	"goods": {
		"rules": [{
			"format": "object"
		}],
		"label": "商品"
	},
	"shop": {
		"rules": [{
			"format": "object"
		}],
		"label": "店铺信息"
	},
	"result": {
		"rules": [{
			"format": "object"
		}],
		"label": "退款结果"
	}
}

const enumConverter = {
	typeEnum: {
		"refund&return": "退货退款",
		"refund": "仅退货",
		"repair": "维修",
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
