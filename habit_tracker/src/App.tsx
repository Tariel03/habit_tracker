import { useState } from 'react'
import './App.css'
import HabitList from './HabitList';
import Profile from './Profile';
import Auth from "./Auth.tsx";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // New state
    const [user] = useState({ name: 'Tariel', level: 5 });
    const [habits] = useState([
        { id: 1, title: 'Drink Water', completed: false },
        { id: 2, title: 'Read 10 Pages', completed: true },
    ]);

    // If not logged in, show the Auth screen
    if (!isLoggedIn) {
        return <Auth onLogin={() => setIsLoggedIn(true)} />;
    }

    // If logged in, show the main content
    return (
        <div className="app-container">
            <Profile name={user.name} level={user.level} />
            <HabitList habits={habits} />
            <button onClick={() => setIsLoggedIn(false)} style={{margin: '20px'}}>Logout</button>
        </div>
    );
}

export default App
