import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    gray: {

			"0": '#F8F9FA',
      "1": "#868E96",
      "2": "#343B41",
      "3": "#212529",
      "4": "#121214",
      
    },
    colorPrimary: {
      "1": "#FF577F",
			"focus": '#FF427F',
			"negative": "#59323F"
    },
		toastColor:{
			'sucess':'#3FE864',
			'negative': '#E83F5B'
		}
  },
  fonts: {
    heading: 'Inter', 
    body: "Inter",
  },
  styles: {
    global: {
      body: {
        bg: "gray.4",
        color: "white",
      },
    },
  },
  breakpoints: {
    sm: "320px",
    md: "768px",
    lg: "960px",
    xl: "1200px",
  },
});