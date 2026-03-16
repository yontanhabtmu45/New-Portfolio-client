import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { useAuth } from "../../../Context/AuthContext";
import { logIn } from "../../../services/login.service";

const Login = () => {
  const { login, isLogged, auth } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect to the admin dashboard
  useEffect(() => {
    if (isLogged && auth?.admin_token) {
      navigate("/admin", { replace: true });
    }
  }, [isLogged, auth, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await logIn({
        admin_email: email,
        admin_password: password,
      });

      const body = await response.json();

      if (!response.ok) {
        setError(body?.msg || "Login failed. Please check your credentials.");
        setLoading(false);
        return;
      }

      // Persist the token (role will be decoded from the JWT in AuthContext)
      const authPayload = {
        admin_token: body?.data?.data_token,
        admin_name: body?.data?.admin_name || "",
        admin_id: body?.data?.admin_id || null,
      };

      login(authPayload);

      // Redirect to the dashboard on success
      navigate("/admin", { replace: true });
    } catch (err) {
      console.error(err);
      setError("Unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 360,
        margin: "auto",
        mt: 10,
        p: 4,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        boxShadow: 2,
        backgroundColor: "background.paper",
      }}
    >
      <Typography variant="h5" component="h1" sx={{ mb: 2, textAlign: "center" }}>
        Admin Login
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
        {loading ? "Signing in…" : "Login"}
      </Button>
    </Box>
  );
};

export default Login;
