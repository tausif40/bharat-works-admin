import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-4">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">The Bharat Works</h1>
        <p className="text-xl text-muted-foreground">Admin Panel</p>
        <div className="mt-8">
          <Link href="/admin">
            <Button size="lg">Go to Admin Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

