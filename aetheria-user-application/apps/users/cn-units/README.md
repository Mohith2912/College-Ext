# Computer Networks reference modules

These five applications are imported without changing their markup, styles, text,
or interactive activity logic. Line endings are normalized by the import.

| Course module | Source |
| --- | --- |
| Unit 1 | https://github.com/mrithulavj/CN-Unit |
| Unit 2 activity | https://github.com/mrithulavj/CN-Unit-two |
| Unit 3 | https://github.com/mrithulavj/CN-Unit-3 |
| Unit 4 | https://github.com/mrithulavj/CN-unit-4 |
| Unit 5 | https://github.com/mrithulavj/CN-Unit-5 |

Imported source revisions: Unit 1 `e1df231b12ce0f486ee548d5d3faea71ebe52d04`,
Unit 2 `983f84149a5132390e1883db6a10f6168ff3a865`,
Unit 3 `aebebdaaff06563e06867356001ca80e55463431`,
Unit 4 `3e33fcac63bf8553adb3ca40e2eec2919af66c02`, and
Unit 5 `b128093826a8afbaae92b21dfa0d4edc06bd3359`.

`tooling/build-cn-units.mjs` reads the five actual repository folders next to
`aetheria-user-application`, bundles their original entry points, and compiles their
original Tailwind stylesheets independently. It never writes into those folders.
Generated output lives in `apps/users/public/<repository-folder>` and is recreated
by both the build and development commands. The original configuration and
manifests are retained unchanged; compilation uses the host's installed dependencies.

Each numbered module redirects to the corresponding original application as a
full-page document: `/CN-Unit/index.html`, `/CN-Unit-two/index.html`,
`/CN-Unit-3/index.html`, `/CN-unit-4/index.html`, `/CN-Unit-5/index.html`.
No course iframe or rewritten note-reader paragraphs are inserted into these pages.
Older module URLs, including Unit 2's `view=notes`, redirect to the original app too.

Computer Networks interactive-lab links and study-lab module selection open the
complete reference activity rather than the generated markdown checkpoint guide.
Computer Networks never opens the generated checkpoint guide, including old
`view=checkpoints` links. The current CN-only study-lab entry opens Unit 1 directly.
No unit-specific CSS overrides, replacement controls, or replacement simulation
logic are added. The original mobile limitations are preserved too.

`source-integrity.json` records SHA-256 hashes from the source checkouts. Builds
verify all 52 imported files before generating activities and fail if a source
file is missing or altered (normalizing only line endings and trailing whitespace).
The activities' input/output handlers are browser-local simulations in the
original repositories; they do not contain server API implementations. The course
backend supplies published module routing and notes, not live network traffic.
