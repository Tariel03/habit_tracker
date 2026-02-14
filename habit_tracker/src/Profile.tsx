// src/components/Profile.tsx
interface ProfileProps {
    name: string;
    level: number;
}

export default function Profile({ name, level }: ProfileProps) {
    return (
        <div style={{ padding: '20px', borderBottom: '1px solid #eee' }}>
            <h2>Hello, {name}!</h2>
            <p>Current Level: {level}</p>
        </div>
    );
}