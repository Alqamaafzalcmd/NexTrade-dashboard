import react, { useState, useEffect } from "react";
import axios from "axios";

function Flash() {
  let [flash, setFlash] = useState(null);

  useEffect(() => {
    const getMessage = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/flash-message`,
        {
          withCredentials: true,
        },
      );

      if (res.data.success) {
        setFlash({
          message: res.data.success,
          type: "success",
        });
      }
      if (res.data.error) {
        setFlash({
          message: res.data.error,
          type: "error",
        });
      }
    };

    getMessage();
  }, []);

  if (!flash) return null;

  const alertClassName =
    flash.type === "success"
      ? "alert alert-success alert-dismissible fade show"
      : "alert alert-danger alert-dismissible fade show";

  if (flash.type === "success") {
    return (
      <div
        style={{
          position: "fixed",
          top: "65px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "40%",
          zIndex: 1050,
        }}
      >
        <div className={alertClassName} role="alert" style={{ marginBottom: 0 }}>
          {flash.message}
          <button
            type="button"
            className="btn-close"
            onClick={() => setFlash(null)}
            aria-label="Close"
          ></button>
        </div>
      </div>
    );
  }

  if (flash.type === "error") {
    return (
      <div
        style={{
          position: "fixed",
          top: "65px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "40%",
          zIndex: 1050,
        }}
      >
        <div
          className={alertClassName}
          role="alert"
          style={{ marginBottom: 0 }}
        >
          {flash.message}
          <button
            type="button"
            className="btn-close"
            onClick={() => setFlash(null)}
            aria-label="Close"
          ></button>
        </div>
      </div>
    );
  }
}

export default Flash;
