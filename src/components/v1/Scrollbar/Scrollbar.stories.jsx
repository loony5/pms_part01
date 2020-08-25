import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import Scrollbar from "./Scrollbar";

storiesOf("v1/Scrollbar", module)
  .add("Scrollbar Theme", () => React.createElement(() => {

    return (
      <div style={{ width: 500, height: 200, backgroundColor: "#0d0f14" }}>
        <Scrollbar
          autoHide={false}>
          <div style={{ width: 500, height: 700, backgroundColor: "#ffb100" }}>

          </div>
        </Scrollbar>
      </div>
    )
  }))