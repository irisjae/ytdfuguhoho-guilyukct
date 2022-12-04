let Pages = require ('.~/pages')
with (require ('camarche'))
with (require ('.~/interfaces'))


propose (module) (_ => {

	var view_sym = sym_ ()

	;such
	( act
	, satisfy (mirror_sym_ (view_sym)) (view_mirror)
	) (_ => {
		;reflecting_
			( view_sym )
			( Pages ) } )

	} )
