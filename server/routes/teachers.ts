import { RequestHandler } from "express";
import {
  TeacherApplication,
  TeacherApplicationStatus,
  TeacherApplicationsListResponse,
  ApproveTeacherResponse,
  RejectTeacherRequest,
} from "@shared/api";

let nextId = 4;
const teacherApplications: TeacherApplication[] = [
  {
    id: 1,
    fullName: "Nguyễn Thị Hồng",
    email: "hong.nguyen@example.com",
    subject: "Toán học",
    experienceYears: 5,
    portfolioUrl: "https://example.com/hong-portfolio",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    status: "pending",
  },
  {
    id: 2,
    fullName: "Trần Văn Nam",
    email: "nam.tran@example.com",
    subject: "Tiếng Việt",
    experienceYears: 3,
    portfolioUrl: "https://example.com/nam-portfolio",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    status: "pending",
  },
  {
    id: 3,
    fullName: "Phạm Thu Thảo",
    email: "thao.pham@example.com",
    subject: "Khoa học",
    experienceYears: 7,
    portfolioUrl: "https://example.com/thao-portfolio",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    status: "approved",
  },
];

export const listTeacherApplications: RequestHandler = (req, res) => {
  const { status } = req.query as { status?: TeacherApplicationStatus };
  let items = teacherApplications;
  if (status) {
    items = items.filter((i) => i.status === status);
  }
  const response: TeacherApplicationsListResponse = { items };
  res.json(response);
};

export const approveTeacherApplication: RequestHandler = (req, res) => {
  const id = Number(req.params.id);
  const idx = teacherApplications.findIndex((i) => i.id === id);
  if (idx === -1) return res.status(404).json({ error: "Không tìm thấy hồ sơ" });

  teacherApplications[idx] = {
    ...teacherApplications[idx],
    status: "approved",
    rejectionReason: undefined,
  };
  const response: ApproveTeacherResponse = {
    success: true,
    item: teacherApplications[idx],
  };
  res.json(response);
};

export const rejectTeacherApplication: RequestHandler = (req, res) => {
  const id = Number(req.params.id);
  const body = req.body as RejectTeacherRequest;
  const idx = teacherApplications.findIndex((i) => i.id === id);
  if (idx === -1) return res.status(404).json({ error: "Không tìm thấy hồ sơ" });
  if (!body?.reason || body.reason.trim().length < 3) {
    return res.status(400).json({ error: "Lý do từ chối không hợp lệ" });
  }

  teacherApplications[idx] = {
    ...teacherApplications[idx],
    status: "rejected",
    rejectionReason: body.reason.trim(),
  };
  const response: ApproveTeacherResponse = {
    success: true,
    item: teacherApplications[idx],
  };
  res.json(response);
};

export const createTeacherApplication: RequestHandler = (req, res) => {
  const { fullName, email, subject, experienceYears, portfolioUrl } = req.body as Partial<TeacherApplication>;
  if (!fullName || !email || !subject || typeof experienceYears !== "number") {
    return res.status(400).json({ error: "Thiếu thông tin bắt buộc" });
  }
  const item: TeacherApplication = {
    id: nextId++,
    fullName,
    email,
    subject,
    experienceYears,
    portfolioUrl,
    createdAt: new Date().toISOString(),
    status: "pending",
  };
  teacherApplications.unshift(item);
  res.status(201).json({ success: true, item });
};
