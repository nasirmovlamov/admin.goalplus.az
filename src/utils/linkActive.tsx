export function isInPathLinkActive(path: string) {
  const url = window.location.pathname;

  if (url === path) {
    return "text-gray-900";
  } else {
    return "text-gray-500 hover:text-gray-900";
  }
}
