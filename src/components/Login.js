import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Button, Alert } from "@mui/material";
import { Box } from "@mui/system";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  const { login } = useAuth();

  //to redirect to the home page we will use useHistory hook.
  const history = useHistory();
  //handle any error in a state.
  const [error, setError] = useState("");

  //prevent making a lot of account by press login multi-time.
  const [loading, setLoading] = useState(false);

  // async function to add the email and pass.
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(email, password);
      history.push("/home");
    } catch (e) {
      // for developer to see the error
      console.log(e);
      // to set error to the user
      setError("Email / Password is not correct. Failed to login.");
    }
    setLoading(false);
  }
  return (
    <div>
      <Card
        sx={{
          mt: 10,
          boxShadow: 3,
          maxWidth: 650,
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
        className="card"
      >
        <div className="card">
          <Typography
            variant="h3"
            sx={{ m: 3, color: "#1b5e20", textAlign: "center" }}
          >
            Log in
          </Typography>

          <Box
            component="img"
            sx={{
              height: 200,
              width: 200,
              display: "block",
              margin: "auto",
            }}
            alt=""
            src="https://s3.eu-west-1.amazonaws.com/www.mahaseel.net/images/Mahaseel-web-logo-en.png"
          />

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Container component="main" maxWidth="xs">
            <form onSubmit={handleSubmit}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address (Required)"
                name="email"
                autoComplete="email"
                type="email"
                sx={{ mb: 4, bgcolor: "#e8f5e9" }}
                onChange={handleChangeEmail}
              />

              <TextField
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                type="password"
                autoComplete="new-password"
                sx={{ mb: 2, bgcolor: "#e8f5e9" }}
                onChange={handleChangePassword}
              />

              <Button
                disabled={loading}
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mb: 2, bgcolor: "#1b5e20" }}
              >
                Log In
              </Button>
            </form>
          </Container>
        </div>
        <p style={{textAlign: "center", fontWeight: 600}}>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
      </Card>
    </div>
  );
}
