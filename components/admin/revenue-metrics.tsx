"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Icons } from "@/components/icons"

interface RevenueMetricsProps {
  totalRevenue: number
  monthlyGrowth: number
  averageBookingValue: number
  pendingPayments: number
}

export function RevenueMetrics({
  totalRevenue,
  monthlyGrowth,
  averageBookingValue,
  pendingPayments,
}: RevenueMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
              <p className="text-3xl font-bold text-foreground flex items-center">
                <Icons.rupee className="w-6 h-6 mr-1" />
                {totalRevenue.toLocaleString()}
              </p>
              <p className="text-xs text-success mt-2 flex items-center">
                <Icons.trending className="w-3 h-3 mr-1" />
                {monthlyGrowth}% growth
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
              <Icons.barChart className="w-6 h-6 text-success" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Avg. Booking Value</p>
              <p className="text-3xl font-bold text-foreground flex items-center">
                <Icons.rupee className="w-6 h-6 mr-1" />
                {averageBookingValue.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground mt-2">Per transaction</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icons.creditCard className="w-6 h-6 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Pending Payments</p>
              <p className="text-3xl font-bold text-foreground">
                <Icons.rupee className="w-6 h-6 inline mr-1" />
                {pendingPayments.toLocaleString()}
              </p>
              <p className="text-xs text-warning mt-2">Need follow-up</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
              <Icons.alertCircle className="w-6 h-6 text-warning" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Conversion Rate</p>
              <p className="text-3xl font-bold text-foreground">82%</p>
              <p className="text-xs text-success mt-2 flex items-center">
                <Icons.arrowRight className="w-3 h-3 mr-1" />
                +5% improvement
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
              <Icons.zap className="w-6 h-6 text-accent" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
