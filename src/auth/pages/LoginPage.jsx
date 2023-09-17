import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Google } from '@mui/icons-material';
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';

import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth';

const formData = {
   email: '',
   password: '',
};

const formValidations = {
   email: [(value) => value.includes('@'), 'Invalid email address'],
   password: [(value) => value.length >= 6, 'Password must be at least 6 characters long'],
};

export const LoginPage = () => {

   const dispatch = useDispatch();

   const [formSubmitted, setFormSubmitted] = useState(false);

   const { status, errorMessage } = useSelector(state => state.auth);

   const isAuthenticating = useMemo(() => status === 'checking', [status]);

   const {
      formState, email, password, onInputChange,
      isFormValid, emailValid, passwordValid
   } = useForm(formData, formValidations);


   const onSubmit = (event) => {
      event.preventDefault();
      setFormSubmitted(true);

      if (!isFormValid) return;

      dispatch(startLoginWithEmailPassword(formState));
   };

   const onGoogleSignIn = () => {
      dispatch(startGoogleSignIn());
   };

   return (
      <AuthLayout title='Log in'>
         <form
            aria-label='submit-form'
            onSubmit={ onSubmit }
            className='animate__animated animate__fadeIn animate__faster'>
            <Grid container>
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
                     inputProps={ {
                        'data-testid': 'password'
                     } }
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

                  <Grid item xs={ 12 } sm={ 6 }>
                     <Button
                        disabled={ isAuthenticating }
                        type='submit'
                        variant={ 'contained' }
                        fullWidth
                     >
                        Log in
                     </Button>
                  </Grid>

                  <Grid item xs={ 12 } sm={ 6 }>
                     <Button
                        disabled={ isAuthenticating }
                        variant={ 'contained' }
                        fullWidth
                        aria-label='google-btn'
                        onClick={ onGoogleSignIn }
                     >
                        <Google />
                        <Typography sx={ { ml: 1 } }>Google</Typography>
                     </Button>
                  </Grid>
               </Grid>

               <Grid container direction='row' justifyContent='end'>
                  <Link component={ RouterLink } color='inherit' to='/auth/register'>
                     Create account
                  </Link>
               </Grid>

            </Grid>
         </form>
      </AuthLayout>

   );
};
