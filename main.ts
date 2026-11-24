// funniest-out-of-office-reply — writes one original out-of-office reply
// to output/entry.txt. Node 22, zero dependencies. Run: node main.ts
import { mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const REPLY =
  "I'm on vacation. My replacement is a cron job with no sense of humour and full root access. It answers in 3–5 business eternities. Please hold.";

const outDir = join(process.cwd(), "output");
const outFile = join(outDir, "entry.txt");
const expectedBytes = Buffer.byteLength(REPLY, "utf8");

console.log(`reply: ${REPLY.length} chars, ${expectedBytes} bytes`);

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, REPLY, "utf8");

// Self-check: the bytes on disk must equal the reply, byte for byte.
const actualBytes = statSync(outFile).size;
const roundTrip = readFileSync(outFile, "utf8");
if (actualBytes !== expectedBytes || roundTrip !== REPLY) {
  throw new Error(
    `self-check failed: entry.txt is ${actualBytes} bytes, expected ${expectedBytes}`,
  );
}

console.log(`wrote ${outFile} (${actualBytes} bytes)`);
console.log("self-check ok: entry.txt matches the reply byte for byte.");
