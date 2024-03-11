import { createContext } from 'react';

export interface ProjectContextProps {
    projectId: number;
    setProjectId: (p: number) =>void;
    modalVisible: boolean;
    setModalVisible: (v: boolean) =>void;
}

const ProjectContext = createContext<Partial<ProjectContextProps>>({});

export default ProjectContext;
