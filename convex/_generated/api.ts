/* eslint-disable */
/**
 * Generated `api` object type. You can import this type in your React components
 * with `import type { api } from "@/convex/_generated/api";` and use it for
 * type-safe API calls.
 */

import type { ApiFromModules } from "convex/server"
import type * as bookings from "../bookings.js"
import type * as users from "../users.js"

export type Api = ApiFromModules<{
  bookings: typeof bookings
  users: typeof users
}>

/**
 * A generic action error used by Convex functions whenever an unhandled error is thrown
 * in an action.
 * You can catch one of these errors when it is thrown from `useAction` in a React
 * component.
 */
export class ConvexError<Data = any> extends Error {
  public readonly data: Data

  constructor(message: string, data?: Data) {
    super(message)
    this.data = data ?? null
  }
}

export const api: Api = new Proxy(
  {},
  {
    get: (target: any, prop: string | symbol) => {
      return new Proxy(
        {},
        {
          get: (target: any, subProp: string | symbol) => {
            return new Proxy(() => {}, {
              apply: () => {
                throw new Error(`Cannot call API functions directly. Use "useQuery" or "useMutation" hooks instead.`)
              },
            })
          },
        },
      )
    },
  },
) as Api
