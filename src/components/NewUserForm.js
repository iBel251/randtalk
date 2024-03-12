import React, { useEffect } from "react";
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  Box,
  FormHelperText,
} from "@mui/material";
import { useUserAuth } from "../context/AuthContext";

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    background: "goldenrod",
    padding: "5px",
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
  },
  button: {
    backgroundColor: "goldenrod",
    "&:hover": {
      backgroundColor: "darkgoldenrod",
    },
  },
};

const NewUserForm = () => {
  const [formData, setFormData] = React.useState({
    gender: "",
    age: "",
    city: "",
    userId: null,
  });
  const [formErrors, setFormErrors] = React.useState({
    gender: "",
    age: "",
    city: "",
  });
  const { updateUser } = useUserAuth();
  useEffect(() => {
    const id = "344468363";
    setFormData((prevState) => ({
      ...prevState,
      ["userId"]: id,
    }));
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-web-app.js";
    script.async = true;
    document.body.appendChild(script);
    // Cleanup function to remove script if needed
    // return () => document.body.removeChild(script);
  }, []);

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
    } else if (formData.age <= 16) {
      errors.age = "Age must be above 16.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0; // Returns true if no errors
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return; // Stops submission if validation fails

    const updatedFormData = {
      ...formData,
      age: Number(formData.age),
    };
    console.log(updatedFormData);
    await updateUser(formData.userId, updatedFormData);

    // Close the Web App after submission
    if (window.Telegram) {
      window.Telegram.WebApp.close();
    }
  };

  return (
    <Box sx={styles.container}>
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
            <MenuItem value={"other"}>Other</MenuItem>
          </Select>
          <FormHelperText>{formErrors.gender}</FormHelperText>
        </FormControl>
        <TextField
          label="Age"
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          error={Boolean(formErrors.age)}
          helperText={formErrors.age}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{
            borderBottom: "1px solid goldenrod",
          }}
        />
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
            <MenuItem value={"Adama"}>Adama</MenuItem>
            <MenuItem value={"Bahir Dar"}>Bahir Dar</MenuItem>
            <MenuItem value={"Awassa"}>Awassa</MenuItem>
            <MenuItem value={"Dessie"}>Dessie</MenuItem>
            <MenuItem value={"Jima"}>Jima</MenuItem>
          </Select>
          <FormHelperText>{formErrors.city}</FormHelperText>
        </FormControl>
        <Button type="submit" variant="contained" sx={styles.button}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default NewUserForm;
