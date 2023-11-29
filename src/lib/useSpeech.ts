import { useState, useEffect } from "react";
import { PlayingState, createSpeechEngine } from "./speech";

const useSpeech = (sentences: Array<string>) => {
  /*
  Implement a custom useSpeech hook that uses a speech engine defined in 'speech.ts'
  to play the sentences that have been fetched and parsed previously.
  
  This hook should return react friendly controls for playing, and pausing audio as well as provide information about
  the currently read word and sentence
  */
  const [currentWord, setCurrentWord] = useState<string>("");
  const [playingState, setPlayingState] = useState<PlayingState>("initialized");
  const [currentSentenceId, setCurrentSentenceId] = useState<number>(0);

  const [speechEngine] = useState(() =>
    createSpeechEngine({
      onEnd: () => setCurrentSentenceId((previousId) => previousId + 1),
      onBoundary: (e) => {
        const id = e.charIndex;
        const sentence = e.utterance.text;
        const lengthOfWord = e.charLength;
        const currentlyReadWord = sentence.slice(id, id + lengthOfWord);
        setCurrentWord(currentlyReadWord);
      },
      onStateUpdate: setPlayingState,
    })
  );
  const activeSentence: string = sentences[currentSentenceId];
  const isEnded: boolean = currentSentenceId > sentences.length - 1;

  useEffect(() => {
    if (currentSentenceId >= 0 && activeSentence) {
      // load the senetence
      speechEngine.load(activeSentence);
      // Play the audio for the loaded sentence :
      speechEngine.play();
    }
  }, [currentSentenceId, activeSentence]);

  useEffect(() => {
    if (isEnded) {
      setCurrentSentenceId(-99);
    }
  }, [isEnded]);

  return {
    activeSentence,
    playingState,
    controls: {
      ...speechEngine,
      //play :
      play: () => {
        currentSentenceId >= 0 ? speechEngine.play() : setCurrentSentenceId(0);
      },
      //pause
      pause: () => {
        if (playingState === "playing") {
          speechEngine.pause();
          setPlayingState("paused");
        }
      },
      //cancel
      cancel: () => {
        speechEngine.cancel();
        setCurrentSentenceId(0);
        setCurrentWord("");
      },
    },
  };
};

export { useSpeech };
