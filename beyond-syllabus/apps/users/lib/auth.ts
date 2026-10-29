import { makeAuth } from '@beyond-syllabus/auth';

export const { auth, handlers, signIn, signOut } = makeAuth('users');
