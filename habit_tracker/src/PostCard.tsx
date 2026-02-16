import { useState } from 'react';

interface PostCardProps {
    post: any;
    onOpenComments: () => void;
}

export default function PostCard({ post, onOpenComments }: PostCardProps) {
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);

    // Toggle Like Logic
    const handleLike = () => {
        setIsLiked(!isLiked);
        if (isDisliked) setIsDisliked(false);
    };

    // Toggle Dislike Logic
    const handleDislike = () => {
        setIsDisliked(!isDisliked);
        if (isLiked) setIsLiked(false);
    };

    return (
        <div style={styles.postWrapper}>
            {/* Author Badge */}
            <div style={styles.authorRow}>
                <img
                    src={post.authorImage}
                    style={styles.avatar}
                    alt="avatar"
                />
                <div style={styles.bubbleHeader}>
                    <span style={{ fontWeight: 'bold' }}>{post.author} </span>
                    <span style={{ fontSize: '11px', opacity: 0.8 }}>
                        ({post.streak || '0 day streak'})
                    </span>
                    <span style={{ marginLeft: 'auto', cursor: 'pointer' }}>⚠️</span>
                </div>
            </div>

            {/* Content Area */}
            <div style={styles.mainContent}>
                {post.image && (
                    <img src={post.image} style={styles.postImg} alt="post content" />
                )}

                <p style={styles.postText}>{post.content}</p>

                <div style={styles.actions}>
                    {/* Comment Button */}
                    <div style={styles.iconItem} onClick={onOpenComments}>
                        💬 <span style={styles.countText}>{post.commentsCount || 0}</span>
                    </div>

                    <div style={styles.iconItem} onClick={handleLike}>
                        <span style={{ filter: isLiked ? 'none' : 'grayscale(1)' }}>❤️</span>
                        <span style={styles.countText}>
                            {(post.likes || 0) + (isLiked ? 1 : 0)}
                        </span>
                    </div>

                    <div style={styles.iconItem} onClick={handleDislike}>
                        <span style={{ filter: isDisliked ? 'none' : 'grayscale(1)' }}>💔</span>
                        <span style={styles.countText}>
                            {(post.dislikes || 0) + (isDisliked ? 1 : 0)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles: any = {
    postWrapper: {
        marginBottom: '30px',
        position: 'relative',
        width: '100%',
        maxWidth: '500px'
    },
    authorRow: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '-12px',
        zIndex: 2,
        position: 'relative'
    },
    avatar: {
        width: '45px',
        height: '45px',
        borderRadius: '50%',
        border: '3px solid #fff',
        backgroundColor: '#eee'
    },
    bubbleHeader: {
        backgroundColor: '#9F7AEA',
        color: '#fff',
        padding: '8px 15px',
        borderRadius: '15px 15px 15px 0',
        marginLeft: '5px',
        display: 'flex',
        flex: 1,
        alignItems: 'center'
    },
    mainContent: {
        backgroundColor: '#FFE4E6', // Light pink background from your screenshot
        borderRadius: '25px',
        padding: '20px',
        paddingTop: '30px',
        zIndex: 1
    },
    postImg: {
        width: '100%',
        borderRadius: '15px',
        objectFit: 'cover',
        marginBottom: '10px'
    },
    postText: {
        fontSize: '14px',
        color: '#444',
        lineHeight: '1.5',
        margin: '12px 0'
    },
    actions: {
        display: 'flex',
        gap: '20px',
        marginTop: '10px',
        borderTop: '1px solid rgba(0,0,0,0.05)',
        paddingTop: '10px'
    },
    iconItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        cursor: 'pointer',
        transition: 'transform 0.1s ease'
    },
    countText: {
        fontWeight: 'bold',
        fontSize: '14px',
        color: '#444'
    }
};