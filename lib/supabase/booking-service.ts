import { createClient as createBrowserClient } from "./client"

// Create a booking
export async function createBooking(bookingData: {
  customer_id: string
  service_id: string
  booking_date: string
  booking_time: string
  address: string
  tank_size?: string
  tank_type?: string
  notes?: string
  amount: number
}) {
  const supabase = createBrowserClient()
  const { data, error } = await supabase.from("bookings").insert([bookingData]).select().single()

  if (error) {
    console.error("Error creating booking:", error)
    return { data: null, error }
  }

  return { data, error: null }
}

// Get booking by ID
export async function getBookingById(bookingId: string) {
  const supabase = createBrowserClient()
  const { data, error } = await supabase.from("bookings").select("*").eq("id", bookingId).single()

  if (error) {
    console.error("Error fetching booking:", error)
    return null
  }

  return data
}

// Update booking status (admin/staff only)
export async function updateBookingStatus(bookingId: string, status: string) {
  const supabase = createBrowserClient()
  const { data, error } = await supabase
    .from("bookings")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", bookingId)
    .select()
    .single()

  if (error) {
    console.error("Error updating booking:", error)
    return null
  }

  return data
}

// Cancel booking
export async function cancelBooking(bookingId: string) {
  return updateBookingStatus(bookingId, "cancelled")
}

// Assign staff to booking (admin only)
export async function assignStaffToBooking(bookingId: string, staffId: string) {
  const supabase = createBrowserClient()
  const { data, error } = await supabase
    .from("bookings")
    .update({ staff_id: staffId })
    .eq("id", bookingId)
    .select()
    .single()

  if (error) {
    console.error("Error assigning staff:", error)
    return null
  }

  return data
}
