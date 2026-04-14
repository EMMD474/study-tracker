import ComingSoonBanner from "@/components/ComingSoonBanner"
import Welcome from "@/components/Welcome";

export default function DashboardPage() {
  return (
    <div className="flex min-h-0 flex-1 flex-col items-center justify-center p-6">
      <Welcome name="Emmd" />
    </div>
  );
}
