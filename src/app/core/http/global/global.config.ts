export const baseURL = 'http://localhost:3000';

const apiLang = localStorage.getItem('language') || 'en';

export const myAPI = baseURL + `/api/v1/${apiLang}`;

export class END_Points {
    public static project = {
        getProjects: myAPI + '/projects',
        postProject: myAPI + '/projects',
        getProject: (id: string) => myAPI + `/projects/${id}`,
        updateProject: (id: string) => myAPI + `/projects/${id}`,
        deletProject: (id: string) => myAPI + `/projects/${id}`,
    };
}