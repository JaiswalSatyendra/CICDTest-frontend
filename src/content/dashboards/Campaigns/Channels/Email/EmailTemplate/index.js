import React, { useState, useEffect, useCallback } from "react";
import GetTemplates from "../GetTemplates";
import SavedTemplates from "../SavedTemplates";
import RecipientsInfo from "../../../../../../components/atoms/RecipientsInfo";
import Popup from "./Popuppreview";
import Pagination from "../Pagination";
import useRefMounted from "../../../../../../hooks/useRefMounted";
import Logo from "./logo.png";
import Spinner from "../Spinner";
import DOMPurify from "dompurify";
import axios, { Axios } from "axios";
import { Link } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "draft-js/dist/Draft.css";
import "./index.scss";
import SaveTemplate from "./SaveTemplate";

const DashboardEmailTemplate = () => {
  const [suggestions, setSuggestions] = useState("");

  //CardData
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const isMountedRef = useRefMounted();
  const [content, setContent] = useState("");

  //pagination
  const [cardcount] = useState(5);
  const [current, setcurrent] = useState(1);
  const indexOfLastPost = current * cardcount;
  const indexOfFirstPost = indexOfLastPost - cardcount;
  const currentCards = users.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setcurrent(pageNumber); //change page

  const [search, setSearch] = useState("");
  const [show, setShow] = useState(true);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  // const [selectedFile, setSelectedFile] = useState();
  // const [isFilePicked, setIsFilePicked] = useState(false);
  const [isScratch, setIsScratch] = useState("fromtemplate");
  const [btnstyle, setbtnstyle] = useState("child2");
  const [btnstyle2, setbtnstyle2] = useState("child1");
  const [btnstyle3, setbtnstyle3] = useState("child3");

  const [openDialog, setOpenDialog] = useState(false);

  //content paraphrasing api

  const getParaphrasing = useCallback(async () => {
    const params = new URLSearchParams();
    params.append("text", content);
    await axios
      .post(`${process.env.REACT_APP_ALGO_API_URL}/Paraphrasing/`, params, {
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        console.log(response);
        setSuggestions(response.data);
      })

      .catch((err) => {
        console.log(err);
        setSuggestions("");
      });
  });

  //templates api
  const getUsers = useCallback(async () => {
    try {
      if (isMountedRef.current) {
        setLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/emailTemplates/list`,
          { withCredentials: true }
        );
        setUsers(response.data.data);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  //popup
  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  //popup

  const deleteContent = () => {
    alert("Are you sure, you want to delete content in the editor?");
    setEditorState(EditorState.createEmpty());
  };

  const saveContentinbrowser = () => {
    setOpenDialog(true);
  };

  //for attachement button
  //const hiddenFileInput = React.useRef(null);
  // const handleClick = () => {
  //   hiddenFileInput.current.click();
  // };

  //popup for content paraprshaing
  const [isOpen2, setIsOpen2] = useState(false);
  const togglePopup2 = () => {
    setIsOpen2(!isOpen2);
  };

  // const handleChangeAttachment = (event) => {
  //   setSelectedFile(event.target.files[0]);
  //   setIsFilePicked(true);
  //   console.log(event.target.files[0].name);
  // };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  let dataSearch = users.filter((value) => {
    return Object.keys(value).some((key) =>
      value[key]
        .toString()
        .toLowerCase()
        .includes(search.toString().toLowerCase())
    );
  });
  let dataSearch1 = currentCards.filter((value) => {
    return Object.keys(value).some((key) =>
      value[key]
        .toString()
        .toLowerCase()
        .includes(search.toString().toLowerCase())
    );
  });

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };
  return (
    <div className="emailScratchContainer">
      <div className="headinges">
        <img src={Logo}  alt='convertml' />
        <h1>Design Email Campaign</h1>
      </div>
      <hr /> <br />
      {show ? <RecipientsInfo /> : null}
      <div className="choices">
        <div className="optionsES">
          <div className={btnstyle}>
            <span
              onClick={() => {
                setIsScratch("fromscratch");
                setbtnstyle("child1");
                setbtnstyle2("child2");
                setbtnstyle3("child3");
                setShow(true);
              }}
              aria-label="lab API tabs example"
            >
              Start from scratch
            </span>
          </div>
          <div className={btnstyle2}>
            <span
              onClick={() => {
                setIsScratch("fromtemplate");
                setbtnstyle("child2");
                setbtnstyle2("child1");
                setbtnstyle3("child3");
                setShow(true);
              }}
            >
              Templates
            </span>
          </div>
          <div className={btnstyle3}>
            <span
              onClick={() => {
                setIsScratch("savedtemplate");
                setbtnstyle("child3");
                setbtnstyle2("child2");
                setbtnstyle3("child1");
                setShow(true);
              }}
            >
              Saved templates
            </span>
          </div>
        </div>
        <div className="results">
          <button onClick={togglePopup2}>Content Paraphrase</button>
        </div>
      </div>
      {/* {show ? ( */}
      <div className="functions">
        {/* <input
            type="file"
            placeholder="Add attachment"
            id="dialog"
            ref={hiddenFileInput}
            onChange={handleChangeAttachment}
          />
          {isFilePicked ? (
            <div>
              <p className="attachFilees">{selectedFile.name}</p>
            </div>
          ) : (
            <div id="attachname">
              <p className="attachFile">Attachment name</p>
            </div>
          )}
          <button onClick={handleClick}>Add attachment</button> */}
        <Link id="htmleditorbtn" to="/emaileditor-fromScratch" target="_blank" rel="noopener noreferrer">
          Create a HTML Email Template
        </Link>
      </div>
      {/* ) : null} */}
      {(() => {
        switch (isScratch) {
          case "fromscratch":
            return (
              <>
                <div className="texteditorparentclass">
                  <Editor
                    className="textedit"
                    placeholder="Enter some text..."
                    editorState={editorState}
                    onEditorStateChange={setEditorState}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                    // mention={{
                    //   separator: " ",
                    //   trigger: "@",
                    //   suggestions: suggestions,
                    // }}
                  />
                  <div className="texteditorbtns">
                    <button onClick={togglePopup}>PREVIEW</button>
                    <button onClick={deleteContent}>RESET</button>
                    <button onClick={saveContentinbrowser}>SAVE</button>
                  </div>
                </div>
                {isOpen && (
                  <Popup
                    content={
                      <>
                        <div className="preview">
                          <div
                            id="texteditorprevieweditor"
                            dangerouslySetInnerHTML={createMarkup(
                              draftToHtml(
                                convertToRaw(editorState.getCurrentContent())
                              )
                            )}
                          ></div>
                        </div>
                      </>
                    }
                    handleClose={togglePopup}
                  />
                )}
                {isOpen2 && (
                  <Popup
                    content={
                      <>
                        <div className="preview2">
                          <h1>Content Paraphrasing</h1>
                          {/* <div>{content}</div> */}
                          <textarea
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Copy some content from rich text editor to get useful suggestions below!"
                          />
                          <h2>Suggestions:</h2>
                          <div>{suggestions}</div>
                          <button onClick={getParaphrasing}>
                            Load Suggestions
                          </button>
                        </div>
                      </>
                    }
                    handleClose={togglePopup2}
                  />
                )}
              </>
            );
          case "fromtemplate":
            return (
              <>
                <div className="searchemailt">
                  <input
                    type="text"
                    placeholder="Search templates here..."
                    value={search}
                    onChange={handleSearch.bind(this)}
                  />
                  <button>Search</button>
                </div>
                <div className="optionsemailtemplate">
                  <div className="etline1">
                    <div className="etsomeoptions">
                      <button value="Welcome" onClick={handleSearch}>
                        Welcome Email
                      </button>
                      <button value="Newsletter" onClick={handleSearch}>
                        Newsletter Email
                      </button>
                      <button value="Free gifts" onClick={handleSearch}>
                        Free Gifts Email
                      </button>
                      <button value="Hiring" onClick={handleSearch}>
                        Hiring Email
                      </button>
                      <button value="Product launch" onClick={handleSearch}>
                        Product launch Email
                      </button>
                    </div>
                  </div>
                  <div className="etline2">
                    <button value="Sales" onClick={handleSearch}>
                      Sales Session Email
                    </button>
                    <button value="Survey" onClick={handleSearch}>
                      Survey Email
                    </button>
                    {/* <button value="Cart Abandoned" onClick={handleSearch}>
                      Cart abandoned Email
                    </button> */}
                  </div>
                </div>
                {loading ? (
                  <Spinner />
                ) : (
                  <GetTemplates
                    dataSearch={dataSearch}
                    dataSearch1={dataSearch1}
                    search={search}
                    loading={loading}
                  />
                )}
                <div className="temppagination">
                  <Pagination
                    postPerPage={cardcount}
                    totalPosts={users.length}
                    paginate={paginate}
                  />
                </div>
              </>
            );
          case "savedtemplate":
            return <SavedTemplates />;
          default:
            return <></>;
        }
      })()}
      <SaveTemplate
        open={openDialog}
        setOpenDialog={setOpenDialog}
        editorState={editorState}
      />
    </div>
  );
};

export default DashboardEmailTemplate;
