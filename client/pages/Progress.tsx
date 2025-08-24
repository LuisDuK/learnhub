import { DashboardLayout } from "@/components/DashboardLayout";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export default function Progress() {
  return (
    <DashboardLayout>
      <PlaceholderPage 
        title="Báo cáo tiến độ"
        description="Theo dõi chi tiết tiến độ học tập và thống kê thành tích"
      />
    </DashboardLayout>
  );
}
