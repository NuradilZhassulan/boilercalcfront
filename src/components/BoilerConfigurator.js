import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Card,
  CardMedia,
  CardContent,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import TelegramIcon from "@mui/icons-material/Telegram";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {
  fetchValues,
  fetchPrice,
  fetchCountExits,
  fetchExtraServices,
  fetchSystemDescriptions,
} from "./api/api";
import logo from "../assets/img/logo.png";
import API_BASE_URL from "../config";
import kotel1_0 from "../assets/img/kotel1_0.jpg";
import kotel2_0 from "../assets/img/kotel2_0.jpg";
import kotel1elect_0 from "../assets/img/kotel1elect_0.jpg";
import kotel1boiler_0 from "../assets/img/kotel1boiler_0.jpg";
import kotel2boiler_0 from "../assets/img/kotel2boiler_0.jpg";
import kotel1electboiler_0 from "../assets/img/kotel1electboiler_0.jpg";
import kotel1boiler_3 from "../assets/img/kotel1boiler_3.jpg";
import kotel1_2 from "../assets/img/kotel1_2.jpg";
import kotel1_3 from "../assets/img/kotel1_3.jpg";
import kotel1_4 from "../assets/img/kotel1_4.jpg";
import kotel1_5 from "../assets/img/kotel1_5.jpg";
import kotel1_6 from "../assets/img/kotel1_6.jpg";
import kotel1_7 from "../assets/img/kotel1_7.jpg";
import kotel1boiler_6 from "../assets/img/kotel1boiler_6.jpg";
import kotel1boiler_7 from "../assets/img/kotel1boiler_7.jpg";
import kotel1boiler_4 from "../assets/img/kotel1boiler_4.jpg";
import kotel1boiler_5 from "../assets/img/kotel1boiler_5.jpg";

import kotel2boiler_4 from "../assets/img/kotel2boiler_4.jpg";
import kotel2boiler_5 from "../assets/img/kotel2boiler_5.jpg";
import kotel2boiler_6 from "../assets/img/kotel2boiler_6.jpg";
import kotel2boiler_7 from "../assets/img/kotel2boiler_7.jpg";
import kotel2boiler_2 from "../assets/img/kotel2boiler_2.jpg";
import kotel2boiler_3 from "../assets/img/kotel2boiler_3.jpg";
import kotel2_2 from "../assets/img/kotel2_2.jpg";
import kotel2_3 from "../assets/img/kotel2_3.jpg";
import kotel2_4 from "../assets/img/kotel2_4.jpg";
import kotel2_5 from "../assets/img/kotel2_5.jpg";
import kotel2_6 from "../assets/img/kotel2_6.jpg";
import kotel2_7 from "../assets/img/kotel2_7.jpg";
import kotel1elect_6 from "../assets/img/kotel1elect_6.jpg";
import kotel1elect_7 from "../assets/img/kotel1elect_7.jpg";
import kotel1electboiler_4 from "../assets/img/kotel1electboiler_4.jpg";
import kotel1electboiler_5 from "../assets/img/kotel1electboiler_5.jpg";
import kotel1electboiler_2 from "../assets/img/kotel1electboiler_2.jpg";
import kotel1electboiler_3 from "../assets/img/kotel1electboiler_3.jpg";
import kotel1elect_2 from "../assets/img/kotel1elect_2.jpg";
import kotel1elect_3 from "../assets/img/kotel1elect_3.jpg";
import kotel1elect_4 from "../assets/img/kotel1elect_4.jpg";
import kotel1elect_5 from "../assets/img/kotel1elect_5.jpg";
import kotel1elect_1 from "../assets/img/kotel1elect_1.jpg";
import kotel1electboiler_7 from "../assets/img/kotel1electboiler_7.jpg";
import kotel1electboiler_6 from "../assets/img/kotel1electboiler_6.jpg";
import kotel1electboiler_1 from "../assets/img/kotel1electboiler_1.jpg";
import kotel2boiler_1 from "../assets/img/kotel2boiler_1.jpg";
import kotel1boiler_1 from "../assets/img/kotel1boiler_1.jpg";
import kotel1_1 from "../assets/img/kotel1_1.jpg";
import kotel2_1 from "../assets/img/kotel2_1.jpg";
import kotel1boiler_2 from "../assets/img/kotel1boiler_2.jpg";

function BoilerConfigurator() {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("xs"));
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isMd = useMediaQuery(theme.breakpoints.down("md"));

  let variant;
  let sizeDesc;
  let flexDirection;
  let fontSize;
  if (isXs) {
    variant = "h5";
    sizeDesc = "0.3rem";
    flexDirection = "column";
    fontSize = "1.2rem";
  } else if (isSm) {
    variant = "h4";
    sizeDesc = "0.5rem";
    flexDirection = "column";
    fontSize = "1.5rem";
  } else if (isMd) {
    variant = "h3";
    sizeDesc = "0.7rem";
    flexDirection = "row";
    fontSize = "2rem";
  } else {
    variant = "h2";
    sizeDesc = "1rem";
    flexDirection = "row";
    fontSize = "2.5rem";
  }

  const [boilerType, setBoilerType] = useState("Газовый котел 1шт");
  const [boilerPowers, setBoilerPowers] = useState([]);
  const [boilerPower1, setBoilerPower1] = useState("");
  const [boilerPower2, setBoilerPower2] = useState("-");
  const [waterSource, setWaterSource] = useState("котел");
  const [waterVolume, setWaterVolume] = useState("");
  const [prices, setPrices] = useState(0);
  const [price, setPrice] = useState(0);
  const [power, setPower] = useState(0);
  const [gasConsumption, setGasConsumption] = useState(0);
  const [contour, setContour] = useState("двухконтурный");
  const [values, setValues] = useState([]);
  const [image, setImage] = useState();
  const [selectedCount, setSelectedCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [countExits, setCountExits] = useState();
  const [extraServices, setExtraServices] = useState();
  const [systemDescriptions, setSystemDescriptions] = useState();
  const [openPopup, setOpenPopup] = useState(false);
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);
  const [showAlertError, setShowAlertError] = useState(false);
  const [openSnackbarError, setOpenSnackbarError] = useState(false);
  const [openSnackbarSuccess, setOpenSnackbarSuccess] = useState(false);

  const [selectNodeType, setSelectNodeType] = useState(
    "Смесительный вентиляция"
  );
  const [countHeatNode, setCountHeatNode] = useState("0-6кВт");
  const [node, setNode] = useState();
  const [nodePower, setNodePower] = useState();
  const [areaOfServicedPremises, setAreaOfServicedPremises] = useState();
  const [flowCoefficient, setFlowCoefficient] = useState();

  const options = [
    "Отопление этажа",
    "Отопление 2 этажа",
    "Теплый пол этажа",
    "Бойлер",
    "Вентиляция",
    "Бассейн с подогревом",
    "Теплые дорожки от котла",
  ];

  useEffect(() => {
    const fetchData = async () => {
      const fetchedValues = await fetchValues();
      setValues(fetchedValues);
      const fetchedPrices = await fetchPrice();
      setPrices(fetchedPrices);
      const powers = fetchedPrices.map((price) => price.power1);
      const uniquePowers = Array.from(new Set(powers));
      setBoilerPowers(uniquePowers);
      if (powers.length > 0) setBoilerPower1(powers[0]);
      const fetchedCountExits = await fetchCountExits();
      setCountExits(fetchedCountExits);
      const fetchedExtraServices = await fetchExtraServices();
      const updateExtraServices = fetchedExtraServices.map((service) => ({
        ...service,
        isChecked: false,
      }));
      setExtraServices(updateExtraServices);
      const fetchedSystemDescriptions = await fetchSystemDescriptions();
      setSystemDescriptions(fetchedSystemDescriptions);

      setPower(powers[0]);
      setGasConsumption(1.41);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (prices) {
      const correctBoilerPower2 = boilerPower2 !== "-" ? boilerPower2 : 0;
      setPower(Number(boilerPower1) + Number(correctBoilerPower2));
      let totalGasConsumption =
        Number(boilerPower1) + Number(correctBoilerPower2);
      if (
        (Number(boilerPower1) === 12 && Number(boilerPower2) === 12) ||
        (Number(boilerPower1) === 24 && correctBoilerPower2 === 0)
      ) {
        setGasConsumption(2.82);
      } else if (Number(boilerPower1) === 12 && correctBoilerPower2 === 0) {
        setGasConsumption(1.41);
      } else if (totalGasConsumption === 30) {
        setGasConsumption(3.47);
      } else if (totalGasConsumption === 34) {
        setGasConsumption(3.94);
      } else if (totalGasConsumption === 36) {
        setGasConsumption(4.18);
      } else if (totalGasConsumption === 42) {
        setGasConsumption(4.88);
      } else if (totalGasConsumption === 46) {
        setGasConsumption(5.35);
      } else if (totalGasConsumption === 48) {
        setGasConsumption(5.54);
      } else if (totalGasConsumption === 54) {
        setGasConsumption(6.24);
      } else if (totalGasConsumption === 58) {
        setGasConsumption(6.71);
      } else if (totalGasConsumption === 60) {
        setGasConsumption(7.88);
      } else if (totalGasConsumption === 64) {
        setGasConsumption(7.41);
      } else if (totalGasConsumption === 68) {
        setGasConsumption(7.88);
      }

      const selectedPrice =
        prices.find(
          (price) =>
            price.power1 === boilerPower1 && price.power2 === boilerPower2
        )?.price || 0;

      let waterSourceChecked = 0;

      let countExitChecked = 0;

      if (waterVolume) {
        const found = values.find(
          (item) => Number(item.boilerValue) === Number(waterVolume)
        );
        const priceBoilerValue = found ? found.priceBoilerValue : null;
        waterSourceChecked = priceBoilerValue;
      }

      if (selectedCount) {
        const found = countExits?.find(
          (item) => Number(item.countExit) === selectedCount
        );

        const priceCountExit = found ? found.priceCountExit : null;
        countExitChecked = priceCountExit;
      }

      let extraServicesPrice = 0;

      if (extraServices) {
        extraServices.forEach((service) => {
          if (service.isChecked) {
            if (service.nameExtraService.includes("%")) {
              // Если в названии услуги есть символ процента
              const percentage = parseFloat(
                service.nameExtraService.match(/(\d+)%/)[1]
              );
              extraServicesPrice += (selectedPrice * percentage) / 100; // Добавляем процент от стоимости к extraServicesPrice
            } else {
              // Для обычных услуг добавляем фиксированную стоимость
              extraServicesPrice += service.priceExtraService;
            }
          }
        });
      }

      const total =
        selectedPrice +
        waterSourceChecked +
        countExitChecked +
        extraServicesPrice;
      setTotalPrice(total.toFixed(2));
    }
  }, [boilerPower1, boilerPower2, selectedCount, waterVolume, extraServices]);

  useEffect(() => {
    if (waterSource === "бойлер" && values.length > 0) {
      setWaterVolume(values[0].boilerValue);
      setContour("одноконтурный");
    } else if (waterSource === "котел") {
      setWaterVolume("");
      setContour("двухконтурный");
    }
  }, [waterSource]);

  const [checkedState, setCheckedState] = useState(
    options.reduce((acc, option) => ({ ...acc, [option]: false }), {})
  );

  const [selectedBlocks, setSelectedBlocks] = useState({});

  console.log(selectedBlocks);

  const handleOnChange = (event, option) => {
    const updatedCheckedState = {
      ...checkedState,
      [option]: !checkedState[option],
    };
    setCheckedState(updatedCheckedState);
    setSelectedCount(selectedCount + (event.target.checked ? 1 : -1));

    setSelectedBlocks((prevSelectedBlocks) => {
      const newSelectedBlocks = { ...prevSelectedBlocks };

      if (!event.target.checked) {
        delete newSelectedBlocks[option];
      }
      return newSelectedBlocks;
    });
  };

  // const handleOnChangeButton = (option) => {
  //   setSelectedBlocks((prevSelectedBlocks) => {
  //     const isBlockShown = prevSelectedBlocks[option];
  //     const newSelectedBlocks = { ...prevSelectedBlocks };

  //     if (isBlockShown) {
  //       // Если блок уже показан, удаляем его
  //       delete newSelectedBlocks[option];
  //     } else {
  //       // Если блок не показан, добавляем его
  //       newSelectedBlocks[option] = true; // Используем true для индикации, что блок должен быть показан
  //     }

  //     return newSelectedBlocks;
  //   });
  // };

  // useEffect(() => {
  //   if (selectNodeType === "Прямой узел") {
  //     setNode("прямой");
  //   } else {
  //     setNode("смесительный");
  //   }

  //   setNodePower(countHeatNode);

  //   console.log(selectNodeType);

  //   if (
  //     selectNodeType === "Смесительный вентиляция" ||
  //     selectNodeType === "Смесительный отопление"
  //   ) {
  //     if (countHeatNode === "0-6кВт") {
  //       setFlowCoefficient("1.6");
  //     } else if (countHeatNode === "7-10кВт") {
  //       setFlowCoefficient("1.6");
  //     } else if (countHeatNode === "11-15кВт") {
  //       setFlowCoefficient("2.5");
  //     } else if (countHeatNode === "16-25кВт") {
  //       setFlowCoefficient("4.0");
  //     } else if (countHeatNode === "26-40кВт") {
  //       setFlowCoefficient("6.3");
  //     }
  //   } else if (selectNodeType === "Смесительный теплый пол") {
  //     if (countHeatNode === "0-6кВт") {
  //       setFlowCoefficient("2.5");
  //     } else if (countHeatNode === "7-10кВт") {
  //       setFlowCoefficient("4.0");
  //     } else if (countHeatNode === "11-15кВт") {
  //       setFlowCoefficient("6.3");
  //     } else if (countHeatNode === "16-25кВт") {
  //       setFlowCoefficient("8.0");
  //     } else if (countHeatNode === "26-40кВт") {
  //       setFlowCoefficient("Вам лучше разделить систему");
  //     }
  //   } else if (selectNodeType === "Прямой узел") {
  //     setFlowCoefficient("0");
  //   }
  // }, [selectNodeType, countHeatNode]);

  // Функция для обновления данных в блоке
  const updateBlockData = (option, data) => {
    setSelectedBlocks((prev) => ({
      ...prev,
      [option]: {
        ...prev[option],
        ...data,
      },
    }));
  };

  // Используем updateBlockData при создании нового блока или обновлении существующего
  const handleOnChangeButton = (option) => {
    setSelectedBlocks((prevSelectedBlocks) => {
      const isBlockShown = prevSelectedBlocks[option];
      const newSelectedBlocks = { ...prevSelectedBlocks };

      if (isBlockShown) {
        delete newSelectedBlocks[option]; // Удаляем блок, если он уже показан
      } else {
        newSelectedBlocks[option] = {
          // Создаем новый блок с начальными значениями
          selectNodeType: "Смесительный вентиляция",
          countHeatNode: "0-6кВт",
          areaOfServicedPremises: "",
          node: "смесительный",
          nodePower: "0-6кВт",
          flowCoefficient: "1.6", // Начальное значение, основанное на начальных значениях selectNodeType и countHeatNode
          pump: "25-40",
        };
      }

      return newSelectedBlocks;
    });
  };

  // Ваш компонент для блока информации
  const InformationBlock = React.memo(
    ({ option, updateBlockData, blockData }) => {
      const [localArea, setLocalArea] = useState(
        blockData.areaOfServicedPremises
      );

      console.log(blockData);
      // Обработчик изменения, который обновляет локальное состояние
      const handleAreaChange = (event) => {
        setLocalArea(event.target.value);
      };

      // Обработчик размытия, который обновляет глобальное состояние
      const handleAreaBlur = () => {
        updateBlockData(option, { areaOfServicedPremises: localArea });
      };

      // Обновление локального состояния при изменении blockData.areaOfServicedPremises
      useEffect(() => {
        setLocalArea(blockData.areaOfServicedPremises);
      }, [blockData.areaOfServicedPremises]);

      useEffect(() => {
        let newFlowCoefficient;

        if (
          blockData.selectNodeType === "Смесительный вентиляция" ||
          blockData.selectNodeType === "Смесительный отопление"
        ) {
          if (blockData.countHeatNode === "0-6кВт") {
            newFlowCoefficient = "1.6";
          } else if (blockData.countHeatNode === "7-10кВт") {
            newFlowCoefficient = "1.6";
          } else if (blockData.countHeatNode === "11-15кВт") {
            newFlowCoefficient = "2.5";
          } else if (blockData.countHeatNode === "16-25кВт") {
            newFlowCoefficient = "4.0";
          } else if (blockData.countHeatNode === "26-40кВт") {
            newFlowCoefficient = "6.3";
          }
        } else if (blockData.selectNodeType === "Смесительный теплый пол") {
          if (blockData.countHeatNode === "0-6кВт") {
            newFlowCoefficient = "2.5";
          } else if (blockData.countHeatNode === "7-10кВт") {
            newFlowCoefficient = "4.0";
          } else if (blockData.countHeatNode === "11-15кВт") {
            newFlowCoefficient = "6.3";
          } else if (blockData.countHeatNode === "16-25кВт") {
            newFlowCoefficient = "8.0";
          } else if (blockData.countHeatNode === "26-40кВт") {
            newFlowCoefficient = "Вам лучше разделить систему";
          }
        } else if (blockData.selectNodeType === "Прямой узел") {
          newFlowCoefficient = "0";
        }

        if (blockData.flowCoefficient !== newFlowCoefficient) {
          updateBlockData(option, { flowCoefficient: newFlowCoefficient });
        }

        let newNode;
        if (blockData.selectNodeType === "Прямой узел") {
          newNode = "прямой";
        } else {
          newNode = "смесительный";
        }

        if (blockData.node !== newNode) {
          updateBlockData(option, { node: newNode });
        }

        let newNodePower = blockData.countHeatNode;
        if (blockData.nodePower !== newNodePower) {
          updateBlockData(option, { nodePower: newNodePower });
        }

        let newPump;

        if (
          blockData.selectNodeType === "Смесительный вентиляция" ||
          blockData.selectNodeType === "Прямой узел"
        ) {
          if (blockData.countHeatNode === "0-6кВт") {
            newPump = "25-40";
          } else if (
            blockData.countHeatNode === "7-10кВт" ||
            blockData.countHeatNode === "11-15кВт" ||
            blockData.countHeatNode === "16-25кВт"
          ) {
            newPump = "25-60";
          } else if (blockData.countHeatNode === "26-40кВт") {
            newPump = "32-60";
          }
        } else if (blockData.selectNodeType === "Смесительный отопление") {
          if (blockData.countHeatNode === "0-6кВт") {
            newPump = "25-40";
          } else if (
            blockData.countHeatNode === "7-10кВт" ||
            blockData.countHeatNode === "11-15кВт" ||
            blockData.countHeatNode === "16-25кВт"
          ) {
            newPump = "25-60";
          } else if (blockData.countHeatNode === "26-40кВт") {
            newPump = "32-60";
          }
        } else if (blockData.selectNodeType === "Смесительный теплый пол") {
          if (
            blockData.countHeatNode === "0-6кВт" ||
            blockData.countHeatNode === "7-10кВт"
          ) {
            newPump = "25-60";
          } else if (
            blockData.countHeatNode === "11-15кВт" ||
            blockData.countHeatNode === "16-25кВт"
          ) {
            newPump = "32-60";
          } else if (blockData.countHeatNode === "26-40кВт") {
            newPump = "32-80";
          }
        }

        if (blockData.pump !== newPump) {
          updateBlockData(option, { pump: newPump });
        }
      }, [
        blockData.selectNodeType,
        blockData.countHeatNode,
        blockData.flowCoefficient,
        blockData.pump,
        option,
        updateBlockData,
      ]);

      const handleChange = (field) => (event) => {
        updateBlockData(option, { [field]: event.target.value });
      };

      return (
        <Card sx={{ padding: "30px", maxWidth: "500px", marginTop: "20px" }}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              <Typography variant="h5" fontWeight={500}>
                {option}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: { flexDirection },
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <Typography>Выберите тип узла</Typography>
              <Select
                value={blockData.selectNodeType}
                onChange={handleChange("selectNodeType")}
                size="small"
                sx={{ marginLeft: "10px", minWidth: "260px" }}
              >
                <MenuItem value="Смесительный вентиляция">
                  Смесительный вентиляция
                </MenuItem>
                <MenuItem value="Смесительный отопление">
                  Смесительный отопление
                </MenuItem>
                <MenuItem value="Смесительный теплый пол">
                  Смесительный теплый пол
                </MenuItem>
                <MenuItem value="Прямой узел">Прямой узел</MenuItem>
              </Select>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: { flexDirection },
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <Typography>Сколько кВт тепла потребляет узел</Typography>
              <Select
                value={blockData.countHeatNode}
                onChange={handleChange("countHeatNode")}
                size="small"
                // sx={{ marginLeft: "10px", minWidth: "260px" }}
              >
                <MenuItem value="0-6кВт">0-6кВт</MenuItem>
                <MenuItem value="7-10кВт">7-10кВт</MenuItem>
                <MenuItem value="11-15кВт">11-15кВт</MenuItem>
                <MenuItem value="16-25кВт">16-25кВт</MenuItem>
                <MenuItem value="26-40кВт">26-40кВт</MenuItem>
              </Select>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: { flexDirection },
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <Typography>Площадь обслуживаемого помещения?</Typography>
              <TextField
                size="small"
                variant="standard"
                value={localArea}
                onChange={handleAreaChange}
                onBlur={handleAreaBlur}
                sx={{ width: "100px" }}
              />
            </Box>
            {/* <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                margin: "15px 0",
                borderRadius: "20px",
                padding: "20px ",
              }}
              size="large"
            >
              Купить
            </Button> */}
            <Typography
              variant="h6"
              fontWeight={500}
              justifyContent="center"
              display="flex"
            >
              Характеристика
            </Typography>
            <Typography
              variant="body2"
              fontWeight={400}
              sx={{
                justifyContent: "space-between",
                display: "flex",
                margin: "10px 0",
              }}
            >
              <span style={{ fontWeight: 500 }}>Узел</span> {blockData.node}
            </Typography>
            <Typography
              variant="body2"
              fontWeight={400}
              sx={{
                justifyContent: "space-between",
                display: "flex",
                margin: "10px 0",
              }}
            >
              <span style={{ fontWeight: 500 }}>Мощность узла кВт </span>{" "}
              {blockData.nodePower}
            </Typography>
            <Typography
              variant="body2"
              fontWeight={400}
              sx={{
                justifyContent: "space-between",
                display: "flex",
                margin: "10px 0",
              }}
            >
              <span style={{ fontWeight: 500 }}>
                Коэффициент проходного сечения Kvs
              </span>{" "}
              {blockData.flowCoefficient}
            </Typography>
            <Typography
              variant="body2"
              fontWeight={400}
              sx={{
                justifyContent: "space-between",
                display: "flex",
                margin: "10px 0",
              }}
            >
              <span style={{ fontWeight: 500 }}>Насос</span> {blockData.pump}
            </Typography>
          </CardContent>
        </Card>
      );
    },
    (prevProps, nextProps) => {
      // Функция сравнения для определения, нужно ли перерисовывать компонент
      return (
        prevProps.option === nextProps.option &&
        JSON.stringify(prevProps.blockData) ===
          JSON.stringify(nextProps.blockData)
      );
    }
  );

  useEffect(() => {
    let imageName =
      boilerType === "Газовый котел 1шт"
        ? "kotel1"
        : boilerType === "Газовый котел 2шт"
        ? "kotel2"
        : "kotel1elect";

    if (waterSource === "бойлер") {
      imageName += "boiler";
    }

    imageName += `_${selectedCount}`;

    const imageToUse = {
      kotel1_0: kotel1_0,
      kotel2_0: kotel2_0,
      kotel1elect_0: kotel1elect_0,
      kotel1boiler_0: kotel1boiler_0,
      kotel2boiler_0: kotel2boiler_0,
      kotel1electboiler_0: kotel1electboiler_0,
      kotel1boiler_3: kotel1boiler_3,
      kotel1_2: kotel1_2,
      kotel1_3: kotel1_3,
      kotel1_4: kotel1_4,
      kotel1_5: kotel1_5,
      kotel1_6: kotel1_6,
      kotel1_7: kotel1_7,
      kotel1boiler_6: kotel1boiler_6,
      kotel1boiler_7: kotel1boiler_7,
      kotel1boiler_4: kotel1boiler_4,
      kotel1boiler_5: kotel1boiler_5,
      kotel2boiler_4: kotel2boiler_4,
      kotel2boiler_5: kotel2boiler_5,
      kotel2boiler_6: kotel2boiler_6,
      kotel2boiler_7: kotel2boiler_7,
      kotel2boiler_2: kotel2boiler_2,
      kotel2boiler_3: kotel2boiler_3,
      kotel2_2: kotel2_2,
      kotel2_3: kotel2_3,
      kotel2_4: kotel2_4,
      kotel2_5: kotel2_5,
      kotel2_6: kotel2_6,
      kotel2_7: kotel2_7,
      kotel1elect_6: kotel1elect_6,
      kotel1elect_7: kotel1elect_7,
      kotel1electboiler_4: kotel1electboiler_4,
      kotel1electboiler_5: kotel1electboiler_5,
      kotel1electboiler_2: kotel1electboiler_2,
      kotel1electboiler_3: kotel1electboiler_3,
      kotel1elect_2: kotel1elect_2,
      kotel1elect_3: kotel1elect_3,
      kotel1elect_4: kotel1elect_4,
      kotel1elect_5: kotel1elect_5,
      kotel1elect_1: kotel1elect_1,
      kotel1electboiler_7: kotel1electboiler_7,
      kotel1electboiler_6: kotel1electboiler_6,
      kotel1electboiler_1: kotel1electboiler_1,
      kotel2boiler_1: kotel2boiler_1,
      kotel1boiler_1: kotel1boiler_1,
      kotel1_1: kotel1_1,
      kotel2_1: kotel2_1,
      kotel1boiler_2: kotel1boiler_2,
    }[imageName];

    setImage(imageToUse);
  }, [boilerType, waterSource, selectedCount]);

  const handleCheckboxChange = (id) => {
    const updatedServices = extraServices.map((service) => {
      if (service._id === id) {
        return { ...service, isChecked: !service.isChecked };
      }
      return service;
    });

    setExtraServices(updatedServices);
  };

  const formatInformationBlocksData = (selectedBlocks) => {
    return Object.entries(selectedBlocks).map(([key, value]) => ({
      name: key,
      ...value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // Собираем данные формы
    const email = formData.get("email");
    const phone = formData.get("phone");

    // Собираем данные из selectedBlocks
    const informationBlocksData = formatInformationBlocksData(selectedBlocks);

    // Подготавливаем другие данные для отправки, например, итоговую сумму и список выбранных услуг
    const sendCheckedState = Object.keys(checkedState).filter(
      (key) => checkedState[key]
    );
    const sendExtraServices = extraServices
      .filter((service) => service.isChecked)
      .map((service) => service.nameExtraService);
    const orderData = {
      email,
      phone,
      totalPrice,
      boilerType,
      boilerPower1,
      boilerPower2,
      waterSource,
      waterVolume,
      selectedCount,
      sendCheckedState,
      sendExtraServices,
      contour,
      power,
      gasConsumption,
      informationBlocksData,
    };

    // Отправляем данные на бэкенд
    try {
      const response = await fetch(`${API_BASE_URL}/send-email`, {
        // Используйте URL вашего сервера
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
      if (response.ok) {
        // Письмо успешно отправлено
        handleSuccess();
        console.log("Письмо успешно отправлено");
        setOpenPopup(false);
      } else {
        // Обработка ошибок сервера
        console.error("Ошибка сервера");
        handleError();
      }
    } catch (error) {
      // Обработка ошибок сети
      console.error("Ошибка сети");
      handleError();
    }
  };

  const handleSuccess = () => {
    // Показываем алерт
    setOpenSnackbarSuccess(true);
  };

  const handleError = () => {
    setOpenSnackbarError(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbarError(false);
    setOpenSnackbarSuccess(false);
  };

  const handleBuyClick = () => {
    // Сбор данных и открытие попап окна
    setOpenPopup(true);
  };

  return (
    <Container maxWidth="lg" sx={{ padding: "30px 0" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <img src={logo} alt="Logo" />
            <a
              href="https://t.me/+79277129807"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Button
                variant="contained"
                color="primary"
                aria-label="задать вопрос в Telegram"
                // sx={{borderRadius: "20px", padding: "10px 30px"}}
              >
                Задать вопрос
                <TelegramIcon sx={{ marginLeft: "15px" }} />
              </Button>
            </a>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant={variant}
            align="center"
            fontWeight={600}
            fontSize={fontSize}
          >
            КОНСТРУКТОР КОТЕЛЬНОЙ
          </Typography>
          <Typography align="center" fontSize={sizeDesc}>
            С помощью конструктора вы можете быстро посчитать стоимость
            котельной
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8} md={7}>
          <Box style={{ padding: 16 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: { flexDirection },
              }}
            >
              <Typography>Выберете комбинацию котлов</Typography>
              <Select
                value={boilerType}
                onChange={(e) => setBoilerType(e.target.value)}
                size="small"
                sx={{ marginLeft: "10px", minWidth: "260px" }}
              >
                <MenuItem value="Газовый котел 1шт">Газовый котел 1шт</MenuItem>
                <MenuItem value="Газовый котел 2шт">Газовый котел 2шт</MenuItem>
                <MenuItem value="Газовый котел 1шт + Электрический 1шт">
                  Газовый котел 1шт + Электрический 1шт
                </MenuItem>
              </Select>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                margin: "20px 0",
                flexDirection: { flexDirection },
              }}
            >
              <Typography>Выберите мощность котлов</Typography>
              <Box>
                <Select
                  value={boilerPower1}
                  onChange={(e) => setBoilerPower1(e.target.value)}
                  size="small"
                  sx={{ marginLeft: "10px", minWidth: "85px" }}
                >
                  {boilerPowers.map((power) => (
                    <MenuItem key={power} value={power}>
                      {power}
                    </MenuItem>
                  ))}
                </Select>
                <Select
                  value={boilerPower2}
                  onChange={(e) => setBoilerPower2(e.target.value)}
                  size="small"
                  sx={{ marginLeft: "10px", minWidth: "85px" }}
                  disabled={boilerType === "Газовый котел 1шт"}
                >
                  <MenuItem value="-">-</MenuItem>
                  {boilerPowers.map((power) => (
                    <MenuItem key={power} value={power}>
                      {power}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                margin: "20px 0",
                flexDirection: { flexDirection },
              }}
            >
              <Typography>Где будем брать горячую воду?</Typography>
              <RadioGroup
                value={waterSource}
                onChange={(e) => setWaterSource(e.target.value)}
                sx={{ marginLeft: "10px" }}
                row
              >
                <FormControlLabel
                  value="котел"
                  control={<Radio />}
                  label="Котел"
                />
                <FormControlLabel
                  value="бойлер"
                  control={<Radio />}
                  label="Бойлер"
                />
              </RadioGroup>
              <Select
                value={waterVolume}
                onChange={(e) => setWaterVolume(e.target.value)}
                size="small"
                sx={{ marginLeft: "10px", minWidth: "95px" }}
                disabled={waterSource !== "бойлер"}
              >
                {values.map((value) => (
                  <MenuItem key={value._id} value={Number(value.boilerValue)}>
                    {value.boilerValue}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Box>
              <Typography>
                Выберите потребителей тепла{" "}
                <span style={{ fontWeight: 500 }}>{selectedCount}</span>
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                {options.map((option) => (
                  <div key={option}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checkedState[option]}
                          onChange={(event) => handleOnChange(event, option)}
                        />
                      }
                      sx={{ minWidth: "270px" }}
                      label={option}
                    />
                    {checkedState[option] && (
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleOnChangeButton(option)}
                      >
                        Подобрать узел
                      </Button>
                    )}
                  </div>
                ))}
              </Box>
            </Box>
            <Box sx={{ margin: "20px 0" }}>
              <Typography>Добавим к заказу?</Typography>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                {extraServices?.map((extraService) => {
                  // Определяем, содержит ли название услуги процент
                  const hasPercentage =
                    extraService.nameExtraService.includes("%");
                  // Извлекаем числовое значение из названия услуги, если оно содержит процент
                  const percentage = hasPercentage
                    ? parseInt(
                        extraService.nameExtraService.match(/(\d+)%/)[1],
                        10
                      )
                    : 0;
                  // Рассчитываем дополнительную стоимость на основе процента от totalPrice
                  const additionalPrice = hasPercentage
                    ? (totalPrice * percentage) / 100
                    : extraService.priceExtraService;

                  return (
                    <Box
                      key={extraService._id}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={extraService.isChecked}
                            onChange={() =>
                              handleCheckboxChange(extraService._id)
                            }
                          />
                        }
                        label={extraService.nameExtraService}
                        sx={{ minWidth: "270px" }}
                      />
                      {hasPercentage && (
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleCheckboxChange(extraService._id)}
                        >
                          +{additionalPrice.toFixed(2)}р
                        </Button>
                      )}
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4} md={5}>
          <Card sx={{ padding: "30px", maxWidth: "460px", marginTop: "20px" }}>
            <CardMedia component="img" width={150} image={image} alt={image} />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ justifyContent: "space-between", display: "flex" }}
              >
                <span>Цена:</span> {totalPrice}р
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  margin: "15px 0",
                  borderRadius: "20px",
                  padding: "20px ",
                }}
                size="large"
                onClick={handleBuyClick}
              >
                Купить
              </Button>
              <Typography variant="h6" fontWeight={500}>
                Характеристика
              </Typography>
              <Typography
                variant="body2"
                fontWeight={400}
                sx={{
                  justifyContent: "space-between",
                  display: "flex",
                  margin: "10px 0",
                }}
              >
                <span style={{ fontWeight: 500 }}>Котел</span> {contour}
              </Typography>
              <Typography
                variant="body2"
                fontWeight={400}
                sx={{
                  justifyContent: "space-between",
                  display: "flex",
                  margin: "10px 0",
                }}
              >
                <span style={{ fontWeight: 500 }}>Мощность котельной кВт</span>{" "}
                {power}
              </Typography>
              <Typography
                variant="body2"
                fontWeight={400}
                sx={{
                  justifyContent: "space-between",
                  display: "flex",
                  margin: "10px 0",
                }}
              >
                <span style={{ fontWeight: 500 }}>
                  Расход газа природного м3/ч{" "}
                </span>{" "}
                {gasConsumption}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))", // 300px - минимальная ширина колонки, 1fr - растягивание на доступное пространство
          gap: "20px", // Расстояние между блоками
          marginBottom: "20px",
        }}
      >
        {Object.entries(selectedBlocks).map(([option, blockData]) => (
          <InformationBlock
            key={option}
            option={option}
            updateBlockData={updateBlockData}
            blockData={blockData}
          />
        ))}
      </Box>
      <Dialog open={openPopup} onClose={() => setOpenPopup(false)}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Заполните форму</DialogTitle>
          <DialogContent sx={{ padding: "5px 20px" }}>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Почта"
              type="email"
              fullWidth
              // variant="standard"
              name="email"
            />
            <TextField
              margin="dense"
              id="phone"
              label="Номер телефона"
              type="tel"
              fullWidth
              // variant="standard"
              name="phone"
            />
          </DialogContent>
          <DialogActions sx={{ padding: "15px 20px" }}>
            <Button variant="contained" onClick={() => setOpenPopup(false)}>
              Отмена
            </Button>
            <Button variant="contained" type="submit">
              Отправить
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Snackbar
        open={openSnackbarError}
        autoHideDuration={6000} // Автоматически скрывается через 6 секунд
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // Позиционирование сверху и по центру
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          Ошибка сервера
        </Alert>
      </Snackbar>

      <Snackbar
        open={openSnackbarSuccess}
        autoHideDuration={6000} // Автоматически скрывается через 6 секунд
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // Позиционирование сверху и по центру
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Заявка успешно отправлена
        </Alert>
      </Snackbar>
      {systemDescriptions && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box>
              <Typography>{systemDescriptions[0].systemDescription}</Typography>
            </Box>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default BoilerConfigurator;
