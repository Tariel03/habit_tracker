import { useState } from 'react';

export default function Comments({ postId, onBack, currentUser }: any) {
    // 1. Get saved comments from the "filing cabinet" or start with empty []
    const [comments, setComments] = useState<any[]>(() => {
        const saved = localStorage.getItem(`comments_post_${postId}`);
        return saved ? JSON.parse(saved) : [];
    });

    // 2. State for the text you are typing
    const [textInput, setTextInput] = useState("");

    // 3. Function to handle the "Post" button
    const handlePost = () => {
        if (textInput.trim() === "") return; // Don't post empty comments

        const newComment = {
            id: Date.now(),
            userName: currentUser.name, // Who wrote it
            text: textInput,            // What they wrote
            avatar: `https://i.pravatar.cc/150?u=${currentUser.name}`
        };

        const updatedComments = [...comments, newComment];

        // Update the screen (State)
        setComments(updatedComments);
        // Save to cabinet (LocalStorage)
        localStorage.setItem(`comments_post_${postId}`, JSON.stringify(updatedComments));

        // Clear the input box
        setTextInput("");
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <span style={styles.back} onClick={onBack}>❮</span>
                <h2 style={{margin:0}}>Comments</h2>
                <div style={{width:20}}></div>
            </div>

            <div style={styles.chatArea}>
                {comments.map((c) => (
                    <Comment key={c.id} text={c.text} avatar={c.avatar} />
                ))}
            </div>

            <div style={styles.inputContainer}>
                <img src={`https://i.pravatar.cc/150?u=${currentUser.name}`} style={styles.smallAvatar} />
                <div style={styles.inputBox}>
                    <input
                        style={styles.input}
                        placeholder="Write a comment..."
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                    />
                    <button style={styles.postBtn} onClick={handlePost}>Post</button>
                </div>
            </div>
        </div>
    );
}

// Simple internal component for the bubble
function Comment({ text, avatar }: any) {
    return (
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <img src={avatar} style={styles.smallAvatar} />
            <div style={styles.bubble}>{text}</div>
        </div>
    );
}

const styles: any = {
    container: { display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#fff' },
    header: { display: 'flex', justifyContent: 'space-between', padding: '20px', alignItems: 'center' },
    back: { fontSize: '24px', cursor: 'pointer' },
    chatArea: { flex: 1, padding: '20px', overflowY: 'auto' },
    bubble: { border: '2px solid #E9D8FD', borderRadius: '15px', padding: '15px', fontSize: '14px', maxWidth: '80%' },
    inputContainer: { padding: '20px', display: 'flex', alignItems: 'center', gap: '10px', borderTop: '1px solid #eee' },
    smallAvatar: { width: '40px', height: '40px', borderRadius: '50%' },
    inputBox: { flex: 1, display: 'flex', backgroundColor: '#F3F4F6', borderRadius: '15px', padding: '5px 15px', alignItems: 'center' },
    input: { flex: 1, border: 'none', background: 'none', outline: 'none', height: '40px' },
    postBtn: { color: '#9F7AEA', fontWeight: 'bold', border: 'none', background: 'none', cursor: 'pointer' }
};