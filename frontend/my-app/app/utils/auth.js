

const saveToken = (token, data) => {
    localStorage.setItem("data", data);
    localStorage.setItem("token", token);
    return "Token saved successfully";

}

const getToken = () => {
    if (typeof window !== 'undefined') {
        localStorage.getItem("data");
        return localStorage.getItem("data");
    } else {
        return null;
    }
}
const getUser = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem("data");
    } else {
        return null;
    }
}
const isLoggedIn = () => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem("token");
        return token;
    } else {
        return null;
    }
}
const removeToken = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem("data");
        localStorage.removeItem("token");
    }
}

export { saveToken, getToken, removeToken, getUser, isLoggedIn };