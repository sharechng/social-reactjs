import _ from "lodash";
import { colors, createTheme, responsiveFontSizes } from "@material-ui/core";
import { softShadows, strongShadows } from "./shadows";
import typography from "./typography";

const baseOptions = {
  direction: "ltr",
  typography,
  overrides: {
    MuiTableCell: {
      root: {
        display: "table-cell",
        padding: "16px",
        fontSize: "12px !important",
        textAlign: "left",
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: "500",
        lineHeight: "1.43",
        borderBottom: "1px solid rgba(81, 81, 81, 1)",
        letterSpacing: "0.01071em",
        verticalAlign: "inherit",
      },
      head: {
        fontSize: '14px !important',
      }
    },
    MuiTable: {
      root: {
        width: "100%",
      },
    },
    MuiDialogContent: {
      root: {
        flex: "1 1 auto",
        padding: "3px 5px",
        overflowY: "none"
      },
    },
    MuiPickersDay: {
      daySelected: {
        color: "#fff",
        fontWeight: 500,
        backgroundColor: "#e31a89",
        "&:hover": {
          backgroundColor: "#e31a89",
        },
      },
    },
    MuiDialogActions: {
      root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    },
    MuiDialogTitle: {
      root: {
        padding: "3px 24px",
      },
    },
    // MuiListItem: {
    //   gutters: {
    //     paddingLeft: "none"
    //   }
    // },
    MuiSvgIcon: {
      fontSizeLarge: {
        fontSize: "2.1875rem",
      },
    },
    MuiDialog: {
      paperWidthSm: {
        padding: "15px",
      },
      paperWidthXs: {
        width: "100%",
        maxWidth: "340px",
        maxHeight: "80vh",
      },
    },
    MuiSelect: {
      root: {
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        paddingLeft: "15px",
        borderRadius: "18px",
      },
    },
    MuiInput: {
      root: {
        borderRadius: "10px",
      },
      underline: {
        "&:hover": {
          borderBottom: "none",
        },
        "&::before": {
          borderBottom: "none",
          display: "none",
        },
        "&::after": {
          borderBottom: "none",
        },
      },
    },
    MuiContainer: {
      root: {
        "@media(min-width:600px)": {
          paddingLeft: "0px",
          paddingRight: "0px",
        },
      },
    },
    MuiInputBase: {
      input: {
        padding: "10px",
        height: "2.1876em !important",
        "@media (max-width:767px)": {
          height: "18px !important",
        },
      },
      root: {
        cursor: "text",
        display: "inline-flex",
        position: "relative",
        fontSize: "12px",
        boxSizing: "border-box",
        alignItems: "center",
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: "500",
        lineHeight: "1.1876em",
        letterSpacing: "0.00938em",
        backgroundColor: "#242526",
        height: "50px",
      },
    },
    MuiFormGroup: {
      root: {
        display: "flex",
        flexWrap: "inherit",
        flexDirection: "row",
        justifyContent: "space-evenly !important",
        marginTop: "12px",
      },
    },
    MuiFormControlLabel: {
      root: {
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        marginLeft: "1px",
        marginRight: "16px",
        verticalAlign: "middle",
      },
    },
    MuiFormControl: {
      fullWidth: {
        width: "100%",
        // height: "45px",
      },
      marginDense: {
        marginTop: "0px",
      },
    },
    MuiIconButton: {
      root: {
        flex: "0 0 auto",
        color: "rgba(255, 255, 255, 0.54)",
        padding: "8px",
        overflow: "visible",
        fontSize: "1.5rem",
        textAlign: "center",
        transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        borderRadius: "50%",
        "&:hover": {
          backgroundColor: "none",
        },
      },
    },
    MuiButton: {
      containedPrimary: {
        backgroundColor: "#3C3C3C",
        "&:hover": {
          backgroundColor: "rgb(78 77 77)",
        },
      },
      root: {
        minWidth: "auto",
      },
      textPrimary: {
        color: "#BFBFBF",
        fontWeight: 500,
        fontSize: "14px !important",
        lineHeight: "17px",
      },
      containedSizeSmall: {
        padding: "4px 10px",
        fontSize: "0.8125rem",
      },
      contained: {
        primary: {
          color: "#FFFFFF",
          boxShadow:
            "0 0 1px 0 rgb(0 0 0 / 70%), 0 2px 2px -2px rgb(0 0 0 / 50%)",
        },
        secondary: {
          color: "#fff",
          backgroundColor: "#000000",
        },
      },
      outlinedSecondary: {
        color: "#E31A89",
        border: "1px solid #e31a89",
        backgroundColor: "#101010",
        "&:hover": {
          backgroundColor: "#e31a89",
          color: "#fff",
        },
      },
    },
    MuiLinearProgress: {
      root: {
        borderRadius: 3,
        overflow: "hidden",
      },
    },
    MuiPaper: {
      rounded: {
        borderRadius: "14px",
        "@media (max-width:767px)": {
          borderRadius: "5px",
        },
      },
    },

    MuiOutlinedInput: {
      inputAdornedEnd: {
        "@media (max-width:767px)": {
          padding: "6px 8px",
          fontSize: "10px",
        },
      },
      inputAdornedStart: {
        paddingLeft: 14,
      },
      root: {
        position: "relative",
        borderRadius: "14px",
        height: "auto",
        "&:hover": {
          "& .MuiOutlinedInput-notchedOutline": {
            border: "1px solid rgba(255, 255, 255, 0.23)"
          }
        },
        "& .Mui-focused": {
          "& .MuiOutlinedInput-notchedOutline": {
            border: "1px solid rgba(255, 255, 255, 0.23) !important"
          }
        }
      },
      input: {
        padding: "9px 10px",
        "&:-webkit-autofill": {
          WebkitBoxShadow: "none",
        },
        "@media (max-width:767px)": {
          padding: " 6px 8px",
          fontSize: "10px",
        },
      },
    },
    MuiList: {
      padding: {
        paddingTop: "none",
        paddingBottom: "none",
      },
    },
    MuiListItemIcon: {
      root: {
        minWidth: 32,
      },
    },
    MuiChip: {
      root: {
        backgroundColor: "rgba(0,0,0,0.075)",
      },
    },
  },
};

