import React from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {NavLink,useNavigate} from 'react-router-dom'
import api from '../api/axios'
import toast from "react-hot-toast";

export default function Signin() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
  });

  const navigate=useNavigate();
  const onSubmit = async (data) => {
    api.post('/api/user/signin',data)
    .then((res)=>{
      if(res.data.error){
        toast.error(res.data.error);
      }
      else if(res.data.success){
        toast.success(res.data.success);
        navigate('/');
      }
    })
    .catch((e)=>{
      console.log(e);
    })
  };

  const password = watch("password");

  return (
    // Override design tokens locally to keep semantic classes
    <div
      style={{
        "--background": "#0a0a0a",
        "--foreground": "#ffffff",
        "--primary": "#ea580c",
        "--primary-foreground": "#ffffff",
        "--accent": "#ea580c",
        "--accent-foreground": "#ffffff",
        "--card": "#0e0e0e",
        "--card-foreground": "#ffffff",
        "--border": "oklch(0.269 0 0)",
        "--muted-foreground": "oklch(0.708 0 0)",
      }}
      className="bg-background text-foreground"
    >
      <section className="flex min-h-dvh items-center justify-center p-6 md:p-10">

         <NavLink
                      to='/'
                      className='absolute top-3 right-3 py-2 px-4 rounded-2xl text-orange-600 border-2 border-orange-500 hover:border-orange-600 duration-200'>
                          Back to Home
                      </NavLink>

        <div className="w-full max-w-6xl rounded-xl border border-border bg-card shadow-xl mt-12">
          <div className="flex flex-col md:flex-row">
            {/* Left: Image */}
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="md:w-1/2"
              >
                <div className="h-56 w-full overflow-hidden rounded-t-xl md:h-full md:rounded-l-xl md:rounded-tr-none">
                  <img
                    src="/foodimg2.jpg"
                    alt="Assorted gourmet dishes on a dark tabletop"
                    className="h-full w-full object-cover"
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Right: Form */}
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                className="md:w-1/2"
              >
                <div className="flex h-full flex-col justify-center gap-6 p-6 sm:p-8">
                  <header className="space-y-2">
                    <h1 className="text-balance text-2xl font-semibold sm:text-3xl">
                      Login to Account
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      Don't have an account?{" "}
                      <NavLink
                        to="/signup"
                        className="font-medium text-primary underline-offset-4 hover:underline"
                        aria-label="Log in to your account"
                      >
                        Signup
                      </NavLink>
                    </p>
                  </header>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>

                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-foreground placeholder:text-muted-foreground transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/60"
                        placeholder="you@example.com"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Enter a valid email",
                          },
                        })}
                        aria-invalid={!!errors.email || undefined}
                        aria-describedby={errors.email ? "email-error" : undefined}
                      />
                      {errors.email && (
                        <p id="email-error" className="text-sm text-destructive">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                      <label htmlFor="password" className="text-sm font-medium">
                        Password
                      </label>
                      <input
                        id="password"
                        type="password"
                        autoComplete="new-password"
                        className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-foreground placeholder:text-muted-foreground transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/60"
                        placeholder="Password"
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 8,
                            message: "Must be at least 8 characters",
                          },
                        })}
                        aria-invalid={!!errors.password || undefined}
                        aria-describedby={errors.password ? "password-error" : undefined}
                      />
                      {errors.password && (
                        <p id="password-error" className="text-sm text-destructive">
                          {errors.password.message}
                        </p>
                      )}
                    </div>

                    {/* Terms */}
                    <div className="flex items-start gap-3">
                      <input
                        id="terms"
                        type="checkbox"
                        className="mt-1 h-4 w-4 rounded border-input bg-transparent text-primary focus:ring-2 focus:ring-primary/60"
                        {...register("terms", { required: "You must accept the terms" })}
                        aria-invalid={!!errors.terms || undefined}
                        aria-describedby={errors.terms ? "terms-error" : undefined}
                      />
                      <label htmlFor="terms" className="text-sm text-pretty">
                        I agree to the{" "}
                        <a href="#" className="text-primary underline-offset-4 hover:underline">
                          Terms &amp; Conditions
                        </a>
                        .
                      </label>
                    </div>
                    {errors.terms && (
                      <p id="terms-error" className="text-sm text-destructive">
                        {errors.terms.message}
                      </p>
                    )}

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isSubmitting}
                      className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2.5 font-semibold text-primary-foreground shadow transition-colors hover:brightness-95 disabled:opacity-60"
                    >
                      {isSubmitting ? "Logging in..." : "Login"}
                    </motion.button>

                    {/* Separator */}
                    <div className="flex items-center gap-3 py-2">
                      <div className="h-px flex-1 bg-border" />
                      <span className="text-xs text-muted-foreground">or continue with</span>
                      <div className="h-px flex-1 bg-border" />
                    </div>

                    {/* Social buttons */}
                    <div className="flex items-center justify-center">
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-input bg-transparent px-4 py-2 text-sm transition hover:bg-secondary/20"
                        aria-label="Continue with Google"
                      >
                        <span className="font-medium">Google</span>
                      </motion.button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
