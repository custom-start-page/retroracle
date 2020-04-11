"use strict";

// import React, { Component } from "react";
// import { render } from "react-dom";
// import Form from "react-jsonschema-form";
const Form = JSONSchemaForm.default;
const storage = new CustomStartStorage();

async function getSchema() {
  return await fetch('/manifest/schema.json').then(res => res.json()).then(out => {
    return out;
  }).catch(err => {
    throw err;
  });
}

const submit = data => {
  console.log('submit', data);
  storage.set(data.formData);
  window.parent.reloadPreview();
};

const del = () => {
  storage.delete();
  window.parent.reloadPreview();
};

async function render() {
  const formData = await storage.get();
  const schema = await getSchema();
  ReactDOM.render(React.createElement(Form, {
    schema: schema,
    formData: formData // onChange={log("changed")}
    ,
    onSubmit: submit // onError={log("errors")}

  }, React.createElement("footer", {
    className: "sticky-footer"
  }, React.createElement("div", {
    className: "container "
  }, React.createElement("button", {
    className: "btn btn-success"
  }, "Save and update preview"), React.createElement("button", {
    className: "btn btn-warning pull-right",
    onClick: () => {
      window.parent.location = '/';
    }
  }, "Save and view result")))), document.getElementById("form"));
}

render();
//# sourceMappingURL=edit.min.js.map
