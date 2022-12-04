let React = require ('react')

let Login = require ('./screens/Login')
let Discover = require ('./screens/Discover')
let Profile = require ('./screens/Profile')
let ArtFilter = require ('./screens/ArtFilter')
let ArtFilterList = require ('./screens/ArtFilterList')
let ArtFilterResult = require ('./screens/ArtFilterResult')
with (require ('camarche'))
with (require ('.~/jargon'))

propose (module) (reactful (_ =>
	<>
	{ consider (depend_ (candidates_sym_ (page_sym)))
	( match (
	case_ (ln_ (as_candidate, as_is ('login'))) (_ => <Login />),
	case_ (ln_ (as_candidate, as_is ('discover'))) (_ => <Discover />),
	case_ (ln_ (as_candidate, as_is ('profile'))) (_ => <Profile />),
	case_ (ln_ (as_candidate, as_is ('art filter'))) (_ => <ArtFilter />),
	case_ (ln_ (as_candidate, as_is ('art filter list'))) (_ => <ArtFilterList />),
	case_ (ln_ (as_candidate, as_is ('art filter result'))) (_ => <ArtFilterResult />) ) ) }

	<Consequence _fn={_ => {
		;satisfy_ (page_sym) ('login')
		//;nav_art_filter_ ('580d2a13-5b4a-4615-a521-4990fceff8fe')
		} } />
	</> ) )
