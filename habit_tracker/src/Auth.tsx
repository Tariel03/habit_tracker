import { useState } from 'react';
import logo from './assets/logo.png';

export default function Auth({ onLogin }: { onLogin: () => void }) {
    const [isSignUp, setIsSignUp] = useState(true);
    // State to toggle password visibility
    const [showPassword, setShowPassword] = useState(false);

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
                    <input type="email" style={styles.input} placeholder="Enter your email" />
                </div>

                {isSignUp && (
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Username</label>
                        <input type="text" style={styles.input} placeholder="Choose a username" />
                    </div>
                )}

                <div style={styles.inputGroup}>
                    <label style={styles.label}>
                        {isSignUp ? 'Create password' : 'Password'}
                    </label>
                    <div style={styles.passwordWrapper}>
                        <input
                            type={showPassword ? "text" : "password"}
                            style={styles.input}
                        />
                        <span
                            style={styles.eyeIcon}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? '🙈' : '👁️'}
                        </span>
                    </div>
                </div>

                {isSignUp && (
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Repeat password</label>
                        <div style={styles.passwordWrapper}>
                            <input
                                type={showPassword ? "text" : "password"}
                                style={styles.input}
                            />
                        </div>
                    </div>
                )}

                <button style={styles.button} onClick={onLogin}>
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
        fontFamily: 'sans-serif',
    },
    logoSection: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    iconBox: {
        width: '100px',
        height: '100px',
        border: '2px solid #3182CE',
        margin: '0 auto 10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: '8px',
        overflow: 'hidden'
    },
    logoImage: { width: '100%', height: '100%', objectFit: 'contain' },
    title: { fontSize: '42px', margin: 0, fontWeight: '400', color: '#000' },
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '40px',
        borderRadius: '24px',
        width: '90%',
        maxWidth: '450px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        boxSizing: 'border-box',
        textAlign: 'left', // FORCES CONTENT TO START FROM LEFT
    },
    inputGroup: {
        marginBottom: '20px',
        borderBottom: '1px solid #aaa',
        textAlign: 'left', // ENSURES INDIVIDUAL GROUPS ARE LEFT-ALIGNED
    },
    label: {
        display: 'block',
        fontSize: '14px',
        color: '#333',
        marginBottom: '4px',
        textAlign: 'left'
    },
    input: {
        width: '100%',
        border: 'none',
        outline: 'none',
        background: 'transparent',
        padding: '8px 0',
        fontSize: '16px',
        textAlign: 'left' // FORCES INPUT CURSOR TO START AT LEFT
    },
    passwordWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    eyeIcon: {
        cursor: 'pointer',
        fontSize: '20px',
        padding: '0 5px',
        userSelect: 'none'
    },
    button: {
        width: '100%',
        padding: '14px',
        backgroundColor: '#9F7AEA',
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        fontSize: '18px',
        fontWeight: 'bold',
        marginTop: '20px',
        cursor: 'pointer',
    },
    toggleText: {
        textAlign: 'center',
        marginTop: '20px',
        cursor: 'pointer',
        color: '#333',
        fontWeight: '600'
    }
};