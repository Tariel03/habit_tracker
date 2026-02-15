import { useState, useEffect } from 'react';
import { db } from './db';
import Auth from './Auth';
import Profile from "./Profile";
import Footer from './Footer';
import RoomDetails from "./RoomDetails.tsx";
import Room from './Room';
import RoomCard from "./RoomCard.tsx";
import RoomView from "./RoomView";

export default function App() {
    const [user, setUser] = useState<any>(null);
    const [activeTab, setActiveTab] = useState<"home" | "community" | "create" | "account">("home");
    const [selectedRoom, setSelectedRoom] = useState<any>(null);
    const [rooms, setRooms] = useState<any[]>(() => {
        return JSON.parse(localStorage.getItem('habiboo_rooms') || '[]');
    });
    const [joinedRoomIds, setJoinedRoomIds] = useState<number[]>(() => {
        return JSON.parse(localStorage.getItem('habiboo_joined_ids') || '[]');
    });
    const [searchQuery, setSearchQuery] = useState("");

    const [activeRoom, setActiveRoom] = useState<any>(null);

    const handleJoinRoom = (id: number, password?: string) => {
        const targetRoom = rooms.find(r => r.id === id);

        if (targetRoom?.isPrivate && password !== targetRoom.password) {
            return alert("Incorrect Password");
        }

        if (!joinedRoomIds.includes(id)) {
            const newJoined = [...joinedRoomIds, id];
            setJoinedRoomIds(newJoined);
            localStorage.setItem('habiboo_joined_ids', JSON.stringify(newJoined));
        }

        setSelectedRoom(null); // Close the modal
        setActiveTab('home');   // Redirect to see the room in "My Rooms"
    };

    useEffect(() => {
        const session = db.getSession();
        if (session) setUser(session);
    }, []);

    const handleAuth = (email: string, username?: string, password?: string) => {
        const existingUser = db.findUser(email);
        if (username) {
            if (existingUser) return alert("User already exists!");
            const newUser = { email, name: username, password, level: 1 };
            db.saveUser(newUser);
            db.setSession(newUser);
            setUser(newUser);
        } else {
            if (existingUser && existingUser.password === password) {
                db.setSession(existingUser);
                setUser(existingUser);
            } else {
                alert("Invalid email or password");
            }
        }
    };

    const handleUpdateUser = (updatedInfo: any) => {
        const updatedUser = { ...user, ...updatedInfo };
        setUser(updatedUser);
        localStorage.setItem('habiboo_current_session', JSON.stringify(updatedUser));

        const allUsers = JSON.parse(localStorage.getItem('habiboo_users') || '[]');
        const updatedUsersList = allUsers.map((u: any) =>
            u.email === user.email ? updatedUser : u
        );
        localStorage.setItem('habiboo_users', JSON.stringify(updatedUsersList));
        alert("Information was updated successfully!");
    };

    const handleRoom = (roomData: any) => {
        // Add default values for members and last updated to match your UI design
        const newRoom = {
            ...roomData,
            members: Math.floor(Math.random() * 20) + 1, // Mock data for now
            lastUpdated: "Just now"
        };
        const updatedRooms = [...rooms, newRoom];
        setRooms(updatedRooms);
        localStorage.setItem('habiboo_rooms', JSON.stringify(updatedRooms));
        alert("Room created!");
        setActiveTab('community'); // Switch to community to see the new card
    };

    if (!user) return <Auth onAuth={handleAuth} />;
    if (activeRoom) {
        return (
            <RoomView
                room={activeRoom}
                onBack={() => setActiveRoom(null)}
            />
        );
    }

    return (
        <div className="main" style={{ minHeight: '100vh', backgroundColor: '#F9F9F9' }}>
            <div className="content-area" style={{ paddingBottom: '90px' }}>
                {activeTab === 'home' && (
                    <div style={styles.tabContainer}>
                        <h2 style={styles.pageHeader}>My Rooms</h2>

                        {/* Search and Filter Section */}
                        <div style={styles.searchWrapper}>
                            <div style={styles.searchBar}>
                                <span style={styles.searchIcon}>🔍</span>
                                <input
                                    type="text"
                                    placeholder="Search room"
                                    style={styles.searchInput}
                                    value={searchQuery} // Bind the value
                                    onChange={(e) => setSearchQuery(e.target.value)} // Update state on change
                                />
                            </div>
                            <button style={styles.filterBtn}>
                                <span style={{ fontSize: '18px' }}>⏳</span>
                            </button>
                        </div>

                        <div style={styles.roomListContainer}>
                            {rooms
                                .filter(room => joinedRoomIds.includes(room.id))
                                .filter(room => room.name.toLowerCase().includes(searchQuery.toLowerCase()))
                                .map(room => (
                                    <div
                                        key={room.id}
                                        onClick={() => setActiveRoom(room)}
                                        style={{
                                            width: '100%',
                                            display: 'flex',          // Added this
                                            justifyContent: 'center', // Added this
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <RoomCard
                                            room={room}
                                            onReadInfo={() => {}}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                )}

                {activeTab === 'community' && (
                    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <h2 style={{ alignSelf: 'flex-start', color: '#333', marginBottom: '20px' }}>Rooms</h2>

                        {/* Community Tab Room List */}
                        {rooms.map((room) => {
                            const isJoined = joinedRoomIds.includes(room.id);
                            return (
                                <div
                                    key={room.id}
                                    onClick={() => isJoined ? setActiveRoom(room) : null}
                                    style={{
                                        width: '100%',
                                        display: 'flex',          // Added this
                                        justifyContent: 'center', // Added this
                                        cursor: isJoined ? 'pointer' : 'default'
                                    }}
                                >
                                    <RoomCard
                                        room={room}
                                        onReadInfo={(roomObj) => setSelectedRoom(roomObj)}
                                    />
                                </div>
                            );
                        })}

                        {/* 4. Render the Modal if a room is selected */}
                        {selectedRoom && (
                            <RoomDetails
                                room={selectedRoom}
                                onClose={() => setSelectedRoom(null)}
                                onJoin={handleJoinRoom}
                            />
                        )}
                    </div>
                )}

                {activeTab === 'create' && (
                    <Room
                        onBack={() => setActiveTab('home')}
                        onCreate={handleRoom}
                    />
                )}

                {activeTab === 'account' && (
                    <Profile
                        user={user}
                        onSave={handleUpdateUser}
                        onBack={() => setActiveTab('home')}
                    />
                )}
            </div>

            <Footer activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
    );
}

const styles: any = {
    // ... existing styles ...
    tabContainer: {
        padding: '10px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    pageHeader: {
        fontSize: '26px',
        fontWeight: 'bold',
        color: '#333',
        margin: '20px 0',
    },
    searchWrapper: {
        display: 'flex',
        width: '100%',
        maxWidth: '400px',
        gap: '12px',
        marginBottom: '20px',
    },
    searchBar: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: '16px',
        padding: '0 15px',
        border: '1px solid #E2E8F0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
    },
    searchIcon: {
        color: '#94A3B8',
        marginRight: '10px',
    },
    searchInput: {
        border: 'none',
        outline: 'none',
        width: '100%',
        height: '45px',
        fontSize: '16px',
    },
    filterBtn: {
        width: '45px',
        height: '45px',
        backgroundColor: '#fff',
        border: '1px solid #E2E8F0',
        borderRadius: '16px',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    roomListContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    emptyText: {
        marginTop: '40px',
        color: '#94A3B8',
    }
};