type TrendingItemProps = any;

export function TrendingItem({ item }: TrendingItemProps) {
  return (
    <div className="group relative">
      <div>
        {item.image_urls?.length > 0 && (
          <img
            src={item.image_urls[0]}
            alt={item.name}
            className="w-full h-full object-center object-cover"
          />
        )}
      </div>
      <h3 className="mt-4 text-sm text-gray-700 truncate">
        <a href={item.url}>
          <span className="absolute inset-0" />
          {item.name}
        </a>
      </h3>
      <p className="mt-1 text-sm text-gray-500">{item.brand}</p>
      <p className="mt-1 text-sm font-medium text-gray-900">
        {item.price.currency} {item.price.value}
      </p>
    </div>
  );
}
