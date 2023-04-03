const SESSION_KEY = "USER";

type SessionUser = {
    username: string,
};

const setSession = (session: SessionUser) => {
    const str = JSON.stringify(session);
    localStorage.setItem(SESSION_KEY, str);
}

const isLogedIn = () => {
    const strSession = localStorage.getItem(SESSION_KEY);
    return !!strSession;
}

const getSession = () => {
    console.log("retrieving session..");
    
    const strSession = localStorage.getItem(SESSION_KEY);
    if(!strSession) {
        return null;
    }

    return JSON.parse(strSession);
}

const clearSession = () => {
    localStorage.removeItem(SESSION_KEY);
}

export {
    setSession,
    getSession,
    isLogedIn,
    clearSession,
    type SessionUser
}