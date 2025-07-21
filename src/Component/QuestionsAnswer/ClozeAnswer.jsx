import { useEffect, useState } from 'react';

const ClozeAnswer = ({ items, index, setClozeAnswer , setClozeAnswerData }) => {
    const [question, setQuestion] = useState(items?.clozeSentence);
    const [questionAnswer, setQuestionAnswer] = useState();
    const [userAnswers, setUserAnswers] = useState(Array(items?.underLineWords?.length).fill(''));
    const [allAnswers, setAllAnswers] = useState(items?.underLineWords);

    const handleDragStart = (e, answer) => {
        e.dataTransfer.setData('text/plain', answer);
    };

    const handleDragOver = (e, index) => {
        e.preventDefault();
    };

    const handleDrop = (e, index) => {
        e.preventDefault();
        const draggedAnswer = e.dataTransfer.getData('text/plain');

        if (question.split(' ')[index] === '___') {
            const newAnswers = [...userAnswers];
            newAnswers[index] = draggedAnswer;

            // Replace the placeholder in the question with the actual answer
            const newQuestion = question
                .split(' ')
                .map((word, i) => (i === index ? draggedAnswer : word))
                .join(' ');

            setUserAnswers(newAnswers);
            setQuestion(newQuestion);
            setQuestionAnswer(newQuestion);

            // Remove the dropped answer from the list of available answers
            setAllAnswers((prevAnswers) => prevAnswers.filter((answer) => answer !== draggedAnswer));
        }
    };

    const handleAnswerDragStart = (e, answer) => {
        e.dataTransfer.setData('text/plain', answer);
    };

    const handleAnswerDragOver = (e) => {
        e.preventDefault();
    };

    const handleAnswerDrop = (e) => {
        e.preventDefault();
        const draggedAnswer = e.dataTransfer.getData('text/plain');

        // Add the dragged answer back to the list of available answers
        setAllAnswers((prevAnswers) => [...prevAnswers, draggedAnswer]);
    };

    useEffect(()=>{
        if (allAnswers.length === 0) {
            setClozeAnswer(true)
            setClozeAnswerData(questionAnswer)
        }
    },[allAnswers])
    return (
        <div className='px-20 w-4/5 py-10'>
            <div className="mt-10 border p-10">
                <h2 className='text-xl'>Cloze Question: {index + 1}</h2>
                <div className="m-8">
                    <div className="flex mb-10">
                        {allAnswers.map((answer, index) => (
                            <span
                                key={index}
                                className="border p-2 bg-gray-200 cursor-pointer mr-2"
                                draggable
                                onDragStart={(e) => handleAnswerDragStart(e, answer)}
                                onDragOver={(e) => handleAnswerDragOver(e)}
                                onDrop={(e) => handleAnswerDrop(e)}
                            >
                                {answer}
                            </span>
                        ))}
                    </div>
                    <div className="">
                        {question.split(' ').map((word, index) => (
                            <span
                                key={index}
                                onDragOver={(e) => handleDragOver(e, index)}
                                onDrop={(e) => handleDrop(e, index)}
                                className="mr-2"
                            >
                                {word === '___' ? (
                                    <span
                                        className="border py-2 px-6 bg-gray-200 cursor-pointer"
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, userAnswers[index])}
                                    >
                                        {userAnswers[index]}
                                    </span>
                                ) : (
                                    <span>{word}</span>
                                )}
                            </span>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ClozeAnswer;
