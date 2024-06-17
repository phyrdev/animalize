import puppeteer from "puppeteer";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  let url =
    "https://www.bannerbear.com/blog/how-to-download-images-from-a-website-using-puppeteer/";

  async function generatePDF(url, outputPath) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle0" });
    await page.emulateMediaType("screen");
    const pdf = await page.pdf({
      path: "/public/result.pdf",
      margin: { top: "100px", right: "50px", bottom: "100px", left: "50px" },
      printBackground: true,
      format: "A4",
    });
    await browser.close();
  }
  try {
    await generatePDF(url, "outputPath.pdf");
    return Response.json({
      message: "PDF generated successfully",
    });
  } catch (error) {
    console.log(error);
    return Response.json({
      message: "Error generating PDF",
    });
  }
}
