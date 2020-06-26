import request from '@/utils/request.js';

export default {
    // 获取列表
    getList: params => request.api.get('', params)
}
