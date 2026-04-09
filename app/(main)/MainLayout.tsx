import { Fab} from "@mui/material";
import { Add } from "@mui/icons-material";


export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-0 flex-1 flex-col">
      <div className="mx-auto box-border w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 lg:py-8">
        {children}
      </div>
      <Fab
        color="secondary"
        aria-label="add"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        <Add />
      </Fab>
    </main>
  );
}
