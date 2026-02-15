import { useState } from 'react';
import PostCard from './PostCard'; // We will create this next
import Comments from './Comments'; // We will create this next

interface RoomViewProps {
    room: any;
    onBack: () => void;
}

export default function RoomView({ room, onBack }: RoomViewProps) {
    const [showComments, setShowComments] = useState(false);

    // If the user clicks a post to see comments, we swap the view
    if (showComments) {
        return <Comments onBack={() => setShowComments(false)} />;
    }

    return (
        <div style={viewStyles.container}>
            {/* Header matching your screenshot */}
            <div style={viewStyles.header}>
                <span style={viewStyles.backBtn} onClick={onBack}>❮</span>
                <div style={viewStyles.headerContent}>
                    <h2 style={viewStyles.title}>{room.name}</h2>
                    <p style={viewStyles.owner}>Owner: John Smith</p>
                </div>
                <span style={viewStyles.menuBtn}>⋮</span>
            </div>

            <div style={viewStyles.goalBar}>
                <span style={{marginRight: '8px'}}>🏆</span>
                <span>Goal: {room.description || "Strength training and endurance building"}</span>
            </div>

            {/* Post Feed */}
            <div style={viewStyles.feed}>
                <PostCard
                    onOpenComments={() => setShowComments(true)}
                />
            </div>

            {/* Floating Action Button for new post */}
            <button style={viewStyles.fab}>+</button>
        </div>
    );
}

const viewStyles: any = {
    container: { backgroundColor: '#fff', minHeight: '100vh', position: 'relative' },
    header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 20px' },
    backBtn: { fontSize: '24px', cursor: 'pointer', color: '#333' },
    headerContent: { textAlign: 'center' },
    title: { margin: 0, fontSize: '20px', fontWeight: 'bold' },
    owner: { margin: 0, fontSize: '12px', color: '#9F7AEA' },
    menuBtn: { fontSize: '24px', cursor: 'pointer' },
    goalBar: { padding: '10px 20px', fontSize: '14px', fontWeight: '500', color: '#333', display: 'flex', alignItems: 'center' },
    feed: { padding: '0 15px' },
    fab: {
        position: 'fixed', bottom: '100px', right: '25px',
        width: '56px', height: '56px', borderRadius: '50%',
        backgroundColor: '#9F7AEA', color: '#fff', fontSize: '30px',
        border: 'none', boxShadow: '0 4px 12px rgba(159, 122, 234, 0.4)',
        cursor: 'pointer', zIndex: 10
    }
};