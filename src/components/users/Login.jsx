import React from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";

import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import Button from "@mui/material/Button";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Login() {
  const emailId = React.useId();
  const passwordId = React.useId();

  const [showPassword, setShowPassword] = React.useState(false);

  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(formData);

   
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          width: 350,
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            mb: 3,
            fontWeight: "bold",
          }}
        >
          Login
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* EMAIL */}

          <FormControl fullWidth variant="standard" sx={{ mb: 3 }}>
            <InputLabel htmlFor={`${emailId}-input`}>Email</InputLabel>

            <Input
              id={`${emailId}-input`}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </FormControl>

          {/* PASSWORD */}

          <FormControl fullWidth variant="standard" sx={{ mb: 3 }}>
            <InputLabel htmlFor={`${passwordId}-input`}>Password</InputLabel>

            <Input
              id={`${passwordId}-input`}
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword ? "hide password" : "show password"
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          {/* BUTTON */}

          <Button type="submit" variant="contained" fullWidth>
            Login
          </Button>
          <p className="text-muted text-center" style={{textAlign:"center"}}>forgot user id or password</p>
        </form>
      </Paper>
    </Box>
  );
}
