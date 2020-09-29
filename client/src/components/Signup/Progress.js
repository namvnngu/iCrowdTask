import React, { useEffect } from "react";

const ProgressNumber = ({ numberProgress, setNumberProgress, url }) => {
  useEffect(() => {
    if (url) {
      setNumberProgress(null);
    }
  }, [url, setNumberProgress]);
  return (
    <div className="progress-bar" style={{ width: numberProgress + "%" }}></div>
  );
};

export default ProgressNumber;
