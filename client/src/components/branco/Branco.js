import React from "react";

import { usePDF } from "../../hooks/generate_pdf";
import { useFormik } from "formik";

export default function Branco() {
  const formik = useFormik({
    initialValues: {
      author: "peter",
    },
    onSubmit: () => {},
  });
  const { generateAndOpen } = usePDF("base", {
    author: formik.values.author,
  });
  return (
    <div>
      <form>
        <input
          type="text"
          name="author"
          value={formik.values.author}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </form>

      <button type="button" onClick={generateAndOpen}>
        Gerrar PDF!
      </button>
    </div>
  );
}
