"use client";

interface Props {
  words: string[];
}

export default function WordList(props: Props) {
  const { words } = props;

  return (
    <>
      {words.map((word, i) => {
        return <p key={i}>{word}</p>;
      })}
    </>
  );
}
