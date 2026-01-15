"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react"; // Tambah Icon
import Link from "next/link";

import { registerSchema, type RegisterValues } from "@/validations/authValidation.md";
import { authClient } from "@/lib/utils/auth-client";

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

export function RegisterForm() {
  const [isPending, setIsPending] = useState(false);


  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: RegisterValues) {
    setIsPending(true);
    
    try {
      const {  error } = await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
      });

      if (error) {
        toast.error("Registrasi Gagal", {
          description: error.message || "Gagal membuat akun.",
        });
        form.setError("root", { message: error.message });
      } else {
        toast.success("Link Verifikasi Terkirim", {
          description: "Silakan cek email anda untuk verifikasi.",
        });
      }
    } catch (err) {
      toast.error("Terjadi Kesalahan", {
        description: "Gagal menghubungi server.",
      });
    } finally {
      setIsPending(false);
    }
  }

  return (
    <>
      <Card className="w-full sm:max-w-112.5 shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Buat Akun Baru</CardTitle>
          <CardDescription>
            Lengkapi data diri untuk mulai berbelanja
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="form-register"
            className="grid gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {form.formState.errors.root && (
              <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-2 text-sm text-destructive font-medium border border-destructive/20">
                {form.formState.errors.root.message}
              </div>
            )}

            <Field>
              <FieldLabel>Nama Lengkap</FieldLabel>
              <InputGroup>
                <Input placeholder="Contoh: Budi Santoso" disabled={isPending} {...form.register("name")} />
              </InputGroup>
              <FieldError>{form.formState.errors.name?.message}</FieldError>
            </Field>

            <Field>
              <FieldLabel>Email</FieldLabel>
              <InputGroup>
                <Input placeholder="nama@email.com" type="email" disabled={isPending} {...form.register("email")} />
              </InputGroup>
              <FieldError>{form.formState.errors.email?.message}</FieldError>
            </Field>

            {/* <Field>
              <FieldLabel>Nomor Telepon</FieldLabel>
              <Controller
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <ShadcnPhoneInput
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="812 3456 7890"
                    defaultCountry="ID"
                    disabled={isPending}
                  />
                )}
              />
              <FieldError>{form.formState.errors.phone?.message}</FieldError>
            </Field> */}

            {/* Password Fields */}
            <Field>
              <FieldLabel>Password</FieldLabel>
              <InputGroup>
                <Input type="password" placeholder="Minimal 6 karakter" disabled={isPending} {...form.register("password")} />
              </InputGroup>
              <FieldError>{form.formState.errors.password?.message}</FieldError>
            </Field>

            <Field>
              <FieldLabel>Konfirmasi Password</FieldLabel>
              <InputGroup>
                <Input type="password" placeholder="Ulangi password" disabled={isPending} {...form.register("confirmPassword")} />
              </InputGroup>
              <FieldError>{form.formState.errors.confirmPassword?.message}</FieldError>
            </Field>

            <Button type="submit" className="w-full mt-2" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isPending ? "Memproses..." : "Daftar Sekarang"}
            </Button>
          </form>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-4">
           {/* Footer Link Login (Sama seperti sebelumnya) */}
           <div className="text-center text-sm text-muted-foreground">
            Sudah punya akun?{" "}
            <Link href="/login" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80">
              Masuk disini
            </Link>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}