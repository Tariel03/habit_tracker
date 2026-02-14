const USERS_KEY = 'habiboo_users';
const ACTIVE_USER_KEY = 'habiboo_current_session';
//mock data base
export const db = {
    // Get all users from "database"
    getAllUsers: () => {
        const data = localStorage.getItem(USERS_KEY);
        return data ? JSON.parse(data) : [];
    },

    // Save a new user
    saveUser: (user: any) => {
        const users = db.getAllUsers();
        users.push(user);
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    },

    // Find a specific user
    findUser: (email: string) => {
        const users = db.getAllUsers();
        return users.find((u: any) => u.email === email);
    },

    // Session Management
    setSession: (user: any) => {
        localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(user));
    },

    getSession: () => {
        const data = localStorage.getItem(ACTIVE_USER_KEY);
        return data ? JSON.parse(data) : null;
    },

    clearSession: () => {
        localStorage.removeItem(ACTIVE_USER_KEY);
    }
};