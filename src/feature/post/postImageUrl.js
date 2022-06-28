import axios from "axios";
import {
  CLODINARY_CLOUD_NAME,
  CLODINARY_UPLOAD_PRESET,
} from "../../app/config";

const postImageUrl = async (image) => {
  if (!image) return "";
  try {
    const formdata = new FormData();
    formdata.append("file", image);
    formdata.append("upload_preset", CLODINARY_UPLOAD_PRESET);
    try {
      const response = await axios({
        url: `https://api.cloudinary.com/v1_1/${CLODINARY_CLOUD_NAME}/image/upload`,
        method: "POST",
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" },
      });
      const ImageUrl = response.data.secure_url;
      return ImageUrl;
    } catch (error) {
      throw error;
    }
  } catch (error) {}
};

export default postImageUrl;
