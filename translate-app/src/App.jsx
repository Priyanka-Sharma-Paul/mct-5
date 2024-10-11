import "./App.css";
import { useState } from "react";
import { supportedLanguages } from "./components/data";
import DropDown from "./components/DropDown/dropdown";
import axios from "axios";

function App() {
  const [sourceLang, setSourceLang] = useState("");
  const [targetLang, setTargetLang] = useState("");
  const [langInput, setLangInput] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    if (!sourceLang || !targetLang) {
      alert("Please select both Source and Target languages.");
      return;
    }

    if (!langInput.trim()) {
      alert("Please enter text to translate.");
      return;
    }

    setLoading(true);
    const requiredData = {
      source_language: sourceLang,
      target_language: targetLang,
      text: langInput
    };

    try {
      const resp = await axios.post(
        "https://text-translator2.p.rapidapi.com/translate",
        requiredData,
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            "X-RapidAPI-Key": "62825bcec7mshc205116dd95779fp11d3a6jsn8f71ccf3c914",
            "X-RapidAPI-Host": "text-translator2.p.rapidapi.com"
          }
        }
      );

      setTranslatedText(resp.data.data.translatedText);
    } catch (error) {
      alert("An error occurred during translation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">My Translation App</h1>

      <section className="dropdown-section">
        <DropDown
          label="Source Language"
          supportedLanguages={supportedLanguages}
          onChange={(e) => setSourceLang(e.target.value)}
        />
        <DropDown
          label="Target Language"
          supportedLanguages={supportedLanguages}
          onChange={(e) => setTargetLang(e.target.value)}
        />
      </section>

      <section className="input-section">
        <h3>Write down your text</h3>
        <textarea
          className="text-input"
          placeholder="Enter text to translate..."
          value={langInput}
          onChange={(e) => setLangInput(e.target.value)}
        />
        <button className="translate-button" onClick={handleTranslate} disabled={loading}>
          {loading ? "Translating..." : "Translate"}
        </button>
      </section>

      <section className="result-section">
        {translatedText && (
          <>
            <h3>Translated Text:</h3>
            <div className="translated-text">{translatedText}</div>
          </>
        )}
      </section>
    </div>
  );
}

export default App;
