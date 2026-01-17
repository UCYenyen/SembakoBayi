import { DataTable } from "@/components/ui/personal/elements/products/data-table";
import { columns } from "@/components/ui/personal/elements/products/columns";
import { getAdminProducts } from "@/lib/services/product";
import { Button } from "@/components/ui/shadcn-ui/button";
import { Plus } from "lucide-react";

export default async function ProductsPage() {
  const products = await getAdminProducts();

  return (
    <div className="w-screen outline-hidden flex flex-col justify-center items-start pt-22 md:pt-18 gap-4">
      <div className="w-[90%] mx-auto flex flex-col">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Products</h2>
            <p className="text-muted-foreground">
              Manage your store's products, prices, and inventory.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </div>
        </div>
        <DataTable data={products} columns={columns} />
      </div>
    </div>
  )
}
