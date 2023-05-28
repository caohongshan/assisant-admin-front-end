// 表单校验规则由 schema2code 生成，不建议直接修改校验规则，而建议通过 schema2code 生成, 详情: https://uniapp.dcloud.net.cn/uniCloud/schema



const validator = {
	"bannerfile": {
		"rules": [{
				"required": true
			},
			{
				"format": "file"
			}
		],
		"label": "图片文件"
	},
	"open_url": {
		"rules": [{
			"format": "string"
		}],
		"label": "点击目标地址"
	},
	"title": {
		"rules": [{
				"format": "string"
			},
			{
				"maxLength": 20
			}
		],
		"label": "标题"
	},
	"sort": {
		"rules": [{
			"format": "int"
		}],
		"label": "排序"
	},
	"category_id": {
		"rules": [{
			"format": "string"
		}],
		"label": "分类id"
	},
	"status": {
		"rules": [{
			"format": "bool"
		}],
		"defaultValue": true,
		"label": "生效状态"
	},
	"description": {
		"rules": [{
			"format": "string"
		}],
		"label": "备注"
	}
}

const enumConverter = {}

export {
	validator,
	enumConverter
}
