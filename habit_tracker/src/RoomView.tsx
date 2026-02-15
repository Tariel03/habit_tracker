import { useState, useEffect } from 'react';
import PostCard from './PostCard';
import Comments from './Comments'; // Ensure this is imported

export default function RoomView({ room, onBack, currentUser }: any) {
    const [view, setView] = useState<"feed" | "comments">("feed");
    const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

    const [posts, setPosts] = useState<any[]>(() => {
        const saved = localStorage.getItem(`posts_room_${room.id}`);
        return saved ? JSON.parse(saved) : [];
    });

    const addPost = (text: string, imageUrl: string) => {
        const newPost = {
            id: Date.now(),
            author: currentUser?.name || "Anonymous",
            streak: "1 day streak",
            content: text,
            image: imageUrl || "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500",
            likes: 0,
            dislikes: 0,
            commentsCount: 0
        };
        const updatedPosts = [newPost, ...posts];
        setPosts(updatedPosts);
        localStorage.setItem(`posts_room_${room.id}`, JSON.stringify(updatedPosts));
    };

    if (view === "comments" && selectedPostId) {
        return <Comments
            postId={selectedPostId}
            onBack={() => setView("feed")}
            currentUser={currentUser}
        />;
    }

    return (
        <div style={styles.container}>
            {/* Header matching your screenshot */}
            <div style={styles.header}>
                <span style={styles.backBtn} onClick={onBack}>❮</span>
                <div style={styles.headerTitle}>
                    <h2 style={{ margin: 0, fontSize: '20px' }}>{room.name}</h2>
                    <p style={styles.ownerText}>Owner: {room.owner || "Admin"}</p>
                </div>
                <span style={styles.menuDots}>⋮</span>
            </div>

            <div style={styles.goalLine}>
                <span style={{marginRight: '8px'}}>🏆</span>
                Goal: {room.description}
            </div>

            <div style={styles.feed}>
                {posts.length > 0 ? (
                    posts.map(post => (
                        <PostCard
                            key={post.id}
                            post={post}
                            onOpenComments={() => {
                                setSelectedPostId(post.id);
                                setView("comments");
                            }}
                        />
                    ))
                ) : (
                    <p style={{textAlign: 'center', color: '#999', marginTop: '40px'}}>No posts yet. Start the conversation!</p>
                )}
            </div>

            <button style={styles.fab} onClick={() => {
                const text = prompt("What's on your mind?");
                if(text) addPost(text, "");
            }}>+</button>
        </div>
    );
}

const styles: any = {
    container: { backgroundColor: '#fff', minHeight: '100vh', width: '100%' },
    header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 20px', borderBottom: '1px solid #eee' },
    backBtn: { fontSize: '24px', cursor: 'pointer' },
    headerTitle: { textAlign: 'center' },
    ownerText: { margin: 0, fontSize: '12px', color: '#9F7AEA', fontWeight: 'bold' },
    menuDots: { fontSize: '24px', fontWeight: 'bold' },
    goalLine: { padding: '15px 20px', fontSize: '14px', color: '#333', fontWeight: '500', backgroundColor: '#F9F9F9' },
    feed: { padding: '20px' },
    fab: {
        position: 'fixed', bottom: '30px', right: '30px', width: '60px', height: '60px',
        borderRadius: '50%', backgroundColor: '#9F7AEA', color: '#fff', fontSize: '30px',
        border: 'none', boxShadow: '0 4px 15px rgba(159, 122, 234, 0.4)', cursor: 'pointer', zIndex: 100
    }
};