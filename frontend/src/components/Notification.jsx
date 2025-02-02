import React, { useEffect } from "react";

const Notification = ({ message, onClose, color }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed bottom-4 right-4 text-white p-4 rounded shadow-lg ${color}`}>
      {message}
    </div>
  );
};

export default Notification;
