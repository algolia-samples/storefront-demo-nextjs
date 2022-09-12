import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

import { cx } from '../utils';

export type FilterProps = React.ComponentProps<'div'> & {
  type: 'list' | 'disclosure';
  header: string;
};

type WrapperProps = Omit<FilterProps, 'type'>;

function ListWrapper({ header, children, ...divProps }: WrapperProps) {
  return (
    <div {...divProps}>
      <fieldset>
        <legend className="block text-sm font-medium text-gray-900">
          {header}
        </legend>
        {children}
      </fieldset>
    </div>
  );
}

function DisclosureWrapper({ header, children }: WrapperProps) {
  return (
    <Disclosure
      as="div"
      key="brand"
      className="border-t border-gray-200 pt-4 pb-4"
    >
      {({ open }) => (
        <fieldset>
          <legend className="w-full px-2">
            <Disclosure.Button className="w-full p-2 flex items-center justify-between text-gray-400 hover:text-gray-500">
              <span className="text-sm font-medium text-gray-900">
                {header}
              </span>
              <span className="ml-6 h-7 flex items-center">
                <ChevronDownIcon
                  className={cx(
                    open ? '-rotate-180' : 'rotate-0',
                    'h-5 w-5 transform'
                  )}
                  aria-hidden="true"
                />
              </span>
            </Disclosure.Button>
          </legend>
          <Disclosure.Panel unmount={false} className="pt-4 pb-2 px-4">
            {children}
          </Disclosure.Panel>
        </fieldset>
      )}
    </Disclosure>
  );
}

export function Filter({ type, header, children, ...divProps }: FilterProps) {
  const Wrapper = type === 'list' ? ListWrapper : DisclosureWrapper;
  return (
    <Wrapper header={header} {...divProps}>
      {children}
    </Wrapper>
  );
}
