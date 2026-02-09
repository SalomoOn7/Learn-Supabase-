import { IMenu } from "@/types/menu";
import { FormEvent, useEffect, useState } from "react";
import supabase from "@/lib/db";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
const AdminPage = () => {
  const [menus, setMenu] = useState<IMenu[]>([]);
  const [createDialog, setCreateDialog] = useState(false);

  useEffect(() => {
    const fetchMenu = async () => {
      const { data, error } = await supabase.from("menus").select("*");

      if (error) console.log("Error fetching menu", error);
      else setMenu(data);
    };
    fetchMenu();
  }, [supabase]);

  const handleCreateMenu = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    try {
      const { data, error } = await supabase
        .from("menus")
        .insert(Object.fromEntries(formData))
        .select();
      
      if (error) console.log('error:', error);
      else {
        if (data) {
          setMenu((prev) => [ ...prev, ...data]);
        }
        toast("Menu created successfully");
        setCreateDialog(false);
    }
    } catch (error) {
          console.log("error:", error);
     }
  };

  return (
    <div className="container mx-auto py-8 ">
      <div className="flex mb-4 w-full justify-between">
        <div className=" text-3xl font-bold">Menu</div>
        <Dialog open={createDialog} onOpenChange={setCreateDialog}>
          <DialogTrigger asChild>
            <Button className="font-bold cursor-pointer ">Add Menu</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <form onSubmit={handleCreateMenu} className="space-y-4">
              <DialogHeader>
                <DialogTitle>Add Menu</DialogTitle>
                <DialogDescription>
                  Create a new menu data in this form.
                </DialogDescription>
              </DialogHeader>
              <div className=" grid w-full gap-4">
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Insert Name"
                    required
                  />
                </div>

                <div className="grid w-full gap-1.5">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    name="price"
                    placeholder="Insert Price"
                    required
                  />

                  <div className="grid w-full gap-1.5">
                    <Label htmlFor="image">Image</Label>
                    <Input
                      id="image"
                      name="image"
                      placeholder="Insert Image URL"
                      required
                    />
                  </div>

                  <div className="grid w-full gap-1.5">
                    <Label htmlFor="category">Category</Label>
                    <Select name="category" required>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Category</SelectLabel>
                          <SelectItem value="Coffee">Coffee</SelectItem>
                          <SelectItem value="Non Coffee">Non Coffee</SelectItem>
                          <SelectItem value="Pastries">Pastries</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid w-full gap-1.5">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Insert Description"
                      required
                      className="resize-none h-32"
                    />
                  </div>
                </div>
              </div>

              <DialogFooter>
                <DialogClose>
                  <Button variant="destructive" className="cursor-pointer">
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  variant="default"
                  className="cursor-pointer"
                >
                  Create
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-neutral-700 font-bold">
                Product
              </TableHead>
              <TableHead className="text-neutral-700 font-bold">
                Category
              </TableHead>
              <TableHead className="text-neutral-700 font-bold">
                Price
              </TableHead>
              <TableHead className="text-neutral-700 font-bold"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {menus.map((menu: IMenu) => (
              <TableRow key={menu.id}>
                <TableCell className="flex gap-3 items-center w-full">
                  <Image
                    width={50}
                    height={50}
                    src={menu.image}
                    alt={menu.name}
                    className="aspect-square object-cover rounded-lg"
                  />
                  {menu.name}
                </TableCell>
                <TableCell>
                  {menu.description.split(" ").slice(0, 5).join(" ") + "..."}
                </TableCell>
                <TableCell>{menu.category}</TableCell>
                <TableCell>${menu.price}.00</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild className="cursor-pointer">
                      <Ellipsis />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel className="font-bold">
                        Actions
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem>Update</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-400">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
export default AdminPage;
