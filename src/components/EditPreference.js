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
import { useParams } from "react-router-dom";
import { DNA } from "react-loader-spinner";
import { closeWebApp, sendActionToBot } from "../functions/botFunctions";

const styles = {
  container: {
    height: "100vh",
    padding: "0",
    margin: "0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    // height: "calc(100vh - 25px)",
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

const EditPreference = () => {
  const { id } = useParams();
  const { setUserData, userData } = useMainStore();
  const [formData, setFormData] = useState({
    gender: "",
    age: "",
    city: "",
  });
  const [formErrors, setFormErrors] = useState({
    gender: "",
    age: "",
    city: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const { getUserDataById, updateUserPreferenceOnly } = useUserAuth();

  useEffect(() => {
    // Define an async function inside the effect
    const fetchData = async () => {
      setIsLoading(true); // Assume you have an isLoading state to show a loader while fetching
      try {
        const data = await getUserDataById(id); // Fetch user data by ID
        if (data) {
          // Update formData state with fetched data
          console.log("data is", data);
          setFormData({
            ...(data.preferences || { gender: "", city: "", age: "" }),
          });
        } else {
          // Handle case where no data is returned
          console.log("No user data found for the given ID.");
        }
      } catch (error) {
        // Handle any errors during fetching
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false); // Set loading state to false once fetching is done
      }
    };

    fetchData(); // Call the fetchData function
  }, [id]);

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

  const handleSave = async (event) => {
    event.preventDefault();
    if (!validateForm()) return; // Stops submission if validation fails

    const updatedFormData = {
      ...formData,
      age: Number(formData.age),
    };
    console.log(updatedFormData);
    setUserData(updatedFormData);
    setIsLoading(true);
    const { success, error } = await updateUserPreferenceOnly(id, formData);
    setIsLoading(false);
    if (success) {
      sendActionToBot("preference_edit_successful");
      closeWebApp();
    } else {
      console.log("Something was wrong, Registration not complete.");
    }
  };

  if (!id) {
    return (
      <Box sx={styles.container}>
        <Typography
          sx={{
            background: "white",
            margin: "20px",
            padding: "20px",
            fontSize: "25px",
            textAlign: "center",
          }}
        >
          Sorry, Page can only be accessed directly from telegram RandXtalk bot.
        </Typography>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box sx={styles.container}>
        <DNA
          visible={true}
          height="250"
          width="250"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
        <Typography sx={{ fontSize: "30px", fontWeight: "bold" }}>
          Please wait...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={styles.container}>
      <Box
        sx={{
          background: "black",
          color: "goldenrod",
          padding: "10px",
          marginBottom: "20px",
          borderTopLeftRadius: "30px",
          borderBottomRightRadius: "30px",
        }}
      >
        <Typography sx={{ fontSize: "45px" }}>RandTalk</Typography>
      </Box>
      <Typography sx={{ margin: "0 10px 10px 10px" }}>
        Please edit your preferences so you can be matched with your desired
        person.
      </Typography>
      <Box component="form" onSubmit={handleSave} sx={styles.form}>
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
        <Button type="submit" variant="contained" sx={styles.button}>
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default EditPreference;
