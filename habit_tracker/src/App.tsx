import { useState, useEffect } from 'react';
import { db } from './db';
import Auth from './Auth';
import Profile from "./Profile.tsx";
// ... other imports

export default function App() {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        // On load, check if "session" exists in our DB
        const session = db.getSession();
        if (session) setUser(session);
    }, []);

    const handleAuth = (email: string, username?: string, password?: string) => {
        const existingUser = db.findUser(email);

        if (username) {
            // REGISTER MODE
            if (existingUser) return alert("User already exists!");

            const newUser = {email, name: username, password, level: 1};
            db.saveUser(newUser);
            db.setSession(newUser);
            setUser(newUser);
        } else {
            // LOGIN MODE
            if (existingUser && existingUser.password === password) {
                db.setSession(existingUser);
                setUser(existingUser);
            } else {
                alert("Invalid email or password");
            }
        }
    };

    const handleUpdateUser = (updatedInfo: any) => {
        // 1. Create the updated user object
        const updatedUser = { ...user, ...updatedInfo };

        // 2. Update React State
        setUser(updatedUser);

        // 3. Update the Session (Match the key used in your db.ts)
        // If db.ts uses 'habiboo_current_session', use that here!
        localStorage.setItem('habiboo_current_session', JSON.stringify(updatedUser));

        // 4. Update the permanent Users list
        const allUsers = JSON.parse(localStorage.getItem('habiboo_users') || '[]');
        const updatedUsersList = allUsers.map((u: any) =>
            u.email === user.email ? updatedUser : u
        );
        localStorage.setItem('habiboo_users', JSON.stringify(updatedUsersList));

        alert("Information was updated successfully!");
    };

    // Add this state to your App component
    const [view, setView] = useState<'home' | 'profile'>('home');

    return user ? (
        <div className="main">
            {view === 'home' ? (
                <div className="app-container">
                    <div style={{padding: '20px'}}>
                        <h1>Welcome, {user.name}</h1>
                        <button onClick={() => setView('profile')}>Edit Profile</button>
                        <button onClick={() => {
                            db.clearSession();
                            setUser(null);
                        }}>Logout
                        </button>
                    </div>
                </div>
            ) : (
                <Profile
                    user={user}
                    onSave={handleUpdateUser}
                    onBack={() => setView('home')}
                />
            )}
        </div>
    ) : (
        <Auth onAuth={handleAuth}/>
    );
}