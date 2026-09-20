import React from "react";
import OTP from "@/components/Otp";
import AuthLayout from "@/components/AuthLayout";

function VerifyAccountPage() {
  return (
    <div className="text-white">
      <AuthLayout
        title="Verify Account"
        subtitle="Verify your account by entering the one-time password sent to you."
      >
        <div className="grid place-items-center">
          <OTP />
        </div>
      </AuthLayout>
    </div>
  );
}

export default VerifyAccountPage;
