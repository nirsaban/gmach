import React , {useState} from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  ListItem,
  useTheme,
  ListItemText,
  useMediaQuery
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import DrawerComponent from "./drower"
import { routes } from "../routes";



const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: 10,
    display: "flex",
  },
 logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: 20,
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
  },
  nav : {
    top : "0",
  }
}));

function Navbar() {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));


  return (
    <>
     <DrawerComponent  />

        <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        <Typography variant="h4" className={classes.logo}>
          נחלת דוד
        </Typography>
        {
            isMobile? (
            <DrawerComponent  />
            ) : (
            <div className={classes.navlinks}>
            {
                routes.map((route, index) =>(
                    <>
                      <ListItem onClick={() => setOpenDrawer(false)}  className={classes.link}>
                <ListItemText  className={classes.link}>
                   <Link to={`${route.path}`}>{route.name}</Link>
              </ListItemText>
             </ListItem>
                    </>
                ))
            }
           
          </div>
            )
        }
          
      </Toolbar>
    </AppBar>
    </>

  );
}
export default Navbar;