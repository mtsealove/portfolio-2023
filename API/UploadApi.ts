import { AxiosResponse } from 'axios';
import rest from './rest';

class UploadApi {
  static uploadFile(file: File): Promise<AxiosResponse<string>> {
    const formData = new FormData();
    formData.append('file', file);
    return rest.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}

export default UploadApi;
