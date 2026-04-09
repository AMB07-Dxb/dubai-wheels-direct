import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, User, Phone, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const countryCodes = [
  { code: "+971", country: "UAE" },
  { code: "+966", country: "KSA" },
  { code: "+968", country: "Oman" },
  { code: "+973", country: "Bahrain" },
  { code: "+974", country: "Qatar" },
  { code: "+965", country: "Kuwait" },
  { code: "+91", country: "India" },
  { code: "+92", country: "Pakistan" },
  { code: "+63", country: "Philippines" },
  { code: "+44", country: "UK" },
  { code: "+1", country: "US" },
];

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [countryCode, setCountryCode] = useState("+971");

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/">
            <img src={logo} alt="Al Emad Rent A Car" className="h-14 mx-auto mb-6" />
          </Link>
          <h1 className="text-2xl font-display font-bold text-foreground">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            {isLogin
              ? "Sign in to manage your bookings and rewards"
              : "Join Al Emad for exclusive deals and easy bookings"}
          </p>
        </div>

        {/* Card */}
        <div className="bg-background rounded-2xl border border-border p-8 shadow-sm">
          {/* Toggle */}
          <div className="flex rounded-xl bg-muted p-1 mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                isLogin ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                !isLogin ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Sign Up
            </button>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            {/* Sign Up Fields */}
            {!isLogin && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-foreground">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input id="name" placeholder="Enter your full name" className="pl-10 h-12 rounded-xl border-border" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-foreground">Phone Number</Label>
                  <div className="flex gap-2">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="h-12 rounded-xl border border-border bg-background px-3 text-sm text-foreground w-28 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      {countryCodes.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.country} {c.code}
                        </option>
                      ))}
                    </select>
                    <div className="relative flex-1">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="phone" placeholder="Phone number" className="pl-10 h-12 rounded-xl border-border" />
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="email" type="email" placeholder="you@example.com" className="pl-10 h-12 rounded-xl border-border" />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium text-foreground">Password</Label>
                {isLogin && (
                  <button type="button" className="text-xs text-primary hover:underline">Forgot password?</button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10 h-12 rounded-xl border-border"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-sm font-medium text-foreground">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="confirm-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 h-12 rounded-xl border-border"
                  />
                </div>
              </div>
            )}

            <Button type="submit" className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl text-sm font-semibold">
              {isLogin ? "Sign In" : "Create Account"}
            </Button>
          </form>

          <p className="text-center text-xs text-muted-foreground mt-6">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => setIsLogin(!isLogin)} className="text-primary font-semibold hover:underline">
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>

        {/* Back to home */}
        <div className="text-center mt-6">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
