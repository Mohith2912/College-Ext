/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { QuestionItem } from '../../types';

export const unit2PartA: QuestionItem[] = [
  {
    id: 'u2-pa-01',
    qNo: 1,
    part: 'A',
    unitNumber: 2,
    courseOutcome: 'CO2',
    bloomsLevel: 'K1',
    bloomsLabel: 'Remember',
    question: 'Define game playing.',
    answer: 'Game playing in AI is the process of making intelligent, strategic decisions in adversarial environments to achieve victory by selecting the best possible move against an opponent using search algorithms.',
    keyTakeaways: [
      'Adversarial multi-agent decision making',
      'Zero-sum games: one player\'s gain equals the opponent\'s loss'
    ]
  },
  {
    id: 'u2-pa-02',
    qNo: 2,
    part: 'A',
    unitNumber: 2,
    courseOutcome: 'CO2',
    bloomsLevel: 'K1',
    bloomsLabel: 'Remember',
    question: 'State Mini-Max Strategy.',
    answer: 'The Mini-Max strategy is a recursive decision-making algorithm used in two-player zero-sum games. It chooses the move that maximizes the utility for the active player (MAX) under the assumption that the adversary (MIN) will play optimally to minimize that utility.',
    keyTakeaways: [
      'MAX node: Chooses max utility among children',
      'MIN node: Chooses min utility among children',
      'Backtracks optimal payoff from terminal leaves to root'
    ]
  },
  {
    id: 'u2-pa-03',
    qNo: 3,
    part: 'A',
    unitNumber: 2,
    courseOutcome: 'CO2',
    bloomsLevel: 'K1',
    bloomsLabel: 'Remember',
    question: 'Identify the concept of knowledge representation.',
    answer: 'Knowledge representation is the formal study of translating real-world information into structured computational formats so that AI systems can reason and solve complex tasks. Methods include:\n• Propositional and First-Order Logic\n• Semantic Networks\n• Frames\n• Production Rules\n• Ontologies',
    keyTakeaways: [
      'Syntax: Legal arrangements of symbols',
      'Semantics: Meaning and truth values in possible worlds'
    ]
  },
  {
    id: 'u2-pa-04',
    qNo: 4,
    part: 'A',
    unitNumber: 2,
    courseOutcome: 'CO2',
    bloomsLevel: 'K2',
    bloomsLabel: 'Understand',
    question: 'Summarize Propositional Logic.',
    answer: 'Propositional Logic is a formal declarative system that represents knowledge through propositions—atomic sentences that evaluate strictly to True or False. Sentences are combined using logical connectives: AND (∧), OR (∨), NOT (¬), IMPLIES (→), and BICONDITIONAL (↔).\nExample: P = "It is raining", Q = "The road is wet", Rule = P → Q.',
    keyTakeaways: [
      'Truth-functional semantics based on truth tables',
      'Cannot express relations between specific entities or quantify statements'
    ]
  },
  {
    id: 'u2-pa-05',
    qNo: 5,
    part: 'A',
    unitNumber: 2,
    courseOutcome: 'CO2',
    bloomsLevel: 'K2',
    bloomsLabel: 'Understand',
    question: 'Explain in detail about Resolution.',
    answer: 'Resolution is an inference rule and refutation-complete proof technique in AI used to prove statements by contradiction.\nSteps:\n1. Convert all knowledge base axioms and premises into Conjunctive Normal Form (CNF).\n2. Negate the target query/goal and add it to the clause set.\n3. Repeatedly resolve pairs of clauses containing complementary literals (P and ¬P).\n4. If the empty clause (□ / contradiction) is derived, the original theorem is proved.',
    keyTakeaways: [
      'Complementary literals cancel out: (A ∨ B) ∧ (¬A ∨ C) ⊢ (B ∨ C)',
      'Refutation completeness guarantees discovering contradiction if query is entailed'
    ]
  },
  {
    id: 'u2-pa-06',
    qNo: 6,
    part: 'A',
    unitNumber: 2,
    courseOutcome: 'CO2',
    bloomsLevel: 'K1',
    bloomsLabel: 'Remember',
    question: 'Enumerate the limitations of Propositional Logic.',
    answer: 'Limitations of Propositional Logic:\n1. Inability to represent individual objects, properties, and relationships.\n2. Inability to express quantified statements (e.g., "All humans are mortal" requires writing a separate rule for every single individual).\n3. Combinatorial explosion in knowledge base size for complex worlds.\n4. Low expressive power for relational and spatial domains.',
    keyTakeaways: [
      'Lack of variables and quantifiers necessitates First-Order Logic (FOL)'
    ]
  },
  {
    id: 'u2-pa-07',
    qNo: 7,
    part: 'A',
    unitNumber: 2,
    courseOutcome: 'CO2',
    bloomsLevel: 'K1',
    bloomsLabel: 'Remember',
    question: 'Define pruning.',
    answer: 'Pruning is the process of eliminating unpromising or provably irrelevant branches in a search tree to prevent exhaustive evaluation and drastically reduce computational time. Alpha-Beta pruning is the standard optimization applied to Mini-Max game trees.',
    keyTakeaways: [
      'Does not alter the final computed minimax decision',
      'Pruning condition: α ≥ β'
    ]
  },
  {
    id: 'u2-pa-08',
    qNo: 8,
    part: 'A',
    unitNumber: 2,
    courseOutcome: 'CO2',
    bloomsLevel: 'K2',
    bloomsLabel: 'Understand',
    question: 'Explain the PEAS description of the Wumpus World problem.',
    answer: 'PEAS Specification for Wumpus World:\n• Performance Measure: +1000 for picking up Gold, -1000 for falling into a Pit or being eaten by the Wumpus, -1 per move, -10 for shooting the arrow.\n• Environment: 4×4 grid of rooms containing pits, the Wumpus, and gold, bounded by walls.\n• Actuators: Move Forward, Turn Left, Turn Right, Grab (Gold), Shoot (Arrow), Climb (Exit cave).\n• Sensors: [Stench, Breeze, Glitter, Bump, Scream].',
    tableData: {
      headers: ['Component', 'Wumpus World Formal Specification'],
      rows: [
        ['Performance Measure', '+1000 grab gold, -1000 die (pit/wumpus), -1 per move, -10 shoot arrow'],
        ['Environment', '4×4 grid of rooms surrounded by impassable cave walls'],
        ['Actuators', 'Move Forward, Turn Left, Turn Right, Grab, Shoot, Climb'],
        ['Sensors', 'Stench (adjacent to Wumpus), Breeze (adjacent to Pit), Glitter (same square as Gold), Bump (hit wall), Scream (Wumpus slain)']
      ]
    }
  },
  {
    id: 'u2-pa-09',
    qNo: 9,
    part: 'A',
    unitNumber: 2,
    courseOutcome: 'CO2',
    bloomsLevel: 'K1',
    bloomsLabel: 'Remember',
    question: 'List out the basic elements of First-Order Logic.',
    answer: 'The basic syntactic elements of First-Order Logic (FOL) are:\n1. Constants: Objects in the universe (e.g., Socrates, Chennai, John).\n2. Variables: Placeholders for objects (e.g., x, y, z).\n3. Predicates: Relations or properties holding over objects (e.g., Human(x), Adjacent(x, y)).\n4. Functions: Mappings returning objects (e.g., FatherOf(x), MotherOf(y)).\n5. Quantifiers: Universal (∀) and Existential (∃).\n6. Logical Connectives: ∧, ∨, ¬, →, ↔.',
    keyTakeaways: [
      'Allows statements about all or some objects in a domain'
    ]
  },
  {
    id: 'u2-pa-10',
    qNo: 10,
    part: 'A',
    unitNumber: 2,
    courseOutcome: 'CO2',
    bloomsLevel: 'K1',
    bloomsLabel: 'Remember',
    question: 'Name the two types of quantifiers and explain with an example.',
    answer: '1. Universal Quantifier (∀): Denotes "for all" or "for every" object in the domain.\n   Example: ∀x (Human(x) → Mortal(x)) — "All humans are mortal."\n2. Existential Quantifier (∃): Denotes "there exists" at least one object in the domain.\n   Example: ∃x (Student(x) ∧ ScoredCentum(x)) — "There exists a student who scored 100%."',
    keyTakeaways: [
      'Duality rule: ¬∀x P(x) ≡ ∃x ¬P(x) and ¬∃x P(x) ≡ ∀x ¬P(x)'
    ]
  },
  {
    id: 'u2-pa-11',
    qNo: 11,
    part: 'A',
    unitNumber: 2,
    courseOutcome: 'CO2',
    bloomsLevel: 'K2',
    bloomsLabel: 'Understand',
    question: 'Distinguish Forward and Backward Chaining.',
    answer: 'Forward Chaining is data-driven, starting with known ground facts in the knowledge base and chaining through inference rules to discover new conclusions or goals.\nBackward Chaining is goal-driven, starting from the desired hypothesis/goal and querying backward through rule premises to verify if supporting ground facts exist.',
    tableData: {
      headers: ['Dimension', 'Forward Chaining', 'Backward Chaining'],
      rows: [
        ['Approach', 'Data-driven (bottom-up)', 'Goal-driven (top-down)'],
        ['Starting Point', 'Known initial facts in KB', 'Target hypothesis / goal to prove'],
        ['Direction', 'Premise → Conclusion', 'Goal → Premise conditions'],
        ['Primary Use Cases', 'Monitoring, synthesis, prediction', 'Diagnostic systems, verification (Prolog)']
      ]
    }
  },
  {
    id: 'u2-pa-12',
    qNo: 12,
    part: 'A',
    unitNumber: 2,
    courseOutcome: 'CO2',
    bloomsLevel: 'K2',
    bloomsLabel: 'Understand',
    question: 'Discuss the Resolution Inference Rule with its equation.',
    answer: 'The Resolution Inference Rule takes two clauses containing complementary literals (one positive, one negated) and combines them into a resolvent clause containing all remaining literals.\nEquation: (P ∨ Q) ∧ (¬P ∨ R) ⊢ (Q ∨ R)\nExample: Premise 1: "It is sunny OR we stay indoors" (P ∨ Q); Premise 2: "It is NOT sunny OR we go swimming" (¬P ∨ R); Resolvent: "We stay indoors OR we go swimming" (Q ∨ R).',
    formula: '(P ∨ Q) ∧ (¬P ∨ R) ⊢ (Q ∨ R)'
  },
  {
    id: 'u2-pa-13',
    qNo: 13,
    part: 'A',
    unitNumber: 2,
    courseOutcome: 'CO2',
    bloomsLevel: 'K2',
    bloomsLabel: 'Understand',
    question: 'Explain the concept of Neuro-Fuzzy Inference and describe how it combines Neural Networks and Fuzzy Logic.',
    answer: 'Neuro-Fuzzy Inference (such as ANFIS) integrates the learning and pattern-recognition capabilities of Artificial Neural Networks with the interpretable, rule-based uncertainty-handling of Fuzzy Logic.\n• Neural Networks: Learn connection weights and adapt parameters automatically from training data.\n• Fuzzy Logic: Represents qualitative, imprecise human linguistic rules (e.g., IF Temperature is HIGH THEN Fan Speed is FAST).\nSynergy: The neural network tunes membership functions and rule weights automatically, while the fuzzy layer preserves human interpretability.',
    keyTakeaways: [
      'Combines data-driven parameter adaptation with human linguistic rule interpretability',
      'Applications: Industrial controllers, biomedical diagnostics, automotive ABS systems'
    ]
  },
  {
    id: 'u2-pa-14',
    qNo: 14,
    part: 'A',
    unitNumber: 2,
    courseOutcome: 'CO2',
    bloomsLevel: 'K2',
    bloomsLabel: 'Understand',
    question: 'Interpret Neural Network in AI. How does it mimic the human brain?',
    answer: 'A Neural Network is a computational framework inspired by biological neurological networks. It consists of layers of interconnected processing units (artificial neurons) organized into Input, Hidden, and Output layers.\nIt mimics the brain through:\n1. Synaptic Weights: Numerical weights represent synaptic strengths.\n2. Activation Functions: Non-linear thresholds (Sigmoid, ReLU) mimic biological action potential firing.\n3. Learning via Experience: Uses backpropagation and gradient descent to update weights based on prediction errors.\n4. Distributed Representation: Stores knowledge across distributed network connections rather than isolated memory addresses.',
    keyTakeaways: [
      'Neuron output: y = f(∑ w_i x_i + b)'
    ]
  },
  {
    id: 'u2-pa-15',
    qNo: 15,
    part: 'A',
    unitNumber: 2,
    courseOutcome: 'CO2',
    bloomsLevel: 'K2',
    bloomsLabel: 'Understand',
    question: 'Discuss the semantics of a Bayesian Network.',
    answer: 'A Bayesian Network is a probabilistic graphical model represented by a Directed Acyclic Graph (DAG) that models random variables and their conditional dependencies.\nSemantics:\n1. Nodes: Represent discrete or continuous random variables X_i.\n2. Directed Edges: Represent direct conditional dependencies or causal relationships.\n3. Conditional Probability Tables (CPT): Quantifies the conditional probability P(X_i | Parents(X_i)) for each node.\n4. Joint Probability Distribution: Factored as the product of all local conditional probabilities:\nP(X_1, X_2, ..., X_n) = ∏ P(X_i | Parents(X_i)).',
    formula: 'P(X_1, X_2, ..., X_n) = ∏_{i=1}^n P(X_i | Parents(X_i))'
  }
];

