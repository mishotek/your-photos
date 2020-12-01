import {Observable} from '../../utils/observable';
import {AuthStorage} from './auth.storage';

export class AuthService {
    static get instance() {
        if (!AuthService.singleton) {
            AuthService.singleton = new AuthServiceSingleton();
        }

        return AuthService.singleton;
    }
}

class AuthServiceSingleton {
    constructor() {
        this._logoutListener = new Observable();
    }

    onLogout(fn) {
        this._logoutListener.subscribe(fn);
    }

    login(accessToken, user) {
        AuthStorage.setAccessToken(accessToken);
        AuthStorage.setUser(user);
    }

    logout() {
        AuthStorage.removeAccessToken();
        AuthStorage.removeUser();
        this._logoutListener.emit();
    }
}
