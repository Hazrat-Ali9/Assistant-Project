import { DragIndicator } from "@mui/icons-material";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../../Hooks/GlobalContext";

const AddCategorize = ({ setCategorizeAnswer }) => {


    const { selectedOption, setSelectedOption, items, setItems, sentence, setSentence, categorie, setCategorie } = useContext(GlobalContext)

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };


    const handleCategoryChange = (index, value) => {
        const updatedCategories = [...categorie];
        updatedCategories[index] = value;
        if (index === updatedCategories.length - 1) {
            setCategorie([...updatedCategories, '']);
        } else {
            setCategorie(updatedCategories);
        }
    };

    const handleRemoveCategory = (index) => {
        const updatedCategories = [...categorie];
        updatedCategories.splice(index, 1);
        setCategorie(updatedCategories);
    };

    const handleDragStart = (index, e) => {
        e.dataTransfer.setData('text/plain', index.toString());
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (index, e) => {
        e.preventDefault();
        const dragIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);

        const updatedCategories = [...categorie];
        const [draggedCategory] = updatedCategories.splice(dragIndex, 1);
        updatedCategories.splice(index, 0, draggedCategory);

        setCategorie(updatedCategories);
    };



    const handleItemsChange = (index, key, value) => {
        const updatedItems = [...items];
        updatedItems[index][key] = value;
        if (index === updatedItems.length - 1) {
            setItems([...updatedItems, { category: '', item: '' }]);
        } else {
            setItems(updatedItems);
        }
    };

    const handleRemoveItems = (index) => {
        if (items.length > 2) {
            const updatedItems = [...items];
            updatedItems.splice(index, 1);
            setItems(updatedItems);
        }
    };

    const handleDragStartItems = (index, e) => {
        e.dataTransfer.setData('text/plain', index.toString());
    };

    const handleDragOverItems = (e) => {
        e.preventDefault();
    };

    const handleDropItems = (index, e) => {
        e.preventDefault();
        const dragIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);

        const updatedItems = [...items];
        const [draggedItem] = updatedItems.splice(dragIndex, 1);
        updatedItems.splice(index, 0, draggedItem);

        setItems(updatedItems);
    };

    useEffect(() => {
        const hasNonEmptyValues = items.some(obj => obj.category.trim() !== '' && obj.item.trim() !== '');

        if (hasNonEmptyValues && sentence.length !== 0) {
            setCategorizeAnswer(true)
        } else {
            setCategorizeAnswer(false)
        }
    }, [items, categorie, sentence]);

    return (
        <div className="w-5/6">
            <div className="border rounded">
                <div className="px-20 py-10">
                    <div className="flex justify-between">
                        <div className="flex items-center border-b-2 gap-2">
                            <DragIndicator />
                            <h3 className="text-xl">Screen 1</h3>
                        </div>
                        <div className="flex gap-3">
                            <h3>Categorization</h3>
                            <span>?</span>
                            <h3>Point___</h3>
                        </div>
                    </div>
                    <div className="py-3">
                        <label htmlFor="" className="text-xl">Preview</label>
                        <input type="text" value={sentence} className="border w-full p-2 rounded border-2" name="" disabled id="" />
                    </div>
                    <div className="py-3">
                        <label htmlFor="" className="text-xl">Sentence <span className="text-red-500 mt-[-10px]">*</span></label>
                        <input type="text" onChange={(e) => setSentence(e.target.value)} className="border w-full p-2 rounded border-2" name="" placeholder="Description Text" id="" />
                    </div>
                    <div className="my-10">
                        <div className="flex items-center gap-3">
                            <label className="block text-gray-700 font-semibold text-[18px] mb-2" htmlFor="dropdown">
                                Media
                            </label>
                            <select
                                id="dropdown"
                                className="w-28 p-2 border rounded"
                                value={selectedOption}
                                onChange={handleOptionChange}
                            >
                                <option value="" disabled>None</option>
                                <option value="video">Video</option>
                                <option value="image">Image</option>
                                <option value="text">Text</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <div>
                            <h3 className="text-xl">Categories <span className="text-red-500 mt-[-10px]">*</span></h3>
                            {categorie.map((category, index) => (
                                <div
                                    key={index}
                                    className="my-2 flex items-center"
                                    onDragOver={handleDragOver}
                                    onDrop={(e) => handleDrop(index, e)}
                                >
                                    <div
                                        className="flex items-center cursor-move"
                                        draggable
                                        onDragStart={(e) => handleDragStart(index, e)}
                                    >
                                        <DragIndicator />
                                    </div>
                                    <input
                                        className="border border-2 p-2 rounded block"
                                        type="text"
                                        placeholder={`Category ${index + 1}`}
                                        value={category || ''}
                                        onChange={(e) => handleCategoryChange(index, e.target.value)}
                                    />
                                    {index >= 2 && category.trim() !== '' && (
                                        <button
                                            className="ml-2 p-2 rounded"
                                            onClick={() => handleRemoveCategory(index)}
                                        >
                                            X
                                        </button>
                                    )}
                                </div>
                            ))}

                        </div>
                        <div>
                            <div>
                                <div>
                                    <div className='flex justify-between'>
                                        <h3 className="text-xl">Items <span className="text-red-500 mt-[-10px]">*</span></h3>
                                        <h3 className="text-xl">Belongs To <span className="text-red-500 mt-[-10px]">*</span></h3>
                                    </div>
                                    {items.map((item, index) => (
                                        <div
                                            key={index}
                                            className="my-2 flex items-center justify-between"
                                            onDragOver={handleDragOverItems}
                                            onDrop={(e) => handleDropItems(index, e)}
                                        >
                                            <div className='flex items-center'>
                                                <div
                                                    className="flex items-center cursor-move"
                                                    draggable
                                                    onDragStart={(e) => handleDragStartItems(index, e)}
                                                >
                                                    <DragIndicator />
                                                </div>

                                                <input
                                                    className="border border-2 p-2 rounded block"
                                                    type="text"
                                                    placeholder={`Item ${index + 1}`}
                                                    value={item.item || ''}
                                                    onChange={(e) => handleItemsChange(index, 'item', e.target.value)}
                                                />
                                                {index >= 2 && item.item.trim() !== '' && (
                                                    <button
                                                        className="ml-2 p-2 rounded"
                                                        onClick={() => handleRemoveItems(index)}
                                                    >
                                                        X
                                                    </button>
                                                )}
                                            </div>
                                            <div>

                                                <select
                                                    className="border text-slate-500 w-48 border-2 p-2 rounded"
                                                    value={item.category}
                                                    onChange={(e) => handleItemsChange(index, 'category', e.target.value)}
                                                >
                                                    <option value="">Choose Category</option>
                                                    {categorie.map((category, categoryIndex) => (
                                                        <option key={categoryIndex} className="text-slate-700" value={category}>
                                                            {category}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCategorize;