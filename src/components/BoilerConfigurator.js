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
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {
  fetchValues,
  fetchPrice,
  fetchCountExits,
  fetchExtraServices,
} from "./api/api";
import logo from "../assets/img/logo.png";
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

function BoilerConfigurator() {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("xs"));
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isMd = useMediaQuery(theme.breakpoints.down("md"));

  let variant;
  let sizeDesc;
  let flexDirection;
  if (isXs) {
    variant = "h5";
    sizeDesc = "0.5rem";
    flexDirection = "column";
  } else if (isSm) {
    variant = "h4";
    sizeDesc = "0.7rem";
    flexDirection = "column";
  } else if (isMd) {
    variant = "h3";
    sizeDesc = "1rem";
    flexDirection = "row";
  } else {
    variant = "h2";
    sizeDesc = "1.2rem";
    flexDirection = "row";
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

      setPower(powers[0]);
      setGasConsumption(1.41);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (prices) {
      const correctBoilerPower2 = boilerPower2 !== "-" ? boilerPower2 : 0;
      setPower(Number(boilerPower1) + Number(correctBoilerPower2));
      let totalGasConsumption = Number(boilerPower1) + Number(boilerPower2);
      if (Number(boilerPower1) === 12 && Number(boilerPower2) === 12) {
        setGasConsumption(2.82);
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
      } else if (totalGasConsumption === 60) {
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
          (item) => Number(item.boilerValue) === waterVolume
        );

        const priceBoilerValue = found ? found.priceBoilerValue : null;
        waterSourceChecked = priceBoilerValue;
      }

      if (selectedCount) {
        const found = countExits.find(
          (item) => Number(item.countExit) === selectedCount
        );

        const priceCountExit = found ? found.priceCountExit : null;
        countExitChecked = priceCountExit;
      }

      let priceExtraService = 0;

      if (extraServices) {
        priceExtraService = extraServices.reduce((total, service) => {
          if (service.isChecked) {
            return total + service.priceExtraService;
          }
          return total;
        }, 0);
      }

      const total =
        selectedPrice +
        waterSourceChecked +
        countExitChecked +
        priceExtraService;
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

  const handleOnChange = (event, option) => {
    const updatedCheckedState = {
      ...checkedState,
      [option]: !checkedState[option],
    };
    setCheckedState(updatedCheckedState);
    setSelectedCount(selectedCount + (event.target.checked ? 1 : -1));
  };

  const handleOnChangeButton = (option) => {
    setSelectedBlocks((prevSelectedBlocks) => {
      const isBlockShown = prevSelectedBlocks[option];
      const newSelectedBlocks = { ...prevSelectedBlocks };

      if (isBlockShown) {
        // Если блок уже показан, удаляем его
        delete newSelectedBlocks[option];
      } else {
        // Если блок не показан, добавляем его
        newSelectedBlocks[option] = true; // Используем true для индикации, что блок должен быть показан
      }

      return newSelectedBlocks;
    });
  };

  useEffect(() => {
    if (selectNodeType === "Прямой узел") {
      setNode("прямой");
    } else {
      setNode("смесительный");
    }

    setNodePower(countHeatNode);

    console.log(selectNodeType);

    if (
      selectNodeType === "Смесительный вентиляция" ||
      selectNodeType === "Смесительный отопление"
    ) {
      if (countHeatNode === "0-6кВт") {
        setFlowCoefficient("1.6");
      } else if (countHeatNode === "7-10кВт") {
        setFlowCoefficient("1.6");
      } else if (countHeatNode === "11-15кВт") {
        setFlowCoefficient("2.5");
      } else if (countHeatNode === "16-25кВт") {
        setFlowCoefficient("4.0");
      } else if (countHeatNode === "26-40кВт") {
        setFlowCoefficient("6.3");
      }
    } else if (selectNodeType === "Смесительный теплый пол") {
      if (countHeatNode === "0-6кВт") {
        setFlowCoefficient("2.5");
      } else if (countHeatNode === "7-10кВт") {
        setFlowCoefficient("4.0");
      } else if (countHeatNode === "11-15кВт") {
        setFlowCoefficient("6.3");
      } else if (countHeatNode === "16-25кВт") {
        setFlowCoefficient("8.0");
      } else if (countHeatNode === "26-40кВт") {
        setFlowCoefficient("Вам лучше разделить систему");
      }
    } else if (selectNodeType === "Прямой узел") {
      setFlowCoefficient("0");
    }
  }, [selectNodeType, countHeatNode]);

  // Ваш компонент для блока информации
  function InformationBlock({ option }) {
    // Вставьте сюда логику отображения информации, как на вашем скрине
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
              value={selectNodeType}
              onChange={(e) => setSelectNodeType(e.target.value)}
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
              value={countHeatNode}
              onChange={(e) => setCountHeatNode(e.target.value)}
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
              value={areaOfServicedPremises}
              onChange={(event) => {
                setAreaOfServicedPremises(event.target.value);
              }}
              sx={{ width: "100px" }}
            />
          </Box>
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
          >
            Купить
          </Button>
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
            <span style={{ fontWeight: 500 }}>Узел</span> {node}
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
            {nodePower}
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
            {flowCoefficient}
          </Typography>
        </CardContent>
      </Card>
    );
  }

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

  return (
    <Container maxWidth="lg" sx={{ padding: "30px 0" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <img src={logo} alt="Logo" />
        </Grid>
        <Grid item xs={12}>
          <Typography variant={variant} align="center" fontWeight={600}>
            КОНСТРУКТОР КОТЕЛЬНОЙ
          </Typography>
          <Typography align="center" letterSpacing="1.8px" fontSize={sizeDesc}>
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
                {extraServices?.map((extraService) => (
                  <FormControlLabel
                    key={extraService._id}
                    control={
                      <Checkbox
                        checked={extraService.isChecked}
                        onChange={() => handleCheckboxChange(extraService._id)}
                      />
                    }
                    label={extraService.nameExtraService}
                  />
                ))}
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
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}
      >
        {Object.entries(selectedBlocks).map(
          ([option, isShown]) =>
            isShown && <InformationBlock option={option} key={option} />
        )}
      </div>
    </Container>
  );
}

export default BoilerConfigurator;
