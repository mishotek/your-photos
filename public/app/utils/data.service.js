import {API_ROOT} from './XHR';
import {AuthStorage} from '../modules/auth/auth.storage';

export class DataService {
    static async post(url, data = {}, headers = {}) {
        const fullUrl = `${API_ROOT}${url}`;
        const response = await fetch(fullUrl, {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Access-Token': AuthStorage.getAccessToken(),
                ...headers,
            },
            body: data,
        });
        return {value: await response.json(), status: response.status};
    }
}
