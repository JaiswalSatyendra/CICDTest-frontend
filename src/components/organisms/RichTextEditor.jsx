import React, { useState, useRef, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./TextEditor.scss";
import "draft-js/dist/Draft.css";

function TextEditor({ convertContentToHTML, setEditorState, editorState }) {
  const setDomEditorRef = useRef();
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    setDomEditorRef.current.focusEditor();
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((json) => {
        setSuggestions([
          { text: "FIRSTNAME", value: "{{first_name}}" },
          { text: "LASTNAME", value: "{{last_name}}" },
        ]);
      });
  }, []);

  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML(editorState.getCurrentContent());
  };

  return (
    <div className="App">
      <Editor
        placeholder="Enter some text..."
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        ref={setDomEditorRef}
        mention={{
          separator: " ",
          trigger: "@",
          suggestions: suggestions,
        }}
      />
    </div>
  );
}

export default TextEditor;
