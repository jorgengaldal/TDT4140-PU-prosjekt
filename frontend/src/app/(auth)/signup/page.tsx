"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useRouter } from "next/navigation";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Card, CardContent } from "@mui/material";

const defaultTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function SignUp() {
  const router = useRouter();
  const [errors, setErrors] = React.useState({
    email: [""],
    username: [""],
    password: [""],
  });
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("username"),
      password: data.get("password"),
    });
    fetch("http://localhost:8000/api/members/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.get("username"),
        email: data.get("email"),
        password: data.get("password"),
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        if (
          responseData.email == data.get("email") &&
          responseData.username == data.get("username")
        ) {
          console.log("Sign up successful");
          router.push("/login");
        } else {
          setErrors(responseData);
        }
      })

      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="min-h-screen m-20">
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <Card sx={{ bgcolor: "rgba(255, 255, 255, 0.005)" }}>
            <CardContent>
              <Box
                sx={{
                  marginTop: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign up
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                  />
                  <Typography color="error">{errors["username"]}</Typography>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="email"
                    label="Email"
                    type="email"
                    id="email"
                    autoComplete="email"
                  />
                  <Typography color="error">{errors["email"]}</Typography>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <Typography color="error">{errors["password"]}</Typography>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign Up
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </ThemeProvider>
    </div>
  );
}
