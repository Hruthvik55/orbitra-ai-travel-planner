import fs from "fs";
import PDFParser from "pdf2json";
import Tesseract from "tesseract.js";


const extractPdfText = (filePath) => {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataError", (errData) => {
      reject(errData.parserError);
    });

    pdfParser.on("pdfParser_dataReady", () => {
      const text = pdfParser.getRawTextContent();

      resolve(text);
    });

    pdfParser.loadPDF(filePath);
  });
};


const extractTextFromFile = async (filePath, mimeType) => {
  try {
    let extractedText = "";

    // PDF Extraction
    if (mimeType === "application/pdf") {
      extractedText = await extractPdfText(filePath);
    }

    // Image OCR
    else if (
      mimeType === "image/png" ||
      mimeType === "image/jpg" ||
      mimeType === "image/jpeg"
    ) {
      const result = await Tesseract.recognize(
        filePath,
        "eng"
      );

      extractedText = result.data.text;
    }

    return extractedText;

  } catch (error) {
    console.error("OCR Extraction Error:", error);

    throw new Error("Failed to extract text from file");
  }
};

export default extractTextFromFile;