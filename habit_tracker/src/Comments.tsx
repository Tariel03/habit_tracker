import { useState } from 'react';

export default function Comments({ postId, onBack, currentUser }: any) {
    const [comments, setComments] = useState<any[]>(() => {
        const saved = localStorage.getItem(`comments_post_${postId}`);
        return saved ? JSON.parse(saved) : [];
    });

    const [textInput, setTextInput] = useState("");

    const handlePost = () => {
        if (textInput.trim() === "") return;

        const newComment = {
            id: Date.now(),
            userName: currentUser.name,
            text: textInput,
            avatar: currentUser.image
        };

        const updatedComments = [...comments, newComment];
        setComments(updatedComments);
        localStorage.setItem(`comments_post_${postId}`, JSON.stringify(updatedComments));
        setTextInput("");
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <span style={styles.back} onClick={onBack}>❮</span>
                <h2 style={styles.title}>Comments</h2>
                <div style={styles.headerSpacer}></div>
            </div>

            <div style={styles.chatArea}>
                {comments.length > 0 ? (
                    comments.map((c) => (
                        <Comment
                            key={c.id}
                            text={c.text}
                            avatar={c.avatar}
                            userName={c.userName}
                            isMe={c.userName === currentUser.name}
                        />
                    ))
                ) : (
                    <div style={styles.emptyState}>No comments yet.</div>
                )}
            </div>

            <div style={styles.inputWrapper}>
                <div style={styles.inputContainer}>
                    <img
                        src={currentUser.image || `https://via.placeholder.com/150`}
                        style={styles.smallAvatar}
                    />
                    <div style={styles.inputBox}>
                        <input
                            style={styles.input}
                            placeholder="Write a comment..."
                            value={textInput}
                            onChange={(e) => setTextInput(e.target.value)}
                        />
                        <button style={styles.postBtn} onClick={handlePost}>
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Comment({ text, avatar, userName, isMe }: any) {
    const bubbleStyle = {
        ...styles.bubble,
        backgroundColor: isMe ? '#9F7AEA' : '#fff',
        color: isMe ? '#fff' : '#333',
        borderRadius: isMe ? '15px 15px 0px 15px' : '15px 15px 15px 0px',
    };

    const rowStyle = {
        ...styles.commentRow,
        flexDirection: isMe ? 'row-reverse' : 'row' as any,
    };

    return (
        <div style={rowStyle}>
            <img src={avatar} style={styles.smallAvatar} />
            <div style={styles.messageContent}>
                <span style={styles.userNameText}>{userName}</span>
                <div style={bubbleStyle}>{text}</div>
            </div>
        </div>
    );
}

const styles: any = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: '#F8FAFC',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '20px',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottom: '1px solid #eee',
    },
    title: {
        margin: 0,
        fontSize: '20px',
        color: '#333',
    },
    headerSpacer: {
        width: '20px',
    },
    back: {
        fontSize: '24px',
        cursor: 'pointer',
        color: '#9F7AEA',
    },
    chatArea: {
        flex: 1,
        padding: '20px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    commentRow: {
        display: 'flex',
        gap: '10px',
        marginBottom: '10px',
    },
    messageContent: {
        display: 'flex',
        flexDirection: 'column',
    },
    userNameText: {
        fontSize: '11px',
        color: '#64748b',
        marginBottom: '4px',
        fontWeight: 'bold',
    },
    bubble: {
        border: '1px solid #E2E8F0',
        padding: '12px 16px',
        fontSize: '14px',
        maxWidth: '250px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
    },
    emptyState: {
        textAlign: 'center',
        color: '#94A3B8',
        marginTop: '50px',
    },
    inputWrapper: {
        backgroundColor: '#fff',
        borderTop: '1px solid #eee',
        paddingBottom: '20px',
    },
    inputContainer: {
        padding: '15px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    smallAvatar: {
        width: '35px',
        height: '35px',
        borderRadius: '50%',
        objectFit: 'cover',
        border: '1px solid #eee',
    },
    inputBox: {
        flex: 1,
        display: 'flex',
        backgroundColor: '#F1F5F9',
        borderRadius: '25px',
        padding: '5px 15px',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        border: 'none',
        background: 'none',
        outline: 'none',
        height: '40px',
        fontSize: '14px',
    },
    postBtn: {
        color: '#9F7AEA',
        fontWeight: 'bold',
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        fontSize: '14px',
    },
};