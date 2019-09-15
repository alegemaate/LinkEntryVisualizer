import React, { useState, useEffect } from "react";
import LinkEntry from "../components/LinkEntry";
import Graph from "../components/Graph";
import { buildGraph, checkValidity } from "../helpers/parser";
import { defaultGraph } from "../constants/ex_graph";

export default function HomeView() {
  const [input, setInput] = useState(JSON.stringify(defaultGraph));
  const [validInput, setValidInput] = useState([]);
  const [error, setError] = useState("");
  const graph = buildGraph(validInput);

  // Validate json
  useEffect(() => {
    try {
      setValidInput(checkValidity(input));
      setError("");
    } catch (e) {
      setError(e.message);
    }
  }, [input]);

  return (
    <div id="home">
      <h2 className="page-title-bottom">Paste Link Crawler output Below</h2>
      <p>Input</p>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows="20"
      ></textarea>

      <p>Output</p>
      {!!error && <div className="error">{error}</div>}
      {!error && <Graph key={validInput.length} graph={graph} />}
      {!error &&
        validInput.map((link, index) => (
          <LinkEntry key={`${link.url}${index}`} {...link} />
        ))}
    </div>
  );
}
