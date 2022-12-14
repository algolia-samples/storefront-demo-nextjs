import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { PlusIcon } from '@heroicons/react/24/solid';
import {
  Configure,
  CurrentRefinements,
  HierarchicalMenu,
  InfiniteHits,
  InstantSearch,
  RangeInput,
  RefinementList,
  SortBy,
  useCurrentRefinements,
  useSearchBox,
} from 'react-instantsearch-hooks-web';
import { singleIndex } from 'instantsearch.js/es/lib/stateMappings';

import {
  Filter,
  FilterProps,
  HitComponent,
  ColorRefinementList,
} from '../components';
import { extractColorFacet, searchClient } from '../utils';
import {
  PRODUCTS_INDEX,
  PRODUCTS_PRICE_ASC_INDEX,
  PRODUCTS_PRICE_DESC_INDEX,
} from '../constants';

const FILTER_LABEL_MAP: Record<string, string> = {
  available_sizes: 'Size',
  brand_label: 'Brand',
  color_hex: 'Color',
  'categories.lvl0': 'Categories',
  price_new: 'Price',
};

export default function Search() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Algolia Storefront</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <InstantSearch
        searchClient={searchClient}
        indexName={PRODUCTS_INDEX}
        routing={{ stateMapping: singleIndex(PRODUCTS_INDEX) }}
        key={(router.query.query as string) || ''}
      >
        <Configure hitsPerPage={9} />
        <VirtualSearchBox />
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          open={mobileFiltersOpen}
          onClose={setMobileFiltersOpen}
          unmount={false}
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />

          <div className="fixed inset-0 flex z-40">
            <Dialog.Panel className="ml-20 relative w-full h-full bg-white shadow-xl py-4 pb-6 flex flex-col overflow-y-auto">
              <div className="px-4 flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 w-10 h-10 p-2 flex items-center justify-center text-gray-400 hover:text-gray-500"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div className="mt-4">
                <Filters type="disclosure" />
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>

        <div className="bg-gray-100 border-t border-gray-200">
          <div className="sm:flex sm:items-center mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="sm:order-2 p-3 sm:p-0 sm:flex-shrink-0">
              <SortBy
                items={[
                  {
                    label: 'Sort by relevance',
                    value: PRODUCTS_INDEX,
                  },
                  {
                    label: 'Sort by price (low to high)',
                    value: PRODUCTS_PRICE_ASC_INDEX,
                  },
                  {
                    label: 'Sort by price (high to low)',
                    value: PRODUCTS_PRICE_DESC_INDEX,
                  },
                ]}
                classNames={{
                  select:
                    'w-full m-0 pl-4 pr-8 py-2 rounded-md border-0 bg-transparent cursor-pointer text-sm font-medium text-gray-500 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500',
                }}
              />
            </div>
            <div className="border-t border-gray-200 sm:border-0 flex-grow sm:flex sm:items-center">
              <h3 className="text-sm px-7 py-5 sm:p-0 flex-shrink-0 font-medium text-gray-500">
                Active filters
              </h3>
              <div
                aria-hidden="true"
                className="hidden h-5 w-px bg-gray-300 sm:ml-4 sm:block"
              />
              <NoFiltersLabel />
              <CurrentRefinements
                transformItems={(items) =>
                  items.map((item) => {
                    return {
                      ...item,
                      label: FILTER_LABEL_MAP[item.label] || item.label,
                      refinements: item.refinements.map((refinement) => {
                        const { label } = extractColorFacet(refinement.label);

                        return { ...refinement, label };
                      }),
                    };
                  })
                }
                classNames={{
                  root: 'relative before:content-[""] before:absolute before:w-6 before:h-full before:bg-gradient-to-r before:from-gray-100 after:content-[""] after:absolute after:w-6 after:h-full after:top-0 after:right-0 after:bg-gradient-to-l after:from-gray-100',
                  list: 'flex space-x-4 px-6 pb-4 sm:py-4 overflow-auto',
                  noRefinementList: '!p-0 sm:mt-0.5 sm:h-16',
                  item: 'flex flex-shrink-0 rounded-full border border-gray-200 bg-white py-1.5 pl-3 pr-2 text-sm font-medium text-gray-900',
                  categoryLabel: 'ml-2 font-normal text-gray-700',
                  delete:
                    'ml-1 inline-flex items-center w-4 h-4 flex-shrink-0 rounded-full p-1 hover:!bg-gray-200 text-xs text-gray-400 hover:text-gray-500',
                }}
              />
            </div>
          </div>
        </div>

        <div className="mx-w-2xl mx-auto px-4 lg:max-w-7xl lg:px-8">
          <div className="pt-12 pb-24 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
            <aside>
              <h2 className="sr-only">Filters</h2>

              <button
                type="button"
                className="inline-flex items-center lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="text-sm font-medium text-gray-700">
                  Filters
                </span>
                <PlusIcon
                  className="flex-shrink-0 ml-1 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </button>

              <div className="hidden lg:block divide-y divide-gray-200 space-y-10">
                <Filters type="list" />
              </div>
            </aside>

            <section
              aria-labelledby="product-heading"
              className="mt-6 lg:mt-0 lg:col-span-2 xl:col-span-3"
            >
              <h2 id="product-heading" className="sr-only">
                Products
              </h2>

              <InfiniteHits
                hitComponent={HitComponent}
                showPrevious={true}
                classNames={{
                  list: 'grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3',
                  item: 'relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden',
                  loadPrevious:
                    'mb-10 h-10 w-full items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600',
                  disabledLoadPrevious: 'hidden',
                  loadMore:
                    'mt-10 h-10 w-full items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600',
                  disabledLoadMore: 'hidden',
                }}
              />
            </section>
          </div>
        </div>
      </InstantSearch>
    </>
  );
}

