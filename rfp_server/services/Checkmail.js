import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

import cron from "node-cron";
import Imap from "imap-simple";
import { simpleParser } from "mailparser";
import PDFParser from "pdf2json";
import { StoreReply } from "../schema/rfc.model.js";


const safeDecode = (str) => {
  try {
    return decodeURIComponent(str.replace(/%([0-9A-F]{2})/g, (match, p1) => {
      try {
        return String.fromCharCode('0x' + p1);
      } catch {
        return match; 
      }
    }));
  } catch (e) {
    return str; 
  }
};


const extractPdfText = (buffer) => {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataReady", (pdfData) => {
      let fullText = "";

      for (const page of pdfData.Pages) {
        if (!page.Texts || page.Texts.length === 0) {
          fullText += "\n";
          continue;
        }

        const pageText = page.Texts.map(textItem => {
          if (!textItem.R || textItem.R.length === 0) return "";
          const encoded = textItem.R[0].T || "";
          return safeDecode(encoded);
        }).join("");

        fullText += pageText + "\n\n";
      }

      resolve(fullText.trim() || "(No text found in PDF)");
    });

    pdfParser.on("pdfParser_dataError", (err) => {
      reject(new Error("PDF parsing failed: " + err.parserError));
    });

    pdfParser.parseBuffer(buffer);
  });
};


const checkForReplies = async () => {
  let connection = null;
  try {
    console.log(`\n[${new Date().toLocaleString()}] Checking for RFP replies...`);

    connection = await Imap.connect({
      imap: {
        user: process.env.EMAIL,                   
        password: process.env.EMAIL_KEY,        
        host: "imap.gmail.com",
        port: 993,
        tls: true,
        authTimeout: 10000,
        tlsOptions: { rejectUnauthorized: false },
      },
    });

    await connection.openBox("INBOX");

    const messages = await connection.search(["UNSEEN"], {
      bodies: [""],
      struct: true,
      markSeen: true,
    });

    if (messages.length === 0) {
      console.log("No new emails.\n");
      return;
    }

    console.log(`Found ${messages.length} new email(s)\n`);

    for (const msg of messages) {
      const part = msg.parts.find(p => p.which === "");
      const parsed = await simpleParser(part.body);

      const subject = (parsed.subject || "").trim();
      const from = parsed.from?.text || "unknown";

      
      const rfpMatch = subject.match(/RFP-([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})/i);
      if (!rfpMatch) {
        console.log(`Ignored: ${subject}`);
        continue;
      }

      const rfpId = rfpMatch[1];

      

      const body = (parsed.text || "").replace(/\s+/g, " ").trim();
      if (body) console.log("Message: " + body.substring(0, 400) + "...");

      
      if (parsed.attachments?.length > 0) {
        console.log(`\n${parsed.attachments.length} attachment(s) → Extracting PDFs...\n`);

        for (const att of parsed.attachments) {
          if (att.contentType !== "application/pdf") continue;

          const filename = att.filename || "unknown.pdf";
          console.log(`PDF: ${filename} (${(att.size/1024).toFixed(1)} KB)`);

          try {
            const text = await extractPdfText(att.content);
            
            StoreReply(rfpId,body,text,from)
          } catch (err) {
            console.error(`Failed to extract text from ${filename}:`, err.message);
          }
        }
      } else {
            StoreReply(rfpId,body,from)

        
      }

      
    }

  } catch (err) {
    console.error("Error:", err.message || err);
  } finally {
    if (connection) connection.end();
  }
};

cron.schedule("*/2 * * * *", checkForReplies);
checkForReplies();

