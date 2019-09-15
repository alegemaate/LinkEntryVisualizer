// Hash url for id
function hashId(s) {
  return s.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);
}

// Build graph from link crawler output
export function buildGraph(input) {
  const nodes = input.map(({ url, status, content_type }) => ({
    id: `node_${hashId(url)}`,
    label: url,
    color: status === 200 ? "#080" : "#800",
    size: 1,
    x: Math.random(),
    y: Math.random(),
    type: content_type === "text/html" ? "circle" : "star",
  }));

  let edges = [];
  input.forEach(({ internal, url }) => {
    edges = edges.concat(
      internal.map(intUrl => ({
        id: `edge_${hashId(url + intUrl)}`,
        source: `node_${hashId(url)}`,
        target: `node_${hashId(intUrl)}`,
        color: "#888",
        type: "curvedArrow",
      }))
    );
  });

  return { nodes, edges };
}

// Check validity of output from LinkCrawler
export function checkValidity(input) {
  let parsed = [];

  // Length
  if (!input) {
    throw new Error(`Empty input`);
  }

  // JSON validity
  try {
    parsed = JSON.parse(input);
  } catch (e) {
    throw new Error(e.message);
  }

  // Length
  if (parsed.length === 0) {
    throw new Error(`Empty array`);
  }

  // Check keys
  parsed.forEach(
    ({ url, external, internal, depth, status, content_type }, index) => {
      // Check undefined
      if (typeof url === "undefined") {
        throw new Error(`url at index ${index} is undefined`);
      }
      if (typeof external === "undefined") {
        throw new Error(`external at index ${index} is undefined`);
      }
      if (typeof internal === "undefined") {
        throw new Error(`internal at index ${index} is undefined`);
      }
      if (typeof depth === "undefined") {
        throw new Error(`depth at index ${index} is undefined`);
      }
      if (typeof status === "undefined") {
        throw new Error(`status at index ${index} is undefined`);
      }
      if (typeof content_type === "undefined") {
        throw new Error(`content_type at index ${index} is undefined`);
      }

      // Check instances
      if (typeof url !== "string") {
        throw new Error(`url at index ${index} is not of string type`);
      }
      if (!(external instanceof Array)) {
        throw new Error(`external at index ${index} is not of array type`);
      }
      if (!(internal instanceof Array)) {
        throw new Error(`internal at index ${index} is not of array type`);
      }
      if (typeof depth !== "number") {
        throw new Error(`depth at index ${index} is not of number type`);
      }
      if (typeof status !== "number") {
        throw new Error(`status at index ${index} is not of number type`);
      }
      if (typeof content_type !== "string") {
        throw new Error(`content_type at index ${index} is not of string type`);
      }
    }
  );

  // Return validity
  return parsed;
}
