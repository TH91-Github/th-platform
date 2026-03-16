
// firebase store dot notation (.) increment 업데이트 관련 
export function unflatten<T extends object>(
  data: Record<string, unknown>,
  prefix: string
): Partial<T> {
  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(data)) {
    if (!key.startsWith(prefix)) continue;
    const path = key.slice(prefix.length).split(".");
    let cur: Record<string, unknown> = result;
    path.forEach((p, i) => {
      if (i === path.length - 1) {
        cur[p] = value;
      } else {
        if (typeof cur[p] !== "object" || cur[p] === null) {
          cur[p] = {};
        }
        cur = cur[p] as Record<string, unknown>;
      }
    });
  }

  return result as Partial<T>;
}