let React = require ('react')
with (require ('camarche'))

propose (module) (reactful (_ =>
	<discover-screen>
		<nav-view>
			<_-spacing style={{ flex: 1 }} />

			<_-action _for="ai-art-filter">
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
					<stamp-view image="x" />
					<stamp-view image="x" />
					<stamp-view image="x" />
					<stamp-view />
					<stamp-view />

					<hr />

					<stamp-view />
					<stamp-view />
					<stamp-view />
					<stamp-view />
					<stamp-view _for="complete" />
					</card-control>

				</loyalty-card-view>

			<art-filters-view>
				<art-filter-view>
					<_-label>Stamp 1: NFT Souvenir</_-label>
					<img src="sample.png" />
					</art-filter-view>
				<art-filter-view>
					<_-label>Stamp 2: NFT Souvenir</_-label>
					<img src="sample.png" />
					</art-filter-view>
				</art-filters-view>

			</_-layout>
		<tabs-view>
			<tab-view>
				<icon-display _for="lightbulb" />
				<_-label>DISCOVER</_-label>
				</tab-view>
			<tab-view>
				<icon-display _for="person" />
				<_-label>PROFILE</_-label>
				</tab-view>
			</tabs-view>
		</discover-screen>
	 ) )
