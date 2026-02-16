import { useState, useRef } from 'react';
import PostCard from './PostCard';
import Comments from './Comments';

export default function RoomView({ room, onBack, currentUser }: any) {
    const [view, setView] = useState<"feed" | "comments">("feed");
    const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
    const [isPosting, setIsPosting] = useState(false);

    // Form State
    const [postText, setPostText] = useState("");
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Load posts specific to this room ID
    const [posts, setPosts] = useState<any[]>(() => {
        const saved = localStorage.getItem(`posts_room_${room.id}`);
        return saved ? JSON.parse(saved) : [];
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setSelectedImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleCreatePost = () => {
        if (!postText.trim() || !selectedImage) {
            alert("Both a description and a photo are mandatory!");
            return;
        }

        const newPost = {
            id: Date.now(),
            author: currentUser?.name || "Member",
            authorImage: currentUser?.image || 'https://via.placeholder.com/150',
            content: postText,
            image: selectedImage,
            likes: 0,
            dislikes: 0,
            commentsCount: 0,
            roomId: room.id
        };

        const updatedPosts = [newPost, ...posts];
        setPosts(updatedPosts);
        localStorage.setItem(`posts_room_${room.id}`, JSON.stringify(updatedPosts));

        setPostText("");
        setSelectedImage(null);
        setIsPosting(false);
    };

    if (view === "comments" && selectedPostId) {
        return (
            <Comments
                postId={selectedPostId}
                onBack={() => setView("feed")}
                currentUser={currentUser}
            />
        );
    }

    return (
        <div style={styles.container}>
            {/* Header */}
            <header style={styles.header}>
                <span style={styles.backBtn} onClick={onBack}>❮</span>
                <div style={styles.headerTitle}>
                    <h2 style={styles.roomName}>{room.name}</h2>
                    <p style={styles.ownerText}>Owner: {room.owner
                    }</p>
                </div>
                <span style={styles.menuDots}>⋮</span>
            </header>

            {/* Room Goal */}
            <div style={styles.goalBar}>🏆 Goal: {room.description}</div>

            {/* Post Feed - Centered Layout */}
            <main style={styles.feed}>
                <div style={styles.feedInner}>
                    {posts.length > 0 ? (
                        posts.map(p => (
                            <PostCard
                                key={p.id}
                                post={p}
                                onOpenComments={() => {
                                    setSelectedPostId(p.id);
                                    setView("comments");
                                }}
                            />
                        ))
                    ) : (
                        <div style={styles.emptyState}>
                            <p>No progress shared yet.</p>
                        </div>
                    )}
                </div>
            </main>

            {/* Floating Action Button */}
            <button style={styles.fab} onClick={() => setIsPosting(true)}>+</button>

            {/* Create Post Modal */}
            {isPosting && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <div style={styles.modalHeader}>
                            <button onClick={() => setIsPosting(false)} style={styles.closeModalBtn}>✕</button>
                            <h3 style={styles.modalTitle}>Create post</h3>
                            <div style={{ width: 30 }}></div>
                        </div>

                        <div style={styles.imageUploadSection} onClick={() => fileInputRef.current?.click()}>
                            {selectedImage ? (
                                <img src={selectedImage} style={styles.previewImg} alt="upload preview" />
                            ) : (
                                <div style={styles.placeholderBox}>Tap to upload mandatory photo</div>
                            )}
                            <div style={styles.addImageFab}>+</div>
                        </div>

                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            accept="image/*"
                            style={{ display: 'none' }}
                        />

                        <label style={styles.inputLabel}>Describe your progress:</label>
                        <div style={styles.textAreaContainer}>
                            <textarea
                                style={styles.textArea}
                                placeholder="What did you achieve today?"
                                value={postText}
                                onChange={(e) => setPostText(e.target.value)}
                            />
                        </div>

                        <button onClick={handleCreatePost} style={styles.submitBtn}>
                            Create
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

const styles: any = {
    // Layout
    container: {
        backgroundColor: '#fff',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        fontFamily: 'sans-serif'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '15px 20px',
        borderBottom: '1px solid #eee'
    },
    feed: {
        flex: 1,
        overflowY: 'auto',
        padding: '20px 10px',
        paddingBottom: '100px',
        display: 'flex',
        justifyContent: 'center', // Centers the feed content horizontally
    },
    feedInner: {
        width: '100%',
        maxWidth: '500px', // Restricts width to keep cards looking consistent
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Centers cards within the inner container
        gap: '20px'
    },

    // Header Components
    backBtn: { fontSize: '24px', cursor: 'pointer' },
    headerTitle: { textAlign: 'center' },
    roomName: { margin: 0, fontSize: '20px' },
    ownerText: { margin: 0, fontSize: '12px', color: '#9F7AEA', fontWeight: 'bold' },
    menuDots: { fontSize: '24px', fontWeight: 'bold' },
    goalBar: {
        padding: '12px 20px',
        backgroundColor: '#F8FAFC',
        color: '#475569',
        fontSize: '14px',
        fontWeight: '600',
        textAlign: 'center'
    },

    // UI Elements
    fab: {
        position: 'fixed', bottom: '100px', right: '30px', width: '60px', height: '60px',
        borderRadius: '50%', backgroundColor: '#9F7AEA', color: '#fff', fontSize: '35px',
        border: 'none', boxShadow: '0 4px 15px rgba(159, 122, 234, 0.4)', cursor: 'pointer', zIndex: 10
    },
    emptyState: { textAlign: 'center', marginTop: '50px', color: '#94A3B8' },

    // Modal Styles
    modalOverlay: {
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'center'
    },
    modalContent: {
        backgroundColor: '#F3F2F7', width: '90%', maxWidth: '400px',
        borderRadius: '30px', padding: '25px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
    },
    modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
    closeModalBtn: { background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' },
    modalTitle: { color: '#9F7AEA', fontSize: '22px', margin: 0, fontWeight: 'bold' },

    // Modal Form Elements
    imageUploadSection: {
        position: 'relative', width: '100%', height: '200px',
        borderRadius: '20px', overflow: 'hidden', marginBottom: '20px',
        backgroundColor: '#e2e8f0', cursor: 'pointer'
    },
    previewImg: { width: '100%', height: '100%', objectFit: 'cover' },
    placeholderBox: {
        height: '100%', display: 'flex', alignItems: 'center',
        justifyContent: 'center', color: '#64748b', textAlign: 'center', padding: '20px'
    },
    addImageFab: {
        position: 'absolute', bottom: '10px', right: '10px',
        backgroundColor: '#9F7AEA', color: '#fff', width: '40px', height: '40px',
        borderRadius: '50%', display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontSize: '24px'
    },
    inputLabel: { color: '#9F7AEA', fontSize: '16px', fontWeight: 'bold', marginBottom: '8px', display: 'block' },
    textAreaContainer: { backgroundColor: '#fff', borderRadius: '20px', padding: '15px', border: '1px solid #ddd', marginBottom: '25px' },
    textArea: { width: '100%', border: 'none', outline: 'none', fontSize: '16px', resize: 'none', minHeight: '80px', fontFamily: 'inherit' },
    submitBtn: {
        width: '100%', backgroundColor: '#9F7AEA', color: '#fff',
        border: 'none', padding: '15px', borderRadius: '20px',
        fontSize: '18px', fontWeight: 'bold', cursor: 'pointer'
    }
};