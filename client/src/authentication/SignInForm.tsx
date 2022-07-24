import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useAuthContext } from "./context";

export default function SignInForm() {
  const auth = useAuthContext();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const username = data.get("nickname") as string;
    const password = data.get("password") as string;
    auth.signIn(username, password);
  };

  return (
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h2" variant="h5">
        Sign in
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Nickname"
          name="nickname"
          autoComplete="nickname"
          autoFocus
        />
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
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={auth.isSigningIn}
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
      </Box>
    </Box>
  );
}
