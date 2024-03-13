import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    text: {
      primary: "#252525", // Основной цвет текста для всего приложения
    },
    primary: {
      main: "#D40C51", // Основной цвет
      // light и dark можно также определить, если необходимо
    },
  },
  typography: {
    fontFamily: ["Montserrat", "sans-serif"].join(","),
    allVariants: {
      color: "#252525", // Применяет цвет ко всем вариантам текста
    },
  },
  components: {
    MuiSelect: {
      styleOverrides: {
        select: {
          backgroundColor: "#EAEAEA", // Задний фон
          //   border: '1px solid #ACACAC', // Граница
          borderRadius: "15px", // Радиус границы
          "&:focus": {
            backgroundColor: "#EAEAEA", // Сохраняет задний фон при фокусе
          },
          padding: "12px 15px"
        },
        icon: {
          color: "#252525", // Цвет иконки селекта, чтобы сочетаться с оформлением
        },
        root: {
          // Убрать границу для всех OutlinedInput, включая Select
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          // border: "none", // Удаление границы
          // другие стили
        },
        notchedOutline: {
          // border: "none", // Специфично для OutlinedInput, удаляет границу
        },
      },
    },
    MuiCard: {
        styleOverrides: {
          root: {
            border: '1px solid #ACACAC', // Устанавливаем границу
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.15)', // Устанавливаем тень
            borderRadius: "20px"
            // Дополнительные стили, если нужно
          },
        },
      },
  },
});

export default theme;
