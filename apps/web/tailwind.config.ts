import conf from "@repo/ui/tailwind.config";
import type { Config } from "tailwindcss";
import { merge } from "lodash";

export default merge(
  {
    theme: {
      extend: {
        fontFamily: {
          peanut: "Peanut, sans-serif",
          "peanut-fill": "PeanutFill, sans-serif",
        },
      },
    },
  } as Partial<Config>,
  conf,
);
