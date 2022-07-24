import React from "react";
import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import { WebsocketProvider } from "src/websocket";
import { RoomPage } from "src/chat";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import SignInForm from "./authentication/SignInForm";
import { Box, Button, Divider, Tab, Tabs, Typography } from "@mui/material";
import SignUpForm from "./authentication/SignUpForm";
import { AuthProvider, useAuthContext } from "./authentication/context";

const theme = createTheme();

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CssBaseline />
        <WebsocketProvider>
          <Grid container component="main" sx={{ height: "100vh" }}>
            <Grid
              item
              xs={12}
              sm={8}
              md={3}
              component={Paper}
              elevation={6}
              square
            >
              <LeftSide />
            </Grid>
            <Grid item xs={false} sm={4} md={9} sx={{ padding: "1rem" }}>
              <RoomPage />
            </Grid>
          </Grid>
        </WebsocketProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
function LeftSide() {
  const auth = useAuthContext();
  const [tab, setTab] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  if (auth.isAuthenticated) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography component="h1" variant="h5">
          {auth.user?.username}
        </Typography>
        <Button onClick={auth.signOut}>Sign out</Button>
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tab}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Sign In" />
          <Tab label="Sign Up" />
        </Tabs>
      </Box>
      <TabPanel value={tab} index={0}>
        <SignInForm />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <SignUpForm />
      </TabPanel>
    </>
  );
}
export default App;
