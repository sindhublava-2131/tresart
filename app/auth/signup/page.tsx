import { AuthForm } from "@/components/auth/AuthForm";
import { AuthLayout } from "@/components/auth/AuthLayout";

export const metadata = {
  title: "Join TresArt | Create Account",
  description: "Start your journey into high-performance digital art with TresArt.",
};

export default function SignupPage() {
  return (
    <AuthLayout>
      <AuthForm mode="signup" />
    </AuthLayout>
  );
}
