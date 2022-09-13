import type { Hit } from 'instantsearch.js';
import Image from 'next/image';

import type { ProductItem } from '../types';

export type TrendingItemProps = {
  item: Hit<ProductItem>;
};

export function TrendingItem({ item }: TrendingItemProps) {
  return (
    <div className="group relative">
      <div className="flex justify-center">
        <Image
          src={item.image1}
          alt={item.title}
          className="w-full h-full object-center object-cover"
          width={128}
          height={128}
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700 truncate">
        <a href={item.link_grade_v2.href}>
          <span className="absolute inset-0" />
          {item.title}
        </a>
      </h3>
      <p className="mt-1 text-sm text-gray-500">{item.brand_label}</p>
      <p className="mt-1 text-sm font-medium text-gray-900">
        {item.currency} {item.price_new}
      </p>
    </div>
  );
}
