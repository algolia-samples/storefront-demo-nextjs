import Image from 'next/image';
import { Highlight } from 'react-instantsearch-hooks-web';

import type { Hit } from 'instantsearch.js';

export type HitProps = {
  available_sizes: string[];
  brand: string;
  color: {
    filter_group: string;
    original_name: string;
  };
  name: string;
  description: string;
  image_urls: string[];
  price: {
    currency: string;
    value: number;
  };
  category_page_id: string[];
};

type HitComponentProps = {
  hit: Hit<HitProps>;
};

export function HitComponent({ hit }: HitComponentProps) {
  return (
    <div className="group" key={hit.objectID}>
      <div className="sm:relative aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96">
        <Image
          src={hit.image_urls[0]}
          alt={hit.name}
          className="w-full h-full object-center object-cover sm:w-full sm:h-full"
          layout="fill"
        />
      </div>
      <div className="flex-1 p-4 space-y-2 flex flex-col">
        <h3 className="text-sm font-medium text-gray-900">
          <a href="#">
            <span aria-hidden="true" className="absolute inset-0" />
            <Highlight hit={hit} attribute="name" />
            <p className="text-sm italic text-gray-500">{hit.brand}</p>
          </a>
        </h3>
        <div className="flex-1 flex flex-col justify-end">
          <p className="text-base font-medium text-gray-900">
            {hit.price.currency} {hit.price.value}
          </p>
        </div>
      </div>
    </div>
  );
}
