"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResponsiveTable } from "@/components/responsive-table"
import AdminLayout from "@/components/admin-layout"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpDown, Download, TrendingUp, TrendingDown, DollarSign, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { addDays } from "date-fns"
import type { DateRange } from "react-day-picker"

// Define types for our data structure
type RevenueSource = "plans" | "commissions" | "banners" | "coupons" | "disputes"

type RevenueItem = {
	id: string
	date: string
	amount: number
	source: RevenueSource
	description: string
	status: "completed" | "pending" | "refunded"
	reference: string
}

type RevenueOverview = {
	totalRevenue: number
	planRevenue: number
	commissionRevenue: number
	bannerRevenue: number
	couponRevenue: number
	disputeRevenue: number
	monthlyGrowth: number
	yearlyGrowth: number
}

export default function RevenuePage() {
	// Sample revenue data
	const [revenueItems, setRevenueItems] = useState<RevenueItem[]>([
		{
			id: "1",
			date: "2023-09-15",
			amount: 1250.00,
			source: "plans",
			description: "Premium Plan Subscription - Vendor ID: V12345",
			status: "completed",
			reference: "PLAN-12345",
		},
		{
			id: "2",
			date: "2023-09-14",
			amount: 750.50,
			source: "commissions",
			description: "Commission from Job ID: J78901 - 15% of ₹5,003.33",
			status: "completed",
			reference: "COMM-78901",
		},
		{
			id: "3",
			date: "2023-09-13",
			amount: 500.00,
			source: "banners",
			description: "Banner Ad - Homepage - 30 days",
			status: "completed",
			reference: "BAN-45678",
		},
		{
			id: "4",
			date: "2023-09-12",
			amount: -150.00,
			source: "coupons",
			description: "Cashback - Promo: WELCOME20",
			status: "completed",
			reference: "COUP-23456",
		},
		{
			id: "5",
			date: "2023-09-11",
			amount: 300.00,
			source: "disputes",
			description: "Dispute Resolution Fee - Dispute ID: D34567",
			status: "completed",
			reference: "DISP-34567",
		},
		{
			id: "6",
			date: "2023-09-10",
			amount: 1000.00,
			source: "plans",
			description: "Basic Plan Subscription - Vendor ID: V23456",
			status: "completed",
			reference: "PLAN-23456",
		},
		{
			id: "7",
			date: "2023-09-09",
			amount: 450.75,
			source: "commissions",
			description: "Commission from Job ID: J89012 - 15% of ₹3,005.00",
			status: "completed",
			reference: "COMM-89012",
		},
		{
			id: "8",
			date: "2023-09-08",
			amount: 350.00,
			source: "banners",
			description: "Banner Ad - Category Page - 15 days",
			status: "pending",
			reference: "BAN-56789",
		},
		{
			id: "9",
			date: "2023-09-07",
			amount: -100.00,
			source: "coupons",
			description: "Cashback - Promo: REFER10",
			status: "completed",
			reference: "COUP-34567",
		},
		{
			id: "10",
			date: "2023-09-06",
			amount: 200.00,
			source: "disputes",
			description: "Dispute Resolution Fee - Dispute ID: D45678",
			status: "refunded",
			reference: "DISP-45678",
		},
	])

	const [revenueOverview, setRevenueOverview] = useState<RevenueOverview>({
		totalRevenue: 4551.25,
		planRevenue: 2250.00,
		commissionRevenue: 1201.25,
		bannerRevenue: 850.00,
		couponRevenue: -250.00,
		disputeRevenue: 500.00,
		monthlyGrowth: 12.5,
		yearlyGrowth: 35.8,
	})

	const [sourceFilter, setSourceFilter] = useState<string>("all")
	const [statusFilter, setStatusFilter] = useState<string>("all")
	const [sortField, setSortField] = useState<keyof RevenueItem>("date")
	const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
	const [dateRange, setDateRange] = useState<DateRange | undefined>({
		from: addDays(new Date(), -30),
		to: new Date(),
	})

	// Handle sorting
	const handleSort = (field: keyof RevenueItem) => {
		if (sortField === field) {
			setSortDirection(sortDirection === "asc" ? "desc" : "asc")
		} else {
			setSortField(field)
			setSortDirection("desc")
		}
	}

	// Filter and sort revenue items
	const filteredRevenueItems = revenueItems
		.filter((item) => {
			const matchesSource = sourceFilter === "all" || item.source === sourceFilter
			const matchesStatus = statusFilter === "all" || item.status === statusFilter

			// Filter by date range
			const itemDate = new Date(item.date)
			const matchesDateRange =
				!dateRange?.from || !dateRange?.to ||
				(itemDate >= dateRange.from && itemDate <= dateRange.to)

			return matchesSource && matchesStatus && matchesDateRange
		})
		.sort((a, b) => {
			if (sortField === "date") {
				return sortDirection === "asc"
					? new Date(a.date).getTime() - new Date(b.date).getTime()
					: new Date(b.date).getTime() - new Date(a.date).getTime()
			} else if (sortField === "amount") {
				return sortDirection === "asc" ? a.amount - b.amount : b.amount - a.amount
			} else {
				return sortDirection === "asc"
					? a[sortField].toString().localeCompare(b[sortField].toString())
					: b[sortField].toString().localeCompare(a[sortField].toString())
			}
		})

	// Format date for display
	const formatDate = (dateString: string) => {
		const date = new Date(dateString)
		return date.toLocaleDateString("en-IN", {
			day: "2-digit",
			month: "short",
			year: "numeric",
		})
	}

	// Format currency for display
	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-IN", {
			style: "currency",
			currency: "INR",
			minimumFractionDigits: 2,
		}).format(amount)
	}

	// Get source label
	const getSourceLabel = (source: RevenueSource) => {
		switch (source) {
			case "plans":
				return "Subscription Plans"
			case "commissions":
				return "Service Commissions"
			case "banners":
				return "Banner Advertisements"
			case "coupons":
				return "Coupons & Cashbacks"
			case "disputes":
				return "Dispute Resolutions"
			default:
				return source
		}
	}

	return (
		<AdminLayout>
			<div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
				<div className="flex items-center justify-between">
					<h2 className="text-3xl font-bold tracking-tight">Revenue Management</h2>
					<Button>
						<Download className="mr-2 h-4 w-4" />
						Export Report
					</Button>
				</div>

				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
							<DollarSign className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{formatCurrency(revenueOverview.totalRevenue)}</div>
							<div className="flex items-center pt-1 text-xs text-muted-foreground">
								{revenueOverview.monthlyGrowth >= 0 ? (
									<>
										<TrendingUp className="mr-1 h-3 w-3 text-green-500" />
										<span className="text-green-500">{revenueOverview.monthlyGrowth}% increase</span>
									</>
								) : (
									<>
										<TrendingDown className="mr-1 h-3 w-3 text-red-500" />
										<span className="text-red-500">{Math.abs(revenueOverview.monthlyGrowth)}% decrease</span>
									</>
								)}
								<span className="ml-1">from last month</span>
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Plan Revenue</CardTitle>
							<DollarSign className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{formatCurrency(revenueOverview.planRevenue)}</div>
							<p className="text-xs text-muted-foreground">
								{((revenueOverview.planRevenue / revenueOverview.totalRevenue) * 100).toFixed(1)}% of total revenue
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Commission Revenue</CardTitle>
							<DollarSign className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{formatCurrency(revenueOverview.commissionRevenue)}</div>
							<p className="text-xs text-muted-foreground">
								{((revenueOverview.commissionRevenue / revenueOverview.totalRevenue) * 100).toFixed(1)}% of total revenue
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Banner Revenue</CardTitle>
							<DollarSign className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{formatCurrency(revenueOverview.bannerRevenue)}</div>
							<p className="text-xs text-muted-foreground">
								{((revenueOverview.bannerRevenue / revenueOverview.totalRevenue) * 100).toFixed(1)}% of total revenue
							</p>
						</CardContent>
					</Card>
				</div>

				<Tabs defaultValue="all" className="space-y-4">
					<div className="flex justify-between items-center">
						<TabsList>
							<TabsTrigger value="all">All Revenue</TabsTrigger>
							<TabsTrigger value="plans">Plans</TabsTrigger>
							<TabsTrigger value="commissions">Commissions</TabsTrigger>
							<TabsTrigger value="banners">Banners</TabsTrigger>
							<TabsTrigger value="coupons">Coupons</TabsTrigger>
							<TabsTrigger value="disputes">Disputes</TabsTrigger>
						</TabsList>
						<div className="flex items-center space-x-2">
							<div className="min-w-[250px]">
								<DatePickerWithRange date={dateRange} setDate={setDateRange} className="w-full" />
							</div>
							<Select value={statusFilter} onValueChange={setStatusFilter}>
								<SelectTrigger className="w-[150px]">
									<SelectValue placeholder="Filter by status" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All Status</SelectItem>
									<SelectItem value="completed">Completed</SelectItem>
									<SelectItem value="pending">Pending</SelectItem>
									<SelectItem value="refunded">Refunded</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>

					<TabsContent value="all" className="space-y-4">
						<Card>
							<CardHeader>
								<CardTitle>Revenue Transactions</CardTitle>
								<CardDescription>
									View all revenue transactions across different sources.
								</CardDescription>
							</CardHeader>
							<CardContent className="p-0">
								<ResponsiveTable>
									<ResponsiveTable.Header>
										<ResponsiveTable.Row>
											<ResponsiveTable.Head>
												<div className="flex items-center cursor-pointer" onClick={() => handleSort("date")}>
													<Calendar className="mr-2 h-4 w-4" />
													Date
													<ArrowUpDown className="ml-2 h-4 w-4" />
												</div>
											</ResponsiveTable.Head>
											<ResponsiveTable.Head>
												<div className="flex items-center cursor-pointer" onClick={() => handleSort("source")}>
													Source
													<ArrowUpDown className="ml-2 h-4 w-4" />
												</div>
											</ResponsiveTable.Head>
											<ResponsiveTable.Head>Description</ResponsiveTable.Head>
											<ResponsiveTable.Head>Reference</ResponsiveTable.Head>
											<ResponsiveTable.Head>
												<div className="flex items-center cursor-pointer" onClick={() => handleSort("amount")}>
													<DollarSign className="mr-2 h-4 w-4" />
													Amount
													<ArrowUpDown className="ml-2 h-4 w-4" />
												</div>
											</ResponsiveTable.Head>
											<ResponsiveTable.Head>
												<div className="flex items-center cursor-pointer" onClick={() => handleSort("status")}>
													Status
													<ArrowUpDown className="ml-2 h-4 w-4" />
												</div>
											</ResponsiveTable.Head>
										</ResponsiveTable.Row>
									</ResponsiveTable.Header>
									<ResponsiveTable.Body>
										{filteredRevenueItems.map((item) => (
											<ResponsiveTable.Row key={item.id}>
												<ResponsiveTable.Cell>{formatDate(item.date)}</ResponsiveTable.Cell>
												<ResponsiveTable.Cell>
													<Badge variant="outline">{getSourceLabel(item.source)}</Badge>
												</ResponsiveTable.Cell>
												<ResponsiveTable.Cell>{item.description}</ResponsiveTable.Cell>
												<ResponsiveTable.Cell>{item.reference}</ResponsiveTable.Cell>
												<ResponsiveTable.Cell>
													<span className={item.amount < 0 ? "text-red-500" : "text-green-500"}>
														{formatCurrency(item.amount)}
													</span>
												</ResponsiveTable.Cell>
												<ResponsiveTable.Cell>
													<Badge
														variant={
															item.status === "completed"
																? "default"
																: item.status === "pending"
																	? "secondary"
																	: "destructive"
														}
													>
														{item.status}
													</Badge>
												</ResponsiveTable.Cell>
											</ResponsiveTable.Row>
										))}
									</ResponsiveTable.Body>
								</ResponsiveTable>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="plans" className="space-y-4">
						<Card>
							<CardHeader>
								<CardTitle>Plan Revenue</CardTitle>
								<CardDescription>
									Revenue from subscription plans purchased by vendors.
								</CardDescription>
							</CardHeader>
							<CardContent className="p-0">
								<ResponsiveTable>
									<ResponsiveTable.Header>
										<ResponsiveTable.Row>
											<ResponsiveTable.Head>Date</ResponsiveTable.Head>
											<ResponsiveTable.Head>Description</ResponsiveTable.Head>
											<ResponsiveTable.Head>Reference</ResponsiveTable.Head>
											<ResponsiveTable.Head>Amount</ResponsiveTable.Head>
											<ResponsiveTable.Head>Status</ResponsiveTable.Head>
										</ResponsiveTable.Row>
									</ResponsiveTable.Header>
									<ResponsiveTable.Body>
										{filteredRevenueItems
											.filter((item) => item.source === "plans")
											.map((item) => (
												<ResponsiveTable.Row key={item.id}>
													<ResponsiveTable.Cell>{formatDate(item.date)}</ResponsiveTable.Cell>
													<ResponsiveTable.Cell>{item.description}</ResponsiveTable.Cell>
													<ResponsiveTable.Cell>{item.reference}</ResponsiveTable.Cell>
													<ResponsiveTable.Cell>
														<span className="text-green-500">{formatCurrency(item.amount)}</span>
													</ResponsiveTable.Cell>
													<ResponsiveTable.Cell>
														<Badge
															variant={
																item.status === "completed"
																	? "default"
																	: item.status === "pending"
																		? "secondary"
																		: "destructive"
															}
														>
															{item.status}
														</Badge>
													</ResponsiveTable.Cell>
												</ResponsiveTable.Row>
											))}
									</ResponsiveTable.Body>
								</ResponsiveTable>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="commissions" className="space-y-4">
						<Card>
							<CardHeader>
								<CardTitle>Commission Revenue</CardTitle>
								<CardDescription>
									Revenue from commissions on services provided by vendors.
								</CardDescription>
							</CardHeader>
							<CardContent className="p-0">
								<ResponsiveTable>
									<ResponsiveTable.Header>
										<ResponsiveTable.Row>
											<ResponsiveTable.Head>Date</ResponsiveTable.Head>
											<ResponsiveTable.Head>Description</ResponsiveTable.Head>
											<ResponsiveTable.Head>Reference</ResponsiveTable.Head>
											<ResponsiveTable.Head>Amount</ResponsiveTable.Head>
											<ResponsiveTable.Head>Status</ResponsiveTable.Head>
										</ResponsiveTable.Row>
									</ResponsiveTable.Header>
									<ResponsiveTable.Body>
										{filteredRevenueItems
											.filter((item) => item.source === "commissions")
											.map((item) => (
												<ResponsiveTable.Row key={item.id}>
													<ResponsiveTable.Cell>{formatDate(item.date)}</ResponsiveTable.Cell>
													<ResponsiveTable.Cell>{item.description}</ResponsiveTable.Cell>
													<ResponsiveTable.Cell>{item.reference}</ResponsiveTable.Cell>
													<ResponsiveTable.Cell>
														<span className="text-green-500">{formatCurrency(item.amount)}</span>
													</ResponsiveTable.Cell>
													<ResponsiveTable.Cell>
														<Badge
															variant={
																item.status === "completed"
																	? "default"
																	: item.status === "pending"
																		? "secondary"
																		: "destructive"
															}
														>
															{item.status}
														</Badge>
													</ResponsiveTable.Cell>
												</ResponsiveTable.Row>
											))}
									</ResponsiveTable.Body>
								</ResponsiveTable>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="banners" className="space-y-4">
						<Card>
							<CardHeader>
								<CardTitle>Banner Revenue</CardTitle>
								<CardDescription>
									Revenue from banner advertisements purchased by vendors.
								</CardDescription>
							</CardHeader>
							<CardContent className="p-0">
								<ResponsiveTable>
									<ResponsiveTable.Header>
										<ResponsiveTable.Row>
											<ResponsiveTable.Head>Date</ResponsiveTable.Head>
											<ResponsiveTable.Head>Description</ResponsiveTable.Head>
											<ResponsiveTable.Head>Reference</ResponsiveTable.Head>
											<ResponsiveTable.Head>Amount</ResponsiveTable.Head>
											<ResponsiveTable.Head>Status</ResponsiveTable.Head>
										</ResponsiveTable.Row>
									</ResponsiveTable.Header>
									<ResponsiveTable.Body>
										{filteredRevenueItems
											.filter((item) => item.source === "banners")
											.map((item) => (
												<ResponsiveTable.Row key={item.id}>
													<ResponsiveTable.Cell>{formatDate(item.date)}</ResponsiveTable.Cell>
													<ResponsiveTable.Cell>{item.description}</ResponsiveTable.Cell>
													<ResponsiveTable.Cell>{item.reference}</ResponsiveTable.Cell>
													<ResponsiveTable.Cell>
														<span className="text-green-500">{formatCurrency(item.amount)}</span>
													</ResponsiveTable.Cell>
													<ResponsiveTable.Cell>
														<Badge
															variant={
																item.status === "completed"
																	? "default"
																	: item.status === "pending"
																		? "secondary"
																		: "destructive"
															}
														>
															{item.status}
														</Badge>
													</ResponsiveTable.Cell>
												</ResponsiveTable.Row>
											))}
									</ResponsiveTable.Body>
								</ResponsiveTable>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="coupons" className="space-y-4">
						<Card>
							<CardHeader>
								<CardTitle>Coupons & Cashbacks</CardTitle>
								<CardDescription>
									Expenses from coupons and cashbacks provided to users.
								</CardDescription>
							</CardHeader>
							<CardContent className="p-0">
								<ResponsiveTable>
									<ResponsiveTable.Header>
										<ResponsiveTable.Row>
											<ResponsiveTable.Head>Date</ResponsiveTable.Head>
											<ResponsiveTable.Head>Description</ResponsiveTable.Head>
											<ResponsiveTable.Head>Reference</ResponsiveTable.Head>
											<ResponsiveTable.Head>Amount</ResponsiveTable.Head>
											<ResponsiveTable.Head>Status</ResponsiveTable.Head>
										</ResponsiveTable.Row>
									</ResponsiveTable.Header>
									<ResponsiveTable.Body>
										{filteredRevenueItems
											.filter((item) => item.source === "coupons")
											.map((item) => (
												<ResponsiveTable.Row key={item.id}>
													<ResponsiveTable.Cell>{formatDate(item.date)}</ResponsiveTable.Cell>
													<ResponsiveTable.Cell>{item.description}</ResponsiveTable.Cell>
													<ResponsiveTable.Cell>{item.reference}</ResponsiveTable.Cell>
													<ResponsiveTable.Cell>
														<span className="text-red-500">{formatCurrency(item.amount)}</span>
													</ResponsiveTable.Cell>
													<ResponsiveTable.Cell>
														<Badge
															variant={
																item.status === "completed"
																	? "default"
																	: item.status === "pending"
																		? "secondary"
																		: "destructive"
															}
														>
															{item.status}
														</Badge>
													</ResponsiveTable.Cell>
												</ResponsiveTable.Row>
											))}
									</ResponsiveTable.Body>
								</ResponsiveTable>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="disputes" className="space-y-4">
						<Card>
							<CardHeader>
								<CardTitle>Dispute Resolution Revenue</CardTitle>
								<CardDescription>
									Revenue from dispute resolution fees.
								</CardDescription>
							</CardHeader>
							<CardContent className="p-0">
								<ResponsiveTable>
									<ResponsiveTable.Header>
										<ResponsiveTable.Row>
											<ResponsiveTable.Head>Date</ResponsiveTable.Head>
											<ResponsiveTable.Head>Description</ResponsiveTable.Head>
											<ResponsiveTable.Head>Reference</ResponsiveTable.Head>
											<ResponsiveTable.Head>Amount</ResponsiveTable.Head>
											<ResponsiveTable.Head>Status</ResponsiveTable.Head>
										</ResponsiveTable.Row>
									</ResponsiveTable.Header>
									<ResponsiveTable.Body>
										{filteredRevenueItems
											.filter((item) => item.source === "disputes")
											.map((item) => (
												<ResponsiveTable.Row key={item.id}>
													<ResponsiveTable.Cell>{formatDate(item.date)}</ResponsiveTable.Cell>
													<ResponsiveTable.Cell>{item.description}</ResponsiveTable.Cell>
													<ResponsiveTable.Cell>{item.reference}</ResponsiveTable.Cell>
													<ResponsiveTable.Cell>
														<span className="text-green-500">{formatCurrency(item.amount)}</span>
													</ResponsiveTable.Cell>
													<ResponsiveTable.Cell>
														<Badge
															variant={
																item.status === "completed"
																	? "default"
																	: item.status === "pending"
																		? "secondary"
																		: "destructive"
															}
														>
															{item.status}
														</Badge>
													</ResponsiveTable.Cell>
												</ResponsiveTable.Row>
											))}
									</ResponsiveTable.Body>
								</ResponsiveTable>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</div>
		</AdminLayout>
	)
}
