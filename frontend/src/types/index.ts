// Contains types for various components and data structures used in my project

// interface for navigation items for the header
export interface NavigationItem {
  name: string;
  path: string;
}

export const navigation: NavigationItem[] = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Gallery", path: "/gallery" },
  { name: "Contact", path: "/contact" },
  { name: "Resume", path: "/resume" },
];

// interface for homework projects
export interface ProjectItem {
  id: number;
  title: string;
  description: string;
  imagePath: string;
}

// interface for tech skills
export interface SkillItem {
  name: string;
  imagePath: string;
}

// interface for school in education section
export interface EducationItem {
  degree: string;
  school: string;
  period: string;
  location: string;
}

// interface for work experience in experience section
export interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  location: string;
  description: string;
}

// interface for contact call to action
export interface CallToActionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

// interface for contact form data
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// interface for contact form errors
export interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

// Time API
export interface TimeApiResponse {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  seconds: number;
  milliSeconds: number;
  dateTime: string;
  date: string;
  time: string;
  timeZone: string;
  dayOfWeek: string;
  dstActive: boolean;
}
