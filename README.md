# College Ext — Computer Networks

The five repository folders are the original Computer Networks applications.
Their source files, paragraphs, controls, and simulation handlers are unchanged.
The course site is in `aetheria-user-application` and connects each numbered unit
to its corresponding original application as a full-page document.

| Module | Original folder |
| --- | --- |
| 1 | CN-Unit |
| 2 | CN-Unit-two |
| 3 | CN-Unit-3 |
| 4 | CN-unit-4 |
| 5 | CN-Unit-5 |

Install the host project's dependencies, configure its local `.env` from its
`.env.example`, and run its existing database setup commands. From
`aetheria-user-application`, run `npm run build` and `npm run start:users`.
The build verifies all 52 source files against the recorded repository revisions
before compiling them. Do not relocate the original folders separately from the
host project. Build output is generated, not committed; private environment files
and database data are excluded from Git.

Only Computer Networks is currently published in the local course library. The
12 unrelated courses and 48 modules were soft-deleted on user request and can be
restored from their retained database records. The removal helper is
`aetheria-user-application/tooling/remove-non-cn-curriculum.ts`.

The supplied source repositories implement browser-local educational simulations;
they do not contain server API files. Their existing logic is compiled unchanged.
