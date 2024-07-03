import React, { useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { IoCloseOutline } from "react-icons/io5";

const VideoModal = ({ toggleModal }) => {
  const [videoLoading, setVideoLoading] = useState(true);

  const toggleSpinner = () => {
    setVideoLoading(!videoLoading);
  };

  return (
    <section className="modal__bg" onClick={toggleModal}>
      <div className="modal__align">
        <div className="modal__content">
          <IoCloseOutline
            className="modal__close relative left-full"
            arial-label="Close modal"
            onClick={toggleModal}
          />
          <div className="modal__video-align">
            {videoLoading ? (
              <div className="modal__spinner">
                <BiLoaderAlt className="modal__spinner-style" fadeIn="none" />
              </div>
            ) : null}
            <iframe
              className="modal__video-style"
              onLoad={toggleSpinner}
              loading="lazy"
              width="960"
              height="540"
              src="videos/Roadshow.mp4"
              title="Roadshow video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoModal;
