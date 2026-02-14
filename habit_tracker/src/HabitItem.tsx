// src/components/HabitItem.tsx
export default function HabitItem({ habit }: { habit: any }) {
    return (
        <div style={styles.item}>
            <span>{habit.title}</span>
            <input type="checkbox" checked={habit.completed} readOnly />
        </div>
    );
}

const styles = {
    item: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px',
        margin: '5px 0',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px'
    }
};