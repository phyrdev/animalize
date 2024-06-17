import puppeteer from "puppeteer";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  let url = `https://animalize.io/final-report/${id}/s`;

  async function generatePDF(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle0" });
    await page.emulateMediaType("print");
    await page.pdf({
      path: `public/reports/${id}.pdf`,
      printBackground: true,
      format: "A4",
    });
    await browser.close();
  }
  try {
    await generatePDF(url);
    return Response.redirect(`https://animalize.io/reports/${id}.pdf`, 302);
  } catch (error) {
    console.log(error);
    return Response.json({
      message: "Error generating PDF",
    });
  }
}
