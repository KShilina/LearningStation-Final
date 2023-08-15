import React from "react";
import Chat from "./Chat";

const ChatModal = () => {
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary-chat"
        data-bs-toggle="modal"
        data-bs-target="#chatModal"
      >
        MESSAGE
      </button>

      <div className="modal fade" id="chatModal" tabIndex="-1" aria-labelledby="chatModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="chatModalLabel">Chat with Tutor</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <Chat />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
