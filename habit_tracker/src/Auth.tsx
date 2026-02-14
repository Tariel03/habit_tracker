import { useState } from 'react';
import logo from './assets/logo.png';

// Update props to include onAuth
export default function Auth({ onAuth }: { onAuth: (email: string, username?: string, pass?: string) => void }) {
    const [isSignUp, setIsSignUp] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    // New Input States
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        if (isSignUp && (!email || !username || !password)) return alert("Fill all fields");
        if (!isSignUp && (!email || !password)) return alert("Enter email and password");

        // Pass data up to App.tsx
        onAuth(email, isSignUp ? username : undefined, password);
    };

    return (
        <div style={styles.container}>
            <div style={styles.logoSection}>
                <div style={styles.iconBox}>
                    <img src={logo} alt="HabiBoo Logo" style={styles.logoImage} />
                </div>
                <h1 style={styles.title}>HabiBoo</h1>
            </div>

            <div style={styles.card}>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Email</label>
                    <input
                        type="email"
                        style={styles.input}
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {isSignUp && (
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Username</label>
                        <input
                            type="text"
                            style={styles.input}
                            placeholder="Choose a username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                )}

                <div style={styles.inputGroup}>
                    <label style={styles.label}>{isSignUp ? 'Create password' : 'Password'}</label>
                    <div style={styles.passwordWrapper}>
                        <input
                            type={showPassword ? "text" : "password"}
                            style={styles.input}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span style={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? '🙈' : '👁️'}
                        </span>
                    </div>
                </div>

                <button style={styles.button} onClick={handleSubmit}>
                    {isSignUp ? 'Sign up' : 'Sign in'}
                </button>

                <p style={styles.toggleText} onClick={() => setIsSignUp(!isSignUp)}>
                    {isSignUp ? 'Sign in' : 'Back to Sign up'}
                </p>
            </div>
        </div>
    );
}

const styles: any = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        width: '100%',
        background: 'linear-gradient(180deg, #E0C3FC 0%, #FBC2EB 100%)',
        fontFamily: "'Lexend', sans-serif",
    },
    logoSection: {
        textAlign: 'center',
        marginBottom: '40px',
    },
    iconBox: {
        width: '120px', // Bigger logo for bigger card
        height: '120px',
        border: '3px solid #3182CE',
        margin: '0 auto 15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
    },
    logoImage: { width: '80%', height: '80%', objectFit: 'contain' },
    title: {
        fontSize: '56px', // Scaled up title
        margin: 0,
        fontWeight: '500',
        color: '#000',
        letterSpacing: '-1px'
    },
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        padding: '60px 80px', // Lots of internal breathing room
        borderRadius: '40px',
        width: '90%',
        maxWidth: '850px', // Sweet spot for a "large" feel without being too wide
        boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
        boxSizing: 'border-box',
        textAlign: 'left',
    },
    inputGroup: {
        marginBottom: '35px', // More space between fields
        borderBottom: '2px solid #EEE', // Thicker, lighter line
        transition: 'border-color 0.3s'
    },
    label: {
        display: 'block',
        fontSize: '18px', // Bigger text
        color: '#444',
        marginBottom: '10px',
        fontWeight: '500'
    },
    input: {
        width: '100%',
        border: 'none',
        outline: 'none',
        background: 'transparent',
        padding: '12px 0', // Taller clickable area
        fontSize: '20px', // Much more readable
        color: '#333'
    },
    passwordWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    eyeIcon: {
        cursor: 'pointer',
        fontSize: '24px',
        padding: '0 10px',
        color: '#666'
    },
    button: {
        width: '100%',
        padding: '20px', // Chunky, premium-feeling button
        backgroundColor: '#9F7AEA',
        color: 'white',
        border: 'none',
        borderRadius: '20px',
        fontSize: '22px',
        fontWeight: 'bold',
        marginTop: '20px',
        cursor: 'pointer',
        boxShadow: '0 10px 20px rgba(159, 122, 234, 0.4)',
        transition: 'transform 0.2s, background 0.2s',
    },
    toggleText: {
        textAlign: 'center',
        marginTop: '25px',
        cursor: 'pointer',
        color: '#555',
        fontSize: '18px',
        fontWeight: '500'
    }
};