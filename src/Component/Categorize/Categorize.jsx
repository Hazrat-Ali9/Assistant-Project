import { useState } from 'react';
import { DragIndicator } from '@mui/icons-material';
import TextField from '@mui/material/TextField';

const Categorize = () => {
    const [items, setItems] = useState([
        { id: 1, content: 'Item 1' },
        { id: 2, content: 'Item 2' },
        { id: 3, content: 'Item 3' },
    ]);

    const handleDragStart = (e, index) => {
        e.dataTransfer.setData('index', index);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, newIndex) => {
        e.preventDefault();

        const oldIndex = e.dataTransfer.getData('index');
        const newItems = [...items];
        const draggedItem = newItems.splice(oldIndex, 1)[0];
        newItems.splice(newIndex, 0, draggedItem);

        setItems(newItems);
    };


    return (
        <div className='px-20'>
            <h2 style={{ textAlign: 'center' }} >Drag and Drop Component</h2>
            <div>
                {items.map((item, index) => (
                    <div key={item.id} className='flex gap-3 mb-3 item-center'>
                        <div

                            draggable
                            onDragStart={(e) => handleDragStart(e, index)}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, index)}
                            style={{
                                border: '1px solid #ccc',
                                padding: '10px',
                                backgroundColor: '#f8f8f8',
                                cursor: 'move',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <DragIndicator />

                        </div>
                        <TextField
                            type="text"
                            value={item.content}
                            variant="outlined"
                            fullWidth
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categorize;