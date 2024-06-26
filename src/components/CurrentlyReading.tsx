interface CurrentlyReadingProps {
  word: string;
  sentence: string;
  allSentences: string[];
}
export const CurrentlyReading = ({
  word,
  sentence,
  allSentences,
}: CurrentlyReadingProps) => {
  return (
    <div>
      <div>
        <h3>Currently Reading :</h3>
        <div>
          {sentence?.split(" ").map((currentWord: string, id: number) => {
            const isHighlightedWord = currentWord === word;
            return (
              <span
                key={id}
                className={isHighlightedWord ? "highlighed-word" : ""}
              >
                {currentWord}{" "}
              </span>
            );
          })}
        </div>
      </div>
      <div>All Sentences : {allSentences.join(" ")}</div>
    </div>
  );
};
