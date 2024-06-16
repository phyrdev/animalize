import axios from "axios";

export async function POST(request) {
  let data = await request.formData();
  let file = data.get("file");
  let formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "df75ib8r");

  try {
    const uploadReq = await axios.post(
      `https://api.cloudinary.com/v1_1/doj9qpbek/image/upload`,
      formData
    );
    return Response.json({
      success: true,
      url: uploadReq.data.secure_url,
      publicId: uploadReq.data.public_id,
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: error,
    });
  }
}
