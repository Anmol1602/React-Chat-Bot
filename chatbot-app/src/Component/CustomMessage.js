import React from "react";

function CustomMessage(props) {
  return (
    <div className="custom-message">
      <p>{props.message}</p>
    </div>
  );
}

export default CustomMessage;
