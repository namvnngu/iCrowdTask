import React from "react";

const ModalNote = ({ error, setError }) => {
  return (
    <div className="ui dimmer modals page transition visible active ">
      <div className="modal-container">
        <div
          className="ui mini test modal transition visible active"
          style={{ transform: "translateX(-15px)" }}
        >
          <div className="content">
            <p>{error}</p>
          </div>
          <div className="actions">
            <div
              className="ui negative right labeled icon button"
              onClick={() => setError(null)}
            >
              Close
              <i className="window close outline icon"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalNote;
