import { useEffect, useState } from 'react';

const CategorieAnswer = ({ items, index, setCategorizeAnswer, setCategorizeAnswerData }) => {
    const allItems = items?.items?.map(entry => entry.item)
        .filter(item => item.trim() !== '');
    const [data, setData] = useState(allItems);

    const categoryStates = {};
    items.categorie.forEach(category => {
        categoryStates[category.toLowerCase()] = useState([]);
    });
    // console.log(items.categorie);
    // console.log(categoryStates);

    const handleDrop = (e, type) => {
        e.preventDefault();
        const droppedItem = e.dataTransfer.getData('text');
        setData((prevData) => prevData.filter(item => item !== droppedItem));
        if (categoryStates[type]) {
            const [state, setState] = categoryStates[type];
            setState((prevState) => [...prevState, droppedItem]);
        }
    };

    const allowDrop = (e) => {
        e.preventDefault();
    };

    // useEffect(() => {
    //     const newStoredStates = {};
    //     items.categorie.forEach(category => {
    //         if (category.trim() !== '') {
    //             const [state] = categoryStates[category.toLowerCase()];
    //             newStoredStates[category.toLowerCase()] = state;
    //         }
    //     });
    //     setCategorizeAnswerData(newStoredStates);
    //     // console.log(newStoredStates);
    //     // 
    // }, [categoryStates]);

    useEffect(()=>{
        if (data.length === 0) {
            const newStoredStates = {};
            setCategorizeAnswer(true)
            items.categorie.forEach(category => {
                if (category.trim() !== '') {
                    const [state] = categoryStates[category.toLowerCase()];
                    newStoredStates[category.toLowerCase()] = state;
                }
            });
            setCategorizeAnswerData(newStoredStates);
        }
    },[data])
    return (
        <div className='px-20 w-4/5'>
            <div className="mt-10 border p-10">
                <h2 className='text-xl'>Categorize Question: {index + 1}</h2>
                <div className='text-xl w-full text-center py-3'>
                    <h3 className='ml-[20px]'>Question: {items.categoriesSentenc}</h3>
                </div>
                <div className="flex mb-5 gap-3 justify-center">
                    {data.map((item, index) => (
                        item?.trim() !== '' && (
                            <div
                                className="border rounded-md p-2"
                                key={index}
                                draggable
                                onDragStart={(e) => {
                                    e.dataTransfer.setData('text', item);
                                }}
                            >
                                {item}
                            </div>
                        )
                    ))}
                </div>
                <div className="flex justify-center gap-10">
                    {items.categorie.map((category, index) => (
                        category.trim() !== '' && (
                            <div
                                key={index}
                                onDragOver={allowDrop}
                                onDrop={(e) => handleDrop(e, category.toLowerCase())}
                            >
                                <div className='bg-green-100 rounded-md p-2 my-3'>
                                    <h1 className='text-xl text-center'>{category}</h1>
                                </div>
                                <div className="bg-[#f5d2d3] text-center rounded-md p-2 w-[200px] h-[200px]">
                                    {categoryStates[category.toLowerCase()][0].length > 0 ? (
                                        <>
                                            {categoryStates[category.toLowerCase()][0].map((item, index) => (
                                                <div key={index}>{item}</div>
                                            ))}
                                        </>
                                    ) : (
                                        `Drag ${category} Here`
                                    )}
                                </div>
                            </div>
                        )
                    ))}

                </div>

            </div>
        </div>
    );
};

export default CategorieAnswer;
