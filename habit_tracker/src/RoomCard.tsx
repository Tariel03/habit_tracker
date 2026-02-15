
interface RoomData {
    id: number;
    name: string;
    description: string;
    isPrivate: boolean;
    image: string;
    members?: number;
    lastUpdated?: string;
}

interface RoomCardProps {
    room: RoomData;
    onReadInfo: (room: RoomData) => void;
}

export default function RoomCard({ room, onReadInfo }: RoomCardProps) {
    return (
        <div style={styles.card}>
            <div style={styles.content}>
                {/* Room Title in your brand purple */}
                <h3 style={styles.roomTitle}>{room.name}</h3>

                {/* Privacy Status Row */}
                <div style={styles.infoRow}>
                    <div style={styles.infoItem}>
                        <span style={styles.icon}>{room.isPrivate ? '🔒' : '🔓'}</span>
                        <span style={styles.statusText}>
                            {room.isPrivate ? 'Private' : 'Open'}
                        </span>
                    </div>
                </div>

                {/* Interactive Link to open the Pop-up */}
                <button
                    style={styles.readInfoBtn}
                    onClick={() => onReadInfo(room)}
                >
                    Read info
                </button>
            </div>

            {/* Room Image/Illustration on the right */}
            <div style={styles.imageContainer}>
                <img
                    src={room.image}
                    alt={room.name}
                    style={styles.illustration}
                />
            </div>
        </div>
    );
}

const styles: any = {
    card: {
        display: 'flex',
        backgroundColor: '#fff',
        borderRadius: '32px', // Extra rounded corners like your design
        padding: '24px',
        margin: '16px 0',
        boxShadow: '0 8px 24px rgba(149, 157, 165, 0.1)',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        maxWidth: '720px',
        border: '1px solid #f5f5f5',
        transition: 'transform 0.2s ease',
    },
    content: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '6px'
    },
    roomTitle: {
        margin: 0,
        fontSize: '19px',
        fontWeight: '700',
        color: '#9F7AEA',
        fontFamily: 'Lexend, sans-serif'
    },
    infoRow: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '2px'
    },
    infoItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: '#333',
        fontWeight: '500'
    },
    icon: {
        fontSize: '18px'
    },
    statusText: {
        fontSize: '16px'
    },
    readInfoBtn: {
        background: 'none',
        border: 'none',
        color: '#333',
        textDecoration: 'underline',
        fontSize: '16px',
        cursor: 'pointer',
        textAlign: 'left',
        padding: 0,
        marginTop: '12px',
        fontWeight: '600',
        width: 'fit-content'
    },
    imageContainer: {
        width: '110px',
        height: '90px',
        marginLeft: '15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    illustration: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: '16px'
    }
};