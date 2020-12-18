export interface BioInterface {
  name: string;
  tagline: string;
  email: string;
  github: string;
  linkedin: string;
  objective: string;
}

export interface PositionInterface {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate?: string;
  employmentType: string;
  location: string;
  achievements: string[];
}
