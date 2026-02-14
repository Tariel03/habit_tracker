import { useState } from 'react';

interface ProfileProps {
    user: {
        name: string;
        email: string;
        phone?: string;
        image?: string;
    };
    onSave: (updatedUser: any) => void;
    onBack: () => void; // Prop to handle navigation back to the dashboard
}

export default function Profile({ user, onSave, onBack }: ProfileProps) {
    const [name, setName] = useState(user.name);
    const [phone, setPhone] = useState(user.phone || '+491557589498129');
    const [email, setEmail] = useState(user.email);
    const [image, setImage] = useState(user.image || 'https://via.placeholder.com/150');

    return (
        <div style={styles.pageWrapper}>
            {/* Header */}
            <div style={styles.header}>
                <span style={styles.backArrow} onClick={onBack}>❮</span>
                <h2 style={styles.headerTitle}>Edit profile</h2>
                <div style={{ width: 24 }}></div> {/* Spacer for balance */}
            </div>

            {/* Profile Image Section */}
            <div style={styles.imageContainer}>
                <div style={styles.imageCircle}>
                    <img src={image} alt="Profile" style={styles.profileImg} />
                    <label style={styles.editIconCircle}>
                        ✎
                        <input
                            type="file"
                            hidden
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        // This converts the image to a long string of text
                                        const base64String = reader.result as string;
                                        setImage(base64String);
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                        />
                    </label>
                </div>
            </div>

            {/* Form Fields */}
            <div style={styles.formContainer}>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Username:</label>
                    <input
                        style={styles.input}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label style={styles.label}>Telephone:</label>
                    <input
                        style={styles.input}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label style={styles.label}>E-mail:</label>
                    <input
                        style={styles.input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <button
                    style={styles.saveButton}
                    onClick={() => onSave({ name, phone, email, image })}
                >
                    Save
                </button>
            </div>
        </div>
    );
}

const styles: any = {
    pageWrapper: {
        backgroundColor: '#fff',
        minHeight: '100vh',
        width: '100%',
        fontFamily: "'Lexend', sans-serif",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: '80px'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: '20px',
        maxWidth: '500px',
        boxSizing: 'border-box'
    },
    backArrow: { fontSize: '20px', cursor: 'pointer', padding: '10px' },
    headerTitle: { fontSize: '24px', fontWeight: 'bold', margin: 0 },
    imageContainer: { marginTop: '20px', position: 'relative' },
    imageCircle: {
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        border: '4px solid #E0C3FC',
        overflow: 'hidden',
        position: 'relative'
    },
    profileImg: { width: '100%', height: '100%', objectFit: 'cover' },
    editIconCircle: {
        position: 'absolute',
        bottom: '5px',
        right: '5px',
        backgroundColor: '#fff',
        width: '35px',
        height: '35px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        cursor: 'pointer',
        fontSize: '18px',
        color: '#9F7AEA'
    },
    formContainer: {
        width: '90%',
        maxWidth: '450px',
        marginTop: '30px'
    },
    inputGroup: { marginBottom: '25px' },
    label: { display: 'block', fontWeight: 'bold', marginBottom: '8px', fontSize: '16px' },
    input: {
        width: '100%',
        padding: '12px 20px',
        borderRadius: '12px',
        border: '1px solid #ccc',
        fontSize: '16px',
        backgroundColor: '#fdfdfd',
        boxSizing: 'border-box'
    },
    saveButton: {
        width: '100%',
        padding: '15px',
        backgroundColor: '#9F7AEA',
        color: '#fff',
        border: 'none',
        borderRadius: '20px',
        fontSize: '18px',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginTop: '20px'
    },
    navBar: {
        position: 'fixed',
        bottom: 0,
        width: '100%',
        maxWidth: '500px',
        height: '70px',
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTop: '1px solid #eee',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.05)'
    },
    navItem: { textAlign: 'center', cursor: 'pointer', color: '#666', fontSize: '20px' },
    navText: { fontSize: '10px', fontWeight: '500' }
};