import React from "react";
import { BrowserRouter } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import ForumIcon from "@mui/icons-material/Forum";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { RoomPage } from "src/chat";
import { WebsocketProvider } from "src/websocket";

import "./App.css";

import { AuthProvider, useAuthContext } from "./authentication/context";
import SignInForm from "./authentication/SignInForm";
import SignUpForm from "./authentication/SignUpForm";
import { getRooms } from "./interface";

const theme = createTheme();

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const queryClient = new QueryClient();

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
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <CssBaseline />
            <WebsocketProvider>
              <Grid container component="main" sx={{ height: "100vh" }}>
                <Grid
                  item
                  xs={12}
                  sm={8}
                  md={2}
                  component={Paper}
                  elevation={6}
                  square
                >
                  <LeftSide />
                </Grid>
                <Grid item xs={false} sm={4} md={8} sx={{ padding: "1rem" }}>
                  <RoomPage />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={8}
                  md={2}
                  component={Paper}
                  elevation={6}
                  square
                >
                  <RoomsList />
                </Grid>
              </Grid>
            </WebsocketProvider>
          </AuthProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

type RoomDetail = {
  name: string;
};

function RoomsList() {
  const roomsQuery = useQuery(
    ["rooms"],
    () => getRooms() as unknown as RoomDetail[]
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const roomId = searchParams.get("room");

  if (roomsQuery.isLoading) return <p>Loading</p>;
  if (roomsQuery.isError) return <p>Error</p>;

  const { data: rooms } = roomsQuery;
  return (
    <div>
      <List>
        {rooms.map((x) => (
          <ListItem disablePadding>
            <ListItemButton
              component="a"
              href={`?room=${x.name}`}
              selected={x.name === roomId}
              onClick={(e: React.MouseEvent<HTMLElement>) => {
                e.preventDefault();
                setSearchParams({ room: x.name });
              }}
            >
              <ListItemIcon>
                <ForumIcon />
              </ListItemIcon>
              <ListItemText primary={x.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
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
