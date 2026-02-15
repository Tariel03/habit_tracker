import { useState } from 'react';

export default function PostCard({ onOpenComments }: { onOpenComments: () => void }) {
    const [liked, setLiked] = useState(false);

    return (
        <div style={styles.postWrapper}>
            {/* Author Badge */}
            <div style={styles.authorRow}>
                <img src="https://i.pravatar.cc/150?u=peter" style={styles.avatar} />
                <div style={styles.bubbleHeader}>
                    <span style={{fontWeight: 'bold'}}>Peter Parker </span>
                    <span style={{fontSize: '11px', opacity: 0.8}}>(10 days streak)</span>
                    <span style={{marginLeft: 'auto'}}>⚠️</span>
                </div>
            </div>

            {/* Content Area */}
            <div style={styles.mainContent}>
                <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500" style={styles.postImg} />
                <p style={styles.postText}>Hello, guys! Finished my workout this morning!</p>

                <div style={styles.actions}>
                    <div style={styles.iconItem} onClick={onOpenComments}>
                        💬 <span style={styles.countText}>10</span>
                    </div>
                    <div style={styles.iconItem} onClick={() => setLiked(!liked)}>
                        {liked ? '❤️' : '🤍'} <span style={styles.countText}>{liked ? 5 : 4}</span>
                    </div>
                    <div style={styles.iconItem}>
                        💔 <span style={styles.countText}>4</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles: any = {
    postWrapper: { marginBottom: '30px', position: 'relative' },
    authorRow: { display: 'flex', alignItems: 'center', marginBottom: '-12px', zIndex: 2, position: 'relative' },
    avatar: { width: '45px', height: '45px', borderRadius: '50%', border: '3px solid #fff' },
    bubbleHeader: {
        backgroundColor: '#9F7AEA', color: '#fff', padding: '8px 15px',
        borderRadius: '15px 15px 15px 0', marginLeft: '5px', display: 'flex', flex: 1, alignItems: 'center'
    },
    mainContent: { backgroundColor: '#FFE4E6', borderRadius: '25px', padding: '20px', paddingTop: '30px', zIndex: 1 },
    postImg: { width: '100%', borderRadius: '15px', objectFit: 'cover' },
    postText: { fontSize: '14px', color: '#444', margin: '12px 0' },
    actions: { display: 'flex', gap: '20px' },
    iconItem: { display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' },
    countText: { fontWeight: 'bold', fontSize: '14px' }
};