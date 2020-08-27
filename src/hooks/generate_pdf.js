import { useState, useEffect, useRef, useCallback } from "react";
import { jsPDF } from "jspdf";

import pug from "pug";

export function useTemplate(templateStr, locals, loading = "") {
  const [result, setResult] = useState(loading);
  const [isLoading, setLoading] = useState(true);

  const [templater, setTemplater] = useState(() => () => "");

  useEffect(() => {
    setLoading(true);
    fetch(templateStr).then((data) => {
      data.text().then((data) => {
        console.log("Got new templater");
        setTemplater(() => pug.compile(data));
        setLoading(false);
      });
    });
  }, [templateStr]);

  useEffect(() => {
    console.log(templater);
    setResult(templater(locals));
  }, [locals, templater]);

  return [result, isLoading];
}

export function usePDF(templateStr, locals) {
  const [html, loading] = useTemplate(templateStr, locals);

  function generate(cb) {
    if (loading) return cb("Still Loading...");
    const pdf = new jsPDF();
    pdf.html(html).then(() => {
      console.log("Gerrado");
      cb(null, pdf);
    });
  }

  function generateAndOpen() {
    generate((error, pdf) => {
      if (error) return console.log(error);
      window.open(pdf.output("bloburi"), "_blank");
    });
  }

  return { generate, generateAndOpen, html, loading };
}
