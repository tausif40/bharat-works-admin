"use client"

import { useEffect, useState } from "react"
import AdminLayout from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general")

  const tabs = [
    'New Job (Provider)',
    'Approved Job (User)',
    'Cancel Job (Provider - User)',
    'Payment Received (Provider)',
    'Offer Approved (Provider)',
    'new Offer (user)',
  ];

  const apiEndpoints = {
    'New Job (Provider)': 'https://api.example.com/new-job-provider',
    'Approved Job (User)': 'https://api.example.com/approved-job-user',
    'Cancel Job (Provider - User)': 'https://api.example.com/cancel-job-provider-user',
    'Payment Received (Provider)': 'https://api.example.com/payment-received-provider',
    'Offer Approved (Provider)': 'https://api.example.com/offer-approved-provider',
    'new Offer (user)': 'https://api.example.com/new-offer-user',
  };

  const availableTags = [
    '{{user_name}}',
    '{{provider_name}}',
    '{{category_title}}',
    '{{sub_category_title}}',
    '{{job_want}}',
    '{{job_id}}',
  ];

  // const [activeTab, setActiveTab] = useState('New Job (Provider)');
  const [title, setTitle] = useState('');
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationSubtitle, setNotificationSubtitle] = useState('');

  useEffect(() => {
    // Fetch data from the API when the active tab changes
    const fetchData = async () => {
      try {
        // const response = await fetch(apiEndpoints[activeTab]);
        // const data = await response.json();
        // Assuming the API returns an object with `title`, `notificationTitle`, and `notificationSubtitle`
        setTitle(data.title || '');
        setNotificationTitle(data.notificationTitle || '');
        setNotificationSubtitle(data.notificationSubtitle || '');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [activeTab]);

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="sendNotifications">Send Notifications</TabsTrigger>
            <TabsTrigger value="SuspiciousActivity">Suspicious Activity</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
                <CardDescription>Manage your platform settings and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="platform-name">Platform Name</Label>
                  <Input id="platform-name" defaultValue="The Bharat Works" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Contact Email</Label>
                  <Input id="contact-email" type="email" defaultValue="support@thebharatworks.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="support-phone">Support Phone</Label>
                  <Input id="support-phone" defaultValue="+91 98765 43210" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="platform-description">Platform Description</Label>
                  <Textarea
                    id="platform-description"
                    defaultValue="The Bharat Works connects local service providers with customers looking for home services like confectioners, photographers, bands, AC repair, and more."
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      When enabled, the platform will be inaccessible to users.
                    </p>
                  </div>
                  <Switch id="maintenance-mode" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>Customize the look and feel of your platform</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Primary Color</Label>
                  <div className="flex items-center space-x-2">
                    <Input type="color" defaultValue="#FF9800" className="w-16 h-10" />
                    <Input defaultValue="#FF9800" className="w-32" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Logo</Label>
                  <div className="flex items-center space-x-4">
                    <div className="h-16 w-16 rounded-md border flex items-center justify-center">
                      <span className="text-2xl">🏠</span>
                    </div>
                    <Button variant="outline">Upload New Logo</Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Default Theme</Label>
                  <Select defaultValue="light">
                    <SelectTrigger>
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>Save Appearance</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure system notifications and alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Send email notifications for important system events
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Send SMS alerts for critical updates</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Notification Events</Label>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">New Vendor Registration</p>
                        <p className="text-sm text-muted-foreground">Get notified when a new vendor registers</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">New Job Request</p>
                        <p className="text-sm text-muted-foreground">Get notified when a new job is requested</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Payment Completed</p>
                        <p className="text-sm text-muted-foreground">Get notified when a payment is processed</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Customer Complaints</p>
                        <p className="text-sm text-muted-foreground">Get notified when a customer files a complaint</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>Save Notification Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="sendNotifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Send Notification</CardTitle>
                <CardDescription>Configure system notifications and alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-2">
                  <div className="bg-white p-6 rounded-md">

                    <div className=''>
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm mb-2">Title</label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-secondary"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm  mb-2">Notification Title</label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-secondary"
                          value={notificationTitle}
                          onChange={(e) => setNotificationTitle(e.target.value)}
                        />
                      </div>

                      <div className="mb-6">
                        <label className="block text-gray-700 text-sm  mb-2">Notification Subtitle</label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-secondary"
                          value={notificationSubtitle}
                          onChange={(e) => setNotificationSubtitle(e.target.value)}
                        />
                      </div>
                      <div className="mb-6">
                        <label className="block text-gray-700 text-sm  mb-2">Add Location</label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-secondary"
                        />
                      </div>
                      <div className="mb-6">
                        <label className="block text-gray-700 text-sm  mb-2">Add Category</label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-secondary"
                        />
                      </div>

                    </div>
                  </div>

                  <div className="bg-white p-6">
                    <p className="mb-4 text-gray-700 text-sm font-bold">Available tag</p>
                    <div className="flex flex-wrap gap-2">
                      {availableTags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => handleTagClick(tag)}
                          className="bg-blue-200 text-gray-700 px-5 py-1 rounded-full"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div >
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>Save Notification Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage security and access control settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Require 2FA for all admin accounts</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Password Expiry</Label>
                      <p className="text-sm text-muted-foreground">Force password reset every 90 days</p>
                    </div>
                    <Switch />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Session Timeout (minutes)</Label>
                  <Input type="number" defaultValue="30" />
                  <p className="text-sm text-muted-foreground">
                    Automatically log out inactive users after this period
                  </p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Admin Access Log</Label>
                  <Button variant="outline" className="w-full">
                    View Access Logs
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>Save Security Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Billing Settings</CardTitle>
                <CardDescription>Manage payment gateways and billing configurations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Payment Gateway</Label>
                  <Select defaultValue="razorpay">
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment gateway" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="razorpay">Razorpay</SelectItem>
                      <SelectItem value="paytm">Paytm</SelectItem>
                      <SelectItem value="stripe">Stripe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>API Key</Label>
                  <Input type="password" defaultValue="••••••••••••••••" />
                </div>

                <div className="space-y-2">
                  <Label>Secret Key</Label>
                  <Input type="password" defaultValue="••••••••••••••••" />
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Test Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Process payments in test mode (no real transactions)
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Automatic Payouts</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically transfer vendor payments on job completion
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>Save Billing Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="SuspiciousActivity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Suspicious Activity</CardTitle>
                <CardDescription>Suspicious Activity & Risk Score Repo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Cancellation type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Cancellation type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer">Canceled by customer</SelectItem>
                      <SelectItem value="Vender">Canceled by vender</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>No of Cancel</Label>
                  <Input type="number" />
                </div>

              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>Update</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout >
  )
}

