"use client";

import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/shadcn-ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/shadcn-ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/shadcn-ui/sheet"

import { Product } from "@/types/product.md";
import { ProductForm } from "./product-form";

interface ProductActionProps {
  data: Product;
}

export const ProductAction: React.FC<ProductActionProps> = ({ data }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    // toast.success("Product ID copied to the clipboard.");
  };

  const onDelete = (id: string) => {
    console.log("Delete", id);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="mr-2 h-4 w-4" />
            Copy Id
          </DropdownMenuItem>
          <SheetTrigger asChild>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Update
            </DropdownMenuItem>
          </SheetTrigger>
          <DropdownMenuItem onClick={() => onDelete(data.id)}>
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <SheetContent className="overflow-y-auto bg-card">
        <SheetHeader>
          <SheetTitle>Edit Product</SheetTitle>
          <SheetDescription>
            Ganti informasi produk sesuai kebutuhanmu.
          </SheetDescription>
        </SheetHeader>
        <ProductForm
          productId={data.id}
          initialData={{
            id: data.id,
            name: data.name,
            price: data.price,
            stock: data.stock,
            isOnSale: data.isOnSale,
            discountAmount: data.discountAmount,
            description: data.description, // Product type has description? Yes. UpdateProductValidation has optional description? Yes.
            imageSrc: data.thumbnail
          }}
        />
      </SheetContent>
    </Sheet>
  );
};
