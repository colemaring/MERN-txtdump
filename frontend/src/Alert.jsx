import React, { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";

const AlertComponent = ({
  initialMessage = "test",
  initialVariant = "success",
}) => {
  const [alertVariant, setAlertVariant] = useState(initialVariant);
  const [alertMessage, setAlertMessage] = useState(initialMessage);
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    if (alertVisible) {
      const timeoutId = setTimeout(() => {
        setAlertVisible(false);
      }, 3000); // in ms

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [alertVisible]);

  const showAlert = (message, variant) => {
    setAlertVariant(variant);
    setAlertMessage(message);
    setAlertVisible(true);
  };

  return (
    <div className="position-absolute" style={{ top: "10px", zIndex: 999 }}>
      <Alert
        variant={alertVariant}
        onClose={() => setAlertVisible(false)}
        dismissible
      >
        {alertMessage}
      </Alert>
    </div>
  );
};

export default AlertComponent;
