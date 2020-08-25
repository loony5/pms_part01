import React from "react";
import { storiesOf } from "@storybook/react";
import Button from "./Button";

storiesOf("v1/Button", module).add("Button Theme", () => (
  <div>
    <div style={{ margin: 20 }}>
      <Button size="large" color="white">
        large_white
      </Button>

      <Button size="medium" color="white">
        medium_white
      </Button>

      <Button size="small" color="white">
        small_white
      </Button>
    </div>

    <div style={{ margin: 20 }}>
      <Button size="large" color="red">
        large_red
      </Button>

      <Button size="medium" color="red">
        medium_red
      </Button>

      <Button size="small" color="red">
        small_red
      </Button>
    </div>

    <div style={{ margin: 20 }}>
      <Button bordered size="large" color="white">
        large_white
        </Button>

      <Button bordered size="medium" color="white">
        medium_white
        </Button>

      <Button bordered size="small" color="white">
        small_white
        </Button>
    </div>

    <div style={{ margin: 20 }}>
      <Button bordered size="large" color="red">
        large_red
        </Button>

      <Button bordered size="medium" color="red">
        medium_red
        </Button>

      <Button bordered size="small" color="red">
        small_red
        </Button>
    </div>

    <div style={{ margin: 20 }}>
      <Button size="large" disabled>
        disabled
      </Button>

      <Button size="medium" disabled>
        disabled
      </Button>

      <Button size="small" disabled>
        disabled
      </Button>
    </div>
  </div>
))