let React = require ('react')
with (require ('camarche'))

propose (module) (reactful (_ =>
	<art-filter-result-screen>
		<nav-view>
			<_-action _for="back" />
			<artist-display>
				<profile-image-display>
					<img src="https://assets.pons.ai/asset/71d02cfc-25b9-424d-a416-e9b1eb219291" />
					</profile-image-display>
				<details-display>
					<name-display>AI ART FILTER</name-display>
					<one-line-description-display>Something</one-line-description-display>

					<_-spacing style={{ flex: 1 }} />

					<_-hint>AI filter images in the style of artists</_-hint>
					</details-display>
				</artist-display>
			</nav-view>
		<_-layout _for="content">
			<_-indicator _for="filter-details">
				<_-display _for="style">
					<img src="https://assets.pons.ai/asset/71d02cfc-25b9-424d-a416-e9b1eb219291" />
					</_-display>
				<_-display _for="content">
					<img src="https://assets.pons.ai/asset/71d02cfc-25b9-424d-a416-e9b1eb219291" />
					</_-display>
				</_-indicator>
			<filter-display>
				<img src="https://assets.pons.ai/asset/71d02cfc-25b9-424d-a416-e9b1eb219291" />
				</filter-display>

			</_-layout>
		<actions-view>
			<_-action _for="mint">MINT NFT</_-action>

			<_-indicator _for="animation">0%</_-indicator>
			
			<_-action _for="download" />
			</actions-view>
		</art-filter-result-screen>
	 ) )
