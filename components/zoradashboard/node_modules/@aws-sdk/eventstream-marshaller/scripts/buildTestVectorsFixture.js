const { Buffer } = require("buffer");
const { readdirSync, readFileSync, writeFileSync } = require("fs");
const { dirname, join } = require("path");

const HEADER_TYPES = [
  "boolean",
  "boolean",
  "byte",
  "short",
  "integer",
  "long",
  "binary",
  "string",
  "timestamp",
  "uuid",
];

const vectorsDir = join(dirname(__dirname), "test_vectors");
let vectors = "\n";

for (const dirName of ["positive", "negative"]) {
  const encodedVectorsDir = join(vectorsDir, "encoded", dirName);
  const decodedVectorsDir = join(vectorsDir, "decoded", dirName);

  for (const vectorName of readdirSync(encodedVectorsDir)) {
    vectors += `    ${vectorName}: {
        expectation: '${dirName === "positive" ? "success" : "failure"}',
        encoded: Uint8Array.from([${readFileSync(join(encodedVectorsDir, vectorName))
          .map((byte) => byte.toString(10))
          .join(", ")}]),
`;

    if (dirName === "positive") {
      const decoded = JSON.parse(readFileSync(join(decodedVectorsDir, vectorName)));
      const headers = decoded.headers
        .map(
          (declaration) =>
            `               '${declaration.name}': {
                    type: '${HEADER_TYPES[declaration.type]}',
                    value: ${headerValue(declaration.type, declaration.value)},
                },`
        )
        .join("\n");

      vectors += `        decoded: {
            headers: {
${headers}
            },
            body: ${writeBuffer(Buffer.from(decoded.payload, "base64"))},
        },
`;
    }

    vectors += "    },\n";
  }
}

writeFileSync(
  join(dirname(__dirname), "src", "TestVectors.fixture.ts"),
  `import { TestVectors } from './vectorTypes.fixture';
import { Int64 } from './Int64';

export const vectors: TestVectors = {${vectors}};
`
);

function headerValue(type, vectorRepresentation) {
  switch (type) {
    case 0:
      return "true";
    case 1:
      return "false";
    case 5:
      return `Int64.fromNumber(${vectorRepresentation})`;
    case 6:
      return writeBuffer(Buffer.from(vectorRepresentation, "base64"));
    case 7:
      return `'${Buffer.from(vectorRepresentation, "base64").toString()}'`;
    case 8:
      return `new Date(${vectorRepresentation})`;
    case 9:
      const hex = Buffer.from(vectorRepresentation, "base64").toString("hex");
      return `'${hex.substr(0, 8)}-${hex.substr(8, 4)}-${hex.substr(12, 4)}-${hex.substr(16, 4)}-${hex.substr(20)}'`;
    default:
      return vectorRepresentation;
  }
}

function writeBuffer(buffer) {
  return `Uint8Array.from([${buffer.map((byte) => byte.toString(10)).join(", ")}])`;
}
