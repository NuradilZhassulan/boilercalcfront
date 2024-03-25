import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  fetchValues,
  fetchPrice,
  fetchCountExits,
  fetchExtraServices,
  fetchSystemDescriptions,
} from "./api/api";
import {
  Container,
  Box,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit"; // Импортируем иконку карандаша
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import API_BASE_URL from "../config";
import { auth } from "../firebase-config";
import { signOut } from "firebase/auth";

const AdminPanel = () => {
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
    flexDirection = "column";
  } else {
    variant = "h2";
    sizeDesc = "1.2rem";
    flexDirection = "row";
  }

  const [boilerValues, setBoilerValues] = useState([]);
  const [boilerValue, setBoilerValue] = useState("");
  const [priceBoilerValue, setPriceBoilerValue] = useState("");
  const [editingBoilerValueId, setEditingBoilerValueId] = useState(null);
  const [editedBoilerValue, setEditedBoilerValue] = useState("");
  const [editedPriceBoilerValue, setEditedPriceBoilerValue] = useState(null);
  const [prices, setPrices] = useState([]);
  const [price, setPrice] = useState("");
  const [power1, setPower1] = useState("");
  const [power2, setPower2] = useState("");
  const [editingPriceId, setEditingPriceId] = useState(null);
  const [editedPower1, setEditedPower1] = useState("");
  const [editedPower2, setEditedPower2] = useState("");
  const [editedPrice, setEditedPrice] = useState("");
  const [countExits, setCountExits] = useState([]);
  const [countExit, setCountExit] = useState("");
  const [priceCountExit, setPriceCountExit] = useState("");
  const [editingCountExitId, setEditingCountExitId] = useState(null);
  const [editedCountExit, setEditedCountExit] = useState("");
  const [editedPriceCountExit, setEditedPriceCountExit] = useState(null);
  const [extraServices, setExtraServices] = useState([]);
  const [extraService, setExtraService] = useState("");
  const [priceExtraService, setPriceExtraService] = useState("");
  const [editingExtraServiceId, setEditingExtraServiceId] = useState(null);
  const [editedExtraService, setEditedExtraService] = useState("");
  const [editedPriceExtraService, setEditedPriceExtraService] = useState(null);
  const [systemDescriptions, setSystemDescriptions] = useState([]);
  const [systemDescription, setSystemDescription] = useState("");
  const [editingSystemDescriptionId, setEditingSystemDescriptionId] =
    useState(null);
  const [editedSystemDescription, setEditedSystemDescription] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const fetchedValues = await fetchValues();
      setBoilerValues(fetchedValues);
      const fetchedPrices = await fetchPrice();
      setPrices(fetchedPrices);
      const fetchedCountExits = await fetchCountExits();
      setCountExits(fetchedCountExits);
      const fetchedExtraServices = await fetchExtraServices();
      setExtraServices(fetchedExtraServices);
      const fetchedSystemDescriptions = await fetchSystemDescriptions();
      setSystemDescriptions(fetchedSystemDescriptions);
    };

    fetchData();
  }, []);

  const handleSubmitBoilerValue = async (event) => {
    if (!boilerValue.trim() && !priceBoilerValue.trim()) {
      // Проверяем, не пустое ли значение
      alert("Пожалуйста, введите значение перед добавлением."); // Используйте более подходящий способ уведомления пользователя
      return;
    }

    event.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/values`, {
        boilerValue,
        priceBoilerValue,
      });
      setBoilerValue("");
      setPriceBoilerValue("");
      const fetchedBoilerValues = await fetchValues(); // Повторно получаем значения
      setBoilerValues(fetchedBoilerValues);
    } catch (error) {
      console.error("Ошибка при добавлении цены:", error);
    }
  };

  const handleEditClickBoilerValue = (boilerValue) => {
    setEditingBoilerValueId(boilerValue._id);
    setEditedBoilerValue(boilerValue.boilerValue);
    setEditedPriceBoilerValue(boilerValue.priceBoilerValue);
  };

  const handleSaveClickBoilerValue = async (id) => {
    if (!editedBoilerValue.trim() && !editedPriceBoilerValue.trim()) {
      // Проверяем, не пустое ли значение
      alert("Пожалуйста, введите значение перед добавлением."); // Используйте более подходящий способ уведомления пользователя
      return;
    }

    try {
      await axios.put(`${API_BASE_URL}/values/${id}`, {
        boilerValue: editedBoilerValue,
        priceBoilerValue: editedPriceBoilerValue,
      });
      const updatedBoilerValues = await axios.get(`${API_BASE_URL}/values`);
      setBoilerValues(updatedBoilerValues.data);
      setEditingBoilerValueId(null);
    } catch (error) {
      console.error("Ошибка при сохранении измененной цены:", error);
    }
  };

  const handleDeleteBoilerValue = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/values/${id}`);
      const updatedBoilerValues = boilerValues.filter(
        (boilerValue) => boilerValue._id !== id
      );
      setBoilerValues(updatedBoilerValues);
    } catch (error) {
      console.error("Ошибка при удалении бойлера:", error);
    }
  };

  const handleSubmit = async (event) => {
    if (!power1.trim() && !price.trim()) {
      // Проверяем, не пустое ли значение
      alert("Пожалуйста, введите значение перед добавлением."); // Используйте более подходящий способ уведомления пользователя
      return;
    }

    event.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/prices`, {
        power1,
        power2,
        price,
      });
      // onPriceAdded(); // Обновить список цен
      setPower1("");
      setPower2("");
      setPrice("");
      const fetchedPrives = await fetchPrice();
      setPrices(fetchedPrives);
    } catch (error) {
      console.error("Ошибка при добавлении цены:", error);
    }
  };

  const handleEditClick = (price) => {
    setEditingPriceId(price._id);
    setEditedPower1(price.power1);
    setEditedPower2(price.power2);
    setEditedPrice(price.price);
  };

  const handleSaveClick = async (id) => {
    if (!editedPower2.trim() && !editedPrice.trim()) {
      // Проверяем, не пустое ли значение
      alert("Пожалуйста, введите значение перед добавлением."); // Используйте более подходящий способ уведомления пользователя
      return;
    }

    try {
      await axios.put(`${API_BASE_URL}/prices/${id}`, {
        power1: editedPower1,
        power2: editedPower2,
        price: editedPrice,
      });
      const updatedPrices = await axios.get(`${API_BASE_URL}/prices`);
      setPrices(updatedPrices.data);
      setEditingPriceId(null);
    } catch (error) {
      console.error("Ошибка при сохранении измененной цены:", error);
    }
  };

  const handleDeletePrice = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/prices/${id}`);
      const updatedPrices = prices.filter((price) => price._id !== id);
      setPrices(updatedPrices);
    } catch (error) {
      console.error("Ошибка при удалении цены:", error);
    }
  };

  const handleSubmitCountExit = async (event) => {
    if (!countExit.trim() && !priceCountExit.trim()) {
      // Проверяем, не пустое ли значение
      alert("Пожалуйста, введите значение перед добавлением."); // Используйте более подходящий способ уведомления пользователя
      return;
    }

    event.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/countExit`, {
        countExit,
        priceCountExit,
      });
      setCountExit("");
      setPriceCountExit("");
      const fetchedCountExits = await fetchCountExits(); // Повторно получаем значения
      setCountExits(fetchedCountExits);
    } catch (error) {
      console.error("Ошибка при добавлении цены:", error);
    }
  };

  const handleEditClickCountExit = (countExit) => {
    setEditingCountExitId(countExit._id);
    setEditedCountExit(countExit.countExit);
    setEditedPriceCountExit(countExit.priceCountExit);
  };

  const handleSaveClickCountExit = async (id) => {
    if (!editedCountExit.trim() && !editedPriceCountExit.trim()) {
      // Проверяем, не пустое ли значение
      alert("Пожалуйста, введите значение перед добавлением."); // Используйте более подходящий способ уведомления пользователя
      return;
    }

    try {
      await axios.put(`${API_BASE_URL}/countExit/${id}`, {
        countExit: editedCountExit,
        priceCountExit: editedPriceCountExit,
      });
      const updatedCountExits = await axios.get(`${API_BASE_URL}/countExit`);
      setCountExits(updatedCountExits.data);
      setEditingCountExitId(null);
    } catch (error) {
      console.error("Ошибка при сохранении измененной цены:", error);
    }
  };

  const handleDeleteCountExit = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/countExit/${id}`);
      const updatedCountExits = countExits.filter(
        (countExit) => countExit._id !== id
      );
      setCountExits(updatedCountExits);
    } catch (error) {
      console.error("Ошибка при удалении выхода:", error);
    }
  };

  const handleSubmitExtraService = async (event) => {
    if (!extraService.trim() && !priceExtraService.trim()) {
      // Проверяем, не пустое ли значение
      alert("Пожалуйста, введите значение перед добавлением."); // Используйте более подходящий способ уведомления пользователя
      return;
    }

    event.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/extraservices`, {
        nameExtraService: extraService,
        priceExtraService,
      });
      setExtraService("");
      setPriceExtraService("");
      const fetchedExtraServices = await fetchExtraServices(); // Повторно получаем значения
      setExtraServices(fetchedExtraServices);
    } catch (error) {
      console.error("Ошибка при добавлении цены:", error);
    }
  };

  const handleEditClickExtraService = (extraService) => {
    setEditingExtraServiceId(extraService._id);
    setEditedExtraService(extraService.nameExtraService);
    setEditedPriceExtraService(extraService.priceExtraService);
  };

  const handleSaveClickExtraService = async (id) => {
    if (!editedExtraService.trim() && !editedPriceExtraService.trim()) {
      // Проверяем, не пустое ли значение
      alert("Пожалуйста, введите значение перед добавлением."); // Используйте более подходящий способ уведомления пользователя
      return;
    }

    try {
      await axios.put(`${API_BASE_URL}/extraservices/${id}`, {
        nameExtraService: editedExtraService,
        priceExtraService: editedPriceExtraService,
      });
      const updatedExtraServices = await axios.get(
        `${API_BASE_URL}/extraservices`
      );
      setExtraServices(updatedExtraServices.data);
      setEditingExtraServiceId(null);
    } catch (error) {
      console.error("Ошибка при сохранении измененной цены:", error);
    }
  };

  const handleDeleteExtraService = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/extraservices/${id}`);
      const updatedExtraServices = extraServices.filter(
        (extraService) => extraService._id !== id
      );
      setExtraServices(updatedExtraServices);
    } catch (error) {
      console.error("Ошибка при удалении доп. услуги:", error);
    }
  };

  const handleSubmitSystemDescription = async (event) => {
    if (!systemDescription.trim()) {
      // Проверяем, не пустое ли значение
      alert("Пожалуйста, введите значение перед добавлением."); // Используйте более подходящий способ уведомления пользователя
      return;
    }

    event.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/systemDescription`, {
        systemDescription: systemDescription,
      });
      setSystemDescription("");
      const fetchedSystemDescriptions = await fetchSystemDescriptions(); // Повторно получаем значения
      setSystemDescriptions(fetchedSystemDescriptions);
    } catch (error) {
      console.error("Ошибка при добавлении описании:", error);
    }
  };

  const handleEditClickSystemDescription = (systemDescription) => {
    setEditingSystemDescriptionId(systemDescription._id);
    setEditedSystemDescription(systemDescription.systemDescription);
  };

  const handleSaveClickSystemDescription = async (id) => {
    if (!editedSystemDescription.trim()) {
      // Проверяем, не пустое ли значение
      alert("Пожалуйста, введите значение перед добавлением."); // Используйте более подходящий способ уведомления пользователя
      return;
    }

    try {
      await axios.put(`${API_BASE_URL}/systemDescription/${id}`, {
        systemDescription: editedSystemDescription,
      });
      const updatedSystemDescriptions = await axios.get(
        `${API_BASE_URL}/systemDescription`
      );
      setSystemDescriptions(updatedSystemDescriptions.data);
      setEditingSystemDescriptionId(null);
    } catch (error) {
      console.error("Ошибка при сохранении измененной цены:", error);
    }
  };

  const handleDeleteSystemDescription = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/systemDescription/${id}`);
      const updatedSystemDescriptions = systemDescriptions.filter(
        (systemDescription) => systemDescription._id !== id
      );
      setSystemDescriptions(updatedSystemDescriptions);
    } catch (error) {
      console.error("Ошибка при удалении доп. услуги:", error);
    }
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Выход успешно выполнен.
        console.log("User signed out");
        // setIsAuthenticated(false);
      })
      .catch((error) => {
        // Произошла ошибка при попытке выхода.
        console.error("Sign out error", error);
      });
  };

  return (
    <Container spacing={2}>
      <Box
        sx={{
          margin: "20px 0",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography textAlign="center">
          Добавлять/Удалять/Редактировать
        </Typography>
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: { flexDirection },
          boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.15)",
          padding: "20px",
          margin: "40px 0",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmitBoilerValue}
          noValidate
          sx={{ mt: 1, maxWidth: "400px" }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="boilerValue"
            label="Бойлер"
            name="boilerValue"
            value={boilerValue}
            onChange={(e) => setBoilerValue(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="priceBoilerValue"
            label="Цена"
            type="number"
            id="priceBoilerValue"
            value={priceBoilerValue}
            onChange={(e) => setPriceBoilerValue(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Добавить
          </Button>
        </Box>

        <Box>
          <List>
            {boilerValues?.map((boilerValue) => (
              <ListItem
                key={boilerValue._id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {editingBoilerValueId === boilerValue._id ? (
                  <>
                    <TextField
                      size="small"
                      value={editedBoilerValue}
                      onChange={(e) => setEditedBoilerValue(e.target.value)}
                      style={{ marginRight: "10px" }}
                    />
                    <TextField
                      size="small"
                      value={editedPriceBoilerValue}
                      onChange={(e) =>
                        setEditedPriceBoilerValue(e.target.value)
                      }
                      style={{ marginRight: "10px" }}
                    />
                    <IconButton
                      onClick={() =>
                        handleSaveClickBoilerValue(boilerValue._id)
                      }
                    >
                      <SaveIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteBoilerValue(boilerValue._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <ListItemText
                      primary={`Кол: ${boilerValue.boilerValue}, Цена: ${boilerValue.priceBoilerValue} руб.`}
                    />
                    <IconButton
                      onClick={() => handleEditClickBoilerValue(boilerValue)}
                    >
                      <EditIcon />
                    </IconButton>
                  </>
                )}
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: { flexDirection },
          boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.15)",
          padding: "20px",
          margin: "40px 0",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1, maxWidth: "400px" }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="power1"
            label="Мощность котла"
            name="power1"
            value={power1}
            onChange={(e) => setPower1(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="power2"
            label="Мощность котла 2"
            name="power2"
            value={power2}
            onChange={(e) => setPower2(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="price"
            label="Цена"
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Добавить цену
          </Button>
        </Box>
        <Box>
          <List>
            {prices.map((price) => (
              <ListItem
                key={price._id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {editingPriceId === price._id ? (
                  <>
                    <TextField
                      size="small"
                      value={editedPower1}
                      onChange={(e) => setEditedPower1(e.target.value)}
                      style={{ marginRight: "10px" }}
                    />
                    <TextField
                      size="small"
                      value={editedPower2}
                      onChange={(e) => setEditedPower2(e.target.value)}
                      style={{ marginRight: "10px" }}
                    />
                    <TextField
                      size="small"
                      value={editedPrice}
                      onChange={(e) => setEditedPrice(e.target.value)}
                      style={{ marginRight: "10px" }}
                    />
                    <IconButton onClick={() => handleSaveClick(price._id)}>
                      <SaveIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeletePrice(price._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <ListItemText
                      primary={`Мощность: ${price.power1}, ${price.power2}, Цена: ${price.price} руб.`}
                    />
                    <IconButton onClick={() => handleEditClick(price)}>
                      <EditIcon />
                    </IconButton>
                  </>
                )}
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: { flexDirection },
          boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.15)",
          padding: "20px",
          margin: "40px 0",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmitCountExit}
          noValidate
          sx={{ mt: 1, maxWidth: "400px" }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="countExit"
            label="Кол выходов"
            name="countExit"
            value={countExit}
            onChange={(e) => setCountExit(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="priceExit"
            label="Цена"
            type="number"
            id="priceExit"
            value={priceCountExit}
            onChange={(e) => setPriceCountExit(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Добавить выход
          </Button>
        </Box>

        <Box>
          <List>
            {countExits?.map((countExit) => (
              <ListItem
                key={countExit._id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {editingCountExitId === countExit._id ? (
                  <>
                    <TextField
                      size="small"
                      value={editedCountExit}
                      onChange={(e) => setEditedCountExit(e.target.value)}
                      style={{ marginRight: "10px" }}
                    />
                    <TextField
                      size="small"
                      value={editedPriceCountExit}
                      onChange={(e) => setEditedPriceCountExit(e.target.value)}
                      style={{ marginRight: "10px" }}
                    />
                    <IconButton
                      onClick={() => handleSaveClickCountExit(countExit._id)}
                    >
                      <SaveIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteCountExit(countExit._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <ListItemText
                      primary={`Кол: ${countExit.countExit}, Цена: ${countExit.priceCountExit} руб.`}
                    />
                    <IconButton
                      onClick={() => handleEditClickCountExit(countExit)}
                    >
                      <EditIcon />
                    </IconButton>
                  </>
                )}
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: { flexDirection },
          boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.15)",
          padding: "20px",
          margin: "40px 0",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmitExtraService}
          noValidate
          sx={{ mt: 1, maxWidth: "400px" }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="extraService"
            label="название доп к заказа"
            name="extraService"
            value={extraService}
            onChange={(e) => setExtraService(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="priceExtraService"
            label="Цена"
            type="number"
            id="priceExtraService"
            value={priceExtraService}
            onChange={(e) => setPriceExtraService(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Добавить доп к заказу
          </Button>
        </Box>

        <Box>
          <List>
            {extraServices?.map((extraService) => (
              <ListItem
                key={extraService._id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {editingExtraServiceId === extraService._id ? (
                  <>
                    <TextField
                      size="small"
                      value={editedExtraService}
                      onChange={(e) => setEditedExtraService(e.target.value)}
                      style={{ marginRight: "10px" }}
                    />
                    <TextField
                      size="small"
                      value={editedPriceExtraService}
                      onChange={(e) =>
                        setEditedPriceExtraService(e.target.value)
                      }
                      style={{ marginRight: "10px" }}
                    />
                    <IconButton
                      onClick={() =>
                        handleSaveClickExtraService(extraService._id)
                      }
                    >
                      <SaveIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteExtraService(extraService._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <ListItemText
                      primary={`Наз: ${extraService.nameExtraService}, Цена: ${extraService.priceExtraService} руб.`}
                    />
                    <IconButton
                      onClick={() => handleEditClickExtraService(extraService)}
                    >
                      <EditIcon />
                    </IconButton>
                  </>
                )}
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: { flexDirection },
          boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.15)",
          padding: "20px",
          margin: "40px 0",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmitSystemDescription}
          noValidate
          sx={{ mt: 1, maxWidth: "400px" }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="systemDescription"
            label="введите описание системы"
            name="systemDescription"
            value={systemDescription}
            onChange={(e) => setSystemDescription(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Добавить описание системы
          </Button>
        </Box>

        <Box>
          <List>
            {systemDescriptions?.map((systemDescription) => (
              <ListItem
                key={systemDescription._id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {editingSystemDescriptionId === systemDescription._id ? (
                  <>
                    <TextField
                      size="small"
                      value={editedSystemDescription}
                      onChange={(e) =>
                        setEditedSystemDescription(e.target.value)
                      }
                      style={{ marginRight: "10px" }}
                    />
                    <IconButton
                      onClick={() =>
                        handleSaveClickSystemDescription(systemDescription._id)
                      }
                    >
                      <SaveIcon />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        handleDeleteSystemDescription(systemDescription._id)
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <ListItemText
                      primary={`Описание: ${systemDescription.systemDescription}`}
                    />
                    <IconButton
                      onClick={() =>
                        handleEditClickSystemDescription(systemDescription)
                      }
                    >
                      <EditIcon />
                    </IconButton>
                  </>
                )}
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Container>
  );
};

export default AdminPanel;
