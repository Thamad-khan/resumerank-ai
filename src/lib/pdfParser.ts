import pdfParse from "pdf-parse";

export async function extractTextFromPDF(buffer: Buffer) {
  try {
    if (!buffer || buffer.length === 0) {
      return {
        success: false,
        text: "",
        error: "Empty PDF buffer",
      };
    }

    const data = await pdfParse(buffer);

    if (!data.text || data.text.trim().length === 0) {
      return {
        success: false,
        text: "",
        error: "No text found inside PDF",
      };
    }

    return {
      success: true,
      text: data.text,
    };
  } catch (error: unknown) {
    console.error("PDF Parse Error:", error);

    return {
      success: false,
      text: "",
      error:
        error instanceof Error
          ? error.message
          : "Unknown PDF parsing error",
    };
  }
}