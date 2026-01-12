"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import Link from "next/link";

import { loginSchema, type LoginValues } from "@/types/authValidation.md"; 
import { signIn } from "@/lib/action/auth";

import { Button } from "@/components/ui/shadcn-ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn-ui/card";
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/shadcn-ui/field";
import { Input } from "@/components/ui/shadcn-ui/input";
import { InputGroup } from "@/components/ui/shadcn-ui/input-group";

export default function LoginForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: LoginValues) {
    startTransition(async () => {
      try {
        const result = await signIn(data);

        if (result?.error) {
          toast.error("Login Gagal", {
            description: result.error,
          });
          form.setError("root", { message: result.error });
        } else {
          toast.success("Login Berhasil", {
            description: "Mengalihkan ke dashboard...",
          });
        }
      } catch (error) {
        toast.error("Terjadi Kesalahan", {
          description: `Error: ${error}, Silakan coba lagi nanti.`,
        });
      }
    });
  }

  return (
    <Card className="w-full sm:max-w-112.5 shadow-lg"> {/* Lebar fix & shadow */}
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Selamat Datang</CardTitle>
        <CardDescription className="text-center">
          Masuk untuk mengelola pesanan Anda
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="form-login"
          className="grid gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {form.formState.errors.root && (
            <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-2 text-sm text-destructive font-medium border border-destructive/20">
              ⚠️ {form.formState.errors.root.message}
            </div>
          )}

          <Field>
            <FieldLabel>Email</FieldLabel>
            <InputGroup>
              <Input
                placeholder="nama@email.com"
                type="email"
                disabled={isPending}
                {...form.register("email")}
              />
            </InputGroup>
            <FieldError>{form.formState.errors.email?.message}</FieldError>
          </Field>

          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel>Password</FieldLabel>
              <Link 
                href="/forgot-password" 
                className="text-xs text-muted-foreground hover:text-primary underline-offset-4 hover:underline"
              >
                Lupa password?
              </Link>
            </div>
            <InputGroup>
              <Input
                type="password"
                placeholder="••••••••"
                disabled={isPending}
                {...form.register("password")}
              />
            </InputGroup>
            <FieldError>{form.formState.errors.password?.message}</FieldError>
          </Field>

          {/* Tombol Submit Full Width */}
          <Button
            type="submit"
            className="w-full mt-2" 
            disabled={isPending}
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? "Memproses..." : "Masuk"}
          </Button>
        </form>
      </CardContent>
      
      <CardFooter className="flex flex-col space-y-4">
        {/* Divider Optional (Jika nanti mau tambah login Google) */}
        <div className="relative w-full">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              Atau
            </span>
          </div>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          Belum punya akun?{" "}
          <Link href="/register" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80">
            Daftar sekarang
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}