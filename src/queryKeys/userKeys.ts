
// 🔹 user
export const userKeys = {
  all: ["user"] as const,
  detail: (uid: string) => ["user", uid] as const,
  stats: (uid: string) => ["user", uid, "stats"] as const,
  rooms: (uid: string) => ["user", uid, "rooms"] as const,
};
