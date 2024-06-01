import { updateVerification } from "@/prisma/organization";

export async function POST(req) {
  let data = await req.json();
  let { success } = await updateVerification(data.orgno, true);
  if (success) {
    return Response.json({
      success: true,
      message: "Organization verified",
    });
  } else {
    return Response.json({
      success: false,
      message: "Failed to verify organization",
    });
  }
}
