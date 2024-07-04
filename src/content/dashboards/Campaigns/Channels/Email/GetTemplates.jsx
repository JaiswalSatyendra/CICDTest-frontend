import React from "react";
import { Link } from "react-router-dom";
import "./EmailScratch/index.scss";
import Spinner from "./Spinner";

const GetTemplates = ({ dataSearch, dataSearch1, search, loading }) => {
  return (
    <>
      {search === "" ? (
        <div className="cardset">
          {dataSearch1.map((value, index) => (
            <div className="card" key={index}>
              <p>{value.category}</p>
              {loading ? (
                <Spinner />
              ) : (
                <img
                  className="cardimg"
                  src={`${value.s3Location}/images/thumbnail.png`}
                  alt="templateimg"
                ></img>
              )}
              <a
                id="previewbtnes"
                href={`${value.s3Location}/index.html`}
                rel="noreferrer"
                target="_blank" rel="noopener noreferrer"
              >
                Preview
              </a>
              <br />
              <Link
                id="templatebtnscratch"
                to="/emaileditor-tempalte"
                target="_blank" rel="noopener noreferrer"
                onClick={() => {
                  localStorage.setItem("s3Location", value.s3Location);
                }}
              >
                Use this template
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="cardset">
          {dataSearch.map((value, index) => (
            <div className="card" key={index}>
              <p>{value.category}</p>
              {loading ? (
                <Spinner />
              ) : (
                <img
                  className="cardimg"
                  src={`${value.s3Location}/images/thumbnail.png`}
                  alt="templateimg"
                ></img>
              )}
              <a
                id="previewbtnes"
                href={`${value.s3Location}/index.html`}
                rel="noreferrer"
                target="_blank" rel="noopener noreferrer"
              >
                Preview
              </a>
              <br />
              <Link
                to="/emaileditor-tempalte"
                target="_blank" rel="noopener noreferrer"
                id="templatebtnscratch"
                onClick={() => {
                  localStorage.setItem("s3Location", value.s3Location);
                }}
              >
                Use this template
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default GetTemplates;
