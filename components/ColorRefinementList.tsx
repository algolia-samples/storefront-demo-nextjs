import { CheckIcon } from '@heroicons/react/24/outline';
import {
  RefinementListProps,
  useRefinementList,
} from 'react-instantsearch-hooks-web';

import { cx, extractColorFacet } from '../utils';

type ColorRefinementListProps = RefinementListProps & {
  classNames: Pick<RefinementListProps, 'classNames'> &
    Partial<{
      swatch: string;
      swatchIcon: string;
    }>;
};

export function ColorRefinementList({
  searchable,
  searchablePlaceholder,
  attribute,
  operator,
  limit,
  showMore,
  showMoreLimit,
  sortBy,
  escapeFacetValues,
  transformItems,
  classNames = {},
  className,
  ...props
}: ColorRefinementListProps) {
  const { canRefine, items, refine } = useRefinementList({
    attribute,
    operator,
    limit,
    showMore,
    showMoreLimit,
    sortBy,
    escapeFacetValues,
    transformItems,
  });

  return (
    <div
      {...props}
      className={cx(
        'ais-RefinementList',
        classNames.root,
        !canRefine &&
          cx('ais-RefinementList--noRefinement', classNames.noRefinementRoot),
        className
      )}
    >
      <ul className={cx('ais-RefinementList-list', classNames.list)}>
        {items.map((item) => {
          const { label, color } = extractColorFacet(item.label);

          return (
            <li
              key={item.value}
              className={cx(
                'ais-RefinementList-item',
                classNames.item,
                item.isRefined &&
                  cx(
                    'ais-RefinementList-item--selected',
                    classNames.selectedItem
                  )
              )}
            >
              <label
                className={cx('ais-RefinementList-label', classNames.label)}
              >
                <input
                  checked={item.isRefined}
                  className={cx(
                    'ais-RefinementList-checkbox',
                    classNames.checkbox
                  )}
                  type="checkbox"
                  value={item.value}
                  onChange={() => refine(item.value)}
                />
                <div
                  style={{
                    background: color.startsWith('#') ? color : `url(${color})`,
                  }}
                  className={cx('ais-RefinementList-swatch', classNames.swatch)}
                >
                  {item.isRefined && (
                    <CheckIcon
                      className={cx(
                        'ais-RefinementList-swatchIcon',
                        classNames.swatchIcon
                      )}
                    />
                  )}
                </div>
                <span
                  className={cx(
                    'ais-RefinementList-labelText',
                    classNames.labelText
                  )}
                >
                  {label}
                </span>
                <span
                  className={cx('ais-RefinementList-count', classNames.count)}
                >
                  {item.count}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