export const unit2PartB: QuestionItem[] = [
  {
    id: 'u2-pb-01',
    qNo: 1,
    part: 'B',
    unitNumber: 2,
    courseOutcome: 'CO2',
    bloomsLevel: 'K3',
    bloomsLabel: 'Apply',
    question: 'Compute the optimal move using the Mini-Max algorithm for the game scenario.',
    answer: `1. Definition:
The Mini-Max algorithm is an adversarial search algorithm for two-player deterministic zero-sum games. It assumes MAX plays to maximize the utility and MIN plays to minimize it. Backtracking propagates payoffs upward from leaf nodes to root.

2. Given Game Tree Leaf Node Utility Payoffs:
• Leaves under M: S = 1, T = 2
• Leaf under E: L = 9
• Leaf under B: F = 7
• Leaves under C: G = 5, H = 3
• Leaves under N: U = 1, V = 2, W = 9
• Leaf under I: O = 2
• Leaf under D: J = 6
• Leaves under K: P = 8, Q = 3, R = 9

3. Step-by-Step Level Evaluation:
Step 1: Evaluate Sub-MAX Nodes (Level 4):
• Node M = MAX(S, T) = MAX(1, 2) = 2
• Node N = MAX(U, V, W) = MAX(1, 2, 9) = 9
• Node K = MAX(P, Q, R) = MAX(8, 3, 9) = 9

Step 2: Evaluate MIN Nodes (Level 3):
• Node E = MIN(L, M) = MIN(9, 2) = 2
• Node I = MIN(N, O) = MIN(9, 2) = 2

Step 3: Evaluate MAX Nodes (Level 2):
• Node B = MAX(E, F) = MAX(2, 7) = 7
• Node C = MAX(G, H) = MAX(5, 3) = 5
• Node D = MAX(I, J, K) = MAX(2, 6, 9) = 9

Step 4: Evaluate Root Node A (MIN):
• Root Node A is a MIN node:
  A = MIN(B, C, D) = MIN(7, 5, 9) = 5

4. Optimal Move and Conclusion:
• The optimal utility value at the root is 5.
• Optimal decision path: A → C → G.
• The Mini-Max strategy guarantees this outcome against an opponent who plays optimally.`,
    tableData: {
      headers: ['Node', 'Type', 'Child Values Evaluated', 'Computed Minimax Value'],
      rows: [
        ['M', 'MAX', 'S=1, T=2', 2],
        ['N', 'MAX', 'U=1, V=2, W=9', 9],
        ['K', 'MAX', 'P=8, Q=3, R=9', 9],
        ['E', 'MIN', 'L=9, M=2', 2],
        ['I', 'MIN', 'N=9, O=2', 2],
        ['B', 'MAX', 'E=2, F=7', 7],
        ['C', 'MAX', 'G=5, H=3', 5],
        ['D', 'MAX', 'I=2, J=6, K=9', 9],
        ['A (Root)', 'MIN', 'B=7, C=5, D=9', 5]
      ]
    }
  },
  {
    id: 'u2-pb-02',
    qNo: 2,
    part: 'B',
    unitNumber: 2,
    courseOutcome: 'CO2',
    bloomsLevel: 'K3',
    bloomsLabel: 'Apply',
    question: 'Apply the Alpha-Beta (α-β) Pruning Algorithm to obtain the solution.',
    answer: `1. Definition:
Alpha-Beta Pruning is an optimization technique that computes the exact same minimax decision as standard Mini-Max while skipping branches that cannot influence the final decision.
• α (Alpha): Best (highest) value achieved so far for MAX along the path.
• β (Beta): Best (lowest) value achieved so far for MIN along the path.
• Pruning Condition: Prune whenever α ≥ β.

2. Given Tree Structure:
Root Node A (MAX)
├── Node B (MIN)
│   ├── Node D (MAX): Leaves (2, 3)
│   └── Node E (MAX): Leaves (5, 9)
└── Node C (MIN)
    ├── Node F (MAX): Leaves (0, 1)
    └── Node G (MAX): Leaves (7, 5)

3. Step-by-Step Execution:
Step 1: Evaluate Node D under B
- Node D = MAX(2, 3) = 3.
- Backtracks to Node B (MIN): β at B becomes 3.

Step 2: Evaluate Node E under B
- First leaf of E evaluates to 5.
- Since E is MAX, value of E is at least 5 (α = 5).
- At parent B, β = 3.
- Pruning Check: α (5) ≥ β (3) → Condition satisfied!
- The remaining child leaf (9) of Node E is PRUNED.
- Node B returns MIN(3, 5) = 3.

Step 3: Update Root Node A (MAX)
- Root A receives 3 from B.
- Therefore, α at root becomes 3.

Step 4: Evaluate Node C (MIN) under Root A
- Path α = 3 passed to C.
- Subtree Node F evaluates: MAX(0, 1) = 1.
- At Node C (MIN), β becomes 1.
- Pruning Check: β (1) ≤ α (3) → Condition satisfied!
- The entire subtree Node G (7, 5) is completely PRUNED without inspecting any of its leaves.
- Node C returns 1.

Step 5: Final Root Decision at A (MAX)
- Root A = MAX(B, C) = MAX(3, 1) = 3.

4. Pruned Nodes Summary:
• Leaf 9 under Node E
• Entire subtree G (leaves 7 and 5)
• Total nodes evaluated: 6 leaves inspected out of 8 (25% pruning savings).
• Optimal move: A → B → D with final utility 3.`,
    tableData: {
      headers: ['Node', 'Current α', 'Current β', 'Computed Value', 'Pruning Action'],
      rows: [
        ['D', '-∞', '+∞', 3, 'Evaluated leaves (2, 3)'],
        ['B', '-∞', 3, 3, 'Updated β = 3'],
        ['E', '5', '3', '≥ 5', 'α ≥ β: Leaf 9 PRUNED!'],
        ['A (Root)', '3', '+∞', '≥ 3', 'Updated α = 3'],
        ['F', '3', '+∞', 1, 'Evaluated leaves (0, 1)'],
        ['C', '3', '1', 1, 'β ≤ α: Subtree G (7, 5) PRUNED!'],
        ['A (Root)', '3', '+∞', 3, 'Final Utility = 3']
      ]
    }
  },
  {
    id: 'u2-pb-03',
    qNo: 3,
    part: 'B',
    unitNumber: 2,
    courseOutcome: 'CO2',
    bloomsLevel: 'K4',
    bloomsLabel: 'Analyze',
    question: 'Analyze the types of inference rules using appropriate examples and truth tables.',
    answer: `1. Definition:
Inference rules are formal syntactic patterns used to derive valid new conclusions from existing premises in knowledge-based systems.

2. Modus Ponens (Affirming the Antecedent):
Rule: If P → Q and P are True, then Q is True.
• Example:
  P: "It is raining"
  P → Q: "If it is raining, the road is wet"
  Conclusion Q: "The road is wet"
• Truth Table Verification:
  P = T, Q = T: P → Q is T, P is T → Both premises true only in row 1, where Q is T. Valid.

3. Modus Tollens (Denying the Consequent):
Rule: If P → Q and ¬Q are True, then ¬P is True.
• Example:
  P → Q: "If it is raining, the road is wet"
  ¬Q: "The road is not wet"
  Conclusion ¬P: "It did not rain"

4. And Introduction (Conjunction):
Rule: If P is True and Q is True, then (P ∧ Q) is True.
• Example:
  P: "Ram studies"
  Q: "Ram attends class"
  Conclusion: "Ram studies AND attends class" (P ∧ Q)

5. Resolution Rule:
Rule: From (A ∨ B) and (¬A ∨ C), derive (B ∨ C).
• Example:
  (P ∨ Q) ∧ (¬P ∨ R) ⊢ (Q ∨ R)
Eliminates complementary literals A and ¬A. Essential for automated theorem proving.`,
    tableData: {
      headers: ['P', 'Q', 'P → Q', 'Premise P', 'Conclusion Q (Modus Ponens)'],
      rows: [
        ['T', 'T', 'T', 'T', 'T (Valid Inference)'],
        ['T', 'F', 'F', 'T', 'Premise P → Q False'],
        ['F', 'T', 'T', 'F', 'Premise P False'],
        ['F', 'F', 'T', 'F', 'Premise P False']
      ]
    }
  },
  {
    id: 'u2-pb-04',
    qNo: 4,
    part: 'B',
    unitNumber: 2,
    courseOutcome: 'CO2',
    bloomsLevel: 'K4',
    bloomsLabel: 'Analyze',
    question: 'Examine the Wumpus World problem and prove it using Knowledge Representation.',
    answer: `1. Definition:
The Wumpus World is a 4×4 grid testbed modeling an agent navigating an uncertain cave environment requiring formal knowledge representation and logical deduction.

2. Components of Wumpus World:
• Wumpus: Beast that eats the agent if in the same room. Can be killed with an arrow.
• Pits: Bottomless pits causing fatal falls.
• Gold: Treasure to be retrieved.
• Agent: Starts at [1, 1], facing right.

3. Sensors:
• Stench: In rooms directly adjacent to the Wumpus (Von Neumann neighborhood).
• Breeze: In rooms directly adjacent to a Pit.
• Glitter: In the exact square containing the Gold.
• Bump: When walking into a boundary wall.
• Scream: Heard globally across the cave when the Wumpus dies.

4. Logical Rules (Knowledge Base):
• Rule 1: Breeze(x, y) ↔ ∃(dx, dy) Adjacent(x, y, dx, dy) ∧ Pit(dx, dy)
• Rule 2: Stench(x, y) ↔ ∃(dx, dy) Adjacent(x, y, dx, dy) ∧ Wumpus(dx, dy)

5. Logical Deduction Proof:
• At [1, 1]: Agent percepts = [None, None, None, None, None].
  - Knowledge Base Deduction:
    ¬Breeze(1, 1) ⊢ ¬Pit(1, 2) ∧ ¬Pit(2, 1).
    ¬Stench(1, 1) ⊢ ¬Wumpus(1, 2) ∧ ¬Wumpus(2, 1).
    Conclusion: Both [1, 2] and [2, 1] are provably SAFE!
• Agent moves to [2, 1]:
  - Percept = [None, Breeze, None, None, None].
  - Breeze(2, 1) implies a Pit is in [2, 2] or [3, 1].
• Agent backtracks safely to [1, 1] and explores [1, 2]:
  - Percept = [Stench, None, None, None, None].
  - Stench(1, 2) implies Wumpus in [1, 3] or [2, 2].
  - But ¬Stench(2, 1) proved ¬Wumpus in [2, 2].
  - Therefore, by Resolution: Wumpus must be strictly at [1, 3]!
  - Furthermore, ¬Breeze(1, 2) proves ¬Pit in [2, 2].
  - From Breeze(2, 1), Pit was in [2, 2] or [3, 1]. Since ¬Pit(2, 2), Pit is definitively at [3, 1]!
• Result: Room [2, 2] is completely SAFE to enter without risk!`,
    keyTakeaways: [
      'Logical inference deduces exact safe squares without trial-and-error risks',
      'Demonstrates combining percept history with domain axioms in First-Order Logic'
    ]
  },
  {
    id: 'u2-pb-05',
    qNo: 5,
    part: 'B',
    unitNumber: 2,
    courseOutcome: 'CO2',
    bloomsLevel: 'K5',
    bloomsLabel: 'Evaluate',
    question: 'Interpret FOL inference rules for quantifiers with an example.',
    answer: `1. Definition:
First-Order Logic quantifier inference rules allow manipulation of quantified sentences to derive ground conclusions about individuals or generalize assertions across entire domains.

2. Four Fundamental Quantifier Rules:
1. Universal Instantiation (UI):
   Rule: From ∀x P(x), infer P(c) for any ground constant term c.
   Example:
   Premise: ∀x (Human(x) → Mortal(x)) ("All humans are mortal")
   Instantiation: Human(Socrates) → Mortal(Socrates)

2. Existential Instantiation (EI):
   Rule: From ∃x P(x), infer P(k) for a brand-new Skolem constant k that does not appear anywhere else in the knowledge base.
   Example:
   Premise: ∃x (Student(x) ∧ TopRank(x))
   Instantiation: Student(Ravi_01) ∧ TopRank(Ravi_01)

3. Universal Generalization (UG):
   Rule: If P(a) is proven for an arbitrary, unconstrained object a, then infer ∀x P(x).
   Condition: a must not appear in any unsatisfied premises.

4. Existential Generalization (EG):
   Rule: If P(c) is True for a specific constant c, then infer ∃x P(x).
   Example:
   Premise: Human(Ram)
   Conclusion: ∃x Human(x) ("There exists an x such that x is Human").`,
    tableData: {
      headers: ['Quantifier Rule', 'Formal Premise', 'Derived Conclusion', 'Constraints'],
      rows: [
        ['Universal Instantiation (UI)', '∀x P(x)', 'P(c)', 'c can be any ground term'],
        ['Existential Instantiation (EI)', '∃x P(x)', 'P(k)', 'k must be a fresh Skolem constant'],
        ['Universal Generalization (UG)', 'P(a)', '∀x P(x)', 'a must be an arbitrary variable'],
        ['Existential Generalization (EG)', 'P(c)', '∃x P(x)', 'c is a ground constant']
      ]
    }
  },
  {
    id: 'u2-pb-06',
    qNo: 6,
    part: 'B',
    unitNumber: 2,
    courseOutcome: 'CO2',
    bloomsLevel: 'K5',
    bloomsLabel: 'Evaluate',
    question: 'Evaluate Forward Chaining along with its proof.',
    answer: `1. Definition:
Forward Chaining is an inference algorithm that operates forward from known facts. It triggers rules whose antecedents match active facts, asserts their consequents as newly discovered facts, and repeats until the target goal is derived.

2. Forward Chaining Algorithm:
1. Initialize Working Memory with known base facts.
2. For each rule in the rule base:
   - Check if all premises (antecedents) are present in Working Memory.
   - If satisfied and conclusion is not already known, fire rule and add conclusion to Working Memory.
3. Repeat step 2 until either:
   - The goal is asserted in Working Memory (Success).
   - No new facts can be generated (Fail).

3. Step-by-Step Proof:
• Given Knowledge Base:
  Fact: P
  Rule 1: P → Q
  Rule 2: Q → R
• Target Goal: R

Proof Execution Trace:
- Step 1: Base state Working Memory = {P}.
- Step 2: Evaluate Rule 1 (P → Q). Premise P is in Working Memory.
  - Action: Fire Rule 1.
  - New Fact Generated: Q.
  - Working Memory = {P, Q}.
- Step 3: Evaluate Rule 2 (Q → R). Premise Q is in Working Memory.
  - Action: Fire Rule 2.
  - New Fact Generated: R.
  - Working Memory = {P, Q, R}.
- Step 4: Check goal condition: R ∈ Working Memory → PROVED!

4. Strengths & Limitations:
• Advantages: Complete for Horn clauses, simple data-driven pipeline, derives all possible implications.
• Limitations: May compute many irrelevant facts unrelated to the target query.`,
    diagramAscii: `Known Fact [P] ──(P → Q)──> Inferred [Q] ──(Q → R)──> Target Goal [R] (Proved)`
  },
  {
    id: 'u2-pb-07',
    qNo: 7,
    part: 'B',
    unitNumber: 2,
    courseOutcome: 'CO2',
    bloomsLevel: 'K4',
    bloomsLabel: 'Analyze',
    question: 'Outline the inference process of Backward Chaining and demonstrate its proof using an appropriate example.',
    answer: `1. Definition:
Backward Chaining is a top-down, goal-directed inference technique. It begins with the hypothesis or query to be proven and searches backward through rules whose consequents match the goal, establishing sub-goals until ground facts confirm the chain.

2. Backward Chaining Algorithm:
1. Push target Goal onto Subgoal Stack.
2. If Goal is already a known ground fact, pop and return Success.
3. Find all rules with Conclusion == Goal.
4. For each matched rule, recursively prove all premises as subgoals.
5. If all premises of a rule succeed, Goal is verified. Otherwise, backtrack to alternate rules.

3. Step-by-Step Proof:
• Given:
  Goal to prove: R
  Rule 1: Q → R
  Rule 2: P → Q
  Fact: P

Inference Trace:
- Level 1: Need to prove R.
  - Search rules producing R: Rule 1 (Q → R).
  - New Subgoal generated: Need Q.
- Level 2: Need to prove Q.
  - Search rules producing Q: Rule 2 (P → Q).
  - New Subgoal generated: Need P.
- Level 3: Need to prove P.
  - Check facts: P exists as a base ground fact!
  - Subgoal P succeeds.
- Level 2 resolution: Since P is True, Rule 2 validates that Q is True.
- Level 1 resolution: Since Q is True, Rule 1 validates that R is True.
Conclusion: Goal R is successfully proved.

4. Evaluation:
• Highly efficient for targeted queries because it evaluates only rules relevant to the goal.
• Foundation of Prolog and diagnostic expert systems.`,
    diagramAscii: `Need Goal [R] ◄── Need [Q] ◄── Need [P] ◄── Base Fact [P] (Verified!)`
  },
  {
    id: 'u2-pb-08',
    qNo: 8,
    part: 'B',
    unitNumber: 2,
    courseOutcome: 'CO2',
    bloomsLevel: 'K4',
    bloomsLabel: 'Analyze',
    question: 'Examine the applicability of the Resolution inference method in the given First-Order Logic problem and justify each resolution step used to derive the conclusion.',
    answer: `1. Problem Definition:
Given:
Premise 1: ∀x (Human(x) → Mortal(x)) ("All humans are mortal")
Premise 2: Human(Socrates) ("Socrates is human")
Goal to Prove: Mortal(Socrates)

2. Step 1: Conversion to Conjunctive Normal Form (CNF):
• Eliminate Implication: Human(x) → Mortal(x) becomes ¬Human(x) ∨ Mortal(x).
• Standardize variables and drop quantifier: Clause 1 = ¬Human(x) ∨ Mortal(x).
• Clause 2 (Fact) = Human(Socrates).

3. Step 2: Refutation Proof by Contradiction:
• Negate the target goal:
  ¬Goal = ¬Mortal(Socrates).
• Set of clauses to resolve:
  C1: ¬Human(x) ∨ Mortal(x)
  C2: Human(Socrates)
  C3: ¬Mortal(Socrates) (Negated Goal)

4. Step 3: Resolution & Unification:
• Resolve Clause 1 with Clause 3:
  - C1: ¬Human(x) ∨ Mortal(x)
  - C3: ¬Mortal(Socrates)
  - Unifier substitution: θ = {x / Socrates}.
  - Instantiated C1: ¬Human(Socrates) ∨ Mortal(Socrates).
  - Complementary literals Mortal(Socrates) and ¬Mortal(Socrates) resolve:
  - Resolvent C4: ¬Human(Socrates).

• Resolve Resolvent C4 with Clause 2:
  - C4: ¬Human(Socrates)
  - C2: Human(Socrates)
  - Complementary literals ¬Human(Socrates) and Human(Socrates) resolve:
  - Resolvent: Empty Clause (□).

5. Conclusion:
Deriving the empty clause (□ / contradiction) proves that ¬Mortal(Socrates) is unsatisfiable. Therefore, the original theorem Mortal(Socrates) is logically entailed.`,
    diagramAscii: `(¬Human(x) ∨ Mortal(x))   +   ¬Mortal(Socrates)
               │
               ▼  [x / Socrates]
          ¬Human(Socrates)     +     Human(Socrates)
                     │
                     ▼
                 □ (Contradiction Derived)`
  }
];

