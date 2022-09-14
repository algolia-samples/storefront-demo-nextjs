import React, { Fragment, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Dialog, Popover, Transition } from '@headlessui/react';
import {
  ClockIcon,
  Bars3Icon,
  ShoppingBagIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  ArrowUpLeftIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions';
import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches';

import { searchClient } from '../utils';
import { navigation, footerNavigation, perks } from '../data';
import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteItemAction,
} from '../components';
import { useLazyRef } from '../hooks';
import { PRODUCTS_QUERY_SUGGESTIONS_INDEX } from '../constants';

export function Main({ children }: React.PropsWithChildren) {
  const router = useRouter();
  const breadcrumbs = router.pathname
    .split('/')
    .filter(Boolean)
    .reduce(
      (acc, chunk) =>
        acc.concat({
          label: chunk,
          href: acc
            .map(({ href }) => href)
            .concat(chunk)
            .join('/'),
        }),
      [{ label: 'Home', href: '' }]
    );

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white">
      <Transition.Root show={mobileMenuOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={setMobileMenuOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 flex z-40">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
                <div className="px-4 py-5 flex">
                  <button
                    type="button"
                    className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a
                        href={page.href}
                        className="-m-2 p-2 block font-medium text-gray-900"
                      >
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="sticky top-0 z-10">
        <nav aria-label="Top">
          <div className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="h-16 flex items-center justify-between">
                <div className="hidden h-full lg:flex lg:items-center">
                  <div className="hidden lg:flex-1 lg:flex lg:items-center mr-4">
                    <Link href="/">
                      <a className="flex items-center">
                        <span className="sr-only">Algolia Storefront</span>
                        <Image
                          className="h-8 w-auto"
                          src="/images/algolia-logo.png"
                          alt=""
                          width={30}
                          height={30}
                        />
                      </a>
                    </Link>
                  </div>

                  <div className="hidden h-full lg:flex">
                    <Popover.Group className="px-4 bottom-0 inset-x-0">
                      <div className="h-full flex justify-center space-x-8">
                        {navigation.pages.map((page) => (
                          <a
                            key={page.name}
                            href={page.href}
                            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                          >
                            {page.name}
                          </a>
                        ))}
                      </div>
                    </Popover.Group>
                  </div>
                </div>

                <div className="flex-1 flex items-center lg:hidden">
                  <button
                    type="button"
                    className="-ml-2 bg-white p-2 rounded-md text-gray-400"
                    onClick={() => setMobileMenuOpen(true)}
                  >
                    <span className="sr-only">Open menu</span>
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <Link href="/">
                  <a className="lg:hidden flex items-center">
                    <span className="sr-only">Algolia Storefront</span>
                    <Image
                      className="h-8 w-auto"
                      src="/images/algolia-logo.png"
                      alt=""
                      width={30}
                      height={30}
                    />
                  </a>
                </Link>

                <div className="flex-1 flex items-center justify-end">
                  {/* Autocomplete */}

                  <div className="flex items-center">
                    <div className="ml-4 flow-root lg:ml-8">
                      <a href="#" className="group -m-2 p-2 flex items-center">
                        <ShoppingBagIcon
                          className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                          0
                        </span>
                        <span className="sr-only">items in cart, view bag</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
        {breadcrumbs.length > 1 && (
          <div className="border-y border-gray-200 bg-white">
            <nav
              aria-label="Breadcrumb"
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            >
              <ol role="list" className="flex items-center space-x-4 py-4">
                {breadcrumbs.map(({ label, href }, index) => (
                  <li key={href}>
                    <div className="flex items-center">
                      {index > 0 && (
                        <svg
                          viewBox="0 0 6 20"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          className="mr-4 h-5 w-auto text-gray-300"
                        >
                          <path
                            d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z"
                            fill="currentColor"
                          />
                        </svg>
                      )}
                      <Link href={href || '/'}>
                        <a className="text-sm font-medium text-gray-900 capitalize">
                          {label}
                        </a>
                      </Link>
                    </div>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        )}
      </header>

      <main>{children}</main>

      <section
        aria-labelledby="perks-heading"
        className="bg-gray-50 border-t border-gray-200"
      >
        <h2 id="perks-heading" className="sr-only">
          Our perks
        </h2>

        <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 sm:py-32 lg:px-8">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
            {perks.map((perk) => (
              <div
                key={perk.name}
                className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
              >
                <div className="md:flex-shrink-0">
                  <div className="flow-root">
                    <Image
                      className="-my-1 h-24 w-auto mx-auto"
                      src={perk.imageUrl}
                      alt=""
                      width={112}
                      height={96}
                    />
                  </div>
                </div>
                <div className="mt-6 md:mt-0 md:ml-4 lg:mt-6 lg:ml-0">
                  <h3 className="text-base font-medium text-gray-900">
                    {perk.name}
                  </h3>
                  <p className="mt-3 text-sm text-gray-500">
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer aria-labelledby="footer-heading" className="bg-gray-50">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 py-20">
            <div className="grid grid-cols-1 md:grid-cols-12 md:grid-flow-col md:gap-x-8 md:gap-y-16 md:auto-rows-min">
              <div className="col-span-1 md:col-span-2 lg:row-start-1 lg:col-start-1">
                <Image
                  className="h-8 w-auto"
                  src="/images/algolia-logo.png"
                  alt=""
                  width={25}
                  height={25}
                />
              </div>

              <div className="mt-10 col-span-6 grid grid-cols-2 gap-8 sm:grid-cols-3 md:mt-0 md:row-start-1 md:col-start-3 md:col-span-8 lg:col-start-2 lg:col-span-6">
                <div className="grid grid-cols-1 gap-y-12 sm:col-span-2 sm:grid-cols-2 sm:gap-x-8">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      About us
                    </h3>
                    <ul role="list" className="mt-6 space-y-6">
                      {footerNavigation.about.map((item) => (
                        <li key={item.name} className="text-sm">
                          <a
                            href={item.href}
                            className="text-gray-500 hover:text-gray-600"
                          >
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Help</h3>
                    <ul role="list" className="mt-6 space-y-6">
                      {footerNavigation.help.map((item) => (
                        <li key={item.name} className="text-sm">
                          <a
                            href={item.href}
                            className="text-gray-500 hover:text-gray-600"
                          >
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    Law and order
                  </h3>
                  <ul role="list" className="mt-6 space-y-6">
                    {footerNavigation.legal.map((item) => (
                      <li key={item.name} className="text-sm">
                        <a
                          href={item.href}
                          className="text-gray-500 hover:text-gray-600"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-12 md:mt-0 md:row-start-2 md:col-start-3 md:col-span-8 lg:row-start-1 lg:col-start-9 lg:col-span-4">
                <h3 className="text-sm font-medium text-gray-900">
                  Sign up for our newsletter
                </h3>
                <p className="mt-6 text-sm text-gray-500">
                  The latest deals and savings, sent to your inbox weekly.
                </p>
                <form className="mt-2 flex sm:max-w-md">
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    type="text"
                    autoComplete="email"
                    required
                    className="appearance-none min-w-0 w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                  <div className="ml-4 flex-shrink-0">
                    <button
                      type="submit"
                      className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Sign up
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 py-10 text-center">
            <p className="text-sm text-gray-500">
              &copy; 2022 Algolia Storefront, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
