let React = require ('react')
with (require ('camarche'))
with (require ('.~/jargon'))

propose (module) (reactful (_ =>
	suppose (
	( AiArtFilterItemView = reactful (({ children: _ai_art_filter_item }) =>
		suppose (
		( { _artist, _timestamp, _product, _filter_image } = factors_ (_ai_art_filter_item)
		, _image_url = image_url_ (_filter_image)
		, { _profile } = factors_ (_artist)
		, { _first_name, _last_name } = factors_ (_profile)

		, { _artwork } = factors_ (_product)
		, { _title } = factors_ (_artwork)

		, _artist_name = _first_name + ' ' + _last_name 

		, _js_date = new Date (_timestamp * 1000)
		, _date_text = 
			_js_date .getFullYear ()
				+ '-' + ('0' + (_js_date .getMonth () + 1)) .slice (-2)
				+ '-' + ('0' + _js_date .getDate ()) .slice (-2)

		, nav_ = _ => {
			;nav_ai_art_filter_ (_ai_art_filter_item) }
		) =>
		<ai-art-filter-item-view action="press" onClick={cause (nav_)}>
			<_-display _for="image">
				<img src={_image_url + '?size=large_thumbnail'} />
				</_-display>
			<filter-details-view>
				<_-display _for="artist-name">{ _artist_name }</_-display>
				<_-display _for="artwork-name">{ _title }</_-display>
				<_-display _for="date-name">{ _date_text }</_-display>
				</filter-details-view>
			<_-indicator _for="nav" />
			</ai-art-filter-item-view> ) )
	) =>
	<art-filter-list-screen>
		<nav-view>
			<_-action _for="back" onClick={cause (nav_back_)} />
			<_-label>AI ART FILTER</_-label>
			</nav-view>

		<_-layout _for="content">
			<_-layout _for="scroll">
				{ consider (depend_ (ai_art_filter_item_list_sym))
				( pins_
				( L .elems
				, _ai_art_filter_item =>
					<AiArtFilterItemView>{ _ai_art_filter_item }</AiArtFilterItemView> ) ) }
				</_-layout>
			</_-layout>
		</art-filter-list-screen>
	 ) ) )
