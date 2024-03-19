import React, { useEffect, useState } from "react";
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  Box,
  FormHelperText,
  Typography,
} from "@mui/material";
import { useUserAuth } from "../context/AuthContext";
import useMainStore from "../store/mainStore";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    // height: "100%",
    background: "goldenrod",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    maxWidth: "400px",
    background: "rgba(250,250,250,0.8)",
    padding: "20px",
    borderRadius: "8px",
    border: "1px solid goldenrod",
    color: "goldenrod",
    width: "100%",
  },
  button: {
    backgroundColor: "goldenrod",
    "&:hover": {
      backgroundColor: "darkgoldenrod",
    },
  },
};

const PreferencesForm = ({ setPage, onSave, globalErrorMessage }) => {
  const { preferenceData, setPreferenceData } = useMainStore();
  const [formData, setFormData] = useState({
    gender: "",
    age: "",
    city: "",
    userId: null,
  });
  const [formErrors, setFormErrors] = useState({
    gender: "",
    age: "",
    city: "",
  });
  const { updateUser } = useUserAuth();

  useEffect(() => {
    if (preferenceData) {
      setFormData(preferenceData);
    }
  }, [preferenceData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // Reset errors on change
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.gender) errors.gender = "Gender is required.";
    if (!formData.city) errors.city = "City is required.";
    if (!formData.age) {
      errors.age = "Age is required.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0; // Returns true if no errors
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setPreferenceData(formData);
    onSave(formData);
  };

  return (
    <Box sx={styles.container}>
      <Typography sx={{ margin: "0 10px 10px 10px" }}>
        Who do you want to talk to? This can be changed at anytime.
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={styles.form}>
        <FormControl fullWidth error={Boolean(formErrors.gender)}>
          <InputLabel id="gender-select-label">Gender</InputLabel>
          <Select
            labelId="gender-select-label"
            id="gender-select"
            value={formData.gender}
            label="Gender"
            name="gender"
            onChange={handleChange}
            sx={{ color: "goldenrod", borderBottom: "1px solid goldenrod" }}
          >
            <MenuItem value={"male"}>Male</MenuItem>
            <MenuItem value={"female"}>Female</MenuItem>
          </Select>
          <FormHelperText>{formErrors.gender}</FormHelperText>
        </FormControl>
        <FormControl fullWidth error={Boolean(formErrors.age)}>
          <InputLabel id="age-select-label">Age</InputLabel>
          <Select
            labelId="age-select-label"
            id="age-select"
            value={formData.age}
            label="age"
            name="age"
            onChange={handleChange}
            sx={{ borderBottom: "1px solid goldenrod" }}
          >
            <MenuItem value={"<25"}> {"< "}25</MenuItem>
            <MenuItem value={"25-30"}>25 - 30</MenuItem>
            <MenuItem value={"31-35"}>31 - 35</MenuItem>
            <MenuItem value={">40"}>{"> "}40</MenuItem>
            <MenuItem value={"any"}>Any</MenuItem>
          </Select>
          <FormHelperText>{formErrors.age}</FormHelperText>
        </FormControl>
        <FormControl fullWidth error={Boolean(formErrors.city)}>
          <InputLabel id="city-select-label">City</InputLabel>
          <Select
            labelId="city-select-label"
            id="city-select"
            value={formData.city}
            label="City"
            name="city"
            onChange={handleChange}
            sx={{ borderBottom: "1px solid goldenrod" }}
          >
            <MenuItem value={"Addis Ababa"}>Addis Ababa</MenuItem>
            <MenuItem value={"any"}>Any</MenuItem>
            {/* <MenuItem value={"Adama"}>Adama</MenuItem>
            <MenuItem value={"Bahir Dar"}>Bahir Dar</MenuItem>
            <MenuItem value={"Awassa"}>Awassa</MenuItem>
            <MenuItem value={"Dessie"}>Dessie</MenuItem>
            <MenuItem value={"Jima"}>Jima</MenuItem> */}
          </Select>
          <FormHelperText>{formErrors.city}</FormHelperText>
        </FormControl>
        {globalErrorMessage && (
          <Typography color="error" sx={{ textAlign: "center" }}>
            {globalErrorMessage}
          </Typography>
        )}
        <Button
          variant="contained"
          sx={styles.button}
          onClick={() => setPage("userform")}
        >
          Back
        </Button>
        <Button type="submit" variant="contained" sx={styles.button}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default PreferencesForm;
