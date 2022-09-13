import { TrendingItems } from '@algolia/recommend-react';
import { HorizontalSlider } from '@algolia/ui-components-horizontal-slider-react';
import Head from 'next/head';
import Image from 'next/image';

import { TrendingItem } from '../components';
import { categories } from '../mock';
import { cx, recommendClient } from '../utils';

import heroImage from '../public/images/mark-chan-489jbTi51sg-unsplash-optimized.jpg';

import '@algolia/ui-components-horizontal-slider-theme';

export default function Home() {
  return (
    <>
      <Head>
        <title>Algolia Storefront</title>
        <meta name="description" content="Generated by Algolia Storefront" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero section */}
      <div className="relative">
        {/* Background image and overlap */}
        <div
          aria-hidden="true"
          className="hidden absolute inset-0 sm:flex sm:flex-col"
        >
          <div className="flex-1 relative w-full bg-black">
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={heroImage}
                alt=""
                className="w-full h-full object-center object-cover"
                layout="fill"
              />
            </div>
            <div className="absolute inset-0 bg-gray-900 opacity-50" />
          </div>
          <div className="w-full bg-white h-32 md:h-40 lg:h-48" />
        </div>

        <div className="relative max-w-3xl mx-auto pb-96 px-4 text-center sm:pb-0 sm:px-6 lg:px-8">
          {/* Background image and overlap */}
          <div
            aria-hidden="true"
            className="absolute inset-0 flex flex-col sm:hidden"
          >
            <div className="flex-1 relative w-full bg-black">
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={heroImage}
                  alt=""
                  className="w-full h-full object-center object-cover"
                  layout="fill"
                />
              </div>
              <div className="absolute inset-0 bg-gray-900 opacity-50" />
            </div>
            <div className="w-full bg-white h-48" />
          </div>
          <div className="relative py-32">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:tracking-tight sm:text-5xl md:tracking-tight md:text-6xl">
              Back-to-School Sale
            </h1>
            <div className="mt-4 sm:mt-6">
              <a
                href="#"
                className="inline-block bg-white border border-transparent rounded-md py-3 px-8 font-medium text-black"
              >
                Browse now
              </a>
            </div>
          </div>
        </div>

        <section
          aria-labelledby="collection-heading"
          className="-mt-96 relative sm:mt-0"
        >
          <h2 id="collection-heading" className="sr-only">
            Categories
          </h2>
          <div className="max-w-md mx-auto grid grid-cols-1 gap-y-6 px-4 sm:max-w-7xl sm:px-6 sm:grid-cols-3 sm:gap-y-0 sm:gap-x-6 lg:px-8 lg:gap-x-8">
            {categories.map((collection) => (
              <div
                key={collection.name}
                className="group relative h-32 bg-white rounded-lg shadow-xl sm:h-auto aspect-w-16 aspect-h-9"
              >
                <div>
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 rounded-lg overflow-hidden"
                  >
                    <div className="absolute inset-0 overflow-hidden group-hover:opacity-75">
                      <Image
                        src={collection.imageSrc}
                        alt=""
                        className={cx(
                          'w-auto h-full object-center object-fit group-hover:scale-110 transition-transform',
                          collection.className
                        )}
                        width={500}
                        height={500}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50" />
                  </div>
                  <div className="absolute inset-0 rounded-lg p-6 flex items-end">
                    <div>
                      <p aria-hidden="true" className="text-sm text-white">
                        Discover
                      </p>
                      <h3 className="mt-1 font-semibold text-white">
                        <a href={collection.href}>
                          <span className="absolute inset-0" />
                          {collection.name}
                        </a>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section aria-labelledby="trending-heading">
        <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 sm:py-32 lg:pt-32 lg:px-8">
          <TrendingItems
            recommendClient={recommendClient}
            indexName="test_FLAGSHIP_ECOM_recommend"
            maxRecommendations={10}
            itemComponent={TrendingItem}
            view={HorizontalSlider}
            headerComponent={() => (
              <div className="flex items-center justify-between mb-4">
                <h2
                  id="trending-heading"
                  className="text-2xl font-bold tracking-tight text-gray-900"
                >
                  Trending Products
                </h2>
                <a
                  href="/search"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500 block"
                >
                  Browse now<span aria-hidden="true"> &rarr;</span>
                </a>
              </div>
            )}
          />
        </div>
      </section>
    </>
  );
}
