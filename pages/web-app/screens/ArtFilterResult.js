let React = require ('react')
let { useState, useRef } = require ('react')
with (require ('camarche'))
with (require ('.~/jargon'))

propose (module) (reactful (_ =>
	suppose (
	( [ _animation_percentage, animation_percentage_ ] = useState (0)
	, _video_element_ref = useRef ()
	) =>
	<>
	<Consequence _fn={_ => {
		var _interval_id = 
			eff($=>
				setInterval (_ => {
					if (_video_element_ref .current) {
						var _percentage = Math .round (100 * (Math .max (0, Math .min (1, (_video_element_ref .current .currentTime - (500 / 1000)) / 2))))
						;animation_percentage_ (_percentage) } }
				, 10 ) )
		;completion_consequence_ (_ => eff($=> clearInterval (_interval_id))) } } />
	<art-filter-result-screen>
		<nav-view>
			<_-action _for="back" onClick={cause (nav_back_)} />
			<artist-display _for="ai-art-filter">
				<profile-image-display>
					<img src={depend_ (artist_image_sym) + '?size=large_thumbnail'} />
					</profile-image-display>
				<details-display>
					<_-hint>AI in the style of</_-hint>
					<name-display>{ depend_ (artist_name_sym) }</name-display>

					<_-spacing style={{ flex: 1 }} />

					<_-hint>AI filter images in the style of artists</_-hint>
					</details-display>
				</artist-display>
			</nav-view>
		<_-layout _for="content">
			<_-indicator _for="filter-details">
				<_-display _for="style">
					<img src={depend_ (style_image_sym) + '?size=small_display'} />
					</_-display>
				<_-display _for="content">
					<img src={depend_ (content_image_sym) + '?size=small_display'} />
					</_-display>
				</_-indicator>
			<filter-display>
				<video poster={depend_ (content_image_sym) + '?size=small_display'} src={depend_ (filter_video_sym)} autoPlay muted ref={_video_element_ref} />
				</filter-display>

			</_-layout>
		<actions-view>
			{ consider (depend_ (candidates_sym_ (nft_blockchain_sym)))
			( match (
			case_ (L .elems) (_ =>
				<_-action _for="view" onClick={cause (view_ai_nft_)}>NFT INFO</_-action> ),
			case_ (otherwise) (_ =>
				<_-action _for="mint" onClick={cause (open_mint_dialog_)}>MINT NFT</_-action> ) ) ) }

			<_-indicator _for="animation">{ _animation_percentage + '%' }</_-indicator>
			
			<_-action _for="download" />
			</actions-view>
		</art-filter-result-screen>
	{ consider (depend_ (mint_dialog_yes))
	( match (
	case_ (as_is (true)) (_ =>
		<_-layout _for="modal">
			<popup-view>
				<_-action _for="close" onClick={cause (close_mint_dialog_)} />
				<_-label>CHOOSE BLOCKCHAIN</_-label>

				<_-layout _for="content">
					<_-action _for="polygon" onClick={cause (polygon_mint_)}>Polygon via MetaMask</_-action>
					<_-action _for="flow" onClick={cause (flow_mint_)}>Flow via Blocto</_-action>
					</_-layout>
				</popup-view>
			</_-layout> ) ) ) }
	</> ) ) )
