let React = require ('react')
let { useState } = require ('react')
with (require ('camarche'))
with (require ('.~/jargon'))

propose (module) (reactful (_ =>
	suppose (
	( AiNftView = reactful (({ children: _ai_art_filter_item }) =>
		suppose (
		( { _id, _filter_image } = factors_ (_ai_art_filter_item)

		, nav_ = _ => {
			;nav_ai_art_filter_ (_ai_art_filter_item) }
		) =>
		<nft-view action="press" onClick={cause (nav_)}>
			<img src={image_url_ (_filter_image) + '?size=large_thumbnail'} />
			</nft-view> ) )
	, AddressDisplay = ({ children: _address, ... _props }) =>
		suppose (
		( [ _active_props, active_props_ ] = useState ({})
		, copy_ = _ => {
			;(new Promise (resolve_ => {
				if (navigator .clipboard && window .isSecureContext) {
					;navigator .clipboard .writeText (_address)
					;resolve_ () }
				else {
					let text_area_element = document .createElement('textarea');
					;text_area_element .value = _address;
					;text_area_element .style .position = 'fixed'
					;text_area_element .style .left = '-999999px'
					;text_area_element .style .top = '-999999px'
					;document .body .appendChild (text_area_element)
					;text_area_element .focus ()
					;text_area_element .select ()
					;resolve_ ( new Promise ((resolve, reject) => {
						;document .execCommand ('copy') ? resolve () : reject ()
						;text_area_element .remove () } ) ) } } ) )
			.then (_ => {
				;active_props_ ({ active: '' })
				;setTimeout (_ => {
					;active_props_ ({}) }
				, 1000 ) } ) }
		) =>
		<address-display {... _props} {... _active_props} onClick={copy_} action="press" interaction="copy">
			<_-display>{ _address }</_-display>
			<_-indicator _for="copy" />
			</address-display> )
	) =>
	<profile-screen>
		<nav-view>
			<_-label>My Profile</_-label>

			<_-action _for="edit" style={{ display: 'none' }}>
				<icon-display _for="edit" />
				</_-action>
			</nav-view>

		<_-layout _for="content">

			<user-details-view>
				<profile-image-display>
					<img src={depend_ (user_image_sym) + '?size=large_thumbnail'} />
					</profile-image-display>
				<_-layout _for="content">
					<name-display>{ depend_ (user_name_sym) }</name-display>
					<one-line-description-display>
						{ depend_ (user_one_line_description_sym) }
						</one-line-description-display>
					<addresses-view>
						{ consider (fn_ (depend_, candidates_sym_) (user_flow_address_sym))
						( match (
						case_ (as_candidate) (_flow_address =>
							<AddressDisplay _for="flow">{ _flow_address }</AddressDisplay> ) ) ) }
						{ consider (fn_ (depend_, candidates_sym_) (user_polygon_address_sym))
						( match (
						case_ (as_candidate) (_polygon_address =>
							<AddressDisplay _for="polygon">{ _polygon_address }</AddressDisplay> ) ) ) }
						</addresses-view>

					<description-display>
						{ depend_ (user_description_sym) }
						</description-display>
					</_-layout>
				</user-details-view>

			<showcase-view>
				{/*
				<showcase-display>
					// youtube - K98EnE7du5Y
					</showcase-display>

				<tabs-control>
					<_-actinn _for="vr" />
					<_-actinn _for="youtube" />
					</tabs-control>
				*/}
				</showcase-view>

			<nfts-view>
				{ consider (depend_ (ai_nft_art_filter_list_sym))
				( match (
				case_ (as_is ([])) (_ =>
					<_-indicator _for="empty">No AI NFTs yet</_-indicator> ) ) ) }
				{ consider (depend_ (ai_nft_art_filter_list_sym))
				( pins_
				( L .elems
				, _ai_art_filter_item => 
					<AiNftView>{ _ai_art_filter_item }</AiNftView> ) ) }
				</nfts-view>

			</_-layout>

		<TabsView tab="profile" />

		</profile-screen>
	 ) ) )
