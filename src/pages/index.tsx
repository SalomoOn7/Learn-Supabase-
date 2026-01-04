import { IMenu } from "@/types/menu";
import { useEffect, useState } from "react";
import supabase from "@/lib/db";
const Home = () => {
  const [menus, setMenu] = useState<IMenu[]>([]);

  useEffect(() => {
    const fetchMenu = async () => {
      const { data, error } = await supabase.from('menus').select('*');

      if (error) console.log('Error fetching menu', error);
      else setMenu(data);
    };
    fetchMenu();
  }, [supabase]);
  console.log(menus);
  return (
    <div>
      <div>
        Home
      </div>
    </div>
  );
};
export default Home;