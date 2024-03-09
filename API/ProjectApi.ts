import { AxiosResponse } from 'axios';
import rest from './rest';

export interface CreateProjectDto {
    title: string;
    thumbnail: string;
    summary: string;
    startAt: string;
    endAt: string;
    description: string;
    images: string[];
}

class ProjectApi {
  static createProject(dto: CreateProjectDto): Promise<AxiosResponse<Project>> {
    return rest.post('/projects', dto);
  }

  static getProjects(): Promise<AxiosResponse<Project[]>> {
    return rest.get('/projects');
  }

  static getProject(id: number): Promise<AxiosResponse<Project>> {
    return rest.get(`/projects/${id}`);
  }

  static updateProject(id: number, dto: CreateProjectDto): Promise<AxiosResponse<Project>> {
    return rest.patch(`/projects/${id}`, dto);
  }
}

export default ProjectApi;
