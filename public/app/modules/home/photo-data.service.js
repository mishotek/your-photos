import {DataService} from '../../utils/data.service';
import {PHOTO_DELETE, PHOTO_UPLOAD, UPLOADED_PHOTOS} from '../../utils/XHR';

export class PhotoDataService {
    static upload(photos) {
        const formData = new FormData();

        Array.from(photos).forEach((photo) => {
            formData.append(photo.name, photo);
        });

        return DataService.post(PHOTO_UPLOAD, formData);
    }

    static delete(ids) {
        return DataService.post(PHOTO_DELETE, JSON.stringify({ids}));
    }

    static getUploadedPhotos() {
        return DataService.get(UPLOADED_PHOTOS);
    }
}
