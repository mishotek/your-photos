export class AuthStorage {
    static setAccessToken(token) {
        localStorage.setItem('AUTH_ACCESS_TOKEN', token);
    }

    static getAccessToken() {
        return localStorage.getItem('AUTH_ACCESS_TOKEN');
    }

    static removeAccessToken() {
        return localStorage.removeItem('AUTH_ACCESS_TOKEN');
    }

    static setUser(user) {
        return localStorage.setItem('AUTH_USER', JSON.stringify(user));
    }

    static getUser() {
        try {
            return JSON.parse(localStorage.getItem('AUTH_USER'));
        } catch (e) {
            return null;
        }
    }

    static removeUser() {
        return localStorage.removeItem('AUTH_USER');
    }
}
