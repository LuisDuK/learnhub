/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

// Teacher approval types
export type TeacherApplicationStatus = "pending" | "approved" | "rejected";

export interface TeacherApplication {
  id: number;
  fullName: string;
  email: string;
  subject: string;
  experienceYears: number;
  portfolioUrl?: string;
  createdAt: string; // ISO date
  status: TeacherApplicationStatus;
  rejectionReason?: string;
}

export interface TeacherApplicationsListResponse {
  items: TeacherApplication[];
}

export interface ApproveTeacherResponse {
  success: boolean;
  item: TeacherApplication;
}

export interface RejectTeacherRequest {
  reason: string;
}
