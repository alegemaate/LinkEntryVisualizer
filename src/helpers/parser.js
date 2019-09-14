// Hash url for id
function hashId(s) {
  return s.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);
}

// Build graph from link crawler output
export function buildGraph(input) {
  const nodes = input.map(({ url, status }) => ({
    id: `node_${hashId(url)}`,
    label: url,
    color: status === 200 ? "#080" : "#800",
  }));

  let edges = [];
  input.forEach(({ internal, url }) => {
    edges = edges.concat(
      internal.map(intUrl => ({
        id: `edge_${hashId(url + intUrl)}`,
        source: `node_${hashId(url)}`,
        target: `node_${hashId(intUrl)}`,
      }))
    );
  });

  return { nodes, edges };
}

// Check validity of output from LinkCrawler
export function checkValidity(input) {
  let parsed = [];

  // JSON validity
  try {
    parsed = JSON.parse(input);
  } catch (e) {
    throw new Error(e.message);
  }

  // Check keys
  parsed.forEach(({ url, external, internal, depth, status }, index) => {
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
  });

  // Return validity
  return parsed;
}
