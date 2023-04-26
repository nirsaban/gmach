import { ChangeEventHandler, useState ,useEffect} from 'react';
import { UIInput } from '../ui/input';

import { Box, Button,TextField, Grid, Paper,Typography } from '@mui/material';
import { FormState, useForm } from 'react-hook-form';
import { ZodType, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
 
import {ApiServices} from "../api/apiService"
export const schema = z.object({
    firstName: z.string().min(2).max(20).nonempty(),
    lastName: z.string().min(2).max(20).nonempty(),
    phone: z
      .string()
      .regex(/^0\d([\d]{0,1})([-]{0,1})\d{7}$/, 'invalid phone number')
      .nonempty()
  }) 




export const CreateUserForm = ({setUsers , users}) => {
  const [state, setState] = useState({});
  const [file, setFile] = useState({});
  const [array, setArray] = useState([]);
  useEffect(() => {
    if(array.length){
        (async() => {
          try {
            const response = await new ApiServices().createUsers({users : array})
            setUsers(
              [...users, ...response]
            )  
          } catch (error) {
            console.log(error)
          }
        })()
    }
  }, [array])
  const fileReader = new FileReader();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema)
  });

    
  const csvFileToArray = string => {
    const csvHeader = string.slice(0, string.indexOf("\r")).split(",");
    // csvHeader.map(header => header.replaceAll("r" , ""))
    const csvRows = string.slice(string.indexOf("\r") + 1).split("\r");
  
    const array = csvRows.map(i => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index].trim().replace(/\s+/g, "");
        return object;
      }, {});
      return obj;
    });

    setArray(array);
  };

  const handleCsv =(event) => { 
    event.preventDefault()
    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
      };
      fileReader.readAsText(file);
    
    }else{
      alert("Please upload a csv file")
    }
  }

  const  handleSubmitForm = async (data) => {

    try{
   const response = await new ApiServices().createUser(state)
        setUsers(
          [...users, response]
        )
    }catch(e){

    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const inputs = [
    {
      type: 'text',
      name: 'firstName',
      label: 'First Name',
      placeholder: 'Enter First Name',
      value: (state && state['firstName']) ,
      register: (name) => register('firstName')
    },
    {
      name: 'lastName',
      type: 'text',
      label: 'Last Name',
      placeholder: 'Enter Last Name',
      value: (state && state['lastName']) ,
      register: (name) => register('lastName')
    },
    {
      name: 'phone',
      type: 'tel',
      label: 'Phone number',
      placeholder: 'Enter phone number',
      value: (state && state['phone']),
      register: (name) => register('phone')
    }
  ];

  return (
    <>
    <Grid
          container
          xs={12} sm={6} md={12}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '1rem'
          }}
        >
    <Grid item xs={12} sm={8} md={6} component={Paper} elevation={12}   sx={{
            display: 'flex',
            justifyContent : 'center',       
            alignItems :  'center', 
          }}>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(() => handleSubmitForm())}
        sx={{ mt: 1 ,margin: '1rem'}}
        style={{ width: '50%' }}
      >
    <Box>
    <Typography  variant='h3'>
      צור תורם חדש
    </Typography>
    </Box>
        {inputs.map((input) => {
          return (
            <>
              <Grid item xs={12}>
                <UIInput {...input} key={input.name} errors={errors} handleChange={handleChange}  />
              </Grid>
            </>
          );
        })}
         
         <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                שלח
          </Button>
      </Box>
      
       
      </Grid>
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={12}   sx={{
            display: 'flex',
            justifyContent : 'center',       
            alignItems :  'center', 
            margin: '3rem'
          }}>
      <Box
       component="form"
       noValidate
       onSubmit={(event) => handleCsv(event)}
       sx={{ mt: 1 }}
       style={{ width: '50%' }}
      >
      <Typography  variant='h6'>
            העלה משתמשים עם קובץ אקסל    
      </Typography>
         <input  accept={".csv"}   type="file"    onChange={(event) => setFile(event.target.files[0])}   />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                שלח
          </Button>
      </Box>
      </Grid>
      </Grid>
    </>
  );
};
