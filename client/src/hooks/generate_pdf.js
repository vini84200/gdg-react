import { useState, useEffect, useRef, useCallback } from "react";
import { jsPDF } from "jspdf";
import html2pdf from "html2pdf.js";
import pug from "pug";

const BASEDIR = process.env.PUBLIC_URL + "/pug_templates";

var cache = {};
var cached = false;
var cachePromises = [];
const cache_files = ["/base.pug", "/print.css"];

// FIXME: Will not work in slow connections

cache_files.forEach((filepath) => {
  console.log(new Promise(() => {}));
  cache[filepath] = "::";
  cachePromises.push(
    new Promise((resolve) => {
      fetch(BASEDIR + filepath)
        .then((data) => {
          return data.text();
        })
        .then((text) => {
          cache[filepath] = text;
          // cachePromises[filepath].resolve();
          console.log("Cached", filepath);
          resolve();
          return text;
        });
    })
  );
});

var allCache = Promise.all(cachePromises);
allCache.then(() => (cached = true));
allCache.then(() => console.log("Finished caching"));
function getFile(file) {
  if (cache[file]) {
    return cache[file];
  }
  console.log(allCache, cachePromises, cached, cache);
  throw Error("Not found in cache " + file);
}

async function getFileAsync(file) {
  await cachePromises[file];

  return cache[file];
}

async function runOnLoad(f) {
  await allCache;
  console.log("Should be OK");
  f();
}

export function useTemplate(templateStr, locals, loading = "") {
  const [result, setResult] = useState(loading);
  const [isLoading, setLoading] = useState(true);

  const [templater, setTemplater] = useState(() => () => "");

  useEffect(() => {
    //BASEDIR + "/" + templateStr + ".pug"
    setLoading(true);
    runOnLoad(() => {
      setLoading(false);
      getFileAsync(`/${templateStr}.pug`).then((file) => {
        setTemplater(() => {
          return pug.compile(file, {
            basedir: "/",
            cache: cache,
            plugins: [
              {
                read: (filename, options) => {
                  console.log("Reading file", filename);
                  return getFile(filename);
                },
              },
            ],
          });
        });
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
    // const pdf = new jsPDF();
    // pdf.fromHTML(html).then(() => {
    //   console.log("Gerrado");
    //   cb(null, pdf);
    // });
    cb(
      null,
      html2pdf()
        .from(html)
        .toPdf()
    );
  }

  function generateAndOpen() {
    generate((error, pdf) => {
      if (error) return console.log(error);
      pdf.outputPdf("bloburi").then((uri) => {
        window.open(uri, "_blank");
      });
    });
  }

  return { generate, generateAndOpen, html, loading };
}
