import { ads } from "@/lib/ads";
import Image from "next/image";

export default function AdPanel() {
  return (
    <div className="space-y-4">
      {ads.map((ad) => (
        <article
          key={ad.id}
          className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm"
        >
          <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
            <Image
              src={ad.image}
              alt={ad.imageAlt}
              fill
              className="w-full h-full object-cover"
            />
          </div>
          <div className="px-2 pb-2 pt-4">
            <h3 className="font-semibold text-gray-800 mb-2">{ad.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{ad.description}</p>
            <button
              type="button"
              className="w-full border border-primary text-primary hover:bg-primary-hover hover:text-white px-6 py-2.5 rounded-md font-medium transition-colors"
            >
              {ad.buttonText}
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
