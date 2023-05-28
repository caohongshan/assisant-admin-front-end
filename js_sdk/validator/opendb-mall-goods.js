// 表单校验规则由 schema2code 生成，不建议直接修改校验规则，而建议通过 schema2code 生成, 详情: https://uniapp.dcloud.net.cn/uniCloud/schema



const validator = {
	"category_id": {
		"rules": [{
			"format": "array"
		}]
	},
	"goods_sn": {
		"rules": [{
			"format": "string"
		}],
		"label": "货号"
	},
	"name": {
		"rules": [{
				"required": true
			},
			{
				"format": "string"
			}
		],
		"label": "名称"
	},
	"price": {
		"rules": [{
			"format": "double"
		}]
	},
	"market_price": {
		"rules": [{
			"format": "double"
		}]
	},
	"keywords": {
		"rules": [{
			"format": "string"
		}],
		"label": "关键字"
	},
	"goods_desc": {
		"rules": [{
			"format": "array"
		}],
		"label": "详细描述"
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
	"goods_banner_imgs": {
		"rules": [{
			"format": "array"
		}]
	},
	"remain_count": {
		"rules": [{
				"required": true
			},
			{
				"format": "int"
			}
		],
		"label": "库存数量"
	},
	"month_sell_count": {
		"rules": [{
				"required": true
			},
			{
				"format": "int"
			}
		]
	},
	"total_sell_count": {
		"rules": [{
				"required": true
			},
			{
				"format": "int"
			}
		]
	},
	"group_buying": {
		"rules": [{
			"format": "int"
		}],
		"label": "拼团"
	},
	"group_buying_discount": {
		"rules": [{
			"format": "int"
		}],
		"label": "拼团优惠"
	},
	"comment_count": {
		"rules": [{
				"required": true
			},
			{
				"format": "int"
			}
		]
	},
	"is_real": {
		"rules": [{
				"required": true
			},
			{
				"format": "bool"
			}
		],
		"label": "是否为实物"
	},
	"is_on_sale": {
		"rules": [{
				"required": true
			},
			{
				"format": "bool"
			}
		],
		"label": "是否上架"
	},
	"is_alone_sale": {
		"rules": [{
			"format": "bool"
		}]
	},
	"is_best": {
		"rules": [{
			"format": "bool"
		}]
	},
	"is_new": {
		"rules": [{
			"format": "bool"
		}],
		"label": "是否新品"
	},
	"is_hot": {
		"rules": [{
			"format": "bool"
		}]
	},
	"is_vip": {
		"rules": [{
			"format": "bool"
		}]
	},
	"add_date": {
		"rules": [{
			"format": "timestamp"
		}],
		"defaultValue": {
			"$env": "now"
		}
	},
	"last_modify_date": {
		"rules": [{
			"format": "timestamp"
		}],
		"defaultValue": {
			"$env": "now"
		}
	},
	"sku_name": {
		"rules": [{
			"format": "array"
		}]
	},
	"seller_note": {
		"rules": [{
			"format": "string"
		}]
	},
	"use_score_rate": {
		"rules": [{
			"format": "double"
		}],
		"label": "使用积分比例"
	},
	"use_score": {
		"rules": [{
			"format": "int"
		}],
		"label": "使用固定积分"
	},
	"rebate_score_rate": {
		"rules": [{
			"format": "string"
		}],
		"label": "积分返佣"
	},
	"rebate_money_rate": {
		"rules": [{
			"format": "string"
		}],
		"label": "现金返佣"
	}
}

const enumConverter = {
	sku_titles: [
		'尺寸',
		'型号',
		'颜色',
		'类别',
		'重量',
		'款式',
		'货号',
		'器型',
		'材质',
		'尺码',
		'口味',
		'色号',
		'容量',
		'花型',
		'地点',
		'香型',
		'成分',
		'版本',
		'度数',
		'属性',
		'地区',
		'套餐',
		'功效',
		'品类',
		'时间',
		'组合',
		'运营商',
		'提货点',
		'适用年龄',
		'适用人群'
	]
}

export {
	validator,
	enumConverter
}
