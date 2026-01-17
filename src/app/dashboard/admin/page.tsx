import { CalendarDateRangePicker } from "@/components/ui/personal/elements/admin/DateRangePicker";
import { Overview } from "@/components/ui/personal/elements/admin/Overview";
import { RecentSales } from "@/components/ui/personal/elements/admin/RecentSales";
import { Button } from "@/components/ui/shadcn-ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn-ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/shadcn-ui/tabs";
import { CreditCard, DollarSign, Package, Users } from "lucide-react";
import Link from "next/link";


export default async function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen w-full overflow-hidden gap-4 justify-center items-center pt-24 md:pt-12">
      <div className="w-[90%] flex flex-col gap-4 justify-center items-start">
        <div className="flex items-center space-x-2 w-full">
          <CalendarDateRangePicker />
          <Button>Download</Button>
        </div>
        <div className="flex space-x-2 pb-4 w-full">
          <Link href="/dashboard/admin/products">
            <Button variant="default">Product</Button>
          </Link>
          <Link href="/dashboard/admin/orders">
            <Button variant="default">Order</Button>
          </Link>
          <Link href="/dashboard/admin/vouchers">
            <Button variant="default">Voucher</Button>
          </Link>
          <Link href="/dashboard/admin/events">
            <Button variant="default">Event</Button>
          </Link>
        </div>

        <Tabs defaultValue="overview" className="space-y-4 w-full">
          <TabsList>
            <TabsTrigger value="overview">Ringkasan</TabsTrigger>
            <TabsTrigger value="analytics" disabled>
              Analytics
            </TabsTrigger>
            <TabsTrigger value="reports" disabled>
              Reports
            </TabsTrigger>
            <TabsTrigger value="notifications" disabled>
              Notifications
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Pendapatan
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Rp45,231.89</div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% dari bulan lalu
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Pengunjung Website
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+2350</div>
                  <p className="text-xs text-muted-foreground">
                    +180.1% dari bulan lalu
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Penjualan</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+12,234</div>
                  <p className="text-xs text-muted-foreground">
                    +19% dari bulan lalu
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tingkat Kepuasan Customer</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+23</div>
                  <p className="text-xs text-muted-foreground">
                    +5 dari bulan lalu
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Ringkasan</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Penjualan Terbaru</CardTitle>
                  <CardDescription>
                    Lihat informasi penjualan terbaru Anda.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
