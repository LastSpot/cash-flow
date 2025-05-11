"use server";

export async function verifyOTP(otp: string) {
  const adminSecret = process.env.ADMIN_SECRET;
  const employeeSecret = process.env.EMPLOYEE_SECRET;

  if (otp === adminSecret) {
    return {
      success: true,
      role: "admin",
    };
  }
  if (otp === employeeSecret) {
    return {
      success: true,
      role: "employee",
    };
  }
  return {
    success: false,
  };
}
