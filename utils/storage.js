const storage = {}
const storageMap = ['isLogin', 'userInfo', 'token']

storageMap.forEach((item, index) => {
    let name = item.charAt(0).toUpperCase() + item.slice(1)
    storage[`set${name}`] = (value) => {
        return uni.setStorageSync(item, value)
    }

    storage[`get${name}`] = () => {
        return uni.getStorageSync(item)
    }

    storage[`remove${name}`] = () => {
        return uni.removeStorageSync(item)
    }

    storage[`clear${name}`] = () => {
        return uni.clearStorageSync(item)
    }
})

module.exports = storage
