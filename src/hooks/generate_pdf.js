import { useState, useEffect, useRef } from "react";
import pug from "pug";

export function useTemplate(templateStr, locals, loading = "") {
  const [result, setResult] = useState(loading);
  useEffect(() => {
    fetch(templateStr).then((data) => {
      data.text().then((data) => {
        setResult(pug.render(data, locals));
      });
    });
  }, [templateStr, locals]);

  return result;
}
