/**
 * Internal dependencies
 */
import { cssStringToObject } from '../index';

describe( 'cssStringToObject', () => {
	it( 'should return empty object for empty input', () => {
		expect( cssStringToObject( '' ) ).toEqual( {} );
	} );

	it( 'should return empty object for null/undefined input', () => {
		// @ts-expect-error - Testing null input
		expect( cssStringToObject( null ) ).toEqual( {} );
		// @ts-expect-error - Testing undefined input
		expect( cssStringToObject( undefined ) ).toEqual( {} );
	} );

	it( 'should convert single CSS property correctly', () => {
		expect( cssStringToObject( 'color: red' ) ).toEqual( {
			color: 'red',
		} );
	} );

	it( 'should convert multiple CSS properties correctly', () => {
		expect(
			cssStringToObject( 'color: red; background-color: blue' )
		).toEqual( {
			color: 'red',
			backgroundColor: 'blue',
		} );
	} );

	it( 'should handle kebab-case to camelCase conversion', () => {
		expect(
			cssStringToObject(
				'border-radius: 4px; margin-top: 10px; font-family: Arial'
			)
		).toEqual( {
			borderRadius: '4px',
			marginTop: '10px',
			fontFamily: 'Arial',
		} );
	} );

	it( 'should handle whitespace and empty properties', () => {
		expect(
			cssStringToObject( '  color: red  ;   font-size: 16px  ; ; ' )
		).toEqual( {
			color: 'red',
			fontSize: '16px',
		} );
	} );

	it( 'should handle complex CSS values', () => {
		expect(
			cssStringToObject(
				'box-shadow: 0 2px 4px rgba(0,0,0,0.1); background: linear-gradient(to right, #fff, #000)'
			)
		).toEqual( {
			boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
			background: 'linear-gradient(to right, #fff, #000)',
		} );
	} );

	it( 'should handle CSS variables', () => {
		expect(
			cssStringToObject( 'color: var(--primary-color); --my-var: blue' )
		).toEqual( {
			color: 'var(--primary-color)',
			'--my-var': 'blue',
		} );
	} );
} );
