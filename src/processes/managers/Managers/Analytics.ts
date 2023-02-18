import { DateTime } from "luxon"

type Event = {
    name: string,
    message:string,
    stack: string
}

class Analitycs {
    private prefix = 'analytics'

    private isAnalytics = (event: unknown): event is Event => {
        if(event === null || event === undefined) {
            return false
        }
        if(typeof event === 'object') {
            return (['name', 'message', 'stack'] as Array<keyof Event>).every((key) => event.hasOwnProperty(key))
        }
        return false
    }

    public sendErrorEvent(event:Event ) {
      const timestamp = DateTime.now().valueOf()
      globalThis.localStorage.setItem(`${this.prefix}-${event.name}-${timestamp}`, JSON.stringify(event))
    }

    public getErrorEvents() {
      const result: (Event)[] = []

      const keys = Object.keys(globalThis.localStorage)

      for(let i = 0; i < keys.length; i++) {
        const isAnalytics = keys[i].startsWith(this.prefix)

        if(!isAnalytics) {
            continue
        }

        const event = globalThis.localStorage.getItem(keys[i])

        if(typeof event === 'string') {
            const parsed = JSON.parse(event)

            if(this.isAnalytics(parsed)) {
                result.push(parsed)
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

export { Analitycs }