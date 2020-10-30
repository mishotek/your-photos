import {API_ROOT} from './XHR';

export class DataService {
    static async post(url, data = {}, headers = {}) {
        const fullUrl = `${API_ROOT}${url}`;
        const response = await fetch(fullUrl, {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            body: JSON.stringify(data),
        });
        return {value: await response.json(), status: response.status};
    }
}
