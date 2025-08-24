import { DashboardLayout } from "@/components/DashboardLayout";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export default function Settings() {
  return (
    <DashboardLayout>
      <PlaceholderPage 
        title="Cài đặt cá nhân"
        description="Quản lý thông tin cá nhân và tùy chỉnh trải nghiệm học tập"
      />
    </DashboardLayout>
  );
}
