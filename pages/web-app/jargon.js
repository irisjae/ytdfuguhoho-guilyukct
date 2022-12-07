let React = require ('react')
let { useState, useEffect } = require ('react')
let querystring = require ('query-string')
let uuid_api = require ('uuid')
let fcl_api = require ('@onflow/fcl')
let flow_sdk_api = require ('@onflow/sdk')
let flow_types = require ('@onflow/types')
with (require ('camarche'))
with (require ('.~/interfaces'))


suppose (
( history_sym = initial_sym_ ([])
, page_sym = adjoint_sym_ (L .last) (history_sym) // login | discover | profile | art filter | art filter list | art filter result

, modal_sym = sym_ ()

// polygon / flow address

// discover - art filters
	
// profile - name, image, flow address, polygon address, details, owned nfts
	
// art filter - image, like_count, artist details
// art filter list - image, name, date, artist name
// art filter result - content image, style image, artist details, video, image, mintable, mint dialog status, animation status, nft id

, client_id_sym = sym_ ()
, user_id_sym = sym_ ()



, user_flow_address_sym = sym_ ()
, user_polygon_address_sym = sym_ ()

, user_image_sym = sym_ ()
, user_name_sym = sym_ ()
, user_one_line_description_sym = sym_ ()
, user_description_sym = sym_ ()

, ai_art_filter_item_list_sym = presumed_sym_ ([])
, ai_nft_art_filter_list_sym = presumed_sym_ ([])

, artist_id_sym = sym_ ()
, artist_image_sym = sym_ ()
, artist_name_sym = sym_ ()
, artist_one_line_description_sym = sym_ ()

, collected_stamp_product_images_sym = apparent_sym_ (_ => collected_stamp_images_ (depend_ (stamp_product_images_sym)) (depend_ (ai_nft_art_filter_list_sym)))

, stamp_product_ids_sym = sym_ ()
, stamp_product_images_sym = sym_ ()
, stamp_product_titles_sym = sym_ ()

, product_id_sym = sym_ ()
, product_image_sym = sym_ ()

, like_yes_sym = initial_sym_ (false)
, like_count_sym = sym_ ()

, ai_art_filter_id_sym = sym_ ()
, style_image_sym = sym_ ()
, content_image_sym = sym_ ()
, filter_video_sym = sym_ ()

, nft_blockchain_sym = sym_ ()
, nft_id_sym = sym_ ()
, nft_transaction_id_sym = sym_ ()
, mint_dialog_yes = initial_sym_ (false)

, pending_art_filter_index_sym = sym_ ()















, renav_ = _page_text => {
	;satisfy_ (page_sym) (_page_text) }
, nav_ = _page_text => {
	;satisfy_such_ (history_sym) (_page_texts => [ ... _page_texts, _page_text ]) }
, multi_nav_ = _page_texts => {
	;satisfy_such_ (history_sym) (_hitherto_page_texts => [ ... _hitherto_page_texts, ... _page_texts ]) }
, nav_back_ = _ => {
	;satisfy_such_
		( history_sym )
		(_page_texts =>
			consider (_page_texts .slice (0, -1))
			( match (
			case_ (as_is ([])) (_ => _page_texts),
			case_ (when (otherwise)) (_hence_page_texts => _hence_page_texts) ) ) ) }

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

	;nav_ ('art filter')

	;satisfy_ (artist_id_sym) (_artist_id)
	;satisfy_ (artist_image_sym) (_artist_image)
	;satisfy_ (artist_name_sym) (_artist_name)
	;satisfy_ (artist_one_line_description_sym) (_artist_one_line_description)

	;satisfy_ (product_id_sym) (_product_id)
	;satisfy_ (product_image_sym) (_product_image)

	;satisfy_ (like_count_sym) (_like_count)
	;satisfy_ (like_yes_sym) (_like_yes) }

, like_ = _ => {
	var _client_id = depend_ (client_id_sym)
	var _product_id = depend_ (product_id_sym)
	var _like_yes = depend_ (like_yes_sym)

	;post_ ('/product/like') ({ _id: _product_id, _client: _client_id })
	;satisfy_ (like_yes_sym) (true)

	;consider (_like_yes)
	( for_of (
	case_ (as_is (false)) (_ => {
		;satisfy_such_ (like_count_sym) (n => n + 1) } ) ) ) }

, unlike_ = _ => {
	var _client_id = depend_ (client_id_sym)
	var _product_id = depend_ (product_id_sym)
	var _like_yes = depend_ (like_yes_sym)

	;post_ ('/product/unlike') ({ _id: _product_id, _client: _client_id })
	;satisfy_ (like_yes_sym) (false)
	;consider (_like_yes)
	( for_of (
	case_ (as_is (true)) (_ => {
		;satisfy_such_ (like_count_sym) (n => n - 1) } ) ) ) }


, login_ = _ => {
	;foreach_together (act
	) (
	[ load_stamp_products_
	, load_user_details_ ] )

	;nav_ ('discover') }
, polygon_login_ = _ => {
	;consider (eff($=> window .ethereum))
	( for_of (
	case_ (ln_ ()) (_ => {
		var _chain_id = eff($=> window .ethereum .request ({ method: 'eth_chainId' }) )

		;consider (_chain_id)
		( for_of (
		case_ (as_is ('0x89')) (_ => {
			var _provider = eff($=> new ethers .providers .Web3Provider (window .ethereum, 'any'))
			;eff($=> _provider .send ('eth_requestAccounts', []))
			var _signer = eff($=> _provider .getSigner ())

			var _polygon_address = eff($=> _signer .getAddress ())

			var _polygon_address_signatured = post_ ('/polygon-pre-auth') ({ _polygon_address })
			var _payload = JSON .stringify (_polygon_address_signatured)
			var _signature = eff($=> _signer .signMessage (_payload))

			var _client = post_ ('/polygon-auth') ({ _polygon_address_signatured, _polygon_address_signatured_signature: _signature })

			;satisfy_ (client_id_sym) (_client)

			;login_ () } ),
		case_ (otherwise) (_ => {
			;duration_popup_ (2) ('Please connect Metamask to the Polygon Mainnet') } ) ) ) } ),
	case_ (otherwise) (_ => {
		;duration_popup_ (2) ('Please open this dapp with a Metamask browser')
		// ;eff($=> {;window .location .assign (_url)})
		// TODO -- metamask url
		} ) ) ) }
, flow_login_ = _ => {
	;eff($=> fcl_api .unauthenticate () )
	;eff($=> {;_active_flow_resolver_fn = promisefully (_ => post_ ('/flow-pre-auth') ({}))})

	var _flow_account_proof =
		eff($=>
		consider (eff($=> fcl_api .authenticate ()))
		( pin_
		( 'services', L .elems
		, when ('type', equals ('account-proof'))
		, 'data' ) ) )
	var _flow_address = eff($=> eff($=> eff($=> fcl_api .currentUser ()) .snapshot ()) .addr)

	if (eff($=> (_flow_address === null))) {
		// ;eff($=> window .location .reload ())
		;discontinuation_ () }

	var _1st_client_id = post_ ('/flow-auth') ({ _flow_account_proof })

	if (_1st_client_id) {
		;satisfy_ (client_id_sym) (_1st_client_id)

		 }
	else {
		var _email = uuid_like_ () + '@noprivaterelay.appleid.com'
		var _username = 'user' + uuid_like_ ()

		var _2nd_client_id = post_ ('/flow-auth') ({ _email, _username, _flow_account_proof })

		;satisfy_ (client_id_sym) (_2nd_client_id) }

	;login_ () }

, load_stamp_products_ = _ => {
	var _client_id = depend_ (client_id_sym)

	// var _product_ids = get_ ('/catalogue') ({ _id: stamp_catalogue_id, _client: _client_id })

	var _product_previews = get_ ('/catalogue/Stamps/detailed') ({ _client: _client_id })

	var _product_ids = pins_ (L .elems, 'detailed_product:', '_id') (_product_previews)
	var _product_images = pins_ (L .elems, 'detailed_product:', '_image', image_url_) (_product_previews)
	var _product_titles = pins_ (L .elems, 'detailed_product:', '_title') (_product_previews)
	
	;satisfy_ (stamp_product_ids_sym) (_product_ids)
	;satisfy_ (stamp_product_images_sym) (_product_images)
	;satisfy_ (stamp_product_titles_sym) (_product_titles) }
, load_user_details_ = _ => {
	var _client_id = depend_ (client_id_sym)

	var _user = get_ ('/user/by-client') ({ _client: _client_id })

	var { _id, _profile } = factors_ (_user)
	var { _image, _first_name, _last_name, _one_line_desc, _intro_maybe } = factors_ (_profile)
	var { _just } = factors_ (_intro_maybe)

	;satisfy_ (user_id_sym) (_id)
	;satisfy_ (user_image_sym) (image_url_ (_image))
	;satisfy_ (user_name_sym) (_first_name + ' ' + _last_name)
	;satisfy_ (user_one_line_description_sym) (_one_line_desc)
	;satisfy_ (user_description_sym) (_just || '')

	;foreach_together (act
	) (
	[ _ => {
		var { _just } = factors_ (get_ ('/user/flow-address-maybe') ({ _client: _client_id, _id: _id }))
		;consider (_just)
		( for_of (
		case_ (ln_ ()) (_flow_address => {
			;satisfy_ (user_flow_address_sym) (_flow_address) } ) ) ) }
	, _ => {
		var _polygon_address = get_ ('/user/polygon-address') ({ _id: _id })
		;consider (_polygon_address)
		( for_of (
		case_ (ln_ ()) (_ => {
			;satisfy_ (user_polygon_address_sym) (_polygon_address) } ) ) ) } ] ) }
, login_consequence_ = _ => {
	var _client_id = depend_ (client_id_sym)

	;foreach_together (act
	) (
	[ _ => {
		var _ai_art_filter_items = get_ ('/user/ai-art-filter-items') ({ _client: _client_id })
		;satisfy_ (ai_art_filter_item_list_sym) (_ai_art_filter_items) } 
	, _ => {
		var _ai_art_filter_items = get_ ('/user/ai-nft-items') ({ _client: _client_id })
		;satisfy_ (ai_nft_art_filter_list_sym) (_ai_art_filter_items) } ] ) }


, collected_stamp_images_ = _stamp_product_images => _ai_nft_items => {
	return consider (_stamp_product_images)
		( pins_
		( L .elems
		, when (_stamp_image =>
			_ai_nft_items .some (_ai_nft_item =>
				supppose (
				( { _style_image } = factors_ (_ai_nft_item)
				) =>
				(_style_image === _stamp_image) ) ) ) ) ) }


, nav_ai_art_filter_list_ = _ => {
	;nav_ ('art filter list') }

, ai_art_filter_ = _ => {
	var _client_id = depend_ (client_id_sym)
	var _image = 
		promised_ (resolve_ => reject_ => {
			var _input_element = document .createElement ('input')
			;_input_element .type = 'file'

			;_input_element .onchange = ({ target: { files } }) => {
				;resolve_ (files [0]) }

			;_input_element .click () } )

	var _next_index =
		complete_continuation_ (continue_ => {
			;continue_ (depend_ (ai_art_filter_item_list_sym) .length) } )

	var _artist_link = { '_:': { _id: depend_ (artist_id_sym) }, __type: { __family: 'link', __parameters: [ { __name: 'user' } ] } }
	var _product_link = { '_:': { _id: depend_ (product_id_sym) }, __type: { __family: 'link', __parameters: [ { __name: 'product' } ] } }

	;popup_ ('Uploading your image...')

	;parametrised_upload_
		( '/ai-art-filter' )
		( { _client: _client_id, _artist_link, _product_link, _style_amount: 0.5 } )
		( /*compress_ (*/_image/*)*/ )

	var unpopup_ = repopup_ ('We\'re preparing your AI art filter.\nWe\'ll let you know when it\'s ready.')

	;renav_ ('discover')

	;sleep_ (2)

	;unpopup_ ()

	;satisfy_ (pending_art_filter_index_sym) (_next_index) }

, poll_ai_art_filter_consequence_ = _ => {
	var _pending_art_filter_index = depend_ (pending_art_filter_index_sym)

	var check_ai_nft_ = _ => {
		var _client_id = depend_ (client_id_sym)

		var _ai_art_filter_items = get_ ('/user/ai-art-filter-items') ({ _client: _client_id })

		;consider (_ai_art_filter_items .slice () .reverse ())
		( for_of (
		case_ (_pending_art_filter_index) (_ai_art_filter_item => {
			;satisfy_ (ai_art_filter_item_list_sym) (_ai_art_filter_items)

			;duration_popup_ (1) ('Your AI art filter is ready.')

			;multi_nav_ai_art_filter_ (_ai_art_filter_item)

			;satisfy_ (candidates_sym_ (pending_art_filter_index_sym)) ([]) } ) ) )

		;eff($=> {;_timeout_id = setTimeout (cause (check_ai_nft_), 1500)} ) }

	var _timeout_id =
		eff($=>
			setTimeout (cause (check_ai_nft_), 1500) )
	;completion_consequence_ (_ => {;clearInterval (_timeout_id)}) }

, multi_nav_ai_art_filter_ = _ai_art_filter_item => {
	var { _id, _artist, _style_image, _image, _filter_image, _filter_video } = factors_ (_ai_art_filter_item)
	var { _id: _artist_id, _profile } = factors_ (_artist)
	var { _first_name, _last_name, _image: _artist_image, _one_line_desc } = factors_ (_profile)

	;satisfy_ (ai_art_filter_id_sym) (_id)

	;satisfy_ (artist_id_sym) (_artist_id)
	;satisfy_ (artist_image_sym) (image_url_ (_artist_image))
	;satisfy_ (artist_name_sym) (_first_name + ' ' + _last_name)
	;satisfy_ (artist_one_line_description_sym) (_one_line_desc)

	;satisfy_ (style_image_sym) (image_url_ (_style_image))
	;satisfy_ (content_image_sym) (image_url_ (_image))
	;satisfy_ (filter_video_sym) (image_url_ (_filter_video))

	;satisfy_ (candidates_sym_ (nft_blockchain_sym)) ([])
	;satisfy_ (candidates_sym_ (nft_id_sym)) ([])
	;satisfy_ (candidates_sym_ (nft_transaction_id_sym)) ([])
	;satisfy_ (mint_dialog_yes) (false)

	;multi_nav_ ([ 'art filter list', 'art filter result' ]) }
, nav_ai_art_filter_ = _ai_art_filter_item => {
	var { _id, _artist, _style_image, _image, _filter_image, _filter_video } = factors_ (_ai_art_filter_item)
	var { _id: _artist_id, _profile } = factors_ (_artist)
	var { _first_name, _last_name, _image: _artist_image, _one_line_desc } = factors_ (_profile)

	;satisfy_ (ai_art_filter_id_sym) (_id)

	;satisfy_ (artist_id_sym) (_artist_id)
	;satisfy_ (artist_image_sym) (image_url_ (_artist_image))
	;satisfy_ (artist_name_sym) (_first_name + ' ' + _last_name)
	;satisfy_ (artist_one_line_description_sym) (_one_line_desc)

	;satisfy_ (style_image_sym) (image_url_ (_style_image))
	;satisfy_ (content_image_sym) (image_url_ (_image))
	;satisfy_ (filter_video_sym) (image_url_ (_filter_video))

	;satisfy_ (candidates_sym_ (nft_blockchain_sym)) ([])
	;satisfy_ (candidates_sym_ (nft_id_sym)) ([])
	;satisfy_ (candidates_sym_ (nft_transaction_id_sym)) ([])
	;satisfy_ (mint_dialog_yes) (false)

	;nav_ ('art filter result') }
, art_filter_result_consequence_ = _ => {
	;consider (depend_ (page_sym))
	( for_of (
	case_ (as_is ('art filter result')) (_ => {
		var _art_filter_item_id = depend_ (ai_art_filter_id_sym)
		var [ _blockchain_text, _nft_id, ... _transaction_id_list ] = get_ ('/user/ai-nft-data') ({ _art_filter_item_id })

		;satisfy (nft_blockchain_sym) (_blockchain_text)
		;satisfy (nft_id_sym) (_nft_id)
		;satisfy (candidates_sym_ (nft_transaction_id_sym)) (_transaction_id_list) } ) ) )
	}

, open_mint_dialog_ = _ => {
	;satisfy_ (mint_dialog_yes) (true) }
, close_mint_dialog_ = _ => {
	;satisfy_ (mint_dialog_yes) (false) }
, polygon_mint_ = _ => {
	;close_mint_dialog_ ()

	var _client_id = depend_ (client_id_sym)
	var _ai_art_filter_item_id = depend_ (ai_art_filter_id_sym)
	var _polygon_address = depend_ (user_polygon_address_sym)

	var { _id } = factors_ (_ai_art_filter_item_id)

	;popup_ ('Minting your NFT...')
	;satisfy_ (mint_dialog_yes) (false)

	;post_ ('/mint-polygon-ai-nft') ({ _client: _client_id, _ai_art_filter_item_id, _polygon_address })

	var [ _blockchain_text, _nft_id, ... _transaction_id_list ] = get_ ('/user/ai-nft-data') ({ _art_filter_item_id: _ai_art_filter_item_id })

	;satisfy (nft_blockchain_sym) (_blockchain_text)
	;satisfy (nft_id_sym) (_nft_id)
	;satisfy (candidates_sym_ (nft_transaction_id_sym)) (_transaction_id_list)

	var unpopup_ = repopup_ ('Your NFT has been minted!')

	;sleep_ (2)

	;unpopup_ () }
, flow_mint_ = _ => {
	var _client_id = depend_ (client_id_sym)
	var _ai_art_filter_item_id = depend_ (ai_art_filter_id_sym)

	var _flow_wallet_data = eff($=> eff($=> fcl_api .currentUser ()) .snapshot ())

	var [ addr, keyId ] =
		pin_
		( 'services', L .elems, when ('type', as_is ('authz')), 'identity'
		, ({ addr, address, keyId }) =>
			[ addr || address, keyId ]
		) (
		_flow_wallet_data )
	var _stripped_address = fcl_api .sansPrefix (addr)
	var _key_id = keyId

	var _channel_id = uuid_ ()

	var _channel_props = { _stripped_address, _key_id, _channel_id }

	;popup_ ('Minting your NFT...')
	// ;eff($=> status_ ('incomplete'))

	var _authorizer = fcl_api .currentUser () .authorization 

	var _socket = eff($=>
		new WebSocket (socket_api_host + '/flow-signing' + '?_id=' + fn_ (encodeURIComponent, JSON .stringify) (_channel_id)) )

	;eff($=>
		_socket .onmessage = ({ data }) => {
			var _signing_data = JSON .parse (data)

			;fcl_api .authz ({})
			.then (x => x .resolve ({}))
			.then (_accounts => pin_ (L .elems, when ('addr', as_is (_stripped_address)), when ('keyId', as_is (keyId))) (_accounts))
			.then (_authorizer => _authorizer .signingFunction (_signing_data))
			.then (_signed_data => {
				//;output_ ('_term', _term)
				var _data = JSON .stringify ([ _signing_data, _signed_data ])
				;_socket .send (_data) } ) } )

	var _ai_art_filter_item_link = { '_:': { _id: _ai_art_filter_item_id }, __type: { __family: 'link', __parameters: [ { __name: 'ai_art_filter_item' } ] } }

	;post_ ('/mint-ai-nft.v3') ({ _client: _client_id, _ai_art_filter_item_link, _channel_props })

	;eff($=> _socket .close ())

	var [ _blockchain_text, _nft_id, ... _transaction_id_list ] = get_ ('/user/ai-nft-data') ({ _art_filter_item_id: _ai_art_filter_item_id })

	;satisfy (nft_blockchain_sym) (_blockchain_text)
	;satisfy (nft_id_sym) (_nft_id)
	;satisfy (candidates_sym_ (nft_transaction_id_sym)) (_transaction_id_list)

	var unpopup_ = repopup_ ('Your NFT has been minted!')

	;sleep_ (2)

	;unpopup_ () }
, view_ai_nft_ = _ => {
	var _blockchain_text = depend_ (nft_blockchain_sym)

	var _url =
		consider (_blockchain_text)
		( match (
		case_ (as_is ('flow')) (_ =>
			flowscan_origin + '/transaction/' + depend_ (nft_transaction_id_sym) ),
		case_ (as_is ('polygon')) (_ =>
			'https://polygonscan.com/token/' + polygon_nft_contract_address + '?a=' + depend_ (nft_id_sym) ) ) )
		

	;eff($=> window .location .href = _url) }

, duration_popup_ = _duration => _text => {
	var unpopup_ = popup_ (_text)
	;sleep_ (_duration)
	;unpopup_ () }
, popup_ = _text => {
	var _overlay_sym = initial_sym_ ('')
	var Overlay = reactful (_ =>
		suppose (
		( _props =
			consider (depend_ (_overlay_sym))
			( match (
			case_ (as_is ('')) (_ => ({ _disabled: '' })),
			case_ (as_is ('done')) (_ => ({ _disabled: '' })),
			case_ (otherwise) (_ => ({})) ) )
		) =>
		<>
		<Consequence _fn={_ => {
			;consider (depend_ (_overlay_sym))
			( for_of (
			case_ (as_is ('')) (_ => {
				;sleep_ (0.05)
				;satisfy_ (_overlay_sym) ('ok') } ) ) ) } } />
		<_-layout _for="modal">
			<_-layout _for="overlay" {... _props}>
				{ _text } </_-layout>
			</_-layout>
		</> ) )

	;satisfy_
		( modal_sym )
		( <Overlay /> )

	return _ => {
		;satisfy_
			( _overlay_sym )
			( 'done' )

		;sleep_ (0.5)

		;satisfy_
			( candidates_sym_ (modal_sym) )
			( [] ) } }
, repopup_ = _text => {
	var _overlay_sym = initial_sym_ ('ok')
	var Overlay = reactful (_ =>
		suppose (
		( _props =
			consider (depend_ (_overlay_sym))
			( match (
			case_ (as_is ('')) (_ => ({ _disabled: '' })),
			case_ (as_is ('done')) (_ => ({ _disabled: '' })),
			case_ (otherwise) (_ => ({})) ) )
		) =>
		<_-layout _for="modal">
			<_-layout _for="overlay" {... _props}>
				{ _text } </_-layout>
			</_-layout> ) )

	;satisfy_
		( modal_sym )
		( <Overlay /> )

	return _ => {
		;satisfy_
			( _overlay_sym )
			( 'done' )

		;sleep_ (0.5)

		;satisfy_
			( candidates_sym_ (modal_sym) )
			( [] ) } }








, uuid_ = effectfully (uuid_api .v4)
, uuid_like_ = _ => {
	return uuid_ () .split ('-') .join ('') }





, api_host = 'https://api.pons.ai'
, socket_api_host = 'wss://api.pons.ai'
, assets_origin = 'https://assets.pons.ai'
, flowscan_origin = 'https://flowscan.org'
, flow_access_node = 'https://rest-mainnet.onflow.org'
, flow_blocto_handshake = 'https://flow-wallet.blocto.app/authn'
, polygon_nft_contract_address = '0x88Fb8879e538353cCDc6cF9F58D95583D396174d'
, polygon_metamask_pages_host = 'https://metamask.app.link/dapp/app.pons.ai'

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
, url_blob_ = _url => {
	var _res = eff($=> fetch (_url) )
	return eff($=> _res .blob () ) }
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






, promisefully = _fn =>
	suppose (
	( promise_ = (resolve, reject, ... args) => {
		;lifetime (_ => {
			resolve (_fn (... args)) } ) }
	) =>
	(... args) => new Promise ((resolve, reject) => promise_ (resolve, reject, ... args)) )

, factors_ = _term => Object .values (_term) [0]
, count_succession_ = _initial_count => _final_count => {
	if (_final_count < _initial_count) {
		return [] }
	var _length = _final_count - _initial_count + 1
	var _list = []
	for (var _index = 0; _index < _length; _index ++) {
		;_list .push (_index + _initial_count) }
	return _list }









, TabsView = reactful (({ tab: _tab_text }) =>
	suppose (
	( nav_discover_ = _ => {
		;renav_ ('discover') }
	, nav_profile_ = _ => {
		;renav_ ('profile') }

	, _discover_props = (_tab_text === 'discover') ? { active: '' } : { onClick: cause (nav_discover_) }
	, _profile_props = (_tab_text === 'profile') ? { active: '' } : { onClick: cause (nav_profile_) }
	) =>
	<tabs-view>
		<tab-view action="press" {... _discover_props}>
			<icon-display _for="lightbulb" />
			<_-label>DISCOVER</_-label>
			</tab-view>
		<tab-view action="press" {... _profile_props}>
			<icon-display _for="person" />
			<_-label>PROFILE</_-label>
			</tab-view>
		</tabs-view> ) )



, _active_flow_resolver_fn
, $_initilisation = (_ => {
	;flow_sdk_api .config ()
		.put ('accessNode.api', flow_access_node)
		.put ('challenge.handshake', flow_blocto_handshake)
	;fcl_api .config
		(
		{ 'fcl.accountProof.resolver': _ => _active_flow_resolver_fn ()
		, 'app.detail.title': 'PONS.ai' } )
	} ) ()
) =>

