let React = require ('react')
with (require ('camarche'))

propose (module) (reactful (_ =>
	<login-screen>
		<_-graphic _for="logo" />

		<_-spacing style={{ flex: 1 }} />

		<_-action _for="metamask">Sign in with Metamask</_-action>
		<_-action _for="flow">Sign in with Flow</_-action>

		<_-spacing style={{ flex: 1 }} />

		</login-screen>
	 ) )
