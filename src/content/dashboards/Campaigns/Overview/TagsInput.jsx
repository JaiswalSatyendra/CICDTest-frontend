import React from "react";
import "./TagsInput.scss";
import { useEffect } from "react";
import { useRef } from "react";

const TagsInput = ({ tags, setTags }) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleInput = (e) => {
      e.preventDefault();
    };
    document.body.addEventListener("submit", handleInput);
  }, [ref]);

  const removeTags = (indexToRemove) => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
  };
  const addTags = (event) => {
    if (event.target.value !== "") {
      setTags([...tags, event.target.value]);
      event.target.value = "";
    }
  };
  return (
    <div className="ootags-input">
      <ul id="ootags">
        {tags.map((tag, index) => (
          <li key={index} className="ootag">
            <span className="ootag-title">{tag}</span>
            <span
              className="ootag-close-icon"
              onClick={() => removeTags(index)}
            >
              x
            </span>
          </li>
        ))}
      </ul>
      <input
        type="text"
        ref={ref}
        placeholder="Tags"
        onKeyUp={(event) => (event.key === "Enter" ? addTags(event) : null)}
      />
    </div>
  );
};

export default React.memo(TagsInput);
