// Simple admin authentication system
export const ADMIN_PASSWORD = 'admin123'; // Change this to a secure password

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('admin-authenticated') === 'true';
}

export function authenticate(password: string): boolean {
  if (password === ADMIN_PASSWORD) {
    localStorage.setItem('admin-authenticated', 'true');
    return true;
  }
  return false;
}

export function logout(): void {
  localStorage.removeItem('admin-authenticated');
}
