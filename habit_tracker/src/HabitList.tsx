// src/components/HabitList.tsx
import HabitItem from './HabitItem';

export default function HabitList({ habits }: { habits: any[] }) {
    return (
        <div style={{ padding: '20px' }}>
            <h3>Your Habits</h3>
            {habits.map((habit) => (
                <HabitItem key={habit.id} habit={habit} />
            ))}
        </div>
    );
}