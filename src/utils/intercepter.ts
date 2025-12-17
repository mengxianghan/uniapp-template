import { noop } from './basic'
import { isPromise } from './is'

export type Interceptor = (
  ...args: any[]
) => Promise<boolean> | boolean | undefined | void

interface ICallInterceptorOptions {
  args?: unknown[]
  done: () => void
  canceled?: () => void
  error?: () => void
}

export function callInterceptor(
  interceptor: Interceptor | undefined,
  {
    args = [],
    done,
    canceled,
    error,
  }: ICallInterceptorOptions,
) {
  if (interceptor) {
    // eslint-disable-next-line prefer-spread
    const returnVal = interceptor.apply(null, args)

    if (isPromise(returnVal)) {
      returnVal
        .then((value) => {
          if (value) {
            done()
          }
          else if (canceled) {
            canceled()
          }
        })
        .catch(error || noop)
    }
    else if (returnVal) {
      done()
    }
    else if (canceled) {
      canceled()
    }
  }
  else {
    done()
  }
}
