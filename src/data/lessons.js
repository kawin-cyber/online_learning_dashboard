const L = (courseId, n, module, title, duration, type, summary) => ({
  id: `${courseId}-l${n}`,
  courseId, module, title, duration, type, summary,
});

export const lessons = [
  L('ds', 1, 'Introduction', 'What Are Data Structures?', '12:40', 'video', 'Why data structures matter and how to pick the right one.'),
  L('ds', 2, 'Introduction', 'Big-O Notation Made Simple', '15:20', 'video', 'Time and space complexity with visual examples.'),
  L('ds', 3, 'Arrays', 'Arrays & Dynamic Arrays', '18:05', 'video', 'Two-pointers, sliding window and prefix sums.'),
  L('ds', 4, 'Linked Lists', 'Singly & Doubly Linked Lists', '21:30', 'video', 'Insertion, deletion, reversal and cycle detection.'),
  L('ds', 5, 'Stacks & Queues', 'Stacks, Queues & Deques', '19:45', 'video', 'LIFO vs FIFO, monotonic stacks and circular queues.'),
  L('ds', 6, 'Trees & Graphs', 'Trees & Graph Traversals', '24:10', 'video', 'BSTs, heaps, BFS and DFS traversals.'),
  L('dbms', 1, 'Intro to DBMS', 'DBMS vs File Systems', '11:15', 'video', 'How a DBMS solves redundancy and concurrency.'),
  L('dbms', 2, 'ER Model & SQL', 'ER Diagrams & Keys', '17:40', 'video', 'Entities, relationships, cardinality and keys.'),
  L('dbms', 3, 'ER Model & SQL', 'SQL SELECT Masterclass', '22:55', 'video', 'Joins, grouping, subqueries and window functions.'),
  L('dbms', 4, 'Normalization', '1NF to 3NF with Examples', '19:05', 'video', 'Anomalies and normalizing a schema step by step.'),
  L('dbms', 5, 'Transactions', 'ACID & Concurrency Control', '16:48', 'reading', 'Isolation levels, locking and consistency.'),
  L('dbms', 6, 'Indexing', 'Indexing & Query Optimization', '20:12', 'practice', 'B+ trees and EXPLAIN plans in the lab.'),
  L('web', 1, 'HTML & CSS', 'HTML Semantics & Forms', '14:30', 'video', 'Accessible markup and forms with validation.'),
  L('web', 2, 'HTML & CSS', 'Modern CSS: Flexbox & Grid', '23:18', 'video', 'Layout systems and responsive patterns.'),
  L('web', 3, 'JavaScript', 'ES6+ JavaScript Essentials', '26:44', 'video', 'Arrow functions, promises and array methods.'),
  L('web', 4, 'Responsive Design', 'Responsive Design Workshop', '32:00', 'practice', 'Mobile-first workflow and fluid typography.'),
  L('web', 5, 'React Basics', 'Components, Props & State', '28:36', 'video', 'Hooks basics and lifting state the right way.'),
  L('web', 6, 'Capstone Project', 'Build & Deploy Your Portfolio', '45:00', 'practice', 'Ship a portfolio recruiters can see.'),
  L('cn', 1, 'Networking Basics', 'How the Internet Works', '13:25', 'video', 'Packets, ISPs and the journey of a click.'),
  L('cn', 2, 'OSI & TCP/IP', 'The OSI Model Explained', '18:52', 'video', 'All 7 layers with mnemonics and examples.'),
  L('cn', 3, 'OSI & TCP/IP', 'TCP vs UDP Deep Dive', '17:09', 'video', 'Handshakes and reliability trade-offs.'),
  L('cn', 4, 'Routing', 'IP Addressing & Subnetting', '25:37', 'practice', 'CIDR and subnet masks hands-on.'),
  L('cn', 5, 'Application Layer', 'DNS, HTTP & Email', '16:20', 'video', 'Resolution, page loads and SMTP.'),
  L('cn', 6, 'Security', 'Firewalls, VPNs & HTTPS', '19:44', 'reading', 'TLS, certificates and campus security.'),
  L('oop', 1, 'Classes & Objects', 'Classes, Objects & Constructors', '15:33', 'video', 'Blueprints vs instances and constructors.'),
  L('oop', 2, 'Inheritance', 'Inheritance & super', '17:21', 'video', 'Extending behavior without fragile bases.'),
  L('oop', 3, 'Polymorphism', 'Overloading vs Overriding', '18:07', 'video', 'Compile-time vs run-time polymorphism.'),
  L('oop', 4, 'Abstraction', 'Abstract Classes & Interfaces', '16:59', 'video', 'Contracts and hiding complexity.'),
  L('oop', 5, 'SOLID Principles', 'SOLID Principles in Practice', '21:14', 'reading', 'Five rules for maintainable code.'),
  L('oop', 6, 'SOLID Principles', 'Mini Project: Library System', '40:00', 'practice', 'Apply everything in a small project.'),
  L('se', 1, 'SDLC', 'SDLC Models Explained', '14:02', 'video', 'Waterfall, spiral, iterative and V-model.'),
  L('se', 2, 'Agile & Scrum', 'Scrum Roles & Ceremonies', '16:47', 'video', 'Sprints, standups and retros.'),
  L('se', 3, 'Requirements', 'Writing Good Requirements', '15:19', 'reading', 'User stories and acceptance criteria.'),
  L('se', 4, 'Design & UML', 'UML Diagrams Crash Course', '20:31', 'video', 'Use-case, class and sequence diagrams.'),
  L('se', 5, 'Testing', 'Testing Pyramid & Strategies', '18:26', 'video', 'Unit, integration and E2E tests.'),
  L('se', 6, 'Testing', 'Git, CI & Capstone Workflow', '30:00', 'practice', 'Branching, PRs and CI for your project.'),
];

export const lessonsByCourse = (courseId) => {
  const norm = courseId === 'java-dsa' ? 'ds' : courseId === 'web-dev' ? 'web' : courseId === 'database-systems' ? 'dbms' : courseId === 'machine-learning' ? 'cn' : courseId;
  return lessons.filter((l) => l.courseId === norm);
};
export const lessonById = (id) => lessons.find((l) => l.id === id);

