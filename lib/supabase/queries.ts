import { createClient } from "./server"

// Get user profile
export async function getUserProfile(userId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

  if (error) {
    console.error("Error fetching profile:", error)
    return null
  }
  return data
}

// Update user profile
export async function updateUserProfile(userId: string, updates: Record<string, any>) {
  const supabase = await createClient()
  const { data, error } = await supabase.from("profiles").update(updates).eq("id", userId).select().single()

  if (error) {
    console.error("Error updating profile:", error)
    return null
  }
  return data
}

// Get all customers (admin only)
export async function getAllCustomers() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("role", "customer")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching customers:", error)
    return []
  }
  return data
}

// Get all staff (admin only)
export async function getAllStaff() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("role", "staff")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching staff:", error)
    return []
  }
  return data
}

// Get user bookings
export async function getUserBookings(userId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("customer_id", userId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching bookings:", error)
    return []
  }
  return data
}

// Get wallet transactions
export async function getWalletTransactions(userId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("wallet_transactions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching transactions:", error)
    return []
  }
  return data
}
