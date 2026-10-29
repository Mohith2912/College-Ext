export type OopjStage = {
  id: 'brief' | 'model' | 'dispatch' | 'resilience' | 'concurrency' | 'debrief';
  label: string;
  shortLabel: string;
  description: string;
};

export type ModelCandidate = {
  id: string;
  name: string;
  kind: 'entity' | 'service' | 'repository' | 'exception';
  responsibility: string;
  owns: string[];
  shouldNotOwn: string;
};

export type DispatchTrace = {
  id: string;
  declaration: string;
  runtimeType: string;
  call: string;
  result: string;
  explanation: string;
};

export type ExceptionStep = {
  id: string;
  label: string;
  detail: string;
  correctOrder: number;
};

export type ThreadEvent = {
  id: string;
  desk: 'Desk A' | 'Desk B';
  action: string;
  sharedCopies: number;
  risk: string;
};

export type OopjQuestion = {
  id: string;
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
};

export const oopjStages: OopjStage[] = [
  { id: 'brief', label: 'Frame the software problem', shortLabel: 'Brief', description: 'Translate a service failure into objects, rules, and constraints.' },
  { id: 'model', label: 'Assign class responsibilities', shortLabel: 'Model', description: 'Keep state and behaviour with the object that can protect the rule.' },
  { id: 'dispatch', label: 'Trace runtime polymorphism', shortLabel: 'Dispatch', description: 'Predict which overridden method executes through a parent reference.' },
  { id: 'resilience', label: 'Repair the exception path', shortLabel: 'Recover', description: 'Order validation, domain failure, handling, and cleanup correctly.' },
  { id: 'concurrency', label: 'Stop the last-copy race', shortLabel: 'Threads', description: 'Expose the unsafe interleaving and protect the critical section.' },
  { id: 'debrief', label: 'Defend the object design', shortLabel: 'Debrief', description: 'Connect the final design to core Java and OOP principles.' },
];

export const oopjLearningGoals = [
  'Convert requirements into cohesive Java classes',
  'Reason about inheritance and dynamic dispatch',
  'Use custom exceptions without hiding failures',
  'Protect shared state from race conditions',
];

export const modelCandidates: ModelCandidate[] = [
  { id: 'book-copy', name: 'BookCopy', kind: 'entity', responsibility: 'Protect one physical copy’s identity and loan state.', owns: ['barcode', 'title', 'availability'], shouldNotOwn: 'Searching every book in the catalogue' },
  { id: 'member', name: 'Member', kind: 'entity', responsibility: 'Define shared borrower identity and the loan-limit contract.', owns: ['memberId', 'name', 'activeLoans'], shouldNotOwn: 'Writing directly to the database' },
  { id: 'student-member', name: 'StudentMember', kind: 'entity', responsibility: 'Specialise Member with the student loan limit.', owns: ['getLoanLimit() override'], shouldNotOwn: 'Duplicating common member fields' },
  { id: 'circulation', name: 'CirculationService', kind: 'service', responsibility: 'Coordinate issue and return use cases across domain objects.', owns: ['issueBook()', 'returnBook()'], shouldNotOwn: 'Exposing mutable availability publicly' },
  { id: 'repository', name: 'LoanRepository', kind: 'repository', responsibility: 'Persist and retrieve loan records behind an interface.', owns: ['save()', 'findActiveLoans()'], shouldNotOwn: 'Deciding whether a member may borrow' },
  { id: 'unavailable', name: 'BookUnavailableException', kind: 'exception', responsibility: 'Represent a recoverable domain rule violation precisely.', owns: ['message', 'book barcode context'], shouldNotOwn: 'Printing the user-interface message itself' },
];

