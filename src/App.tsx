import "./App.css";
import { useState, useEffect } from "react";
import { useSpeech } from "./lib/useSpeech";
import { Controls } from "./components/Controls";
import { CurrentlyReading } from "./components/CurrentlyReading";
import { fetchContent, parseContentIntoSentences } from "./lib/content";

function App() {
  const [sentences, setSentences] = useState<Array<string>>([]);
  const { currentWord, activeSentence, controls, playingState } =
    useSpeech(sentences);

  useEffect(() => {
    fetchContent()
      .then((content) => {
        const parsed = parseContentIntoSentences(content);
        setSentences(parsed);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <>
      <header className="header">
        <h1>Text to Speech </h1>
      </header>
      <section className="currently-reading">
        <CurrentlyReading
          word={currentWord}
          sentence={activeSentence}
          allSentences={sentences}
        />
      </section>
      <section className="controls">
        <Controls controls={controls} state={playingState} />
      </section>
    </>
  );
}

export default App;
