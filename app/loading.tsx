import { ParadoxLoader } from "@/components/ui/paradox-loader";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <ParadoxLoader size="lg" />
        <p className="mt-4 text-lg text-muted-foreground">Loading your paradox experience...</p>
      </div>
    </div>
  )
}