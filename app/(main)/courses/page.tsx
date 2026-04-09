import ComingSoonBanner from "@/components/ComingSoonBanner"

export default function CoursesPage() {
  return (
    <div className="flex min-h-0 flex-1 flex-col items-center justify-center p-6">
      <ComingSoonBanner />
      <div className="w-full max-w-4xl rounded-lg bg-card p-8 shadow-lg border border-border">
        <h1 className="text-4xl font-bold text-primary mb-4">Course Management</h1>
        <p className="text-foreground/80">Add your subjects, set their priorities, and allocate study time here.</p>
      </div>
    </div>
  );
}
