import { Box, TextField, Grid } from '@mui/material';


export const UIInput = ({
    handleChange,
    handleChangeDate,
    register,
    errors,
    ...rest
  }) => {
        return(
            <Grid item xs={12}>
            <TextField
              type={rest.type}
              {...register(rest.name)}
              disabled={rest.disabled || false}
              key={rest.name}
              margin="normal"
              required
              fullWidth={true}
              id={rest.name}
              label={rest.label}
              name={rest.name}
              autoFocus
              defaultValue={rest.defaultValue}
              value={rest.value}
              helperText={errors[rest.name] && (errors[rest.name].message)}
              error={!!errors[rest.name]}
              onChange={handleChange}
            />
          </Grid>
        )
}