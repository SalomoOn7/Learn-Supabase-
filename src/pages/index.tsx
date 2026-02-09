import { IMenu } from "@/types/menu";
import { useEffect, useState } from "react";
import supabase from "@/lib/db";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
const Home = () => {
  const [menus, setMenu] = useState<IMenu[]>([]);

  useEffect(() => {
    const fetchMenu = async () => {
      const { data, error } = await supabase.from('menus').select('*');

      if (error) console.log('Error fetching menu', error);
      else setMenu(data);
    };
    fetchMenu();
  }, []);
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4 ">Menu List</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {menus.map((menu: IMenu) => (
          <Card key={menu.id}>
            <CardContent>
              <Image
                src={menu.image}
                alt={menu.name}
                width={200}
                height={200}
                className="w-full h-[30vh] object-cover rounded-lg"
              />
              <div className="mt-4 flex justify-between">
                <div>
                  <h4 className="font-semibold text-xl">{menu.name}</h4>
                  <p className="">{menu.category}</p>
                </div>
                <p className="font-semibold text-2xl ">${menu.price}.00</p>
              </div>
            </CardContent>
            <Link href={`/menu/${menu.id}`} className="w-full">
              <Button className="w-full font-bold" size={"lg"}>
                Detail Menu
              </Button>
            </Link> 
            <CardFooter>
              
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default Home;