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
    // height: "calc(100vh - 25px)",
    padding: "0",
    margin: "0",
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

const NewUserForm = ({ setPage }) => {
  const { setUserData, userData } = useMainStore();
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
    if (userData) {
      setFormData(userData);
      console.log(userData);
    }
  }, [userData]);

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

  const handleNext = async (event) => {
    event.preventDefault();
    if (!validateForm()) return; // Stops submission if validation fails

    const updatedFormData = {
      ...formData,
      age: Number(formData.age),
    };
    console.log(updatedFormData);
    setUserData(updatedFormData);
    setPage("preferences");
  };

  return (
    <Box sx={styles.container}>
      <Typography sx={{ margin: "0 10px 10px 10px" }}>
        Please fill your specifications. Your data will be kept annonymus and
        will never be shared with any user.
      </Typography>
      <Box component="form" onSubmit={handleNext} sx={styles.form}>
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
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default NewUserForm;
