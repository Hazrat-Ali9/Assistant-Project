import { useContext, useState } from "react";
import AddCategorize from "../Categorize/AddCategorize";
import AddCloze from "../Cloze/AddCloze";
import Comprehension from "../Comprehension/Comprehension";
import { GlobalContext } from "../../Hooks/GlobalContext";
import { useCreateQuestionMutation } from "../../Redux/Api/QuestionsApi";

const MainQuestion = () => {
    const [createQuestion, resInfo] = useCreateQuestionMutation()
    const [comprehensionAnswer, setComprehensionAnswer] = useState(false)
    const [clozeAnswer, setClozeAnswer] = useState(false)
    const [categorizeAnswer, setCategorizeAnswer] = useState(false)
    const { items, sentence, questions, clozeSentence, categorie, underlinedWords, editorContent, passage } = useContext(GlobalContext)

    const saveQuestion = async () => {
        const missingSections = [];

        if (!comprehensionAnswer) {
            missingSections.push('Comprehension');
        }

        if (!clozeAnswer) {
            missingSections.push('Cloze');
        }

        if (!categorizeAnswer) {
            missingSections.push('Categorize');
        }

        if (missingSections.length === 0) {
            const data = {
                categoriesSentenc: sentence,
                categorie: categorie,
                items: items,
                clozeSentence: editorContent,
                clozeRightSentence: clozeSentence,
                underLineWords: underlinedWords,
                passage: passage,
                question: questions,
            }

            await createQuestion(data)
        } else {
            alert(`Please provide answers for the following sections: ${missingSections.join(', ')}`);
        }
    };

    const countAnsweredSections = () => {
        let count = 0;

        if (comprehensionAnswer) {
            count++;
        }

        if (clozeAnswer) {
            count++;
        }

        if (categorizeAnswer) {
            count++;
        }

        return count;
    };

    const countUnansweredSections = () => {
        return 3 - countAnsweredSections();
    };

    return (
        <div>
            <div>
                <div className="flex flex-col gap-10 mt-10">
                    <AddCategorize setCategorizeAnswer={setCategorizeAnswer} />
                    <AddCloze setClozeAnswer={setClozeAnswer} />
                    <Comprehension setComprehensionAnswer={setComprehensionAnswer} />
                </div>

                <div className="flex w-full justify-center py-10">
                    <button className="btn border-none hover:bg-[#7da6cc] w-1/6 bg-[#9ab7d3] text-white uppercase" onClick={saveQuestion}>Save Question</button>
                </div>
            </div>
            <div className="fixed top-48 right-10 shadow-md  w-1/6 p-10">
                <h2 className="text-[20px] pb-3">Make Questions</h2>
                <h3 className="text-[18px]">Complete: {countAnsweredSections()}</h3>
                <h3 className="text-[18px]">Pending: {countUnansweredSections()}</h3>
            </div>
        </div>
    );
};

export default MainQuestion;