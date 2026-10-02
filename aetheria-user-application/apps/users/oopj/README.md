# Object Oriented Programming using Java reference course

The embedded JavaMap EDU application is sourced from:

- Repository: `https://github.com/mrithulavj/oopj.git`
- Reviewed revision: `5aac256b135fda5d57a766d451ca1cb10c3ca8d1`
- Course: `2321CSC304R Object Oriented Programming using JAVA`

The source is retained under the repository-level `OOPJ` folder. The host build
verifies every retained source file and asset against `source-integrity.json`
before producing the same-origin static application in `public/OOPJ`.

The retained course content is adapted for the Beyond Syllabus module flow:

1. The hero image is imported so the standalone asset is bundled reliably.
2. `?unit=1` through `?unit=5` locks the selected unit, opens its detailed
   simulator first, and removes unrelated unit controls.
3. The embedded shell uses the same slate-and-rose course theme and navigation
   model as the Computer Networks units.
4. The question-bank view uses all 125 source-locked questions and shows only
   the selected unit's 25 questions.
5. The host application's full-screen action opens the selected unit directly
   instead of leaving Beyond Syllabus for the source repository.

The original concept maps, case studies, simulators, fill-ups, drag-and-drop
exercises, syllabus concepts, and unit order remain intact.
