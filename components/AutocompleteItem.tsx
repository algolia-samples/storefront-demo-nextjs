import React from 'react';
import { NextRouter } from 'next/router';
import Link from 'next/link';
import { RouterContext } from 'next/dist/shared/lib/router-context';

import { cx } from '../utils';

type IconComponent = (props: React.ComponentProps<'svg'>) => JSX.Element;

export function AutocompleteItem({
  children,
  router,
  icon: Icon,
  actions,
  ...props
}: React.PropsWithChildren<
  React.ComponentProps<'a'> & {
    router: NextRouter;
    icon: IconComponent;
    actions: JSX.Element;
  }
>) {
  return (
    <RouterContext.Provider value={router}>
      <Link href={props.href || '#'}>
        <a
          {...props}
          className={cx(
            'flex items-stretch justify-between hover:bg-gray-100 aria-selected:bg-gray-100 transition-colors',
            props.className
          )}
        >
          <div className="flex items-center">
            <div className="text-gray-400 py-3 lg:py-2.5 pl-5 lg:pl-3 pr-3 lg:pr-2 flex items-center justify-center">
              <Icon className="w-5 h-5 stroke-2" />
            </div>
            <span>{children}</span>
          </div>
          <div className="flex mr-1.5">{actions}</div>
        </a>
      </Link>
    </RouterContext.Provider>
  );
}

type AutocompleteItemActionProps = {
  icon: IconComponent;
} & React.ComponentProps<'button'>;

export function AutocompleteItemAction({
  children,
  icon: Icon,
  ...props
}: AutocompleteItemActionProps) {
  return (
    <button
      className="flex-none text-gray-400/80 transition-colors hover:text-gray-600/80 p-1.5 flex items-center justify-center"
      {...props}
    >
      <Icon className="h-5 w-5 p-px stroke-2" />
    </button>
  );
}
