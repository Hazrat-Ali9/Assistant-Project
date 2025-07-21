import { createContext, useState } from 'react';
const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const initialItems = [{ category: '', item: '' }, { category: '', item: '' }];
  const [items, setItems] = useState(initialItems);
  const [sentence, setSentence] = useState('')
  const [questions, setQuestions] = useState([
    { text: '', isAnswer: false, options: [''] },
  ]);
  const [categorie, setCategorie] = useState(['', '']);
  const [categories, setCategories] = useState(['', '']);
  const [underlinedWords, setUnderlinedWords] = useState([]);
  const [editorContent, setEditorContent] = useState("");
  const [passage, setPassage] = useState("");
  const [clozeSentence, setClozeSentence] = useState("");
  const contextValue = { selectedOption, setSelectedOption, items, setItems, sentence, setSentence, questions, setQuestions, categories, setCategories, underlinedWords, setUnderlinedWords, editorContent, setEditorContent, categorie, setCategorie, passage, setPassage, clozeSentence, setClozeSentence }


  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };