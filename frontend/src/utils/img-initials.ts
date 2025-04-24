export function getInitials(nameOrEmail: string) {
  if (!nameOrEmail) return "US";
  const parts = nameOrEmail.split(" ");
  if (parts.length === 1) {
    // Use first two letters of email or single name
    return nameOrEmail.slice(0, 2).toUpperCase();
  }
  // Use first letter of first and last name
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
