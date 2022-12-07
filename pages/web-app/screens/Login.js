let React = require ('react')
with (require ('camarche'))
with (require ('.~/jargon'))

propose (module) (reactful (_ =>
	<login-screen>
		<_-graphic _for="logo" />

		<_-spacing style={{ flex: 1 }} />

		<_-action _for="metamask" onClick={cause (polygon_login_)}>Sign in with Metamask</_-action>
		<_-action _for="flow" onClick={cause (flow_login_)}>Sign in with Flow</_-action>

		<_-spacing style={{ flex: 1 }} />

		</login-screen>
	 ) )
