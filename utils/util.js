import md5 from 'js-md5';
import _ from 'lodash';

/**
 * 秒转时分秒
 * @param {Object} value
 */
export function formatSeconds(value, noRes = '--:--') {
	if (!value) return noRes;
	let result = parseInt(value)
	let h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600)
	let m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60))
	let s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60))
	if (Number(h) === 0) {
		result = `${m}:${s}`;
	} else {
		result = `${h}:${m}:${s}`;
	}
	return result;
}


/**
 * 生成安全码
 * @param mobile
 * @returns {string}
 */
export function generateSecurityCode(mobile) {
	let appoint = "DYYZBJ20180807";
	let encode = md5(`${mobile}${appoint}`);
	let s = `${encode.substr(20, encode.length)}${encode.substr(0, 20)}`;
	return s
}

/**
 * 生成 guid
 */
export function guid() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0,
			v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}

/**
 * 树形转线形
 * @param {Array} data //树形数据
 * @param {String} parentId
 */
export function treeToList(data, parentId = '') {
	let list = []
	data.forEach(item => {
		if (item.ParentId == parentId) {
			list.push(item)
			if (item.Children && item.Children.length > 0) {
				const children = treeToList(item.Children, item.Id)
				if (children && children.length > 0) {
					list.push(...children);
				}
			}
		}
	})
	return list;
}

/**
 * 线形转树形
 */
export function listToTree(data, parentId = '', parentIdKey = "ParentId") {
	let list = [];
	data.forEach(item => {
		if (item[parentIdKey] == parentId) {
			const children = listToTree(data, item.Id, parentIdKey);
			if (children && children.length > 0) {
				item.Children = children;
			}
			list.push(item);
		}
	})
	return list;
}

/**
 * 文件类型
 * @param {Object} str
 */
export function getFileType(str) {
	const pattern = {
		1: /.(mp3)/,
		2: /.(mp4)/,
		3: /.(doc|docx|pdf|ppt|pptx)/,
		4: /.(txt)/,
		5: /.(jpg|jpeg|png|gif)/
	};
	let fileType = 0;
	for (let key in pattern) {
		if (pattern[key].test(str)) {
			return key;
			break;
		}
	}
	return fileType;
}

/**
 * 平台类型
 */
export function getPlatform() {
	const platform = uni.getSystemInfoSync().platform;
	let client = '';
	// #ifdef H5
	client = 'h5';
	// #endif
	// #ifdef MP
	client = 'mp';
	// #endif
	// #ifdef APP-PLUS
	client = 'app';
	// #endif
	const code = {
		'ios': {
			'h5': 1,
			'app': 2,
			'mp': 3
		},
		'android': {
			'h5': 4,
			'app': 5,
			'mp': 6
		},
		'devtools': 0
	}
	return _.get(_.get(code, platform, ''), client, _.get(code, platform, ''));
}

/**
 * 获取所有父级
 * @param list 树形结构
 * @param field 字段名
 * @param value 值
 * @returns {boolean|*[]|*[]}
 */
export function getParents(list, field, value) {
	for (let key in list) {
		const item = list[key]
		if (item[field] === value) {
			return [item]
		}
		if (item.Children && item.Children.length > 0) {
			const temp = getParents(item.Children, field, value)
			if (temp) {
				return [item, ...temp]
			}
		}
	}
	return false
}

/**
 * n位Number类型的随机数
 */
export function random(n = 6) {
	if (n > 21) return null
	return parseInt((Math.random() + 1) * Math.pow(10, n - 1))
}

/**
 * 会话标识
 */
export function session() {
	return md5(`${new Date().getTime()}${random()}`);
}

/**
 * 打开文件
 */
export function openDocument(filePath = '', fn = function() {
	uni.showToast({
		title: '暂不支持预览',
		icon: 'none'
	})
}) {
	const fileType = getFileType(filePath);
	// 图片
	if (fileType == 5) {
		uni.previewImage({
			urls: [filePath]
		})
	}
	// 文档
	else if (fileType == 3) {
		// 下载
		uni.showLoading({
			title: '正在读取文件',
			mask: true
		});

		//移除本地缓存
		uni.getSavedFileList({
			success: ({
				fileList
			}) => {
				// console.log(fileList)
				fileList.forEach(item => {
					uni.removeSavedFile({
						filePath: item.filePath
					})
				})
			}
		})

		//下载文件
		uni.downloadFile({
			url: filePath,
			success: ({
				tempFilePath
			}) => {
				uni.hideLoading();
				// 保存
				uni.saveFile({
					tempFilePath: tempFilePath,
					success: ({
						savedFilePath
					}) => {
						// 打开
						uni.openDocument({
							filePath: savedFilePath,
							success: () => {

							},
							fail: err => {
								uni.showToast({
									title: '文件打开失败',
									icon: 'none'
								});
							}
						});
					},
					fail: ({
						errMsg
					}) => {
						console.log(err)
					}
				})
			},
			fail: err => {
				uni.hideLoading();
				uni.showToast({
					title: '文件读取失败',
					icon: 'none'
				});
			}
		});
	}
	// 其他文件
	else {
		fn.call(this)
	}
}

/**
 * 下载文件
 */
export function downloadFile(filePath = '') {
	uni.setClipboardData({
		data: filePath,
		success: () => {
			uni.hideLoading()
			uni.showModal({
				content: '已复制文件地址，请发送到电脑上进行下载',
				showCancel: false
			});
		}
	});
}

/**
 * 数据映射
 * @param list 数据源
 * @param structure 新结构
 * @param expand 拓展数据
 * @returns {[]}
 */
export function changeKeys(list, structure = {
	title: "name",
	value: "id",
	key: "id",
	children: "children"
}, expand = {}) {
	let newList = [];
	if (!Array.isArray(list)) return [];
	list.forEach((item) => {
		let temp = { ...expand
		};
		for (let key in structure) {
			if (structure[key] instanceof Function) {
				temp[key] = structure[key](item);
			} else {
				let value = item[structure[key]];
				if ((value instanceof Array) && value.length) {
					temp[key] = changeKeys(value, structure, expand);
				} else {
					temp[key] = value;
				}
			}
		}
		newList.push(temp);
	});
	return newList;
}
