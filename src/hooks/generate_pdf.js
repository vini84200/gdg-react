import { useState, useEffect, useRef, useCallback } from "react";
import { jsPDF } from "jspdf";

import pug from "pug";

const BASEDIR = process.env.PUBLIC_URL + "/pug_templates/";

export function useTemplate(templateStr, locals, loading = "") {
  const [result, setResult] = useState(loading);
  const [isLoading, setLoading] = useState(true);

  const [templater, setTemplater] = useState(() => () => "");

  useEffect(() => {
    setLoading(true);
    fetch(BASEDIR + templateStr + ".pug").then((data) => {
      data.text().then((data) => {
        console.log("Got new templater");
        setTemplater(() => {
          return pug.compile(data, {
            basedir: BASEDIR,
            plugins: [
              {
                read: (filename, options) => {
                  console.log("Reading file", filename);
                  return "peter parker";
                },
              },
            ],
          });
        });
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
