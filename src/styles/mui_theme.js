import { createTheme } from "@mui/material/styles";

const staticColors = {
  primaryMain: "#4caf50",
  secondaryMain: "#edf2ff",
  backgroundColorActive: "rgba(76,175,80, 0.5)",
  backgroundColorNotActive: undefined,
};

export const theme = createTheme({
  palette: {
    custom: {
      backgroundColorActive: staticColors.backgroundColorActive,
      backgroundColorNotActive: staticColors.backgroundColorNotActive,
    },
    primary: {
      main: staticColors.primaryMain,
    },
    secondary: {
      main: staticColors.secondaryMain,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          // ...(ownerState.variant === "contained" &&
          //   ownerState.color === "primary" && {
          //     backgroundColor: "#202020",
          //     color: "#fff",
          //   }),
          ...(ownerState.color === "primary" && {
            backgroundColor: staticColors.primaryMain,
            color: "#fff",
            "&:hover": {
              backgroundColor: staticColors.primaryMain + " 70%",
              color: staticColors.primaryMain,
            },
          }),
        }),
      },
    },
    MuiInput: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.color === "primary" && {
            // backgroundColor: "",
            color: staticColors.primaryMain,
          }),
        }),
      },
    },
  },
});
