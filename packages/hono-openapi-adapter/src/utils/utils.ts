export function serializeRoutePath(routePath: string): string {
	// To find all string with pattern {...} to after replace them by *
	const regex = /\{[^}]+\}/g;
	const serializedPath = routePath.replace(regex, '*');

	return serializedPath;
}
