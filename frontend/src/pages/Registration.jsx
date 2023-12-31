import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { Alert } from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { alanAtom, command, data } from "../atom/alanAtom";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#FFA500" },
    secondary: { main: "#FFA500" },
  },
});

const Registraion = () => {
  const pageName = useLocation();
  const navigate = useNavigate();
  const [newCommand, setCommand] = useAtom(command);
  const [newAlanAtom, setAlanAtom] = useAtom(alanAtom);
  const [newData, setData] = useAtom(data);

  const [isSubmiting, setIsSubmiting] = useState(false);

  console.log(pageName.pathname);

  function speak() {
    if (newAlanAtom) {
      newAlanAtom.activate();
      newAlanAtom.playText(
        "Here..your can register in our system by answering questions, do you want to register?"
      );
    }
  }

  useEffect(() => {
    setTimeout(speak(), 2000);
  }, []);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    email: "",
    password: "",
  });

  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleClick = () => {
    setState((prv) => {
      return {
        ...prv,
        open: true,
      };
    });
  };
  const handleClose = () => {
    setState({ ...state, open: false });
  };
  console.log(user);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmiting(true);

    axios
      .post("http://localhost:8072/users", user)
      .then((res) => {
        setIsSubmiting(false);
        setUser({
          firstName: "",
          lastName: "",
          address: "",
          email: "",
          phone: "",
          password: "",
        });
      })
      .catch((err) => {
        alert(err);
      });
  };

  function register() {
    setIsSubmiting(true);

    axios
      .post("http://localhost:8072/users", user)
      .then((res) => {
        setIsSubmiting(false);
        handleClick();
        setUser({
          firstName: "",
          lastName: "",
          address: "",
          email: "",
          phone: "",
          password: "",
        });
      })
      .catch((err) => {
        alert(err);
      });
  }

  useEffect(() => {
    try {
      if (newCommand === "goToLogin") {
        navigate("/login");
      }
      if (newCommand === "setFirstName") {
        setUser((prv) => {
          return {
            ...prv,
            firstName: newData,
          };
        });
      }
      if (newCommand === "setLastName") {
        setUser((prv) => {
          return {
            ...prv,
            lastName: newData,
          };
        });
      }
      if (newCommand === "setEmail") {
        setUser((prv) => {
          return {
            ...prv,
            email: newData.toLowerCase(),
          };
        });
      }
      if (newCommand === "setPassword") {
        setUser((prv) => {
          return {
            ...prv,
            password: newData.replace(/\s+/g, ""),
          };
        });
      }
      if (newCommand === "setAddress") {
        setUser((prv) => {
          return {
            ...prv,
            address: newData,
          };
        });
      }
      if (newCommand === "setPhone") {
        setUser((prv) => {
          return {
            ...prv,
            phone: newData,
          };
        });
      }
      if (newCommand === "registerMe") {
        register();
      }
    } finally {
      setCommand("");
    }
  }, [newCommand]);
  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Loggin Successfully!
          </Alert>
        </Snackbar>

        <Box
          sx={{
            //   marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            //   background: "lightBlue",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  size="small"
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(e) =>
                    setUser((p) => {
                      return {
                        ...p,
                        firstName: e.target.value,
                      };
                    })
                  }
                  value={user.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  size="small"
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(e) =>
                    setUser((p) => {
                      return {
                        ...p,
                        lastName: e.target.value,
                      };
                    })
                  }
                  value={user.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  size="small"
                  id="address"
                  label="Address"
                  name="address"
                  autoComplete="family-name"
                  onChange={(e) =>
                    setUser((p) => {
                      return {
                        ...p,
                        address: e.target.value,
                      };
                    })
                  }
                  value={user.address}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  size="small"
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) =>
                    setUser((p) => {
                      return {
                        ...p,
                        email: e.target.value,
                      };
                    })
                  }
                  value={user.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="number"
                  required
                  fullWidth
                  size="small"
                  id="phone"
                  label="Phone"
                  name="phone"
                  autoComplete="phone"
                  onChange={(e) =>
                    setUser((p) => {
                      return {
                        ...p,
                        phone: e.target.value,
                      };
                    })
                  }
                  value={user.phone}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  size="small"
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) =>
                    setUser((p) => {
                      return {
                        ...p,
                        password: e.target.value,
                      };
                    })
                  }
                  value={user.password}
                />
              </Grid>
            </Grid>
            {/* <Grid container justifyContent="center">
              <Grid item> */}
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }} //margin top(mt) margin bottom (mb)
              disabled={isSubmiting}
            >
              {isSubmiting ? <CircularProgress size={30} /> : "Sign Up"}
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Registraion;
