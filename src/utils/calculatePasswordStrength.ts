export default function calculatePasswordStrength(password: string) {
  const hasUpperCase = (password.match(/[A-Z]/g) || []).length;
  const hasLowerCase = (password.match(/[a-z]/g) || []).length;
  const hasNumbers = (password.match(/\d/g) || []).length;
  const hasSpecialChars = (password.match(/[!@#$%^&*]/g) || []).length;

  if (password.length < 8) {
    return 'Weak';
  }
  if (
    password.length >= 8 &&
    hasUpperCase >= 3 &&
    hasLowerCase >= 3 &&
    hasNumbers >= 3 &&
    hasSpecialChars >= 3
  ) {
    return 'Super Strong';
  }

  if (
    password.length >= 8 &&
    hasUpperCase >= 2 &&
    hasLowerCase >= 2 &&
    hasNumbers >= 2 &&
    hasSpecialChars >= 2
  ) {
    return 'Strong';
  }

  return 'Medium';
}
