"use client"

import { Calendar } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import type { DateRange } from "react-day-picker"

interface DatePickerWithRangeProps {
	date: DateRange | undefined
	setDate: (date: DateRange | undefined) => void
}

export function DatePickerWithRange({ date, setDate }: DatePickerWithRangeProps) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					id="date"
					variant={"outline"}
					className={cn("w-[180px] justify-start text-left font-normal", !date && "text-muted-foreground")}
				>
					<Calendar className="mr-2 h-4 w-4" />
					{date?.from ? (
						date.to ? (
							`${format(date.from, "MMM dd, yyyy")} - ${format(date.to, "MMM dd, yyyy")}`
						) : (
							format(date.from, "MMM dd, yyyy")
						)
					) : (
						<span>Pick a date</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="end">
				<CalendarComponent
					mode="range"
					defaultMonth={date?.from}
					selected={date}
					onSelect={setDate}
					numberOfMonths={2}
					pagedNavigation
				/>
			</PopoverContent>
		</Popover>
	)
}

