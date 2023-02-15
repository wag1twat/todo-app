import { DateTime } from "luxon"

type Event = {
    name: string,
    message:string,
    stack: string
}

class AnalitycsManager {
    static sendErrorEvent(event:Event ) {
      const timestamp = DateTime.now().valueOf()

      globalThis.localStorage.setItem(`analytics-${event.name}-${timestamp}`, JSON.stringify(event))
    }
}

export { AnalitycsManager }