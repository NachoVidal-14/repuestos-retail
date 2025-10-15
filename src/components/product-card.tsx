import Link from "next/link";
import Image from "next/image";
import { clp } from "@/lib/format";

export function ProductCard({p}:{p:{
  slug:string; name:string; price:number; image?:string; brand?:string;
}}) {
  return (
    <Link href={`/product/${p.slug}`} className="group">
      <div className="border rounded-2xl overflow-hidden hover:shadow transition">
        <div className="relative aspect-[4/3] bg-gray-50">
          <Image src={p.image ?? "/placeholder.png"} alt={p.name} fill className="object-contain p-4"/>
        </div>
        <div className="p-4">
          {p.brand && <div className="text-xs text-gray-500">{p.brand}</div>}
          <div className="font-medium line-clamp-2 group-hover:underline">{p.name}</div>
          <div className="font-semibold mt-1">{clp(p.price)}</div>
        </div>
      </div>
    </Link>
  );
}
