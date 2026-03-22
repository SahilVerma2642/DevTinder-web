export const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const PASSWORD_RULES = [
    { regex: /.{8,}/, message: 'at least 8 characters' },
    { regex: /[A-Z]/, message: 'one uppercase letter' },
    { regex: /[a-z]/, message: 'one lowercase letter' },
    { regex: /[0-9]/, message: 'one number' },
    { regex: /[^A-Za-z0-9]/, message: 'one special character' },
];

export const isValidPassword = (password: string): { valid: boolean; message: string | null } => {
    const failed = PASSWORD_RULES.find(rule => !rule.regex.test(password));
    return failed
        ? { valid: false, message: `Password must contain ${failed.message}.` }
        : { valid: true, message: null };
};

export const isValidName = (name: string) =>
    /^[A-Za-z]{2,30}$/.test(name.trim());