export const dispatchTraces: DispatchTrace[] = [
  { id: 'student', declaration: 'Member borrower', runtimeType: 'new StudentMember("S-104")', call: 'borrower.getLoanLimit()', result: '4 books', explanation: 'The reference type controls what members are accessible; the runtime object selects the overridden implementation.' },
  { id: 'faculty', declaration: 'Member borrower', runtimeType: 'new FacultyMember("F-017")', call: 'borrower.getLoanLimit()', result: '10 books', explanation: 'The same call site produces role-specific behaviour through dynamic method dispatch.' },
  { id: 'member', declaration: 'Member borrower', runtimeType: 'new Member("G-009")', call: 'borrower.getLoanLimit()', result: '2 books', explanation: 'With no subclass override, the base implementation runs.' },
];

export const exceptionSteps: ExceptionStep[] = [
  { id: 'lookup', label: 'Load the requested BookCopy', detail: 'Ask the repository for barcode BK-204.', correctOrder: 0 },
  { id: 'validate', label: 'Check the domain rules', detail: 'Verify member limit and copy availability before mutation.', correctOrder: 1 },
  { id: 'throw', label: 'Throw a precise domain exception', detail: 'Raise BookUnavailableException when no copy can be issued.', correctOrder: 2 },
  { id: 'handle', label: 'Translate the failure at the boundary', detail: 'The controller shows an actionable message without swallowing the cause.', correctOrder: 3 },
  { id: 'cleanup', label: 'Close the persistence resource', detail: 'A try-with-resources boundary releases the connection on every path.', correctOrder: 4 },
];

export const unsafeThreadEvents: ThreadEvent[] = [
  { id: 'a-read', desk: 'Desk A', action: 'reads availableCopies', sharedCopies: 1, risk: 'Both desks can observe the same stale value.' },
  { id: 'b-read', desk: 'Desk B', action: 'reads availableCopies', sharedCopies: 1, risk: 'The check still passes because Desk A has not written.' },
  { id: 'a-write', desk: 'Desk A', action: 'writes availableCopies = 0', sharedCopies: 0, risk: 'One valid issue is recorded.' },
  { id: 'b-write', desk: 'Desk B', action: 'writes availableCopies = 0', sharedCopies: 0, risk: 'A second issue succeeds from the stale read: the last copy is double-booked.' },
];

export const concurrencyFixes = [
  { id: 'volatile', title: 'Make the counter volatile', detail: 'Improves visibility but does not make check-then-decrement atomic.', correct: false },
  { id: 'sleep', title: 'Add a short Thread.sleep()', detail: 'Changes timing without guaranteeing mutual exclusion.', correct: false },
  { id: 'synchronized', title: 'Synchronize the check-and-issue operation', detail: 'One thread executes the entire critical section at a time, preserving the invariant.', correct: true },
  { id: 'catch', title: 'Catch every RuntimeException', detail: 'Hides symptoms and does not protect shared state.', correct: false },
];

export const oopjQuestions: OopjQuestion[] = [
  { id: 'encapsulation', prompt: 'Why should BookCopy keep its availability field private?', options: ['To prevent the JVM from loading it', 'To force state changes through invariant-preserving methods', 'To make every method static', 'To avoid creating objects'], answer: 1, explanation: 'Encapsulation restricts uncontrolled mutation and lets methods enforce rules whenever availability changes.' },
  { id: 'dispatch', prompt: 'A Member reference holds a StudentMember object. Which getLoanLimit() runs?', options: ['Always Member because of the variable type', 'StudentMember because overridden instance methods dispatch on runtime type', 'Both methods in declaration order', 'Neither unless the reference is cast'], answer: 1, explanation: 'For overridden instance methods, Java chooses the implementation from the runtime object.' },
  { id: 'exception', prompt: 'Where should BookUnavailableException be translated into a learner-facing message?', options: ['Inside the BookCopy constructor', 'At the application or controller boundary', 'Inside Object.finalize()', 'In every getter'], answer: 1, explanation: 'Domain code reports the precise failure; the outer boundary decides how to present it while preserving diagnostic context.' },
  { id: 'thread', prompt: 'Why is volatile insufficient for the last-copy operation?', options: ['It works only with Strings', 'It cannot make the multi-step check and decrement atomic', 'It disables visibility', 'It forces every method to throw'], answer: 1, explanation: 'Visibility does not prevent another thread from interleaving between the read, condition check, and write.' },
];
