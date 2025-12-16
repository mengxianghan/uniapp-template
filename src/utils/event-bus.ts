type EventHandler = (...args: any[]) => void

interface EventBusOnCallback {
  off: () => void
}

export class EventBus {
  private events: Map<string, EventHandler[]> = new Map()

  /**
   * 订阅事件
   * @param event 事件名称
   * @param callback 回调函数
   * @returns 取消订阅的对象
   */
  on(event: string, callback: EventHandler): EventBusOnCallback {
    if (!this.events.has(event)) {
      this.events.set(event, [])
    }
    this.events.get(event)!.push(callback)

    return {
      off: () => this.off(event, callback),
    }
  }

  /**
   * 发布事件
   * @param event 事件名称
   * @param args 传递给回调函数的参数
   */
  emit(event: string, ...args: any[]): void {
    const callbacks = this.events.get(event)
    if (callbacks) {
      // 使用slice创建副本，避免在回调中修改原数组导致的问题
      callbacks.slice().forEach((callback) => {
        try {
          callback(...args)
        }
        catch (error) {
          console.error(`Error in event handler for "${event}":`, error)
        }
      })
    }
  }

  /**
   * 取消订阅
   * @param event 事件名称
   * @param callback 回调函数
   */
  off(event: string, callback: EventHandler): void {
    const callbacks = this.events.get(event)
    if (callbacks) {
      const index = callbacks.indexOf(callback)
      if (index > -1) {
        callbacks.splice(index, 1)

        // 如果该事件没有订阅者了，删除该事件
        if (callbacks.length === 0) {
          this.events.delete(event)
        }
      }
    }
  }

  /**
   * 单次订阅
   * @param event 事件名称
   * @param callback 回调函数
   */
  once(event: string, callback: EventHandler): EventBusOnCallback {
    const onceWrapper = (...args: any[]) => {
      callback(...args)
      this.off(event, onceWrapper)
    }

    return this.on(event, onceWrapper)
  }

  /**
   * 获取事件订阅者数量
   * @param event 事件名称
   * @returns 订阅者数量
   */
  listenerCount(event: string): number {
    return this.events.get(event)?.length || 0
  }

  /**
   * 清除所有事件订阅
   */
  clear(): void {
    this.events.clear()
  }
}

export const emit = () => new EventBus()

export const emitter = emit()
