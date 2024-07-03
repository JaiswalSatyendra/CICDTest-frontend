import "./index.scss";

const Journey = () => {
  return (
    <div className="journey">
      <div className="journey-content desktop">
        <div className="journey-content__data">
          <h1>Our Journey</h1>
          <hr />
          <p className="py-3">
            Data is everywhere. We are collecting more data at an incredible
            rate. Machine Learning provides the tools to extract intelligence
            from data and enable decisions. During their industrial experience
            at Adobe & Zurich, the founding team members spent years building
            systems which transformed raw data into intelligent decisions using
            machine learning. The founder’s saw that the broader societal
            benefits of machine learning could be realized once everyone has
            access to the technology & data. That was the vision they set out to
            realize at ConvertML.
          </p>
          <p>
            Today, ConvertML is a passionate and driven team based out of
            Chicago,USA and is working to place ML/Data at the heart of some of
            the world’s largest businesses.
          </p>
        </div>
        <div className="journey-content__image">
          <img src={"/images/journey1.jpg"}   alt='convertml' />
        </div>
      </div>

      <div className="journey-content mobile">
        <div className="journey-content__image">
          <img src={"/images/journey1.jpg"} className="p-20 py-5"  alt='convertml' />
        </div>
        <div className="journey-content__data mobile">
          <h1>Our Journey</h1>
          <hr />
          <p className="py-3">
            Data is everywhere. We are collecting more data at an incredible
            rate. Machine Learning provides the tools to extract intelligence
            from data and enable decisions. During their industrial experience
            at Adobe & Zurich, the founding team members spent years building
            systems which transformed raw data into intelligent decisions using
            machine learning. The founder’s saw that the broader societal
            benefits of machine learning could be realized once everyone has
            access to the technology & data. That was the vision they set out to
            realize at ConvertML.
          </p>
          <p>
            Today, ConvertML is a passionate and driven team based out of
            Chicago,USA and is working to place ML/Data at the heart of some of
            the world’s largest businesses.
          </p>
        </div>
      </div>
    </div>
  );
};
export default Journey;
