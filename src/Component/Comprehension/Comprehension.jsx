import { DragIndicator } from "@mui/icons-material";
import { useContext, useState } from "react";
import QuestionComponent from "./QuestionComponent";
import { GlobalContext } from "../../Hooks/GlobalContext";

const Comprehension = ({setComprehensionAnswer}) => {
    const [selectedOption, setSelectedOption] = useState('');
    const { setPassage } = useContext(GlobalContext)
    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    return (
        <div className="w-5/6">
            <div className="border rounded">
                <div className="px-20 py-10">
                    <div className="flex justify-between">
                        <div className="flex items-center border-b-2 gap-2">
                            <DragIndicator />
                            <h3 className="text-xl">Screen 3</h3>
                        </div>
                        <div className="flex gap-3">
                            <h3>Comprehension</h3>
                            <span>?</span>
                            <h3>Point___</h3>
                        </div>
                    </div>
                    <div className="py-3">
                        <label htmlFor="" className="text-xl">Pessage <span className="text-red-500 mt-[-10px]">*</span></label>
                        <textarea type="text" onChange={(e)=> setPassage(e.target.value)} className="border w-full p-2 rounded border-2" name="" placeholder="Description Text" id="" />
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
                    <div className="p-10">
                        <QuestionComponent setComprehensionAnswer={setComprehensionAnswer} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comprehension;