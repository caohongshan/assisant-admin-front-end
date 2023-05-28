let _throttleRunning = false;

/**
 * 节流/避免重复请求，只适用于点击处理一次操作
 * @param {Function} 执行函数
 * @param {Number} delay 延时ms
 */
export const throttle = (fn, delay = 500) => {
	if (_throttleRunning) {
		return;
	}
	_throttleRunning = true;
	fn();
	setTimeout(() => {
		_throttleRunning = false;
	}, delay);
}

/**
 * 格式化时间戳 Y-m-d H:i:s
 * @param {String} format Y-m-d H:i:s
 * @param {Number} timestamp 时间戳
 * @return {String}
 */
export const dateFormat = (format, timeStamp) => {
	let _date;
	if (!timeStamp) {
		_date = new Date();
	} else {
		if (isNaN(timeStamp)) {

		} else if ('' + timeStamp.length <= 10) {
			timeStamp = +timeStamp * 1000;
		} else {
			timeStamp = +timeStamp;
		}
		_date = new Date(timeStamp);
	}
	let Y = _date.getFullYear(),
		m = _date.getMonth() + 1,
		d = _date.getDate(),
		H = _date.getHours(),
		i = _date.getMinutes(),
		s = _date.getSeconds();
	//周
	let week = {
		"0": "日",
		"1": "一",
		"2": "二",
		"3": "三",
		"4": "四",
		"5": "五",
		"6": "六"
	};
	if (/(E+)/.test(format)) {
		format = format.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "星期" : "周") : "") +
			week[_date
				.getDay() + ""]);
	}
	m = m < 10 ? '0' + m : m;
	d = d < 10 ? '0' + d : d;
	H = H < 10 ? '0' + H : H;
	i = i < 10 ? '0' + i : i;
	s = s < 10 ? '0' + s : s;

	return format.replace(/[YmdHis]/g, key => {
		return {
			Y,
			m,
			d,
			H,
			i,
			s
		} [key];
	});
}
//二维数组去重
export const getUnique = array => {
	let obj = {}
	return array.filter((item, index) => {
		let newItem = item + JSON.stringify(item)
		return obj.hasOwnProperty(newItem) ? false : obj[newItem] = true
	})
}



/**
 * 提取url参数,如果name不存在，则返回所有参数
 */
export const getQueryString = (url, name) => {
	let query = {}
	if (url.indexOf("?") > 0) {
		let vars = url.split("?")[1].split("&");
		for (let i = 0; i < vars.length; i++) {
			let pair = vars[i].split("=");
			if (pair[0] == name) {
				return pair[1];
			}
			query[pair[0]] = pair[1];
		}
	}
	return name ? "" : query;
}
/**
 * 动态处理缩略图，居中短边裁剪
 * @param {Object} value
 * @param {Object} fmt 宽x高 200x200
 */
export const thumbImg = (value, fmt) => {
	if (!fmt) {
		fmt = "200x200";
	}
	if (!value) {
		return "/static/errorImage.jpg"
	}
	//可能出现地址里面有问号
	if (value.indexOf("?") > 0) {
		let [path, query] = value.split("?");
		value = path;
	}
	fmt = fmt.toLowerCase();
	if (value.indexOf("bspapp.com") > -1) {
		let wh = fmt.split("x");
		fmt = `w_${wh[0]},h_${wh[1]}`;
		//阿里云?x-oss-process=image/resize,m_fill,w_300,h_300
		return [value, "?x-oss-process=image/resize,m_fill,", fmt].join("");
	} else if (value.indexOf("qcloud.la") > -1) {
		//腾讯云?imageMogr2/crop/300x300/gravity/center
		return [value, "?imageMogr2/crop/", fmt, "/gravity/center"].join("");
	} else if (value.indexOf("7.nbgaofang.cn") > -1) {
		//七牛云?imageView2/1/w/200/h/200/q/75
		let wh = fmt.split("x");
		fmt = `w/${wh[0]}/h/${wh[1]}`;
		return [value, "?imageView2/1/", fmt, "/q/75"].join("");
	} else if (value.indexOf("360buyimg.com") > -1) {
		//京东采集图片
		return value.replace(/s(\d+)x(\d+)/, `s${fmt}`)
	} else if (value.indexOf("img.jxhh.com") > -1) {
		//聚合供应链
		//https://img.jxhh.com/ewei_shop_5fd72fe3bf0f3?imageMogr2/thumbnail/60x/strip/quality/75/format/jpg
		let wh = fmt.split("x");
		let maxWidth = Math.max(...wh);
		return [value, "?imageMogr2/thumbnail/", maxWidth, "x/strip/quality/75/format/jpg"].join("");
	}


	return value;
}

