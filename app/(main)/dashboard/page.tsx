import ComingSoonBanner from "@/components/ComingSoonBanner"
import Streak from "@/components/Streak";
import Welcome from "@/components/Welcome";

export default function DashboardPage() {
  return (
    <div className="flex min-h-0 flex-1 flex-col items-center justify-center p-6">
      <Welcome name="Emmd" />
      <div className="mt-5 grid grid-cols-2 gap-4">
        <Streak />
      </div>
    </div>
  );
}
