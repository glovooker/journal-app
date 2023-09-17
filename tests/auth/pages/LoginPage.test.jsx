import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';

import { LoginPage } from '../../../src/auth/pages/LoginPage';
import { authSlice } from '../../../src/store/auth';
import { startGoogleSignIn } from '../../../src/store/auth/thunks';
import { nonAuthenticatedState } from '../../fixtures/authFixtures';

const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

jest.mock('../../../src/store/auth/thunks', () => ({
   startGoogleSignIn: () => mockStartGoogleSignIn,
   startLoginWithEmailPassword: ({ email, password }) => {
      return () => mockStartLoginWithEmailPassword({ email, password });
   }
}));

jest.mock('react-redux', () => ({
   ...jest.requireActual('react-redux'),
   useDispatch: () => (fn) => fn(),
}));

const store = configureStore({
   reducer: {
      auth: authSlice.reducer
   },
   preloadedState: {
      auth: nonAuthenticatedState
   },
});

describe('Tests on LoginPage', () => {

   beforeEach(() => jest.clearAllMocks());

   test('should render correctly', () => {

      render(
         <Provider store={ store }>
            <MemoryRouter>
               <LoginPage />
            </MemoryRouter>
         </Provider>
      );

      expect(screen.getAllByText('Log in').length).toBeGreaterThanOrEqual(1);

   });

   test('Google Button should call startGoogleSignIn', () => {

      render(
         <Provider store={ store }>
            <MemoryRouter>
               <LoginPage />
            </MemoryRouter>
         </Provider>
      );

      const googleBtn = screen.getByLabelText('google-btn');
      fireEvent.click(googleBtn);

      expect(mockStartGoogleSignIn).toHaveBeenCalled();

   });

   test('should call startLoginWithEmailPassword', () => {

      const email = 'gabriel@google.com';
      const password = '123456';

      render(
         <Provider store={ store }>
            <MemoryRouter>
               <LoginPage />
            </MemoryRouter>
         </Provider>
      );

      const emailField = screen.getByRole('textbox', { name: 'Email' });
      fireEvent.change(emailField, { target: { name: 'email', value: email } });

      const passwordField = screen.getByTestId('password');
      fireEvent.change(passwordField, { target: { name: 'password', value: password } });

      const loginForm = screen.getByLabelText('submit-form');
      fireEvent.submit(loginForm);

      expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith({
         email,
         password
      });

   });

});
