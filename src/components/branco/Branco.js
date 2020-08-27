import React from "react";
import { jsPDF } from "jspdf";

import { useTemplate, usePDF } from "../../hooks/generate_pdf";
import template from "../../templates/pug/base.pug";

export default function Branco() {
  const { generateAndOpen, html, loading } = usePDF(template, {
    author: "Peter",
  });
  return (
    <div>
      <button type="button" onClick={generateAndOpen}>
        Gerrar PDF!
      </button>
      {html}
      {loading}
    </div>
  );
}
