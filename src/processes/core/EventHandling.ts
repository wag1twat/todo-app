class EventHandling {
    static scrollBottomRef = <E extends HTMLElement>(ref: React.MutableRefObject<E | null>, options?: ScrollToOptions) => {
        if(ref.current) {
            if(typeof ref.current.scrollTo === 'function' && typeof ref.current.scrollHeight === 'number') {
                ref.current.scrollTo({
                    left: 0,
                    top: ref.current.scrollHeight,
                    behavior: "smooth",
                    ...options
                });
            }
        }
    }

    static ifScrollBottom =(callback: <E extends HTMLElement>(event: React.UIEvent<E, UIEvent>) => void, enabled: boolean) => {
        return <E extends HTMLElement>(event: React.UIEvent<E, UIEvent>) => {
            if(enabled) {
                if(event.currentTarget) {
                    let isScrollHeight = typeof event.currentTarget.scrollHeight === 'number'
                    let isScrollTop = typeof event.currentTarget.scrollTop === 'number'
                    let isClientHeight = typeof event.currentTarget.clientHeight === 'number'
                    if(isScrollHeight && isScrollTop && isClientHeight) {
                        const bottom = event.currentTarget.scrollHeight - event.currentTarget.scrollTop === event.currentTarget.clientHeight;

                        if(bottom) {
                            callback(event)
                        }
                    }
                }                
            }         
        }
    }
}

export { EventHandling }