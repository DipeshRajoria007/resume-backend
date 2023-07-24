// generateResetPasswordTemplate

export const generateResetPasswordTemplate = (resetURL) => {
  return `
  <div style="font-family: sans-serif; padding: 1rem; margin: 1rem; border: 1px solid #ccc; border-radius: 5px;">
    <h2 style="font-size: 1.5rem; color: #333;">Forgot your password?</h2>
    <p style="font-size: 1rem; color: #333;">
      Submit a PATCH request with your new password and passwordConfirm to:
      <a href="${resetURL}" style="color: #007bff;">${resetURL}</a>.
    </p>
    <p style="font-size: 1rem; color: #333;">
      If you didn't forget your password, please ignore this email!
    </p>
  </div>
  `;
};
