import "@draft-js-plugins/mention/lib/plugin.css";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import createMentionPlugin from "@draft-js-plugins/mention";
import "./EmailEditor2.scss";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./TextEditor.scss";
import "draft-js/dist/Draft.css";
import "@draft-js-plugins/mention/lib/plugin.css";

export default function RemoteMentionEditor() {
  const ref = useRef(null);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const { MentionSuggestions, plugins } = useMemo(() => {
    const mentionPlugin = createMentionPlugin({
      entityMutability: "IMMUTABLE",
      mentionTrigger: ["{{", "("],
      supportWhitespace: true,
    });
    // eslint-disable-next-line no-shadow
    const { MentionSuggestions } = mentionPlugin;
    // eslint-disable-next-line no-shadow
    const plugins = [mentionPlugin];
    return { plugins, MentionSuggestions };
  }, []);

  const onOpenChange = useCallback((_open) => {
    setOpen(_open);
  }, []);
  const onSearchChange = useCallback(({ value }) => {}, []);

  const handleEditorChange = (state) => {
    setEditorState(state);
    // convertContentToHTML(editorState.getCurrentContent());
  };

  return (
    <div
      className="editor"
      onClick={() => {
        ref.current.focus();
      }}
    >
      <Editor
        editorKey={"editor"}
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        plugins={plugins}
        ref={ref}
      />
      <MentionSuggestions
        open={open}
        onOpenChange={onOpenChange}
        suggestions={suggestions}
        onSearchChange={onSearchChange}
        onAddMention={() => {
          // get the mention object selected
        }}
      />
    </div>
  );
}
