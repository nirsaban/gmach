import React, { Fragment, ReactNode } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { routes } from './routes';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch } from 'react-redux';
import { setLoader } from './redux/loaderSlice';
import { useSelector } from 'react-redux';
import DrawerAppBar from './components/AppBar';


function App() {
  const dispatch = useDispatch();
  const loaderState = useSelector((state) => state?.loader?.loader);
  const getRoutes = () => {
    return routes.map((route) => {
      return <Route path={route.path} element={route.component} key={route.path} />;
    });
  };

  return (
    
    <div className="App">
    
    <DrawerAppBar  />
    
      <Routes>
        {getRoutes()}
        <Route path="*" element={<Navigate to="/users"/>} />
      </Routes>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loaderState}
        onClick={() => dispatch(setLoader(false))}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
     
    </div>
  );
}

export default App;
