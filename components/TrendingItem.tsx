import type { Hit } from 'instantsearch.js';
import Image from 'next/image';
import Link from 'next/link';

import { formatPrice } from '../utils';

import type { ProductItem } from '../types';

type TrendingItemProps = {
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
      <h3 className="mt-4 text-sm text-gray-700 line-clamp-3">
        <Link href={item.link_grade_v2.href}>
          <a>
            <span className="absolute inset-0" />
            {item.title}
          </a>
        </Link>
      </h3>
      <p className="mt-2 text-sm text-gray-500">{item.brand_label}</p>
      <p className="mt-2 text-sm font-medium text-gray-900">
        {formatPrice(item.price_new, item.currency)}
      </p>
    </div>
  );
}