export const prePage = () => {
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}

/**
 * 简单字符串模板，如果模板中找不到对于的字符，则默认源字符串
 * @param {Object} format 需要处理的字符串,支持a.b.c多级
 * @param {Object} data 参数{name:'支付宝'}
 */
export const stringFormat = (format, data, defaultEmpty = false) => {
	if (!format) {
		return "";
	}
	//匹配大括号+英文字符
	return format.replace(/\{([a-zA-Z0-9$_\.]+)\}/g, key => {
		//去掉大括号，得到变量
		let key1 = key.replace(/[\{\}]/g, "");
		console.log("key1", key1)
		if (data[key1] !== undefined) {
			//存在变量对于的value
			return data[key1];
		}
		let keyArr = key1.split(".");
		if (keyArr.length > 1) {
			let tmp = data[keyArr[0]];
			keyArr.shift();
			for (let key2 of keyArr) {
				tmp = tmp[key2];
				if (tmp === undefined) {
					return key1;
				}
			}
			if (tmp !== undefined) {
				return tmp;
			}
		}
		if (defaultEmpty) {
			return "";
		}
		return key;
	});
}
/**
 * 处理内容中，图片的宽高
 */
export const repairImageSize = (data) => {
	if (!data) {
		return "";
	}
	//匹配图片（g表示匹配所有结果i表示区分大小写）
	let imgReg = /<img.*?(?:>|\/>)/gi;
	//匹配src属性
	let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
	return data.replace(imgReg, key => {
		console.log(key)
		let src = key.match(srcReg);
		if (src[1]) {
			return `<img src="${src[1]}" width="100%"/>`;
		}
		return "";
	})
}
/**
 * 保存文件到本地
 */
export const saveFile = (url, isSave, callback) => {
	uni.downloadFile({
		url: url,
		success(res) {
			// console.log("res.tempFilePath", res.tempFilePath)
			if (isSave) {
				uni.saveFile({
					tempFilePath: res.tempFilePath,
					success(saveRes) {
						// console.log("saveRes.savedFilePath", saveRes.savedFilePath)
						callback(saveRes.savedFilePath);
					},
					fail(err) {
						// console.log("saveRes.savedFilePath fail", err)
					}
				})
			} else {
				callback(res.tempFilePath);
			}
		}
	})
}



/**
 * 直接打印内容
 * @param {Object} res
 * @param {Object} title
 */
export const printContents = (res, title) => {
	let OpenWindow = window.open("", "newwin", "height=1000,width=1024,toolbar=no,scrollbars=auto,menubar=no");
	let style =
		`<style>
		th{text-align: center;}.content{padding:23mm 17mm 5mm ;letter-spacing:0.2pt;font-size: 16px;}
			@media print {
				.content{padding:23mm 17mm 5mm ;letter-spacing:0.2pt;font-size: 16px;}
				table{font-size: 16px;}
				.print_buttons { display: none; }.table td{padding: 0.5rem 0.5rem;}}
			</style>`;
	OpenWindow.document.write(
		'<head><title>打印</title><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.0/dist/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous"><link rel="stylesheet" href="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-prvwnlnjkku189f3a3/e8dccb80-5308-11eb-8ff1-d5dcf8779628.css">' +
		style + '</head>'
	)
	OpenWindow.document.write("<body bgcolor='white'>")
	OpenWindow.document.write(
		'<div style="position: relative;" class="content">'
	)
	OpenWindow.document.write('<div style="text-align: center;font-weight: 600;padding:0 12px 20px ;">' + title +
		'</div>');
	OpenWindow.document.write(res)
	OpenWindow.document.write('</div>')
	OpenWindow.document.write(
		"<div class='print_buttons' style='margin: 20px;text-align: center;position: fixed;    bottom: 20px;    right: 30px;'><input type='button' value='打印本页' onclick='window.print()' /></div></body"
	)
	OpenWindow.document.close()
}
