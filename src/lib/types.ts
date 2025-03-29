export type ApplicantStatus =
  | "Applied"
  | "Interview"
  | "Evaluation"
  | "Offer"
  | "Contacted";

export type JobPosition =
  | "Software Engineering"
  | "Sr. Frontend Dev."
  | "Operations"
  | "Design"
  | "Finance";

export interface Applicant {
  id: string;
  name: string;
  email: string;
  stage: ApplicantStatus;
  rating: number;
  appliedJob: JobPosition;
  hasResume: boolean;
}
