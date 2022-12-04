let React = require ('react')
let ReactDOM = require ('react-dom')
with (require ('camarche'))


suppose (
( view_mirror =
	mirror_
		( _ => {
			return surprise_ ('unanticipated') } )
		( App => {
			;complete_continuation_ (continue_ => {
				;completion_consequence_ (_ => {
					;eff($=>
						ReactDOM .render
						( React .createElement (Reactful_ (App), null)
						, document .querySelector ('page-view') ) ) } )
				if
				( document .readyState === 'complete'
				|| document.readyState === 'loaded'
				|| document.readyState === 'interactive'
				) {
					;continue_ () }
				else {
					;document .addEventListener ('DOMContentLoaded', cause (continue_)) } } )

			return App } )
) =>

propose (module) (
{ view_mirror } ) )
