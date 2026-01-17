"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTransition } from "react"
import { toast } from "sonner"
import * as z from "zod"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/shadcn-ui/form"
import { Input } from "@/components/ui/shadcn-ui/input"
import { Button } from "@/components/ui/shadcn-ui/button"
import { Checkbox } from "@/components/ui/shadcn-ui/checkbox"
import { updateProductAction } from "@/lib/actions/product"
import { UpdateProductValidation } from "@/validations/productValidation.md"

interface ProductFormProps {
    initialData: UpdateProductValidation
    productId: string
}

export function ProductForm({ initialData, productId }: ProductFormProps) {
    const [isPending, startTransition] = useTransition()

    const form = useForm<UpdateProductValidation>({
        resolver: zodResolver(UpdateProductValidation),
        defaultValues: {
            ...initialData,
            id: productId,
        },
    })

    function onSubmit(data: UpdateProductValidation) {
        startTransition(async () => {
            try {
                const result = await updateProductAction(data);
                if (result.success) {
                    toast.success(result.message);
                } else {
                    toast.error(result.message);
                    console.error(result.errors);
                }
            } catch (error) {
                toast.error("Something went wrong");
            }
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input disabled={isPending} placeholder="Product name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isPending}
                                        type="number"
                                        placeholder="Price"
                                        {...field}
                                        onChange={e => field.onChange(parseFloat(e.target.value))}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="stock"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Stock</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isPending}
                                        type="number"
                                        placeholder="Stock"
                                        {...field}
                                        onChange={e => field.onChange(parseInt(e.target.value))}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="isOnSale"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <FormLabel className="text-base">
                                        On Sale
                                    </FormLabel>
                                    <FormDescription>
                                        Put this product on sale.
                                    </FormDescription>
                                </div>
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        disabled={isPending}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="discountAmount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Discount Amount (Promo Price)</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isPending}
                                        type="number"
                                        placeholder="Discount Amount"
                                        {...field}
                                        onChange={e => field.onChange(parseFloat(e.target.value))}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button disabled={isPending} type="submit" className="w-full">
                    Simpan Perubahan
                </Button>
            </form>
        </Form>
    )
}
