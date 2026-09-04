// Central place deciding where each role lands right after login.
// Keeps this logic out of individual pages so it stays consistent everywhere.
export function getRoleLandingPath(role) {
  switch (role) {
    case 'admin':
    case 'barangay_official':
      return '/staff/dashboard';
    case 'volunteer':
      return '/staff/queue';
    case 'pet_owner':
    case 'resident':
    default:
      return '/pets';
  }
}
