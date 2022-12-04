let React = require ('react')
with (require ('camarche'))

propose (module) (reactful (_ =>
	<profile-screen>
		<nav-view>
			<_-label>My Profile</_-label>
			</nav-view>
		<_-layout _for="content">

			<user-details-view>
				<profile-image-display>
					<img src="https://assets.pons.ai/asset/71d02cfc-25b9-424d-a416-e9b1eb219291" />
					</profile-image-display>
				<_-layout _for="content">
					<name-display>KELV TANG</name-display>
					<one-line-description-display>
						Lorem ipsum
						</one-line-description-display>
					<addresses-view>
						<address-display _for="flow">0xdeadbeefdeadbeefdeadbeef</address-display>
						<address-display _for="polygon">0xdeadbeefdeadbeefdeadbeef</address-display>
						</addresses-view>

					<description-display>
						Lorem ipsum
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
				<nft-view>
					<img src="https://pbs.twimg.com/media/FiJPLopaYAAdUY9?format=jpg&name=large" />
					</nft-view>
				<nft-view>
					<img src="https://pbs.twimg.com/media/FiJPLopaYAAdUY9?format=jpg&name=large" />
					</nft-view>
				<nft-view>
					<img src="https://pbs.twimg.com/media/FiJPLopaYAAdUY9?format=jpg&name=large" />
					</nft-view>
				<nft-view>
					<img src="https://pbs.twimg.com/media/FiJPLopaYAAdUY9?format=jpg&name=large" />
					</nft-view>
				<nft-view>
					<img src="https://pbs.twimg.com/media/FiJPLopaYAAdUY9?format=jpg&name=large" />
					</nft-view>
				<nft-view>
					<img src="https://pbs.twimg.com/media/FiJPLopaYAAdUY9?format=jpg&name=large" />
					</nft-view>
				</nfts-view>

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
		</profile-screen>
	 ) )
