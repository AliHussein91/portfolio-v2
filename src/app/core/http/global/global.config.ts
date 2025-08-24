// export const baseURL = 'https://api.meetali.online/api';
export const baseURL = 'https://meetali.online/api';


export class END_Points {
    // public static auth = {
    //     registerUser: baseURL + '/auth/register',
    //     loginUser: baseURL + '/auth/login',
    //     logout: baseURL + '/auth/logout',
    // };
    // public static users = {
    //     getUsers: baseURL + '/users',
    //     postUser: baseURL + '/users',
    //     getUser: (id: string) => baseURL + `/users/${id}`,
    //     updateUser: (id: string) => baseURL + `/users/${id}`,
    //     deletUser: (id: string) => baseURL + `/users/${id}`,
    // };
    public static wake = {
        wakeUp: baseURL + '/wake-up',
    }
    public static projects = {
        getProjects: baseURL + '/projects',
        postProject: baseURL + '/projects',
        getProject: (id: string) => baseURL + `/projects/${id}`,
        updateProject: (id: string) => baseURL + `/projects/${id}`,
        deletProject: (id: string) => baseURL + `/projects/${id}`,
    };
    // public static upload = {
    //     getUploads: baseURL + '/uploads',
    //     postUpload: baseURL + '/uploads',
    //     markInUse: (fileName: string) => baseURL + `/uploads/use/${fileName}`,
    //     markNotInUse: (fileName: string) => baseURL + `/uploads/unuse/${fileName}`,
    // };
    public static skills = {
        getSkills: baseURL + '/skills',
        postSkill: baseURL + '/skills',
        getSkill: (id: string) => baseURL + `/skills/${id}`,
        updateSkill: (id: string) => baseURL + `/skills/${id}`,
        deletSkill: (id: string) => baseURL + `/skills/${id}`,
    };
    public static messages = {
        // getMessages: baseURL + '/messages',
        postMessage: baseURL + '/messages',
        // getMessage: (id: string) => baseURL + `/messages/${id}`,
        // updateMessageAsRead: (id: string) => baseURL + `/messages/read/${id}`,
        // updateMessageAsUnread: (id: string) => baseURL + `/messages/unread/${id}`,
        // deletMessage: (id: string) => baseURL + `/messages/${id}`,
    };
}