import { DateTime } from "luxon"

type AnalitycsErrorEvent = {
    name: string,
    message:string,
    stack: string
}

class Analitycs {
    private errorPrefix = 'analytics-error'

    private isAnalytics = (event: unknown): event is AnalitycsErrorEvent => {
        if(event === null || event === undefined) {
            return false
        }
        if(typeof event === 'object') {
            return (['name', 'message', 'stack'] as Array<keyof AnalitycsErrorEvent>).every((key) => event.hasOwnProperty(key))
        }
        return false
    }

    public sendErrorEvent(event: AnalitycsErrorEvent) {
      const timestamp = DateTime.now().valueOf()
      globalThis.localStorage.setItem(`${this.errorPrefix}-${event.name}-${timestamp}`, JSON.stringify(event))
    }
    

    public getErrorEvents() {
      const result: (AnalitycsErrorEvent & { key: string })[] = []

      const keys = Object.keys(globalThis.localStorage)

      for(let i = 0; i < keys.length; i++) {
        const isAnalytics = keys[i].startsWith(this.errorPrefix)

        if(!isAnalytics) {
            continue
        }

        const event = globalThis.localStorage.getItem(keys[i])

        if(typeof event === 'string') {
            const parsed = JSON.parse(event)

            if(this.isAnalytics(parsed)) {
                result.push({ key: keys[i], ...parsed })
            } else {
                continue
            }
        } else {
            continue
        }
       
      }

      return result
    }
}

export type { AnalitycsErrorEvent }
export { Analitycs }