import React from 'react';
import loading from './loader.gif';

const Spinner = () => {
      return(
          <div style={{textAlign: "center", margin: "4vw"}}>
              <img style={{height: "5vh"}} src={loading}  alt='convertml' />
          </div>
      )
}

export default Spinner;