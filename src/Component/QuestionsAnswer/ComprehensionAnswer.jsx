import { useEffect, useState } from 'react';

const MCQPage = ({ items, index, setComprehensionAnswer, setComprehensionAnswerData }) => {
    const initialQuestions = items?.question

    const [questions, setQuestions] = useState(initialQuestions);
    const [userAnswers, setUserAnswers] = useState(Array(initialQuestions.length).fill(null));

    const handleOptionChange = (questionIndex, optionIndex) => {
        setUserAnswers((prevUserAnswers) => {
            const newUserAnswers = [...prevUserAnswers];
            newUserAnswers[questionIndex] = optionIndex;
            return newUserAnswers;
        });
    };
    useEffect(() => {
        if (!userAnswers.includes(null)) {
            setComprehensionAnswer(true);
            setComprehensionAnswerData(userAnswers)
        }
    }, [userAnswers]);

    return (

        <div className='px-20 w-4/5 py-10'>


            <div className="mt-10 border p-10 shadow rounded-md">
                <h2 className='text-xl'>Comprehension Question: {index + 1}</h2>
                <div>
                    <div className='flex gap-3 py-10'>
                        <span className='text-xl font-bold'>Pessage:</span> <h3 className='text-xl'>{items.passage}</h3>
                    </div>
                    <div className="container mx-auto mt-8 p-8">


                        {questions.map((question, questionIndex) => (
                            <div key={questionIndex} className="mb-6 border rounded-md bg-white p-4 ">
                                <h1 className="text-xl font-bold mb-4">MCQ Question: {questionIndex + 1}</h1>
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-lg font-semibold">{question.text}</p>
                                </div>
                                <div className="mt-4">
                                    <p className="font-semibold mb-2">Options:</p>
                                    <div className="space-y-2">
                                        {question.options.map((option, optionIndex) => (
                                            <label key={optionIndex} className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name={`question_${questionIndex}`}
                                                    value={optionIndex}
                                                    checked={userAnswers[questionIndex] === optionIndex}
                                                    onChange={() => handleOptionChange(questionIndex, optionIndex)}
                                                    className="mr-2"
                                                />
                                                {option}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MCQPage;
