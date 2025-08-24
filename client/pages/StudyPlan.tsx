import { DashboardLayout } from "@/components/DashboardLayout";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export default function StudyPlan() {
  return (
    <DashboardLayout>
      <PlaceholderPage
        title="Study Plan"
        description="Lập kế hoạch học tập cá nhân và theo dõi tiến độ hàng ngày"
      />
    </DashboardLayout>
  );
}