propose (module) (
{ page_sym
, modal_sym

, client_id_sym

, user_flow_address_sym, user_polygon_address_sym
, user_image_sym, user_name_sym, user_one_line_description_sym, user_description_sym
, ai_art_filter_item_list_sym, ai_nft_art_filter_list_sym
, artist_image_sym, artist_name_sym, artist_one_line_description_sym
, collected_stamp_product_images_sym
, stamp_product_ids_sym, stamp_product_images_sym, stamp_product_titles_sym
, product_id_sym, product_image_sym
, like_yes_sym, like_count_sym
, ai_art_filter_id_sym, style_image_sym, content_image_sym, filter_video_sym
, nft_blockchain_sym, nft_id_sym, nft_transaction_id_sym, mint_dialog_yes



, nav_back_

, nav_art_filter_
, like_, unlike_
, polygon_login_, flow_login_
, load_stamp_products_
, login_consequence_

, nav_ai_art_filter_list_
, ai_art_filter_
, poll_ai_art_filter_consequence_
, nav_ai_art_filter_,  art_filter_result_consequence_
, open_mint_dialog_, close_mint_dialog_
, polygon_mint_, flow_mint_
, view_ai_nft_



, api_host
, assets_origin

, image_url_
, popup_
, repopup_
, timestamp_

, consider

, get_, post_
, upload_, parametrised_upload_



, factors_, count_succession_


, TabsView } ) )
