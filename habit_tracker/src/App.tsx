import { useState, useEffect } from 'react';
import { db } from './db';
import Auth from './Auth';
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

            const newUser = { email, name: username, password, level: 1 };
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

    return user ? (
        <div className="main">
            <h1>Welcome, {user.name}</h1>
            <button onClick={() => { db.clearSession(); setUser(null); }}>Logout</button>
        </div>
    ) : (
        <Auth onAuth={handleAuth} />
    );
}