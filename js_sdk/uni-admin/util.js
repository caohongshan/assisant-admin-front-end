import {
    formatDate
} from '@/uni_modules/uni-dateformat/components/uni-dateformat/date-format.js'

import {
	throttle,
	dateFormat,
	getUnique,
	thumbImg,
	checkStrType,
	repairImageSize,
	printContents,
	stringFormat
} from '@/common/js/util.js'
function formatBytes(bytes) {
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
    if (bytes == 0) {
        return 'n/a'
    }
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
    if (i == 0) {
        return bytes + ' ' + sizes[i]
    }
    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i]
}

export function initUtil(Vue) {
    Vue.prototype.$formatDate = formatDate
    Vue.prototype.$dateFormat = dateFormat
    Vue.prototype.$formatBytes = formatBytes
	Vue.prototype.$stringFormat = stringFormat;
	Vue.prototype.$thumbImg = thumbImg;
	Vue.prototype.$printContents = printContents;
}

export function getDeviceUUID() {
	let deviceId = uni.getStorageSync('uni_deviceId') ||
		uni.getSystemInfoSync().deviceId ||
		uni.getSystemInfoSync().system + '_' + Math.random().toString(36).substr(2);

	uni.setStorageSync('uni_deviceId', deviceId)
	return deviceId;
}
