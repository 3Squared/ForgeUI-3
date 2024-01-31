export function pluralise(count: number, text: string) : string {
  return count > 1 ? `${text}s` : text
}