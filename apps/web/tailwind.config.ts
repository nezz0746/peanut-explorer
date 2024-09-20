import conf from "@peanut/ui/tailwind.config";
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
        animation: {
          "slow-spin": "spin 80s linear infinite",
        },
        backdropBlur: {
          "3xl": "64px",
        },
      },
    },
  } as Partial<Config>,
  conf,
);
