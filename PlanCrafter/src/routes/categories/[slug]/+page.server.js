export async function load({ params }) {
  return { category: params.slug };
}
