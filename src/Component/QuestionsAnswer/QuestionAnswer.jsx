import { useEffect, useState } from "react";
import { useGetQuestionsQuery } from "../../Redux/Api/QuestionsApi";
import CategorieAnswer from "./CategorieAnswer";
import ClozeAnswer from "./ClozeAnswer";
import ComprehensionAnswer from "./ComprehensionAnswer";
import Modal from "./Modal";
import './styles.css'
import Loading from "../Shared/Loading";

const QuestionAnswer = () => {
    const { data, isLoading } = useGetQuestionsQuery()
    const [categorieData, setCategorieData] = useState()
    const [clozeData, setClozeData] = useState()
    const [comprehensionData, setComprehensionData] = useState()
    const [comprehensionAnswer, setComprehensionAnswer] = useState(false)
    const [clozeAnswer, setClozeAnswer] = useState(false)
    const [categorizeAnswer, setCategorizeAnswer] = useState(false)
    const [comprehensionAnswerData, setComprehensionAnswerData] = useState()
    const [clozeAnswerData, setClozeAnswerData] = useState()
    const [categorizeAnswerData, setCategorizeAnswerData] = useState()


    const [toggleModal, setToggleModal] = useState(false)



    useEffect(() => {
        if (!isLoading) {
            setCategorieData(data?.categories)
            setClozeData(data?.cloze)
            setComprehensionData(data?.comprehension)
        }
    }, [isLoading, data])

    const submitAnswer = () => {
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
            setToggleModal(true)
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
           {isLoading ? <Loading /> : <div>
                {data?.categories?.length === 0 ? <h1 className="text-xl text-center">No Question Found</h1> : <div className="">
                    <div>
                        <div>
                            {
                                categorieData?.map((items, index) => (
                                    <CategorieAnswer setCategorizeAnswerData={setCategorizeAnswerData} setCategorizeAnswer={setCategorizeAnswer} key={index} index={index} items={items} />
                                ))
                            }
                        </div>
                        <div>
                            {
                                clozeData?.map((items, index) => (
                                    <ClozeAnswer setClozeAnswerData={setClozeAnswerData} setClozeAnswer={setClozeAnswer} key={index} index={index} items={items} />
                                ))
                            }
                        </div>
                        <div>
                            {
                                comprehensionData?.map((items, index) => (
                                    <ComprehensionAnswer setComprehensionAnswerData={setComprehensionAnswerData} setComprehensionAnswer={setComprehensionAnswer} index={index} key={index} items={items} />
                                ))
                            }
                        </div>

                        <div className="flex w-full justify-center py-10">
                            <button onClick={submitAnswer} className="btn border-none hover:bg-[#7da6cc] w-1/6 bg-[#9ab7d3] text-white uppercase">Submit</button>
                        </div>
                    </div>
                    <div className="fixed top-48 right-20 shadow-md  w-1/5 p-10">
                        <h2 className="text-[25px] pb-3">Questions</h2>
                        <h3 className="text-[18px]">Answered: {countAnsweredSections()}</h3>
                        <h3 className="text-[18px]">Unanswered: {countUnansweredSections()}</h3>
                    </div>
                    <div>
                        {
                            toggleModal && <Modal setToggleModal={setToggleModal} />
                        }
                    </div>
                </div>}
            </div>}
        </div>
    );
};

export default QuestionAnswer;