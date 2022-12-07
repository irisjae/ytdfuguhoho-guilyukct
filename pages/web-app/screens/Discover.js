let React = require ('react')
with (require ('camarche'))
with (require ('.~/jargon'))

propose (module) (reactful (_ =>
	suppose (
	( ArtFilterView = reactful (({ _index }) =>
		suppose (
		( _id = depend_ (stamp_product_ids_sym) [_index]
		, _image = depend_ (stamp_product_images_sym) [_index]
		, _title = depend_ (stamp_product_titles_sym) [_index]
		) =>
		<art-filter-view onClick={cause (_ => {;nav_art_filter_ (_id)})} action="press">
			<_-label>{ _title }</_-label>
			<img src={image_url_ (_image) + '?size=large_thumbnail'} />
			</art-filter-view> ) )
	) =>
	<discover-screen>
		<nav-view>
			<_-spacing style={{ flex: 1 }} />

			<_-action _for="ai-art-filter" onClick={cause (nav_ai_art_filter_list_)}>
				<icon-display _for="ai-art-filter" />
				<_-label>AI FILTERS</_-label>
				</_-action>
			</nav-view>
		<_-layout _for="content">
			<banner-view>Collect branded NFTs and earn rewards!</banner-view>
			
			<loyalty-card-view>
				<_-label>Asian Financial Forum 2023</_-label>

				<_-display>Collect 8 NFT stamps via different tracks to win an exclusive in-person Q&A with Binance’s CZ!</_-display>

				<card-control>
					{ suppose (
					( _stamp_images = depend_ (collected_stamp_product_images_sym)
					, _first_row_images = _stamp_images .slice (0, 4)
					, _second_row_images = _stamp_images .slice (4, 8)
					) =>
					<>
					<stamp-view _for="brand" />
					{ consider (_first_row_images)
					( pins_
					( L .elems
					, _image =>
						<stamp-view>
							<img src={image_url_ (_image) + '?size=small_thumbnail'} />
							</stamp-view> ) ) }
					{ consider (count_succession_ (_first_row_images .length + 1) (4))
					( pins_
					( L .elems
					, _ => <stamp-view /> ) ) }

					<hr />

					{ consider (_second_row_images)
					( pins_
					( L .elems
					, _image =>
						<stamp-view>
							<img src={image_url_ (_image) + '?size=small_thumbnail'} />
							</stamp-view> ) ) }
					{ consider (count_succession_ (_second_row_images .length + 1) (4))
					( pins_
					( L .elems
					, _ => <stamp-view /> ) ) }
					<stamp-view _for="complete" />
					</> ) }
					</card-control>

				</loyalty-card-view>

			<art-filters-view>
				{ consider (count_succession_ (0) (depend_ (stamp_product_ids_sym) .length - 1))
				( pins_
				( L .elems
				, _index =>
					<ArtFilterView _index={_index} /> ) ) }
				</art-filters-view>

			</_-layout>
		<TabsView tab="discover" />
		</discover-screen>
	 ) ) )
