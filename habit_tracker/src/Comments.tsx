interface CommentsProps {

}
export default function Comments({ onBack }: { onBack: () => void }) {
    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <span style={styles.back} onClick={onBack}>❮</span>
                <h2 style={{margin:0}}>Comments</h2>
                <div style={{width:20}}></div>
            </div>

            <div style={styles.chatArea}>
                <Comment user="Tony Stark" text="Well, well, well... nice job, kid." avatar="https://i.pravatar.cc/150?u=ironman" />
                <Comment user="Bruce Banner" text="SPORT GOOD. SMASH STRESS." avatar="https://i.pravatar.cc/150?u=hulk" />
            </div>

            <div style={styles.inputContainer}>
                <img src="https://i.pravatar.cc/150?u=me" style={styles.smallAvatar} />
                <div style={styles.inputBox}>
                    <input style={styles.input} placeholder="Write a comment..." />
                    <button style={styles.postBtn}>Post</button>
                </div>
            </div>
        </div>
    );
}

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