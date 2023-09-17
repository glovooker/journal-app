import { logoutFirebase, registerUserWithEmailPassword, signInWithEmailPassword, signInWithGoogle } from '../../../src/firebase/providers';
import { checkingCredentials, login, logout, startCreatingUserWithEmailPassword } from '../../../src/store/auth';
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from '../../../src/store/auth/thunks';
import { clearNotesLogout } from '../../../src/store/journal/journalSlice';
import { demoUser } from '../../fixtures/authFixtures';

jest.mock('../../../src/firebase/providers');

describe('Tests on thunks', () => {

   const dispatch = jest.fn();

   beforeEach(() => jest.clearAllMocks());

   test('should call checkingCredentials', async () => {

      await checkingAuthentication()(dispatch);

      expect(dispatch).toHaveBeenCalledWith(checkingCredentials());

   });

   test('startGoogleSignIn should call checkingCredentials and login - Success', async () => {

      const loginData = { ok: true, ...demoUser };
      await signInWithGoogle.mockResolvedValue(loginData);

      await startGoogleSignIn()(dispatch);

      expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
      expect(dispatch).toHaveBeenCalledWith(login(loginData));

   });

   test('startGoogleSignIn should call checkingCredentials and logout - Error', async () => {

      const loginData = { ok: false, errorMessage: 'A Google Error' };
      await signInWithGoogle.mockResolvedValue(loginData);

      await startGoogleSignIn()(dispatch);

      expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
      expect(dispatch).toHaveBeenCalledWith(logout(loginData));

   });

   test('startLoginWithEmailPassword should call checkingCredentials and login - Success', async () => {

      const loginData = { ok: true, ...demoUser };
      const formData = { email: demoUser.email, password: '123456' };

      await signInWithEmailPassword.mockResolvedValue(loginData);

      await startLoginWithEmailPassword(formData)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
      expect(dispatch).toHaveBeenCalledWith(login(loginData));

   });

   test('startLoginWithEmailPassword should call checkingCredentials and logout - Error', async () => {

      const loginData = { ok: false, errorMessage: 'A Google Error' };
      const formData = { email: demoUser.email, password: '123456' };

      await signInWithEmailPassword.mockResolvedValue(loginData);

      await startLoginWithEmailPassword(formData)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
      expect(dispatch).toHaveBeenCalledWith(logout(loginData));

   });

   test('startCreatingUserWithEmailPassword should call checkingCredentials and login - Success', async () => {

      const loginData = { ok: true, ...demoUser };
      const formData = { email: demoUser.email, password: '123456', displayName: demoUser.displayName };

      await registerUserWithEmailPassword.mockResolvedValue(loginData);

      await startCreatingUserWithEmailPassword(formData)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
      expect(dispatch).toHaveBeenCalledWith(login(loginData));

   });

   test('startLogout should call logoutFirebase, clearNotes and logout', async () => {

      await startLogout()(dispatch);

      expect(logoutFirebase).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
      expect(dispatch).toHaveBeenCalledWith(logout());

   });

});
