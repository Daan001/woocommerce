/**
 * External dependencies
 */
import { createElement, useMemo } from '@wordpress/element';
import clsx from 'clsx';

/**
 * Internal dependencies
 */
import { sanitizeHTML, cssStringToObject } from '../../utils';

type InfoViewProps = {
	text: string;
	className?: string;
	css?: string;
};

export const InfoView = ( { text, className, css = '' }: InfoViewProps ) => {
	const styleObject = useMemo( () => cssStringToObject( css ), [ css ] );

	return (
		<div
			className={ clsx( 'woocommerce-settings-info-view', className ) }
			style={ styleObject }
			dangerouslySetInnerHTML={ {
				__html: sanitizeHTML( text ?? '' ),
			} }
		/>
	);
};
