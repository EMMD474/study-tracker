import ComingSoonBanner from "@/components/ComingSoonBanner"

export default function DashboardPage() {
  return (
    <div className="flex min-h-0 flex-1 flex-col items-center justify-center p-6">
      {/* <ComingSoonBanner /> */}
      <div className="w-full max-w-4xl rounded-lg bg-card p-8 shadow-lg border border-border">
        <h1 className="text-4xl font-bold text-primary mb-4">Dashboard</h1>
        <p className="text-foreground/80">Your daily study plan and active sessions will appear here.</p>
      </div>
    </div>
  );
}
