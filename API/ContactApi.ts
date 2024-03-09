import { AxiosResponse } from 'axios';
import rest from './rest';

export interface CreateContactDto {
    email: string;
    content: string;
}

class ContactApi {
  static createContact(dto: CreateContactDto): Promise<AxiosResponse<Contact>> {
    return rest.post('/contact', dto);
  }

  static getContacts() : Promise<AxiosResponse<Contact[]>> {
    return rest.get('/contact');
  }
}

export default ContactApi;