const themesOptions = [
  {
    name: "LIGHT",
    overrides: {
      MuiInputBase: {
        root: {
          backgroundColor: " #242526 !important",
        },
        input: {
          height: "2.1876em !important",
          "&::placeholder": {
            opacity: 1,
            color: "#1f73b7",
          },
        },
      },
    },
    palette: {
      type: "light",
      action: {
        active: colors.blueGrey[600],
      },
      background: {
        default: "rgba(255, 255, 255, 1);",
        dark: "#f4f6f8",
        paper: "#ECECEC",
      },
      primary: {
        main: "#000080",
      },
      secondary: {
        main: "#FF9933",
      },
      text: {
        primary: colors.blueGrey[900],
        secondary: colors.blueGrey[600],
      },
    },
    shadows: softShadows,
  },
  {
    name: "DARK",
    palette: {
      type: "dark",
      action: {
        active: "rgba(255, 255, 255, 0.54)",
        hover: "rgba(255, 255, 255, 0.04)",
        selected: "rgba(255, 255, 255, 0.08)",
        disabled: "rgba(255, 255, 255, 0.26)",
        disabledBackground: "rgba(255, 255, 255, 0.12)",
        focus: "rgba(255, 255, 255, 0.12)",
      },
      background: {
        default: "#101010;",
        dark: "#1c2025",
        paper: "#242526",
      },
      primary: {
        main: "#1f73b7",
      },
      secondary: {
        main: "#E31A89",
      },
      text: {
        primary: "#e6e5e8",
        secondary: "#adb0bb",
      },
    },
    shadows: strongShadows,
  },
];

export const createdTheme = (config = {}) => {
  let themeOptions = themesOptions.find((theme) => theme.name === config.theme);

  if (!themeOptions) {
    console.warn(new Error(`The theme ${config.theme} is not valid`));
    [themeOptions] = themesOptions;
  }

  let theme = createTheme(
    _.merge({}, baseOptions, themeOptions, { direction: config.direction })
  );

  if (config.responsiveFontSizes) {
    theme = responsiveFontSizes(theme);
  }

  return theme;
};
