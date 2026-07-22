import pdfParse from "pdf-parse";

export async function extractTextFromPDF(buffer: Buffer) {
  try {
    const data = await pdfParse(buffer);

    return {
      success: true,
      text: data.text,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      text: "",
    };
  }
}