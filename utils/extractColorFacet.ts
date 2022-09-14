export function extractColorFacet(facet: string) {
  const [label, color] = facet.split(';');

  return { label, color };
}
