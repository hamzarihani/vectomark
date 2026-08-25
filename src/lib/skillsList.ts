export type SkillCategory = 'Frontend' | 'Backend' | 'Mobile' | 'Database' | 'DevOps' | 'Tools & Other';

export interface PredefinedSkill {
  id: string; // The identifier for skillicons.dev (e.g., 'react', 'ts')
  name: string; // Display name (e.g., 'React', 'TypeScript')
  category: SkillCategory;
}

export const PREDEFINED_SKILLS: PredefinedSkill[] = [
  // Frontend
  { id: 'html', name: 'HTML5', category: 'Frontend' },
  { id: 'css', name: 'CSS3', category: 'Frontend' },
  { id: 'js', name: 'JavaScript', category: 'Frontend' },
  { id: 'ts', name: 'TypeScript', category: 'Frontend' },
  { id: 'react', name: 'React', category: 'Frontend' },
  { id: 'nextjs', name: 'Next.js', category: 'Frontend' },
  { id: 'vue', name: 'Vue.js', category: 'Frontend' },
  { id: 'nuxtjs', name: 'Nuxt', category: 'Frontend' },
  { id: 'angular', name: 'Angular', category: 'Frontend' },
  { id: 'svelte', name: 'Svelte', category: 'Frontend' },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'Frontend' },
  { id: 'bootstrap', name: 'Bootstrap', category: 'Frontend' },
  { id: 'sass', name: 'Sass', category: 'Frontend' },
  { id: 'materialui', name: 'Material-UI', category: 'Frontend' },
  { id: 'redux', name: 'Redux', category: 'Frontend' },

  // Backend
  { id: 'nodejs', name: 'Node.js', category: 'Backend' },
  { id: 'express', name: 'Express', category: 'Backend' },
  { id: 'nestjs', name: 'NestJS', category: 'Backend' },
  { id: 'python', name: 'Python', category: 'Backend' },
  { id: 'django', name: 'Django', category: 'Backend' },
  { id: 'fastapi', name: 'FastAPI', category: 'Backend' },
  { id: 'flask', name: 'Flask', category: 'Backend' },
  { id: 'php', name: 'PHP', category: 'Backend' },
  { id: 'laravel', name: 'Laravel', category: 'Backend' },
  { id: 'java', name: 'Java', category: 'Backend' },
  { id: 'spring', name: 'Spring Boot', category: 'Backend' },
  { id: 'cs', name: 'C#', category: 'Backend' },
  { id: 'dotnet', name: '.NET', category: 'Backend' },
  { id: 'go', name: 'Go', category: 'Backend' },
  { id: 'rust', name: 'Rust', category: 'Backend' },
  { id: 'ruby', name: 'Ruby', category: 'Backend' },
  { id: 'graphql', name: 'GraphQL', category: 'Backend' },

  // Mobile
  { id: 'android', name: 'Android', category: 'Mobile' },
  { id: 'androidstudio', name: 'Android Studio', category: 'Mobile' },
  { id: 'apple', name: 'Apple', category: 'Mobile' },
  { id: 'swift', name: 'Swift', category: 'Mobile' },
  { id: 'kotlin', name: 'Kotlin', category: 'Mobile' },
  { id: 'flutter', name: 'Flutter', category: 'Mobile' },
  { id: 'dart', name: 'Dart', category: 'Mobile' },
  { id: 'ionic', name: 'Ionic', category: 'Mobile' },
  { id: 'xcode', name: 'Xcode', category: 'Mobile' },

  // Database
  { id: 'postgres', name: 'PostgreSQL', category: 'Database' },
  { id: 'mysql', name: 'MySQL', category: 'Database' },
  { id: 'sqlite', name: 'SQLite', category: 'Database' },
  { id: 'mongodb', name: 'MongoDB', category: 'Database' },
  { id: 'redis', name: 'Redis', category: 'Database' },
  { id: 'supabase', name: 'Supabase', category: 'Database' },
  { id: 'firebase', name: 'Firebase', category: 'Database' },
  { id: 'prisma', name: 'Prisma', category: 'Database' },
  { id: 'dynamodb', name: 'DynamoDB', category: 'Database' },
  
  // DevOps
  { id: 'docker', name: 'Docker', category: 'DevOps' },
  { id: 'kubernetes', name: 'Kubernetes', category: 'DevOps' },
  { id: 'aws', name: 'AWS', category: 'DevOps' },
  { id: 'gcp', name: 'Google Cloud', category: 'DevOps' },
  { id: 'azure', name: 'Azure', category: 'DevOps' },
  { id: 'vercel', name: 'Vercel', category: 'DevOps' },
  { id: 'netlify', name: 'Netlify', category: 'DevOps' },
  { id: 'cloudflare', name: 'Cloudflare', category: 'DevOps' },
  { id: 'nginx', name: 'Nginx', category: 'DevOps' },
  { id: 'linux', name: 'Linux', category: 'DevOps' },
  { id: 'githubactions', name: 'GitHub Actions', category: 'DevOps' },
  
  // Tools & Other
  { id: 'git', name: 'Git', category: 'Tools & Other' },
  { id: 'github', name: 'GitHub', category: 'Tools & Other' },
  { id: 'gitlab', name: 'GitLab', category: 'Tools & Other' },
  { id: 'figma', name: 'Figma', category: 'Tools & Other' },
  { id: 'vscode', name: 'VS Code', category: 'Tools & Other' },
  { id: 'postman', name: 'Postman', category: 'Tools & Other' },
  { id: 'jest', name: 'Jest', category: 'Tools & Other' },
  { id: 'vite', name: 'Vite', category: 'Tools & Other' },
  { id: 'webpack', name: 'Webpack', category: 'Tools & Other' },
];

export const getSkillsByCategory = () => {
  const grouped: Record<SkillCategory, PredefinedSkill[]> = {
    'Frontend': [],
    'Backend': [],
    'Mobile': [],
    'Database': [],
    'DevOps': [],
    'Tools & Other': [],
  };

  PREDEFINED_SKILLS.forEach((skill) => {
    grouped[skill.category].push(skill);
  });

  return grouped;
};
