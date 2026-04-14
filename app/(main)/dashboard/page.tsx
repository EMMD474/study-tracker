import ComingSoonBanner from "@/components/ComingSoonBanner"
import Streak from "@/components/Streak";
import Welcome from "@/components/Welcome";
import StatsGrid from "@/components/StatsGrid";
import TodayPlan from "@/components/TodayPlan";
import QuickActions from "@/components/QuickActions";
import ProgressAnalytics from "@/components/ProgressAnalytics";
import UpcomingTasks from "@/components/UpcomingTasks";

export default function DashboardPage() {
  return (
    <div className="min-h-0 flex-1 p-4 lg:p-6 overflow-auto">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Hero Section: Welcome + Stats */}
        <Welcome name="Emmd" />
        <StatsGrid />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Today's Plan - 8 cols */}
          <div className="lg:col-span-8">
            <TodayPlan />
          </div>

          {/* Quick Actions - 4 cols */}
          <div className="lg:col-span-4">
            <QuickActions />
          </div>
        </div>

        {/* Progress + Streak Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Progress Analytics - 8 cols */}
          <div className="lg:col-span-8">
            <ProgressAnalytics />
          </div>

          {/* Streak - 4 cols */}
          <div className="lg:col-span-4">
            <Streak />
          </div>
        </div>

        {/* Upcoming Tasks */}
        <UpcomingTasks />
      </div>
    </div>
  );
}
