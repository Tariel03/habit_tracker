import { useState } from "react";

import type {RoomData} from "./Room";

interface ModalProps {
    room: RoomData;
    onClose: () => void;
    onJoin: (id: number, password?: string) => void;
}

export default function RoomDetails({ room, onClose, onJoin }: ModalProps) {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility

    return (
        <div style={modalStyles.overlay} onClick={onClose}>
            {/* stopPropagation prevents clicking the white box from closing the modal */}
            <div style={modalStyles.container} onClick={(e) => e.stopPropagation()}>
                <button style={modalStyles.closeBtn} onClick={onClose}>✕</button>

                <h2 style={modalStyles.title}>{room.name}</h2>

                <p style={modalStyles.description}>
                    <span style={{color: '#9F7AEA', fontWeight: 'bold'}}>Description: </span>
                    {room.description}
                </p>

                <div style={modalStyles.goalSection}>
                    <h4 style={modalStyles.goalHeader}>Goal</h4>
                    {/* You can update this to room.goal if you add that field later */}
                    <p style={modalStyles.goalText}>🏆 Strength training and endurance building</p>
                </div>

                <div style={modalStyles.statsRow}>
                    <div style={modalStyles.statItem}>
                        <span style={modalStyles.icon}>👥</span>
                        <span>{room.members || 0}</span>
                    </div>
                    <div style={modalStyles.statItem}>
                        <span style={modalStyles.icon}>{room.isPrivate ? '🔒' : '🔓'}</span>
                        <span>{room.isPrivate ? 'Private' : 'Public'}</span>
                    </div>
                </div>

                {room.isPrivate && (
                    <div style={modalStyles.passwordSection}>
                        <label style={modalStyles.passLabel}>Enter password</label>
                        <div style={modalStyles.inputWrapper}>
                            <input
                                type={showPassword ? "text" : "password"}
                                style={modalStyles.input}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span
                                style={modalStyles.eyeIcon}
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? '🙈' : '👁️'}
                            </span>
                        </div>
                    </div>
                )}

                <button
                    style={modalStyles.joinBtn}
                    onClick={() => onJoin(room.id, password)}
                >
                    Join
                </button>
            </div>
        </div>
    );
}

const modalStyles: any = {
    overlay: {
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.6)', // Slightly lighter overlay
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        zIndex: 2000, padding: '20px',
        backdropFilter: 'blur(4px)' // Adds a nice modern blur to the background
    },
    container: {
        backgroundColor: '#fff',
        borderRadius: '28px',
        padding: '35px 30px',
        maxWidth: '380px',
        width: '100%',
        position: 'relative',
        textAlign: 'center',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
    },
    closeBtn: {
        position: 'absolute', top: '20px', left: '20px',
        background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer',
        color: '#666'
    },
    title: { color: '#9F7AEA', fontSize: '24px', fontWeight: 'bold', marginBottom: '15px' },
    description: { fontSize: '14px', textAlign: 'left', color: '#444', lineHeight: '1.6', marginBottom: '20px' },
    goalSection: { marginBottom: '25px' },
    goalHeader: { color: '#9F7AEA', fontSize: '18px', margin: '0 0 8px 0' },
    goalText: { fontSize: '14px', color: '#555', margin: 0 },
    statsRow: { display: 'flex', justifyContent: 'center', gap: '40px', marginBottom: '25px' },
    statItem: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px', fontWeight: '600' },
    icon: { fontSize: '20px' },
    passwordSection: { marginBottom: '25px', textAlign: 'center' },
    passLabel: { display: 'block', marginBottom: '10px', fontSize: '15px', fontWeight: '500' },
    inputWrapper: { position: 'relative', width: '100%', maxWidth: '250px', margin: '0 auto' },
    input: {
        width: '100%',
        padding: '12px 15px',
        borderRadius: '12px',
        border: '1px solid #ddd',
        textAlign: 'center',
        fontSize: '16px'
    },
    eyeIcon: { position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' },
    joinBtn: {
        backgroundColor: '#9F7AEA', color: '#fff', border: 'none',
        padding: '14px 60px', borderRadius: '18px', fontSize: '18px', fontWeight: 'bold',
        cursor: 'pointer', transition: 'transform 0.2s',
        boxShadow: '0 6px 15px rgba(159, 122, 234, 0.3)'
    }
};