const cookieOptions = {
//   httpOnly: true,
  secure: process.env.NODE_ENV === "production", // Set secure flag in production otherwise it is false for development
  sameSite: "lax" as const, // Use "lax" for better compatibility across browsers , as const type
  maxAge: 2 * 24 * 60 * 60 * 1000 // 2 day
};
export default cookieOptions;
