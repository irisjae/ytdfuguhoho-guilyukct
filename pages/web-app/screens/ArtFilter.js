let React = require ('react')
with (require ('camarche'))
with (require ('.~/jargon'))


propose (module) (reactful (_ =>
	<art-filter-screen>
		<nav-view>
			<_-action _for="back" />
			<artist-display>
				<profile-image-display>
					<img src={depend_ (artist_image_sym) + '?size=large_thumbnail'} />
					</profile-image-display>
				<details-display>
					<name-display>{ depend_ (artist_name_sym) }</name-display>
					<one-line-description-display>{ depend_ (artist_one_line_description_sym) }</one-line-description-display>

					<_-spacing style={{ flex: 1 }} />

					<_-hint>AI filter images in the style of artists</_-hint>
					</details-display>
				</artist-display>
			</nav-view>
		<_-layout _for="content">
			<filter-display>
				<img src={depend_ (product_image_sym)} />
				</filter-display>

			</_-layout>
		<actions-view>
			<like-view>
				<_-action
					_for="like"
					{... consider (depend_ (like_yes_sym))
						( match (
						case_ (as_is (true)) (_ => ({ 'liked': '' })),
						case_ (as_is (false)) (_ => ({}))) ) }
				/>
				<like-count-display>{ depend_ (like_count_sym) }</like-count-display>
				</like-view>
			
			<_-action _for="filter">
				AI ART FILTER
				</_-action>
			</actions-view>
		</art-filter-screen> ) )
