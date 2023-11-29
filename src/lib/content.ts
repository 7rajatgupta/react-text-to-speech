const API_URL = "http://localhost:5174/content";

/**
 * Fetch the content from the api
 */
const fetchContent = async () => {
  //get the content
  const response = await fetch(API_URL);
  const data = await response.json();
  return data?.content;
};

/**
 * Parse the content into sentences, and return an array of sentences. Look at the Readme for sample input and expected output.
 * Avoid using DOMParser for implementing this function.
 */
const parseContentIntoSentences = (content: string): string[] => {
  return (
    content
      .match(/<s>(.*?)<\/s>/g)
      ?.map((c) =>
        c.replace(/<\/?s>/g, "").concat(c.includes(".") ? " " : ".")
      ) ?? []
  );
};

export { fetchContent, parseContentIntoSentences };
