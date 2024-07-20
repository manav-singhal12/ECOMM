// components/SessionWrapper.js
import { SessionProvider } from "next-auth/react";

const SessionWrapper = (Component) => {
    return function WrappedComponent(props) {
        return (
            <SessionProvider session={props.session}>
                <Component {...props} />
            </SessionProvider>
        );
    };
};

export default SessionWrapper;