function NoFiltersLabel() {
  const { canRefine } = useCurrentRefinements();

  return (
    (!canRefine && (
      <p className="text-sm mx-7 mb-4 sm:mb-0 font-normal text-gray-400">
        No active filters
      </p>
    )) ||
    null
  );
}

function Filters({ type }: Pick<FilterProps, 'type'>) {
  return (
    <>
      <Filter header="Categories" type={type}>
        <HierarchicalMenu
          attributes={['categories.lvl0', 'categories.lvl1']}
          limit={8}
          classNames={{
            root: 'pt-6 -ml-4',
            list: 'ml-4 block space-y-4 lg:space-y-3',
            item: 'space-y-4 lg:space-y-3',
            link: 'block text-sm text-gray-600 cursor-pointer',
            count:
              'ml-1.5 rounded bg-gray-200 py-0.5 px-1.5 text-xs font-semibold tabular-nums text-gray-700',
          }}
        />
      </Filter>
      <Filter header="Brand" type={type} className="pt-10">
        <RefinementList
          attribute="brand_label"
          limit={8}
          classNames={{
            list: 'pt-6 space-y-4 lg:space-y-3',
            item: 'flex items-center',
            label: 'cursor-pointer',
            selectedItem: 'font-semibold',
            checkbox:
              'h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer',
            labelText: 'ml-3 text-sm text-gray-600',
            count:
              'ml-1.5 rounded bg-gray-200 py-0.5 px-1.5 text-xs font-semibold tabular-nums text-gray-700',
          }}
        />
      </Filter>
      <Filter header="Color" type={type} className="pt-10">
        <ColorRefinementList
          attribute="color_hex"
          limit={8}
          classNames={{
            list: 'pt-6 space-y-4 lg:space-y-3',
            item: 'flex items-center',
            selectedItem: 'font-semibold',
            label: 'flex items-center cursor-pointer',
            checkbox: 'hidden',
            swatch:
              'w-8 h-8 flex items-center justify-center rounded-full cursor-pointer checked:bg-gray-300 ring-1 ring-black/10 ring-inset cursor-pointer',
            swatchIcon: 'h-4 w-4 stroke-2 mix-blend-difference text-white',
            labelText: 'ml-3 text-sm text-gray-600',
            count:
              'ml-1.5 rounded bg-gray-200 py-0.5 px-1.5 text-xs font-semibold tabular-nums text-gray-700',
          }}
        />
      </Filter>
      <Filter header="Price range" type={type} className="pt-10">
        <RangeInput
          attribute="price_new"
          classNames={{
            form: 'pt-6 flex space-x-4 justify-between',
            input:
              'block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
            separator: 'self-center text-sm font-medium text-gray-500',
            submit:
              'rounded-md bg-gray-200 px-4 text-sm font-medium text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50',
          }}
        />
      </Filter>
    </>
  );
}

function VirtualSearchBox() {
  useSearchBox();

  return null;
}
