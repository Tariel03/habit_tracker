import { useState } from 'react';

// Unified Interface for Room Data
export interface RoomData {
    id: number;
    name: string;
    description: string;
    isPrivate: boolean;
    password?: string;
    period: number;
    image: string;
    members: number;
    lastUpdated: string;
}

interface RoomProps {
    onBack: () => void;
    onCreate: (roomData: RoomData) => void;
}

export default function Room({ onBack, onCreate }: RoomProps) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [period, setPeriod] = useState(7);
    const [isClosed, setIsClosed] = useState(false);
    const [password, setPassword] = useState('');
    const [image, setImage] = useState('https://via.placeholder.com/150');

    const handleCreate = () => {
        if (!name) return alert("Please enter a room name");
        if (isClosed && !password) return alert("Please set a password for the private room");

        const newRoom: RoomData = {
            id: Date.now(),
            name,
            description,
            period,
            isPrivate: isClosed,
            password: isClosed ? password : '',
            image,
            members: 1,
            lastUpdated: "Just now"
        };

        onCreate(newRoom);
    };

    return (
        <div style={styles.pageWrapper}>
            <div style={styles.header}>
                <span style={styles.backArrow} onClick={onBack}>❮</span>
                <h2 style={styles.headerTitle}>Create new room</h2>
                <div style={{ width: 24 }}></div>
            </div>

            <div style={styles.imageContainer}>
                <img src={image} alt="Room" style={styles.roomImg} />
                <label style={styles.editIconCircle}>
                    ✎
                    <input type="file" hidden onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => setImage(reader.result as string);
                            reader.readAsDataURL(file);
                        }
                    }} />
                </label>
            </div>

            <div style={styles.formContainer}>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Name:</label>
                    <input style={styles.input} placeholder="Enter room name..." value={name} onChange={e => setName(e.target.value)} />
                </div>

                <div style={styles.inputGroup}>
                    <label style={styles.label}>Description:</label>
                    <input style={styles.input} placeholder="Enter room's description..." value={description} onChange={e => setDescription(e.target.value)} />
                </div>

                <div style={styles.row}>
                    <label style={styles.label}>Period:</label>
                    <div style={styles.counter}>
                        <button style={styles.counterBtn} onClick={() => setPeriod(p => Math.max(1, p - 1))}>−</button>
                        <span style={styles.counterValue}>{period}</span>
                        <button style={styles.counterBtn} onClick={() => setPeriod(p => p + 1)}>+</button>
                    </div>
                </div>

                <div style={styles.row}>
                    <label style={styles.label}>Closed (Private):</label>
                    <div
                        style={{...styles.toggleBg, backgroundColor: isClosed ? '#9F7AEA' : '#CCC'}}
                        onClick={() => setIsClosed(!isClosed)}
                    >
                        <div style={{...styles.toggleCircle, left: isClosed ? '22px' : '2px'}} />
                    </div>
                </div>

                {isClosed && (
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password:</label>
                        <input
                            style={styles.input}
                            type="password"
                            placeholder="Set room password..."
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                )}

                <button style={styles.createBtn} onClick={handleCreate}>Create</button>
            </div>
        </div>
    );
}

const styles: any = {
    pageWrapper: { display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#fff', minHeight: '100vh', fontFamily: 'Lexend, sans-serif' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '20px', maxWidth: '500px' },
    backArrow: { fontSize: '20px', cursor: 'pointer' },
    headerTitle: { fontSize: '22px', fontWeight: 'bold', margin: 0 },
    imageContainer: { position: 'relative', margin: '20px 0' },
    roomImg: { width: '180px', height: '120px', borderRadius: '20px', objectFit: 'cover', backgroundColor: '#F3E8FF' },
    editIconCircle: { position: 'absolute', bottom: '-5px', right: '-5px', backgroundColor: '#fff', width: '35px', height: '35px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', cursor: 'pointer', color: '#9F7AEA' },
    formContainer: { width: '90%', maxWidth: '400px' },
    inputGroup: { marginBottom: '20px' },
    label: { display: 'block', fontWeight: 'bold', marginBottom: '8px', fontSize: '16px' },
    input: { width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #CCC', fontSize: '14px', boxSizing: 'border-box' },
    row: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
    counter: { display: 'flex', alignItems: 'center', gap: '15px' },
    counterBtn: { backgroundColor: '#9F7AEA', color: '#fff', border: 'none', width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer', fontSize: '18px' },
    counterValue: { border: '1px solid #CCC', padding: '4px 12px', borderRadius: '8px' },
    toggleBg: { width: '45px', height: '24px', borderRadius: '15px', position: 'relative', cursor: 'pointer', transition: '0.3s' },
    toggleCircle: { width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#FFF', position: 'absolute', top: '2px', transition: '0.3s' },
    createBtn: { width: '100%', padding: '16px', backgroundColor: '#9F7AEA', color: '#fff', border: 'none', borderRadius: '18px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }
};