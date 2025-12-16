<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app'
import { useAppStore } from '@/store'

const appStore = useAppStore()

onLaunch(() => {
  appStore.init()
})
onShow(() => {
})
onHide(() => {
})
</script>

<style lang="scss">
@import './styles/index.scss';
</style>
