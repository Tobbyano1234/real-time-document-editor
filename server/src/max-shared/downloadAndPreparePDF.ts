import fetch from "node-fetch";

import { Attachment } from "../max-messaging/services/mail/types";

export async function downloadAndPreparePDF(
  url: string,
  fileName: string
): Promise<Attachment | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const buffer = await response.arrayBuffer();
    const base64Content = Buffer.from(buffer).toString("base64");

    return {
      name: fileName,
      content: base64Content,
      mime_type: "application/pdf",
      encoding: "base64",
    };
  } catch (error) {
    console.error("Error downloading and preparing PDF:", error);
    return null;
  }
}
