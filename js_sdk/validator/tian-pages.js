// 表单校验规则由 schema2code 生成，不建议直接修改校验规则，而建议通过 schema2code 生成, 详情: https://uniapp.dcloud.net.cn/uniCloud/schema



const validator = {
	"begin_time": {
		"rules": [{
			"format": "timestamp"
		}],
		"label": "页面生效时间"
	},
	"begin_hours": {
		"rules": [{
			"format": "int"
		}],
		"label": "生效小时"
	},
	"component": {
		"rules": [{
			"format": "string"
		}],
		"label": "组件类型"
	},
	"title": {
		"rules": [{
			"required": true,
		}, {
			"format": "string"
		}],
		"label": "页面标题"
	},
	"items": {
		"rules": [{
			"format": "array"
		}],
		"label": "静态数据"
	},
	"configs": {
		"rules": [{
			"format": "object"
		}],
		"label": "配置"
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
	"parent_id": {
		"rules": [{
			"format": "string"
		}],
		"label": "父id"
	},
	"app_id": {
		"rules": [{
			"format": "array"
		}],
		"label": "应用"
	},
	"platforms": {
		"rules": [{
			"format": "array"
		}, ],
		"defaultValue": "",
		"label": "平台"
	}
}

const enumConverter = {
	"state_valuetotext": {
		"0": "否",
		"1": "是"
	},
	"platforms_valuetotext": [{
			"text": "应用",
			"value": "app"
		},
		{
			"text": "web",
			"value": "web"
		}, {
			"text": "应用app-plus",
			"value": "app-plus"
		},
		{
			"text": "H5",
			"value": "h5"
		},
		{
			"text": "微信小程序",
			"value": "mp-weixin"
		},
		{
			"text": "支付宝小程序",
			"value": "mp-alipay"
		},
		{
			"text": "百度小程序",
			"value": "mp-baidu"
		},
		{
			"text": "头条小程序",
			"value": "mp-toutiao"
		},
		{
			"text": "qq小程序",
			"value": "mp-qq"
		},
		{
			"text": "快手小程序",
			"value": "mp-kuaishou"
		},
		{
			"text": "360小程序",
			"value": "mp-360"
		}
	]
}

export {
	validator,
	enumConverter
}
