import roomIcon from "./assets/footer/room.png"
import communityIcon from "./assets/footer/community.png"
import profileIcon from "./assets/footer/profile.png"
import homeIcon from "./assets/footer/home.png"
interface FooterProps {
    activeTab: 'home' | 'community' | 'create' | 'account';
    onTabChange: (tab: any) => void;
}

export default function Footer({ activeTab, onTabChange }: FooterProps) {
    return (
        <div style={styles.navBar}>
            <div
                style={{...styles.navItem, color: activeTab === 'home' ? '#9F7AEA' : '#666'}}
                onClick={() => onTabChange('home')}
            >
                <img
                    src={homeIcon}
                    style={{...styles.footerImg, opacity: activeTab === 'home' ? 1 : 0.5}}
                    alt="Home"
                />
                <span style={styles.navText}>Home</span>
            </div>

            <div
                style={{...styles.navItem, color: activeTab === 'community' ? '#9F7AEA' : '#666'}}
                onClick={() => onTabChange('community')}
            >
                <img
                    src={communityIcon}
                    style={{...styles.footerImg, opacity: activeTab === 'community' ? 1 : 0.5}}
                    alt="Community"
                />
                <span style={styles.navText}>Community</span>
            </div>

            <div
                style={{...styles.navItem, color: activeTab === 'create' ? '#9F7AEA' : '#666'}}
                onClick={() => onTabChange('create')}
            >
                <img
                    src={roomIcon}
                    style={{...styles.footerImg, opacity: activeTab === 'create' ? 1 : 0.5}}
                    alt="Create"
                />
                <span style={styles.navText}>Create room</span>
            </div>

            <div
                style={{...styles.navItem, color: activeTab === 'account' ? '#9F7AEA' : '#666'}}
                onClick={() => onTabChange('account')}
            >
                <img
                    src={profileIcon}
                    style={{...styles.footerImg, opacity: activeTab === 'account' ? 1 : 0.5}}
                    alt="Account"
                />
                <span style={styles.navText}>Account</span>
            </div>
        </div>
    );
}

const styles: any = {
    navBar: {
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)', // Keeps it centered on web
        width: '100%',
        height: '120px',
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTop: '1px solid #eee',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.05)',
        zIndex: 1000,
        paddingBottom: '10px'
    },
    navItem: {
        textAlign: 'center',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        transition: 'color 0.3s ease'
    },
    icon: {
        fontSize: '24px',
        marginBottom: '4px'
    },
    navText: {
        fontSize: '12px',
        fontWeight: '500'
    },

    footerImg: {
        width: '28px',    // Adjust size to match your screenshot
        height: '28px',
        marginBottom: '4px',
        objectFit: 'contain',
        transition: 'opacity 0.2s ease'
    },

};