import { notify } from "../helper/notification";
import { notifyType } from "../helper/notificationType";

export const postAPI = async (endpointURL, data) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_CROPCONNECT_API}${endpointURL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    if(responseData["userData"]){
      localStorage.setItem("userId", responseData["userId"]);
      return responseData["userData"];
    }
    if(responseData["sellerData"]){
      localStorage.setItem("sellerId", responseData["sellerData"]["_id"]);
      return responseData["sellerData"];
    }
    notify(responseData["message"], notifyType(response.status));
    return true;
  } catch (error) {
    notify(error, "error");
    return false;
  }
};

