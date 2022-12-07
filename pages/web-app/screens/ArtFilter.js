let React = require ('react')
with (require ('camarche'))
with (require ('.~/jargon'))


propose (module) (reactful (_ =>
	<art-filter-screen>
		<nav-view>
			<_-action _for="back" onClick={cause (nav_back_)} />
			<artist-display>
				<profile-image-display>
					<img src={depend_ (artist_image_sym) + '?size=large_thumbnail'} />
					</profile-image-display>
				<details-display>
					<name-display>{ depend_ (artist_name_sym) }</name-display>

					<one-line-description-display>{ depend_ (artist_one_line_description_sym) }</one-line-description-display>
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
						case_ (as_is (true)) (_ => ({ 'liked': '', onClick: cause (unlike_) })),
						case_ (as_is (false)) (_ => ({ onClick: cause (like_) }))) ) }
				/>
				<like-count-display>{ depend_ (like_count_sym) }</like-count-display>
				</like-view>
			
			<_-action _for="filter" onClick={cause (ai_art_filter_)}>
				AI ART FILTER
				</_-action>
			</actions-view>
		</art-filter-screen> ) )
