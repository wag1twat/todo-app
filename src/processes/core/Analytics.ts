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

    public getTimestamp(key: string | undefined) {
        if(key === undefined) {
            return
        }

        const timestamp = key.split('-').at(-1)

        if(timestamp === undefined){
            return
        }

        const n = Number(timestamp)

        if(!isNaN(n)) {
            return n
        }
    }

    public getDateTime(key: string | undefined){
        const timestamp = this.getTimestamp(key)

        if(timestamp === undefined) {
            return
        }

        return DateTime.fromMillis(timestamp)
    }

    public sendErrorEvent(event: AnalitycsErrorEvent) {
      const timestamp = DateTime.now().valueOf()
      globalThis.localStorage.setItem(`${this.errorPrefix}-${event.name}-${timestamp}`, JSON.stringify(event))
    }

    public getErrorEvent(key: string | undefined): (AnalitycsErrorEvent & { key: string }) | undefined {
        if(key === undefined) {
            return
        }
        const event = globalThis.localStorage.getItem(key)
        
        if(typeof event === 'string') {
            const parsed = JSON.parse(event)

            if(this.isAnalytics(parsed)) {
                return { ...parsed, key }
            }
        }
    }    

    public getErrorEvents() {
      const result: (AnalitycsErrorEvent & { key: string })[] = []

      const keys = Object.keys(globalThis.localStorage)

      for(let i = 0; i < keys.length; i++) {
        const isAnalytics = keys[i].startsWith(this.errorPrefix)

        if(!isAnalytics) {
            continue
        }

        const event = this.getErrorEvent(keys[i])

        if(event) {
            result.push(event)
        } else {
            continue
        }
      }

      return result
    }
}

export type { AnalitycsErrorEvent }
export { Analitycs }