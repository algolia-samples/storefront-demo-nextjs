import Image from 'next/image';
import Link from 'next/link';
import { Highlight } from 'react-instantsearch-hooks-web';

import { formatPrice } from '../utils';

import type { Hit } from 'instantsearch.js';
import type { ProductItem } from '../types';

type HitComponentProps = {
  hit: Hit<ProductItem>;
};

export function HitComponent({ hit }: HitComponentProps) {
  return (
    <Link href={hit.link_grade_v2.href}>
      <a className="group" key={hit.objectID}>
        <div className="sm:relative aspect-square bg-white group-hover:opacity-75 sm:aspect-none p-6">
          <Image
            src={hit.image1}
            alt={hit.title}
            className="w-full h-full object-center object-cover sm:w-full sm:h-full"
            width={512}
            height={512}
          />
        </div>
        <div className="flex-1 p-4 space-y-2 flex flex-col">
          <h3 className="mt-4 text-sm text-gray-700 line-clamp-3">
            <Highlight
              hit={hit}
              attribute="title"
              classNames={{
                highlighted:
                  'bg-indigo-50 rounded-sm px-0.5 text-indigo-600 font-semibold',
              }}
            />
          </h3>
          <p className="mt-2 text-sm text-gray-400">{hit.brand_label}</p>
          <p className="mt-2 text-sm font-medium text-gray-900">
            {formatPrice(hit.price_new, hit.currency)}
          </p>
        </div>
      </a>
    </Link>
  );
}
