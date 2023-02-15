import React from "react";
import { EnvManager } from "../../managers";

const processContext = React.createContext({});

const ProcessCheck: React.FC<React.PropsWithChildren<{}>> = (props) => {
    React.useEffect(() => {
        EnvManager.check();
    }, []);

    return <processContext.Provider value={{}} {...props} />;
};

export { ProcessCheck };
