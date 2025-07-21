import { useState } from 'react';

const FillInTheGap = () => {
    const [question, setQuestion] = useState(
        'Monir Goes to ___. Kamal Goes to ___. Isahani Goes to ___.'
    );
    const [userAnswers, setUserAnswers] = useState(['', '', '']);
    const [allAnswers, setAllAnswers] = useState(['India', 'Bangladesh', 'Borishal']);


    const handleDragStart = (e, answer) => {
        e.dataTransfer.setData('text/plain', answer);
    };

    const handleDragOver = (e, index) => {
        console.log(index);
        e.preventDefault();
    };
    
    const handleDrop = (e, index) => {
        e.preventDefault();
        const draggedAnswer = e.dataTransfer.getData('text/plain');
        
        // Check if the placeholder is a dot before updating
        console.log(question.split(' ')[index]);
        if (question.split(' ')[index] === '___.') {
            const newAnswers = [...userAnswers];
            newAnswers[index] = draggedAnswer;
    
            // Replace the placeholder in the question with the actual answer
            const newQuestion = question
                .split(' ')
                .map((word, i) => (i === index ? draggedAnswer : word))
                .join(' ');
    
            setUserAnswers(newAnswers);
            setQuestion(newQuestion);
    
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

    return (
        <div className="m-8">
            <div className="flex mb-4">
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
            <div className="mb-4">

                {question.split(' ').map((word, index) => (
                    <span
                        key={index}
                        onDragOver={(e) => handleDragOver(e, index)}
                        onDrop={(e) => handleDrop(e, index)}
                        className="mr-2"
                    >
                        {word === '___' ? (
                            <span
                                className="border p-2 bg-gray-200 cursor-pointer"
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
    );
};

export default FillInTheGap;
