const A = (id, courseId, title, dueDate, totalMarks, brief) => ({
  id,
  courseId,
  title,
  dueDate,
  totalMarks,
  brief,
});

export const assignments = [
  A('ds-a1', 'ds', 'Arrays Problem Set', '2026-09-18', 100, 'Solve 5 array problems covering two-pointers, sliding window and prefix sums.'),
  A('ds-a2', 'ds', 'Linked List Implementation', '2026-09-25', 100, 'Implement a doubly linked list with insert, delete, reverse and cycle detection.'),
  A('ds-a3', 'ds', 'Stacks & Queues Lab', '2026-10-02', 50, 'Build a parenthesis validator and a circular queue with unit tests.'),
  A('dbms-a1', 'dbms', 'ER Diagram Design', '2026-09-16', 100, 'Design an ER diagram for a library system with at least 6 entities.'),
  A('dbms-a2', 'dbms', 'SQL Queries Lab', '2026-09-24', 100, 'Write 10 queries with joins, subqueries and aggregations on the given schema.'),
  A('dbms-a3', 'dbms', 'Normalization Case Study', '2026-10-05', 50, 'Normalize the provided denormalized schema up to 3NF with justification.'),
  A('web-a1', 'web', 'Portfolio Homepage', '2026-09-19', 100, 'Create a responsive homepage with semantic HTML and modern CSS layout.'),
  A('web-a2', 'web', 'JS Todo App', '2026-09-27', 100, 'Build a todo app with localStorage persistence, filters and clean ES6 code.'),
  A('web-a3', 'web', 'React Dashboard UI', '2026-10-08', 100, 'Recreate a dashboard screen with components, props and state in React.'),
  A('cn-a1', 'cn', 'OSI Model Worksheet', '2026-09-15', 50, 'Map 12 real-world protocols and devices to their OSI layers.'),
  A('cn-a2', 'cn', 'Subnetting Problems', '2026-09-20', 100, 'Solve CIDR and subnet-mask problems; show all working steps.'),
  A('cn-a3', 'cn', 'Packet Trace Report', '2026-10-04', 50, 'Capture and annotate a DNS + HTTP exchange in Wireshark.'),
  A('oop-a1', 'oop', 'Class Design Exercise', '2026-09-17', 100, 'Model a student-management domain with well-encapsulated classes.'),
  A('oop-a2', 'oop', 'Inheritance Hierarchy', '2026-09-28', 100, 'Extend the design with inheritance and demonstrate polymorphism.'),
  A('oop-a3', 'oop', 'SOLID Refactoring', '2026-10-06', 50, 'Refactor the smelly codebase to satisfy SOLID principles.'),
  A('se-a1', 'se', 'SDLC Comparison Report', '2026-09-21', 50, 'Compare Waterfall, Agile and Spiral for a hostel-management project.'),
  A('se-a2', 'se', 'Sprint Planning Simulation', '2026-09-29', 100, 'Plan a 2-week sprint: backlog, estimates, board and retro notes.'),
  A('se-a3', 'se', 'Test Plan Document', '2026-10-07', 50, 'Write a test plan with cases for login, enrollment and quiz modules.'),
];

export const assignmentById = (id) => assignments.find((a) => a.id === id);
export const assignmentsByCourse = (courseId) => {
  const norm = courseId === 'java-dsa' ? 'ds' : courseId === 'web-dev' ? 'web' : courseId === 'database-systems' ? 'dbms' : courseId === 'machine-learning' ? 'cn' : courseId;
  return assignments.filter((a) => a.courseId === norm);
};

