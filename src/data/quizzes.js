const Q = (q, options, answer, explain) => ({ q, options, answer, explain });

export const quizzes = [
  {
    id: 'ds-q1',
    courseId: 'ds',
    title: 'Arrays & Complexity Check',
    topic: 'Arrays',
    timeLimit: 10,
    questions: [
      Q('What is the time complexity of accessing an array element by index?', ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'], 0, 'Arrays offer constant-time random access.'),
      Q('Which approach finds a pair summing to target in a sorted array fastest?', ['Nested loops', 'Two pointers', 'Recursion', 'Hashing only'], 1, 'Two pointers solves it in O(n).'),
      Q('What does Big-O describe?', ['Exact runtime', 'Worst-case growth rate', 'Memory address', 'Compiler speed'], 1, 'Big-O describes how runtime grows.'),
      Q('A dynamic array doubles when full. Amortized push cost?', ['O(n^2)', 'O(n)', 'O(1)', 'O(log n)'], 2, 'Doubling gives amortized O(1).'),
      Q('Which is a sliding-window use case?', ['Sorting', 'Max sum subarray of size k', 'Graph traversal', 'Hashing passwords'], 1, 'Sliding window fits fixed-size subarrays.'),
    ],
  },
  {
    id: 'ds-q2',
    courseId: 'ds',
    title: 'Linked Lists & Stacks Quiz',
    topic: 'Linked Lists',
    timeLimit: 10,
    questions: [
      Q('Which data structure follows LIFO?', ['Queue', 'Stack', 'Array', 'Graph'], 1, 'Stack = Last In, First Out.'),
      Q('Reversing a singly linked list takes?', ['O(n^2)', 'O(n)', 'O(log n)', 'O(1) total'], 1, 'One pass: O(n) time, O(1) space.'),
      Q('Floyd cycle detection uses?', ['Two pointers', 'Sorting', 'Hashing only', 'Recursion only'], 0, 'Slow/fast pointers detect cycles.'),
      Q('Insert at head of linked list is?', ['O(n)', 'O(1)', 'O(log n)', 'O(n log n)'], 1, 'Head insert just rewires pointers.'),
      Q('Balanced parentheses are validated with?', ['Queue', 'Stack', 'Tree', 'Graph'], 1, 'Push opens, pop on close.'),
    ],
  },
  {
    id: 'dbms-q2',
    courseId: 'dbms',
    title: 'Normalization & Transactions',
    topic: 'Normalization',
    timeLimit: 15,
    questions: [
      Q('1NF requires?', ['Atomic values', 'No tables', 'No keys', 'No queries'], 0, '1NF means atomic cell values.'),
      Q('A foreign key?', ['Links to another primary key', 'Is always text', 'Cannot be indexed', 'Must be secret'], 0, 'It references another PK.'),
      Q('Isolation prevents?', ['Backups', 'Concurrent anomalies', 'Indexing', 'Logging'], 1, 'Isolation controls concurrency.'),
      Q('Value changes between reads?', ['Dirty read', 'Non-repeatable read', 'Phantom only', 'Lost backup'], 1, 'Value changes between reads.'),
      Q('Best index for ranges?', ['Hash', 'B+ tree', 'Bitmap only', 'No index'], 1, 'B+ trees suit ranges.'),
    ],
  },
  {
    id: 'dbms-q1',
    courseId: 'dbms',
    title: 'SQL Basics Quiz',
    topic: 'SQL',
    timeLimit: 10,
    questions: [
      Q('Which clause filters grouped rows?', ['WHERE', 'HAVING', 'ORDER BY', 'LIMIT'], 1, 'HAVING filters after GROUP BY.'),
      Q('A primary key must be?', ['Nullable', 'Unique and not null', 'Indexed only', 'A string'], 1, 'Unique and never null.'),
      Q('Which JOIN keeps all left rows?', ['INNER', 'LEFT JOIN', 'CROSS', 'FULL only'], 1, 'LEFT JOIN keeps all left rows.'),
      Q('3NF removes?', ['Transitive dependencies', 'Tables', 'Keys', 'Indexes'], 0, '3NF removes transitive deps.'),
      Q('ACID A stands for?', ['Accuracy', 'Atomicity', 'Agility', 'Affinity'], 1, 'Atomicity is all-or-nothing.'),
    ],
  },
  {
    id: 'cn-q1',
    courseId: 'cn',
    title: 'OSI Model Quiz',
    topic: 'OSI Model',
    timeLimit: 10,
    questions: [
      Q('How many OSI layers?', ['5', '6', '7', '4'], 2, 'OSI has 7 layers.'),
      Q('IP lives at which layer?', ['Transport', 'Network', 'Session', 'Physical'], 1, 'IP is Layer 3 Network.'),
      Q('TCP is?', ['Unreliable', 'Connection-oriented', 'Stateless', 'Broadcast'], 1, 'TCP sets up a connection.'),
      Q('DNS resolves?', ['MAC to IP', 'Names to IPs', 'Ports to apps', 'Files to disk'], 1, 'DNS maps names to IPs.'),
      Q('HTTPS default port?', ['80', '21', '443', '25'], 2, 'HTTPS uses 443.'),
    ],
  },
  {
    id: 'cn-q2',
    courseId: 'cn',
    title: 'Subnetting & Routing Quiz',
    topic: 'Subnetting',
    timeLimit: 15,
    questions: [
      Q('/24 has how many hosts?', ['256', '254', '512', '128'], 1, '254 usable hosts.'),
      Q('Which is a private IP?', ['8.8.8.8', '192.168.1.5', '1.1.1.1', '9.9.9.9'], 1, '192.168.x.x is private.'),
      Q('Router forwards using?', ['MAC table', 'Routing table', 'DNS cache', 'ARP only'], 1, 'Routing table decides paths.'),
      Q('UDP suits?', ['File transfer', 'Live streaming', 'Email', 'Banking'], 1, 'Low latency beats reliability.'),
      Q('Firewall primarily?', ['Speeds traffic', 'Filters traffic', 'Assigns IPs', 'Encrypts disks'], 1, 'It filters by rules.'),
    ],
  },
  {
    id: 'oop-q1',
    courseId: 'oop',
    title: 'Classes & Inheritance Quiz',
    topic: 'Inheritance',
    timeLimit: 10,
    questions: [
      Q('A constructor?', ['Destroys objects', 'Initializes objects', 'Deletes classes', 'Imports files'], 1, 'It sets initial state.'),
      Q('Inheritance models?', ['Has-a', 'Is-a', 'Uses-a', 'Throws-a'], 1, 'Child is-a parent type.'),
      Q('Encapsulation means?', ['Global data', 'Bundling + hiding', 'Multiple heirs', 'No methods'], 1, 'Bundle data with methods.'),
      Q('super refers to?', ['Child class', 'Parent class', 'Interface', 'Package'], 1, 'super accesses the parent.'),
      Q('Polymorphism allows?', ['One name, many forms', 'No reuse', 'Static only', 'No overrides'], 0, 'Same call, many behaviors.'),
    ],
  },
  {
    id: 'oop-q2',
    courseId: 'oop',
    title: 'Abstraction & SOLID Quiz',
    topic: 'Polymorphism',
    timeLimit: 10,
    questions: [
      Q('Abstract class can?', ['Be instantiated', 'Have abstract methods', 'Skip inheritance', 'Avoid types'], 1, 'It defines a contract.'),
      Q('Interface defines?', ['Implementation', 'Method contract', 'Memory layout', 'SQL schema'], 1, 'What, not how.'),
      Q('S in SOLID?', ['Single responsibility', 'Static typing', 'Secure code', 'Simple syntax'], 0, 'One reason to change.'),
      Q('Overriding happens at?', ['Compile time', 'Runtime', 'Deploy time', 'Design only'], 1, 'Dynamic dispatch at runtime.'),
      Q('Prefer composition because?', ['Less code always', 'Flexible reuse', 'No objects', 'Faster compile'], 1, 'Compose behavior flexibly.'),
    ],
  },
  {
    id: 'se-q1',
    courseId: 'se',
    title: 'SDLC & Agile Quiz',
    topic: 'Agile',
    timeLimit: 10,
    questions: [
      Q('Sprint length typically?', ['1 day', '1-4 weeks', '6 months', '1 hour'], 1, 'Short timeboxed iterations.'),
      Q('Daily standup is for?', ['Status sync', 'Code review', 'Release deploy', 'Testing'], 0, 'Quick sync on progress.'),
      Q('Waterfall is?', ['Iterative', 'Sequential', 'Prototype-only', 'DevOps-only'], 1, 'Phases flow downward.'),
      Q('Product Owner owns?', ['Sprint tasks', 'Backlog priority', 'Server config', 'Test cases'], 1, 'Orders the backlog.'),
      Q('Retro happens?', ['Daily', 'End of sprint', 'Yearly', 'Never'], 1, 'Reflect and improve.'),
    ],
  },
  {
    id: 'se-q2',
    courseId: 'se',
    title: 'Requirements & Testing Quiz',
    topic: 'Testing',
    timeLimit: 10,
    questions: [
      Q('Good user story has?', ['Acceptance criteria', 'Only title', 'No actor', 'No value'], 0, 'Testable acceptance criteria.'),
      Q('Unit test covers?', ['Whole system', 'Single function', 'Network only', 'UI only'], 1, 'Smallest testable unit.'),
      Q('UML sequence shows?', ['File sizes', 'Object interactions over time', 'Disk usage', 'SQL plans'], 1, 'Messages across lifelines.'),
      Q('E2E tests run?', ['Fastest', 'Slowest, full flows', 'Never in CI', 'Only manually'], 1, 'Full user journeys.'),
      Q('Version control helps?', ['Track changes + collaborate', 'Compile faster', 'Design UI', 'Host videos'], 0, 'History and branching.'),
    ],
  },
];

export const quizById = (id) => quizzes.find((q) => q.id === id);
export const quizzesByCourse = (courseId) => {
  const norm = courseId === 'java-dsa' ? 'ds' : courseId === 'web-dev' ? 'web' : courseId === 'database-systems' ? 'dbms' : courseId === 'machine-learning' ? 'cn' : courseId;
  return quizzes.filter((q) => q.courseId === norm);
};

