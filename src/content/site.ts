export const site = {
  name: 'Anisong Chanthalalay',
  shortName: 'Anisong',
  role: 'Full-Stack Product Engineer',
  tagline: 'I turn ideas into shipped products — iOS apps, web platforms, and everything in between.',
  location: 'USA',
  email: 'anisongchan@gmail.com',
  phone: '(815) 329-9172',
  github: 'https://github.com/im2basic',
  linkedin: 'https://www.linkedin.com/in/achanthalalay',
  resumeUrl: '/resume.pdf',
}

export const about = {
  headline: 'From blueprint to production.',
  paragraphs: [
    'I spent five years at CCMSI building and modernizing enterprise Angular applications used by thousands of insurance professionals — including a legacy Silverlight-to-Angular migration and a claim component that generates ~$1.2M in annual revenue.',
    'Outside of enterprise work, I design, build, and ship my own products end-to-end: iOS apps in SwiftUI, web platforms in Next.js, backends on Supabase, with real payments, analytics, and App Store launches.',
    'I care about the whole journey — architecture, UI polish, offline-first sync, conversion onboarding, and everything else it takes to go from an idea on paper to a product people pay for.',
  ],
}

export const experience = [
  {
    company: 'CCMSI',
    title: 'Web Developer',
    start: 'Sep 2020',
    end: 'Jun 2025',
    summary:
      'Built and maintained Angular 14+ applications for a workers’ compensation claim system used by thousands of insurance agents, backed by C#/.NET services on Azure.',
    highlights: [
      'Converted a legacy Microsoft Silverlight application into a modern Angular front-end with a C#/.NET back-end.',
      'Designed a reusable multiple-body-parts claim component generating ~$1.2M in annual revenue.',
      'Designed and launched two-way SMS + in-app chat connecting clients with adjusters in real time.',
      'Implemented prefunding (check holds and overrides) for account balance management.',
      'Built PDF & Excel export tooling with dynamic rendering and formatting on Kendo UI.',
      'Improved load times by 20% and reduced user-reported errors by 15% through debugging, testing, and refactoring legacy code.',
    ],
  },
  {
    company: 'Independent',
    title: 'Product Engineer — self-shipped apps',
    start: '2023',
    end: 'Present',
    summary:
      'Designed, built, and shipped five products end-to-end: Deckly, PocketWorship, FlipSide, StampKit, and Dewy — covering iOS, web, backend, payments, and launch.',
    highlights: [],
  },
]

export const skills = {
  Languages: ['TypeScript', 'JavaScript', 'Swift', 'C#', 'Python', 'SQL', 'HTML5', 'SCSS/CSS3'],
  Frontend: ['React', 'Next.js', 'Angular 14+', 'SwiftUI', 'RxJS', 'NgRx', 'Tailwind CSS', 'Kendo UI', 'Bootstrap'],
  'Backend & Data': ['Node.js', 'Express', '.NET Core (interfacing)', 'Supabase', 'PostgreSQL', 'Prisma', 'SQLite/GRDB', 'REST APIs'],
  'AI & Automation': ['LLM integrations (Claude, Gemini, Groq)', 'AI agents', 'n8n', 'Zapier', 'Webhooks', 'Claude Code', 'Cursor'],
  'Practices & Tools': ['Azure DevOps', 'Git', 'CI/CD', 'Agile/Scrum', 'Unit Testing', 'Accessibility (WCAG)', 'OOP/SOLID', 'Stripe', 'Figma', 'Postman'],
}

export const education = [
  { school: 'Coding Dojo', credential: 'Full Stack Software Engineer Bootcamp' },
  { school: 'Rock Valley College', credential: 'Associate of Arts' },
]
