/**
 * External dependencies
 */
import { getSetting } from '@woocommerce/settings';
import { sanitize } from 'dompurify';
export function isGutenbergVersionAtLeast( version: number ) {
	const adminSettings: { gutenberg_version?: string } = getSetting( 'admin' );
	if ( adminSettings.gutenberg_version ) {
		return parseFloat( adminSettings?.gutenberg_version ) >= version;
	}
	return false;
}

const ALLOWED_TAGS = [
	'a',
	'b',
	'em',
	'i',
	'strong',
	'p',
	'br',
	'code',
	'mark',
	'sub',
	'sup',
	'pre',
	'span',
	'ul',
	'ol',
	'li',
	'blockquote',
	'hr',
];
const ALLOWED_ATTR = [ 'target', 'href', 'rel', 'name', 'download', 'title' ];

/**
 * Sanitizes HTML content to ensure it only contains allowed tags and attributes.
 *
 * @param html - The HTML content to sanitize.
 * @return Sanitized HTML content.
 */
export function sanitizeHTML( html: string ) {
	return sanitize( html, { ALLOWED_TAGS, ALLOWED_ATTR } );
}

/**
 * Converts a CSS string to a React style object.
 * Handles conversion from kebab-case to camelCase for CSS properties.
 *
 * @param css - CSS string in format "property: value; property2: value2"
 * @return Object with camelCase keys and corresponding values
 */
/**
 * Converts a CSS string to a React style object.
 * Handles conversion from kebab-case to camelCase for CSS properties.
 *
 * @param css - CSS string in format "property: value; property2: value2"
 * @return Object with camelCase keys and corresponding values
 */
export const cssStringToObject = ( css: string ): Record< string, string > => {
	if ( ! css ) {
		return {};
	}

	return Object.fromEntries(
		css
			.split( ';' )
			.filter( ( style ) => style.trim() )
			.map( ( style ) => {
				const [ key, value ] = style
					.split( ':' )
					.map( ( str ) => str.trim() );

				// Handle CSS custom properties (variables)
				if ( key.startsWith( '--' ) ) {
					return [ key, value ];
				}

				// Convert kebab-case to camelCase for regular CSS properties
				const camelKey = key.includes( '-' )
					? key.replace( /-./g, ( x ) => x[ 1 ].toUpperCase() )
					: key;

				return [ camelKey, value ];
			} )
	);
};
