import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const greenTheme = createTheme({
   palette: {
      primary: {
         main: '#4B6F44'
      },
      secondary: {
         main: '#006400'
      },
      error: {
         main: red.A400,
      },
   }
});
