export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photo: string;
  skills: string[];
  linkedin?: string;
  github?: string;
}

export const team: TeamMember[] = [
  {
    name: "Alejandro Tinya",
    role: "Lead Developer & Architect",
    bio: "Especialista en arquitecturas web de alto rendimiento y automatización de procesos industriales.",
    photo: "/generico.jpeg",
    skills: ["Astro", "React", "Node.js", "AppScript"],
    linkedin: "https://linkedin.com/in/alejandrotinya",
    github: "https://github.com/alejandrotinya",
  },
  {
    name: "María Garcia",
    role: "UX/UI Designer",
    bio: "Enfocada en crear interfaces persuasivas bajo el modelo AIDA para maximizar la conversión B2B.",
    photo: "/generico.jpeg",
    skills: ["Figma", "Design Systems", "Webflow", "Tailwind"],
    linkedin: "https://linkedin.com/in/mariagarcia",
  },
];
