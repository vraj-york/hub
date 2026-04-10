import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import loginWelcomeMark from '@/assets/images/login-welcome-mark.svg';

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen bg-background">
      <main className="flex flex-1 flex-col items-center justify-center p-6">
        <div className="w-full max-w-[420px]">
          <Card className="gap-6 overflow-hidden shadow-sm">
            <CardHeader className="gap-1 rounded-t-xl px-6 pt-6">
              <img
                src={loginWelcomeMark}
                alt=""
                width={40}
                height={8}
                className="mb-3"
              />
              <CardTitle className="text-[20px] font-semibold text-text-foreground">
                Welcome Test
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
              Enter your email and password to sign in.
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
