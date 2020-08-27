import React from "react";

import { useTemplate } from "../../hooks/generate_pdf";
import template from "../../templates/pug/base.pug";
//template = require("../../templates/pug/base.pug").default;
//const template = require("../../templates/public/base");

export default function Branco() {
  const templater = useTemplate(template, {
    author: "John",
  });
  return (
    <div>
      <button type="button">Gerrar PDF!</button>
      {templater}
    </div>
  );
}
