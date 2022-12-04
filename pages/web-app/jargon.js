let querystring = require ('query-string')
with (require ('camarche'))
with (require ('.~/interfaces'))


suppose (
( page_sym = sym_ () // login | discover | profile | art filter | art filter list | art filter result

// polygon / flow address

// discover - art filters
	
// profile - name, image, flow address, polygon address, details, owned nfts
	
// art filter - image, like_count, artist details
// art filter list - image, name, date, artist name
// art filter result - content image, style image, artist details, video, image, mintable, mint dialog status, animation status, nft id

, client_id_sym = presumed_sym_ ('9012ba2f-d3b1-43c5-adb9-3eadc1eb8d10')




, artist_image_sym = sym_ ()
, artist_name_sym = sym_ ()
, artist_one_line_description_sym = sym_ ()

, stamp_product_ids = sym_ ()
, stamp_product_images = sym_ ()
, stamp_product_titles = sym_ ()

, product_id_sym = sym_ ()
, product_image_sym = sym_ ()

, ai_art_filter_id_sym = sym_ ()

, like_yes_sym = initial_sym_ (false)
, like_count_sym = sym_ ()


















, nav_art_filter_ = _product_id => {
	var _client_id = depend_ (client_id_sym)

	var [ _product, _like_count, _like_yes ] =
		map_together (act
		) (
		[ _ => get_ ('/product') ({ _id: _product_id, _client: _client_id })
		, _ => get_ ('/product/like-count') ({ _id: _product_id, _client: _client_id })
		, _ => get_ ('/product/liked') ({ _id: _product_id, _client: _client_id }) ] )

	var _artist_id = pin_ ('_:', '_artist_mention', 'link:', '_id') (_product)

	var _artist = get_ ('/user') ({ _id: _artist_id, _client: _client_id })

	var _artist_image = pin_ (L .values, '_profile', L .values, '_image', image_url_) (_artist)
	var _artist_name = pin_ (L .values, '_profile', L .values, '_first_name') (_artist) + ' ' + pin_ (L .values, '_profile', L .values, '_last_name') (_artist)
	var _artist_one_line_description = pin_ (L .values, '_profile', L .values, '_one_line_desc') (_artist)

	var _product_image = pin_ ('_:', '_artwork', '_:', '_image', image_url_) (_product)

	;satisfy_ (page_sym) ('art filter')

	;satisfy_ (artist_image_sym) (_artist_image)
	;satisfy_ (artist_name_sym) (_artist_name)
	;satisfy_ (artist_one_line_description_sym) (_artist_one_line_description)

	;satisfy_ (product_id_sym) (_product_id)
	;satisfy_ (product_image_sym) (_product_image)

	;satisfy_ (like_count_sym) (_like_count)
	;satisfy_ (like_yes_sym) (_like_yes) }

, like_ = _ => {
	var _client_id = depend_ (client_id_sym)
	var _product_id = depend_ (_product_id)

	;post_ ('/product/like') ({ _id: _product_id, _client: _client_id }) }

, unlike_ = _ => {
	var _client_id = depend_ (client_id_sym)
	var _product_id = depend_ (_product_id)

	;post_ ('/product/unlike') ({ _id: _product_id, _client: _client_id }) }


// NOW -- login via metamask
// NOW -- login via flow
// NOW -- load collected stamps
// NOW -- load collected nfts
, login_ = _ => {
	;satisfy_ (page_sym) ('discover')
	}

, load_stamp_products_ = _ => {
	var _client_id = depend_ (client_id_sym)

	// var _product_ids = get_ ('/catalogue') ({ _id: stamp_catalogue_id, _client: _client_id })

	var _product_previews = get_ ('/catalogue/Stamps/detailed') ({ _client: _client_id })

	var _product_ids = pins_ (L .elems, 'detailed_product:', '_id') (_product_previews)
	var _product_images = pins_ (L .elems, 'detailed_product:', '_image', image_url_) (_product_previews)
	var _product_titles = pins_ (L .elems, 'detailed_product:', '_title') (_product_previews)
	
	;satisfy_ (stamp_product_ids) (_product_ids)
	;satisfy_ (stamp_product_images) (_product_images)
	;satisfy_ (stamp_product_titles) (_product_titles) }
, load_collected_stamps_ = _ => {
	}
, load_collected_nfts_ = _ => {
	}


, ai_art_filter_ = _ => {
	}

, load_ai_art_filter_list_ = _ => {
	}
, load_ai_art_filter_ = _ => {
	var _ai_art_filter_id = depend_ (ai_art_filter_id_sym)
	}
, mint_ai_nft_ = _ => {
	var _ai_art_filter_id = depend_ (ai_art_filter_id_sym)
	}
, view_ai_nft_ = _ => {
	var _product_id = depend_ (product_id_sym)
	}








, api_host = 'https://api.pons.ai'
, assets_origin = 'https://assets.pons.ai'

// , stamp_catalogue_id = '37a6f689-ef71-4cc9-8c10-16aa8ff78299'

, image_url_ = _image =>
	consider (_image)
	( match (
	case_ (L .dropPrefix ('http://')) (_image_fragment =>
		'https://' + _image_fragment ),
	case_ (when (L .dropPrefix ('https://'))) (_image =>
		_image ),
	case_ (when (otherwise)) (_image_fragment =>
		assets_origin + _image_fragment ) ) )



, popup_ = _text => {
	;eff($=> window .alert (_text)) }
, timestamp_ = _ => {
	return eff($=> + (new Date) / 1000) }

, consider = _term => _fn => _fn (_term)
, as_removed = ln_ (when (equals (undefined)), _ => true)


, plain_json_stringify_ = _term => JSON .stringify (_term)

, query_string_ = ({ ... _query_parameters }) => '?' + fn_ (querystring .stringify, pinning (L .values) (plain_json_stringify_)) (_query_parameters)


, fetch_ = (_url, _options) =>
	promised_ (resolve_ => reject_ => {
		var _abort_obj = new AbortController
		var _aborted_yes = false
		;fetch (_url, { ... (_options || {}), signal: _abort_obj .signal })
		.then
		( _response => {
			;resolve_ (_response) }
		, _exception => {
			if (! _aborted_yes) {
				;reject_ (_exception) } } )

		return _ => {
			;_aborted_yes = true
			;_abort_obj .abort () } } )
, get_ = _endpoint => _query_parameters => {
	var query_string =
		match (
		case_ (sum (as_is ({}), as_removed)) (_ => ''),
		case_ (when (otherwise)) (query_string_)
		) (_query_parameters )
	var _req =
		fetch_
		( api_host + _endpoint + query_string
		, { method: 'GET' } )
	var _res = eff($=> _req .json () )

	;output_ (_endpoint, _query_parameters, _res)

	if (_res .error) {
		return surprise_ (_res .error) }
	else {
		return _res .response } }
, post_ = _endpoint => _body => {
	var _payload =
		{ method: 'POST'
		, headers:
			{ 'Accept': 'application/json'
			, 'Content-Type': 'application/json' }
		, body: plain_json_stringify_ (_body) }
	var _req =
		fetch_
		( api_host + _endpoint
		, _payload )
	var _res = eff($=> _req .json () )

	;output_ (_endpoint, _body, _res)

	if (_res .error) {
		return surprise_ (_res .error) }
	else {
		return _res .response } }
, upload_ = _endpoint => _blob => {
	var _payload = 
		{ method: 'POST'
		, body: _blob }
	var _req =
		fetch_
		( api_host + _endpoint
		, _payload )
	var _res = eff($=> _req .json () )

	;output_ (_endpoint, _payload, _res)

	if (_res .error) {
		return surprise_ (_res .error) }
	else {
		return _res .response } }
, parametrised_upload_ = _endpoint => _parameters => _blob => {
	var query_string =
		consider (_parameters)
		( match (
		case_ (sum (as_is ({}), as_removed)) (_ => ''),
		case_ (when (otherwise)) (query_string_) ) )
	var _payload = 
		{ method: 'POST'
		, body: _blob }
	var _req =
		fetch_
		( api_host + _endpoint + query_string
		, _payload )
	var _res = eff($=> _req .json () )

	;output_ (_endpoint, _payload, _res)

	if (_res .error) {
		return surprise_ (_res .error) }
	else {
		return _res .response } }
) =>

propose (module) (
{ page_sym

, client_id_sym
, artist_image_sym, artist_name_sym, artist_one_line_description_sym
, stamp_product_ids, stamp_product_images, stamp_product_titles
, product_id_sym, product_image_sym
, ai_art_filter_id_sym
, like_yes_sym, like_count_sym



, nav_art_filter_
, like_, unlike_
, load_stamp_products_

, ai_art_filter_



, api_host
, assets_origin

, image_url_
, popup_
, timestamp_

, consider

, get_, post_
, upload_, parametrised_upload_ } ) )
