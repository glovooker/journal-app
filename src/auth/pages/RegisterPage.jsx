import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';

import { startCreatingUserWithEmailPassword } from '../../store/auth';

const formData = {
   email: '',
   password: '',
   displayName: ''
};

const formValidations = {
   email: [(value) => value.includes('@'), 'Invalid email address'],
   password: [(value) => value.length >= 6, 'Password must be at least 6 characters long'],
   displayName: [(value) => value.length >= 1, 'Name is required']
};

export const RegisterPage = () => {

   const dispatch = useDispatch();

   const [formSubmitted, setFormSubmitted] = useState(false);

   const { status, errorMessage } = useSelector(state => state.auth);

   const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

   const {
      formState, displayName, email, password, onInputChange,
      isFormValid, displayNameValid, emailValid, passwordValid
   } = useForm(formData, formValidations);

   const onSubmit = (event) => {
      event.preventDefault();
      setFormSubmitted(true);

      if (!isFormValid) return;

      dispatch(startCreatingUserWithEmailPassword(formState));
   };

   return (
      <AuthLayout title='Register'>
         <form onSubmit={ onSubmit } className='animate__animated animate__fadeIn animate__faster'>
            <Grid container>
               <Grid item xs={ 12 } sx={ { mt: 2 } }>
                  <TextField
                     label='Name'
                     type='text'
                     placeholder='Your full name'
                     fullWidth
                     name='displayName'
                     value={ displayName }
                     onChange={ onInputChange }
                     error={ !!displayNameValid && formSubmitted }
                     helperText={ formSubmitted && displayNameValid }
                  />
               </Grid>

               <Grid item xs={ 12 } sx={ { mt: 2 } }>
                  <TextField
                     label='Email'
                     type='email'
                     placeholder='your@email.com'
                     fullWidth
                     name='email'
                     value={ email }
                     onChange={ onInputChange }
                     error={ !!emailValid && formSubmitted }
                     helperText={ formSubmitted && emailValid }
                  />
               </Grid>

               <Grid item xs={ 12 } sx={ { mt: 2 } }>
                  <TextField
                     label='Password'
                     type='password'
                     placeholder='Password'
                     fullWidth
                     name='password'
                     value={ password }
                     onChange={ onInputChange }
                     error={ !!passwordValid && formSubmitted }
                     helperText={ formSubmitted && passwordValid }
                  />
               </Grid>

               <Grid container spacing={ 2 } sx={ { mb: 2, mt: 1 } }>
                  <Grid
                     item
                     xs={ 12 }
                     display={ !!errorMessage ? '' : 'none' }
                  >
                     <Alert severity='error'>{ errorMessage }</Alert>
                  </Grid>

                  <Grid item xs={ 12 }>
                     <Button
                        disabled={ isCheckingAuthentication }
                        type='submit'
                        variant={ 'contained' }
                        fullWidth
                     >
                        Create account
                     </Button>
                  </Grid>
               </Grid>

               <Grid container direction='row' justifyContent='end'>
                  <Typography sx={ { mr: 1 } }>Already registered?</Typography>
                  <Link component={ RouterLink } color='inherit' to='/auth/login'>
                     Log in
                  </Link>
               </Grid>

            </Grid>
         </form>
      </AuthLayout>

   );
};
