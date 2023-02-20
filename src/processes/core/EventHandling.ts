class EventHandling {
    static scrollBottomRef = <E extends HTMLElement>(ref: React.MutableRefObject<E | null>, options?: ScrollToOptions) => {
        ref.current?.scrollTo({
                left: 0,
                top: ref.current.scrollHeight,
                behavior: "smooth",
                ...options
        });
    }

    static ifScrollBottom =(callback: <E extends HTMLElement>(event: React.UIEvent<E, UIEvent>) => void, enabled: boolean) => {
        return <E extends HTMLElement>(event: React.UIEvent<E, UIEvent>) => {
            if(enabled) {                
                const bottom = event.currentTarget.scrollHeight - event.currentTarget.scrollTop === event.currentTarget.clientHeight;

                if(bottom) {
                    console.log(enabled, 'call')
                    callback(event)
                }
            }         
        }
    }
}

export { EventHandling }