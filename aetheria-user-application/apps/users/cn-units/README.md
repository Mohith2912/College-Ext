# Computer Networks reference modules

These five applications are imported without changing their layout, styles, or
interactive activity logic. Unit 1 and Unit 2 use reviewed, student-focused copy;
line endings are normalized by the import.

| Course module   | Source                                    |
| --------------- | ----------------------------------------- |
| Unit 1          | https://github.com/mrithulavj/CN-Unit     |
| Unit 2 activity | https://github.com/mrithulavj/CN-Unit-two |
| Unit 3          | https://github.com/mrithulavj/CN-Unit-3   |
| Unit 4          | https://github.com/mrithulavj/CN-unit-4   |
| Unit 5          | https://github.com/mrithulavj/CN-Unit-5   |

Imported source revisions: Unit 1 `e1df231b12ce0f486ee548d5d3faea71ebe52d04`,
Unit 2 `983f84149a5132390e1883db6a10f6168ff3a865`,
Unit 3 `aebebdaaff06563e06867356001ca80e55463431`,
Unit 4 `3e33fcac63bf8553adb3ca40e2eec2919af66c02`, and
Unit 5 `b128093826a8afbaae92b21dfa0d4edc06bd3359`.

`tooling/build-cn-units.mjs` reads the five actual repository folders next to
`aetheria-user-application`, bundles their original entry points, and compiles their
Tailwind stylesheets independently. It never writes into those folders.
Generated output lives in `apps/users/public/<repository-folder>` and is recreated
by both the build and development commands. The original configuration and
manifests are retained unchanged; compilation uses the host's installed dependencies.

Each numbered module retains the website navigation and loads its complete
original application in an isolated same-origin frame. A full-screen link also
opens `/CN-Unit/index.html`, `/CN-Unit-two/index.html`, `/CN-Unit-3/index.html`,
`/CN-unit-4/index.html`, or `/CN-Unit-5/index.html`. No rewritten note paragraphs
replace the original apps. Unit 2's `view=notes` retains the same complete module.

The Interactive Lab page is a separate five-unit practice picker, not a redirect
to Unit 1. Its supplemental exercises are implemented in `cn-practice-labs.tsx`.
Unit 4's generated page includes the integration-only `cn-navigation.js` adapter:
section buttons scroll to their matching sections and update the URL
hash for deep links and browser back. Original source files, simulation handlers,
and CSS remain unchanged.

`source-integrity.json` records SHA-256 hashes from the reviewed source snapshots. Builds
verify all 52 imported files before generating activities and fail if a source
file is missing or altered (normalizing only line endings and trailing whitespace).
The activities' input/output handlers are browser-local simulations in the
original repositories; they do not contain server API implementations. The course
backend supplies published module routing and notes, not live network traffic.
