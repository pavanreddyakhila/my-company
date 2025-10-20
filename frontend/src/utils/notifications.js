// src/utils/notifications.js
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

export const notify = (msg, type = "info") => {
  switch(type) {
    case "success":
      toast.success(msg);
      break;
    case "error":
      toast.error(msg);
      break;
    case "warn":
      toast.warn(msg);
      break;
    default:
      toast.info(msg);
  }
};
