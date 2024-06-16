export async function uploadImage(image) {
  const formData = new FormData();
  formData.append("file", image);
  try {
    const res = await fetch("/api/cloudinary/", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    return {
      success: data.success,
      url: data.url,
    };
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
}
