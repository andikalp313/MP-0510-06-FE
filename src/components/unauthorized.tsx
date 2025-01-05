"use client"
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { XCircle } from 'lucide-react'

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <XCircle className="w-16 h-16 text-destructive mb-4" />
      <h1 className="text-4xl font-bold mb-2">Unauthorized Access</h1>
      <p className="text-muted-foreground mb-6">Sorry, you don't have permission to access this page.</p>
      <Link href="/">
        <Button>
          Back to Home
        </Button>
      </Link>
    </div>
  )
}