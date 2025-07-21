import { DragIndicator } from "@mui/icons-material";
import { Checkbox } from "@mui/material";
import Underline from "@tiptap/extension-underline";
import { EditorContent, Extension, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useContext, useEffect } from "react";
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import { GlobalContext } from "../../Hooks/GlobalContext";
import './styles.css'
const AddCloze = ({setClozeAnswer}) => {
    

    const {categories, setCategories, setClozeSentence,  underlinedWords, setUnderlinedWords, editorContent, setEditorContent} = useContext(GlobalContext)

    
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (dropIndex, e) => {
        e.preventDefault();
        const dragIndex = parseInt(e.dataTransfer.getData("text/plain"), 10);
        const updatedWords = [...underlinedWords];
        const [draggedWord] = updatedWords.splice(dragIndex, 1);
        updatedWords.splice(dropIndex, 0, draggedWord);
        setUnderlinedWords(updatedWords);
        const draggedInput = document.getElementById(`wordInput-${dragIndex}`);
        if (draggedInput) {
            draggedInput.value = draggedWord;
            handleWordChange(dragIndex, draggedWord);
        }

        const dropInput = document.getElementById(`wordInput-${dropIndex}`);
        if (dropInput) {
            dropInput.focus();
        }
    };
    const handleDragStart = (index, e) => {
        e.dataTransfer.setData('text/plain', index.toString());
    };
    const handleWordChange = (index, value) => {
        const updatedCategories = [...categories];
        updatedCategories[index] = value;
        if (index === updatedCategories.length - 1) {
            setCategories([...updatedCategories, '']);
        } else {
            setCategories(updatedCategories);
        }
    };

    const handleRemoveWord = (index) => {
        const updatedCategories = [...categories];
        updatedCategories.splice(index, 1);
        setCategories(updatedCategories);
    };


    
    const getTextExtension = Extension.create({
        onTransaction({ editor }) {
            const htmlContent = editor.getHTML();
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlContent, "text/html");
            const newUnderlinedWords = Array.from(doc.querySelectorAll("u")).map(
                (word) => word.textContent
            );
            setUnderlinedWords(newUnderlinedWords);
            const rightFullText = htmlContent.replace(/<[^>]*>/g, "");
            let fullText = htmlContent.replace(/<[^>]*>/g, "");
            // let fullText = htmlContent;
            newUnderlinedWords.forEach((word) => {
                fullText = fullText.replace(word, "___");
            });
            setClozeSentence(rightFullText)
            setEditorContent(fullText);
        },
    });

    const editor = useEditor({
        extensions: [StarterKit, Underline, getTextExtension],
    });

    const handleToggleUnderline = () => {
        const isActive = editor.isActive("underline");
        editor.chain().focus();

        if (isActive) {
            editor.chain().toggleUnderline().run();
        } else {
            editor.chain().setUnderline().run();
        }
    };

   useEffect(()=> {
    if (underlinedWords.length !== 0) {
        setClozeAnswer(true)
    } else {
        setClozeAnswer(false)
    }
   },[underlinedWords])

    return (
        <div className="w-5/6">
            <div className="border rounded">
                <div className="px-20 py-10">
                    <div className="flex justify-between">
                        <div className="flex items-center border-b-2 gap-2">
                            <DragIndicator />
                            <h3 className="text-xl">Screen 2</h3>
                        </div>
                        <div className="flex gap-3">
                            <h3>Cloze</h3>
                            <span>?</span>
                            <h3>Point___</h3>
                        </div>
                    </div>
                    <div className="py-3">
                        <label htmlFor="" className="text-xl">Preview</label>
                        <input type="text" value={editorContent} className="border w-full p-2 rounded border-2" name="" disabled id="" />
                    </div>
                    <div className="py-3">
                        <label htmlFor="" className="text-xl">Sentence <span className="text-red-500 mt-[-10px]">*</span></label>
                        <div>
                            <button
                                onClick={() => editor?.chain().focus().toggleBold().run()}
                                disabled={
                                    !editor?.can()
                                        .chain()
                                        .focus()
                                        .toggleBold()
                                        .run()
                                }
                                className={editor?.isActive('bold') ? 'is-active' : ''}
                            >
                                <FormatBoldIcon />
                            </button>
                            <button
                                onClick={() => editor?.chain().focus().toggleItalic().run()}
                                disabled={
                                    !editor?.can()
                                        .chain()
                                        .focus()
                                        .toggleItalic()
                                        .run()
                                }
                                className={editor?.isActive('italic') ? 'is-active' : ''}
                            >
                                <FormatItalicIcon />
                            </button>
                            <button onClick={handleToggleUnderline}><FormatUnderlinedIcon /></button>
                        </div>
                        <EditorContent className="border w-full h-32" editor={editor} />
                    </div>
                    <div className="my-10">
                        <div className="flex items-center gap-3">
                            <label className="block text-gray-700 font-semibold text-[18px] mb-2" htmlFor="dropdown">
                                Media
                            </label>
                            <select
                                id="dropdown"
                                className="w-28 p-2 border rounded"
                            >
                                <option value="" disabled>None</option>
                                <option value="video">Video</option>
                                <option value="image">Image</option>
                                <option value="text">Text</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        {underlinedWords.length > 0 ? (
                            underlinedWords.map((word, index) => (
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
                                    <Checkbox />
                                    <input
                                        className="border border-2 p-2 rounded block"
                                        type="text"
                                        placeholder={`Word ${index + 1}`}
                                        value={word || ""}
                                        onChange={(e) => handleWordChange(index, e.target.value)}
                                    />
                                    {index >= 1 && word.trim() !== "" && (
                                        <button
                                            className="ml-2 p-2 rounded"
                                            onClick={() => handleRemoveWord(index)}
                                        >
                                            X
                                        </button>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div>
                                <div className="my-2 flex items-center">
                                    <DragIndicator />
                                    <Checkbox />
                                    <input
                                        className="border border-2 p-2 rounded block"
                                        type="text"
                                        placeholder="Options 1"
                                        value=""
                                        onChange={(e) => handleWordChange(0, e.target.value)}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCloze;