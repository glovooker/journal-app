import { authSlice, checkingCredentials, login, logout } from '../../../src/store/auth/authSlice';
import { authenticatedState, demoUser, initialState, nonAuthenticatedState } from '../../fixtures/authFixtures';

describe('Tests on authSlice', () => {

   test('should return the initial state and be called "auth"', () => {

      expect(authSlice.name).toBe('auth');
      const state = authSlice.reducer(initialState, {});

      expect(state).toEqual(initialState);

   });

   test('should login the user', () => {

      const state = authSlice.reducer(initialState, login(demoUser));
      expect(state).toEqual({
         status: 'authenticated',
         uid: '123ABC',
         email: 'demo@google.com',
         displayName: 'Demo User',
         photoURL: 'https://demo.jpg',
         errorMessage: null,
      });

   });

   test('should logout the user without args', () => {

      const state = authSlice.reducer(authenticatedState, logout());
      expect(state).toEqual({
         status: 'not-authenticated',
         uid: null,
         email: null,
         displayName: null,
         photoURL: null,
         errorMessage: undefined,
      });

   });

   test('should logout the user with error message', () => {

      const errorMessage = 'Wrong credentials';

      const state = authSlice.reducer(authenticatedState, logout({ errorMessage }));
      expect(state).toEqual({
         status: 'not-authenticated',
         uid: null,
         email: null,
         displayName: null,
         photoURL: null,
         errorMessage: errorMessage,
      });

   });

   test('should change state to checking', () => {

      const state = authSlice.reducer(authenticatedState, checkingCredentials());
      expect(state.status).toBe('checking');

   });

});
