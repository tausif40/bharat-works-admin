import type React from "react"
import { cn } from "@/lib/utils"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface ResponsiveTableProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function ResponsiveTable({ children, className, ...props }: ResponsiveTableProps) {
  return (
    <div className={cn("w-full overflow-auto", className)} {...props}>
      <Table>{children}</Table>
    </div>
  )
}

ResponsiveTable.Header = TableHeader
ResponsiveTable.Body = TableBody
ResponsiveTable.Row = TableRow
ResponsiveTable.Head = TableHead
ResponsiveTable.Cell = TableCell

