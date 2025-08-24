import { DashboardLayout } from "@/components/DashboardLayout";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export default function Courses() {
  return (
    <DashboardLayout>
      <PlaceholderPage 
        title="Khóa học của tôi"
        description="Quản lý và theo dõi tiến độ các khóa học bạn đang tham gia"
      />
    </DashboardLayout>
  );
}