export const unit2PartC: QuestionItem[] = [
  {
    id: 'u2-pc-01',
    qNo: 1,
    part: 'C',
    unitNumber: 2,
    courseOutcome: 'CO2',
    bloomsLevel: 'K5',
    bloomsLabel: 'Evaluate',
    question: 'Interpret in detail about Applications of Bayesian Network in AI.',
    answer: `1. Definition and Mathematical Foundation:
A Bayesian Network is a probabilistic graphical model representing a set of random variables and their conditional dependencies via a Directed Acyclic Graph (DAG).
Joint probability formula:
P(X_1, X_2, ..., X_n) = ∏_{i=1}^n P(X_i | Parents(X_i))

2. Core Applications of Bayesian Networks in AI:
1. Medical Diagnostics:
   - Models symptoms (Fever, Cough, Dyspnea), risk factors (Smoking), and underlying pathologies (COVID-19, Pneumonia, Bronchitis).
   - Informs differential diagnosis by computing posterior probabilities P(Disease | Symptoms).
2. Autonomous Vehicles:
   - Models sensor uncertainty, weather visibility, and road obstacle trajectory estimation.
3. Spam Email Filtering (Naive Bayes Classifiers):
   - Calculates probability of an email being spam based on token co-occurrence probabilities.
4. Industrial Fault Diagnostics:
   - Correlates telemetry readings (vibration, temperature, oil pressure) to predict turbine or pump failures.
5. Robotics & SLAM (Simultaneous Localization and Mapping):
   - Computes belief states over robot poses given noisy LIDAR and wheel odometer readings.
6. Financial Credit Risk & Fraud Detection:
   - Evaluates probability of loan default given debt-to-income ratio, credit bureau history, and spending velocity.

3. Diagnostic Reasoning Example:
Network Topology:
Smoking (S) ──> Lung Cancer (L) ──> Dyspnea (D)
            ──> Bronchitis (B)   ──> Dyspnea (D)
            ──> Cough (C)

Given evidence Dyspnea = True, Bayesian inference propagates evidence backward (abductive reasoning) to compute P(Smoking | Dyspnea=True), updating beliefs systematically.`,
    tableData: {
      headers: ['Industry Sector', 'Bayesian Application', 'Key Benefit'],
      rows: [
        ['Healthcare', 'Differential Disease Diagnosis', 'Handles missing tests and clinical uncertainty'],
        ['Automotive', 'Perception & Collision Avoidance', 'Fuses noisy multi-sensor streams reliably'],
        ['Cybersecurity', 'Fraud & Intrusion Detection', 'Adapts probabilities dynamically with new evidence'],
        ['Manufacturing', 'Predictive Equipment Maintenance', 'Quantifies remaining useful life before breakdown']
      ]
    }
  },
  {
    id: 'u2-pc-02',
    qNo: 2,
    part: 'C',
    unitNumber: 2,
    courseOutcome: 'CO2',
    bloomsLevel: 'K5',
    bloomsLabel: 'Evaluate',
    question: 'Assess Forward and Backward Chaining with appropriate example.',
    answer: `1. Introduction:
Inference engines deduce new facts and verify goals using rule bases. The two foundational deduction paradigms are Forward Chaining (data-driven) and Backward Chaining (goal-driven).

2. Architectural Comparison:
• Forward Chaining:
  - Direction: Data-driven (antecedent to consequent).
  - Mechanism: Matches available facts against rule IF clauses, firing active rules to populate working memory.
  - Suitable for: Synthesis, planning, real-time monitoring, state forecasting.
• Backward Chaining:
  - Direction: Goal-driven (consequent to antecedent).
  - Mechanism: Formulates subgoals matching rule THEN clauses, exploring depth-first backward until base facts are proven.
  - Suitable for: Diagnostics, verification, theorem proving.

3. Worked Scenario Example:
Given Rules:
R1: P → Q
R2: Q → R
R3: R → S
Fact: P
Target Goal: S

• Forward Chaining Execution:
  1. Working Memory = {P}.
  2. Fire R1: P matches → assert Q. Memory = {P, Q}.
  3. Fire R2: Q matches → assert R. Memory = {P, Q, R}.
  4. Fire R3: R matches → assert S. Memory = {P, Q, R, S}.
  5. S achieved!

• Backward Chaining Execution:
  1. Stack: [Need S].
  2. R3 has consequent S → New subgoal: [Need R].
  3. R2 has consequent R → New subgoal: [Need Q].
  4. R1 has consequent Q → New subgoal: [Need P].
  5. Fact P exists in KB → Subgoal P succeeds!
  6. Backtrack unwind: P true → Q true → R true → S true. Goal S proved!

4. Critical Assessment:
Use Forward Chaining when data is plentiful and many unpredictable conclusions may emerge. Use Backward Chaining when a specific hypothesis must be tested against targeted questions.`,
    tableData: {
      headers: ['Feature', 'Forward Chaining', 'Backward Chaining'],
      rows: [
        ['Direction', 'Bottom-Up (Data-Driven)', 'Top-Down (Goal-Driven)'],
        ['Trigger', 'New facts entered into KB', 'User query / hypothesis posed'],
        ['Rule Firing', 'All matching rules fire', 'Only rules leading to target goal fire'],
        ['Search Overhead', 'Can generate irrelevant facts', 'Only explores relevant paths'],
        ['Best Suited For', 'Real-time alert systems', 'Medical diagnosis & troubleshooting']
      ]
    }
  }
];
