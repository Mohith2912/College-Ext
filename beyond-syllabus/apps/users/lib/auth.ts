import { makeAuth } from '@aetheria/auth';

export const { auth, handlers, signIn, signOut } = makeAuth('users');
