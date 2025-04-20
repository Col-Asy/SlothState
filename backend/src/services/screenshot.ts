// backend/src/services/screenshot.ts
import puppeteer from "puppeteer";
import { Buffer } from "buffer";

export async function captureScreenshot(url: string): Promise<Buffer> {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });
    await page.goto(url, { waitUntil: "networkidle2" });

    const screenshot = await page.screenshot({
      fullPage: true,
      encoding: "binary",
    });

    return Buffer.from(screenshot);
  } finally {
    await browser.close();
  }
}
