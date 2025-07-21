import { DragIndicator } from "@mui/icons-material";
import { useContext, useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { GlobalContext } from "../../Hooks/GlobalContext";

const App = ({setComprehensionAnswer}) => {

    const { questions, setQuestions , passage} = useContext(GlobalContext)

    useEffect(() => {
        const hasNonEmptyValues = questions.some(
          obj => obj.text.trim() !== '' && obj.options.some(option => option.trim() !== '')
        );
        if (hasNonEmptyValues && passage?.length !==0) {
            setComprehensionAnswer(true)
        } else{
            setComprehensionAnswer(false)
        }
      }, [questions, passage]);
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (questionIndex, optionIndex, e) => {
        e.preventDefault();
        const dragIndex = e.dataTransfer.getData('text/plain').split('-');
        const dragQuestionIndex = parseInt(dragIndex[0], 10);
        const dragOptionIndex = parseInt(dragIndex[1], 10);

        const updatedQuestions = [...questions];
        const draggedOption = updatedQuestions[dragQuestionIndex].options.splice(
            dragOptionIndex,
            1
        )[0];
        updatedQuestions[questionIndex].options.splice(optionIndex, 0, draggedOption);

        setQuestions(updatedQuestions);
    };

    const handleDragStart = (questionIndex, optionIndex, e) => {
        e.dataTransfer.setData('text/plain', `${questionIndex}-${optionIndex}`);
    };

    const handleQuestionChange = (questionIndex, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].text = value;
        setQuestions(updatedQuestions);
    };

    const handleOptionChange = (questionIndex, optionIndex, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options[optionIndex] = value;
        setQuestions(updatedQuestions);
    };

    const handleAddOption = (questionIndex) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options.push(``);
        setQuestions(updatedQuestions);
    };

    const handleRemoveOption = (questionIndex, optionIndex) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options.splice(optionIndex, 1);
        setQuestions(updatedQuestions);
    };

    const handleRemoveQuestion = (questionIndex) => {
        const updatedQuestions = [...questions];
        updatedQuestions.splice(questionIndex, 1);
        setQuestions(updatedQuestions);
    };

    const handleAnswerChange = (questionIndex, optionIndex) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].isAnswer = optionIndex;
        setQuestions(updatedQuestions);
    };

    const handleAddQuestion = () => {
        setQuestions([...questions, { text: '', isAnswer: false, options: [''] }]);
    };

    return (
        <div className="flex flex-col gap-3">

            {questions.map((question, questionIndex) => (
                <div key={questionIndex} className="flex ">
                    <div className="p-10 rounded border w-full m-5">
                        <div className="flex justify-between">
                            <div className="flex gap-2">
                                <DragIndicator />
                                <h3 className="text-xl">{`Question ${questionIndex + 1}`} <span className="text-red-500 mt-[-10px]">*</span></h3>
                            </div>
                        </div>
                        <div>
                            <input
                                type="text"
                                className="border w-full p-2 rounded border-2"
                                placeholder="Question"
                                value={question.text}
                                onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
                            />
                        </div>
                        <div>
                            {question.options.map((option, optionIndex) => (
                                <div
                                    key={optionIndex}
                                    className="my-2 gap-2 flex items-center"
                                    onDragOver={handleDragOver}
                                    onDrop={(e) => handleDrop(questionIndex, optionIndex, e)}
                                >
                                    <div
                                        className="flex gap-2 items-center cursor-move"
                                        draggable
                                        onDragStart={(e) => handleDragStart(questionIndex, optionIndex, e)}
                                    >
                                        <DragIndicator />
                                        <input
                                            type="radio"
                                            checked={question.isAnswer === optionIndex}
                                            onChange={() => handleAnswerChange(questionIndex, optionIndex)}
                                        />
                                    </div>
                                    <input
                                        className="border border-2 p-2 rounded block"
                                        type="text"
                                        placeholder={`Option ${optionIndex + 1}`}
                                        value={option}
                                        onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                                    />
                                    {option.trim() !== '' && (
                                        <button
                                            className="ml-2 p-2 rounded"
                                            onClick={() => handleRemoveOption(questionIndex, optionIndex)}
                                        >
                                            X
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button onClick={() => handleAddOption(questionIndex)}><AddIcon /></button>
                        </div>

                    </div>
                    <button className="" onClick={() => handleRemoveQuestion(questionIndex)}><DeleteIcon /></button>
                </div>
            ))}

            <div className="flex justify-center py-5">
                <button className=" btn btn-accent" onClick={handleAddQuestion}>Add Question</button>
            </div>
        </div>
    );
};

export default App;
