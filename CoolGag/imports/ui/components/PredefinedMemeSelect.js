import React from 'react';
import PropTypes from 'prop-types';

export default class PredefinedMemeSelect extends React.Component {

	static propTypes = {
		router: PropTypes.object,
		mutate: PropTypes.func,
		onSelect: PropTypes.func,
		data: PropTypes.object
	}
	
	state = {
		data: {
			predefinedMemes: [
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3n0gr2m004801113hmrbldx', secret: 'cj3n0gr2m004801113hmrbldx'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3n0g9oy003s0155vvzu6n1a', secret: 'cj3n0g9oy003s0155vvzu6n1a'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3n0fx8x003o0155uw8jopoh', secret: 'cj3n0fx8x003o0155uw8jopoh'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3n0flae003k0155wkbynrd7', secret: 'cj3n0flae003k0155wkbynrd7'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3n0ff5300440111nk0kc090', secret: 'cj3n0ff5300440111nk0kc090'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3n0f9m800410111igadlz61', secret: 'cj3n0f9m800410111igadlz61'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3n0ez69003x0111i23pxafm', secret: 'cj3n0ez69003x0111i23pxafm'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3or818d02pv0195qg1ukcls', secret: 'cj3or818d02pv0195qg1ukcls'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3or91n202pz0195r2hicbew', secret: 'cj3or91n202pz0195r2hicbew'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3or94j002qb0195jn0s73ph', secret: 'cj3or94j002qb0195jn0s73ph'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3or970502qe019508h7byyh', secret: 'cj3or970502qe019508h7byyh'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3or99ag02q301957nokrg86', secret: 'cj3or99ag02q301957nokrg86'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3or9bn702q60195rsbgq8hw', secret: 'cj3or9bn702q60195rsbgq8hw'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3or9e3002qi0195agjqmwd9', secret: 'cj3or9e3002qi0195agjqmwd9'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3or9gis02qm0195y1ui3tfs', secret: 'cj3or9gis02qm0195y1ui3tfs'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3or9iuz02qa0195mb6e6rkl', secret: 'cj3or9iuz02qa0195mb6e6rkl'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3or9lmc02qp0195wzr6jz2h', secret: 'cj3or9lmc02qp0195wzr6jz2h'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3or9ogy02qe01959y8qe8ho', secret: 'cj3or9ogy02qe01959y8qe8ho'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3or9r1902qh0195ptay3wkt', secret: 'cj3or9r1902qh0195ptay3wkt'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3or9tem02qt0195kaclgce0', secret: 'cj3or9tem02qt0195kaclgce0'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3or9vqq02ql0195z4vjp1yu', secret: 'cj3or9vqq02ql0195z4vjp1yu'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3or9yb002qo0195farqavuh', secret: 'cj3or9yb002qo0195farqavuh'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3ora0xg02qx0195qu27m1u9', secret: 'cj3ora0xg02qx0195qu27m1u9'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3ora58h02r10195vxpdl4ns', secret: 'cj3ora58h02r10195vxpdl4ns'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3ora7vq02r401959fu287nv', secret: 'cj3ora7vq02r401959fu287nv'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3oraa4c02qs0195e7zfijyu', secret: 'cj3oraa4c02qs0195e7zfijyu'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3oracbp02qw0195ovt9d809', secret: 'cj3oracbp02qw0195ovt9d809'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3orafrj02r80195qg2iy6r9', secret: 'cj3orafrj02r80195qg2iy6r9'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3oraiiq02r00195p6agz9p9', secret: 'cj3oraiiq02r00195p6agz9p9'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3orakyx02rc0195uolqp1m8', secret: 'cj3orakyx02rc0195uolqp1m8'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3oran9j02rf0195k2gnc2rc', secret: 'cj3oran9j02rf0195k2gnc2rc'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3orapij02r30195m8wkz9cw', secret: 'cj3orapij02r30195m8wkz9cw'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3orarpz02r70195vd1jkne2', secret: 'cj3orarpz02r70195vd1jkne2'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3orav1b02rj0195ctu9c661', secret: 'cj3orav1b02rj0195ctu9c661'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3oraxh102rm0195u4kz3eqa', secret: 'cj3oraxh102rm0195u4kz3eqa'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3orazvi02rb0195fg0lj7zf', secret: 'cj3orazvi02rb0195fg0lj7zf'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3orb2ha02rq0195h2wf4w0w', secret: 'cj3orb2ha02rq0195h2wf4w0w'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3orb53402re0195ca5xjg7n', secret: 'cj3orb53402re0195ca5xjg7n'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3orb7ft02ru0195dwnjjldk', secret: 'cj3orb7ft02ru0195dwnjjldk'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3orb9oo02rx019524voyfcp', secret: 'cj3orb9oo02rx019524voyfcp'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3orbbo802ri0195hqlxdyp9', secret: 'cj3orbbo802ri0195hqlxdyp9'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3orbdof02s10195xualfh5k', secret: 'cj3orbdof02s10195xualfh5k'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3orbg0102rm0195vvmwdmol', secret: 'cj3orbg0102rm0195vvmwdmol'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3orbpmg02s50195nxchvvtg', secret: 'cj3orbpmg02s50195nxchvvtg'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3orbs1h02rq0195dggghdy4', secret: 'cj3orbs1h02rq0195dggghdy4'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3orbvib02s90195vk4k17xp', secret: 'cj3orbvib02s90195vk4k17xp'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3orbzjx02ru0195zknwrlis', secret: 'cj3orbzjx02ru0195zknwrlis'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3orc21o02ry019505tsmtwf', secret: 'cj3orc21o02ry019505tsmtwf'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3orc4i702sd0195eeksfjzb', secret: 'cj3orc4i702sd0195eeksfjzb'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3orc70z02s10195nyug6qh8', secret: 'cj3orc70z02s10195nyug6qh8'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3orc9k202sh0195awwuytxf', secret: 'cj3orc9k202sh0195awwuytxf'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3orcbtn02s50195ure5b820', secret: 'cj3orcbtn02s50195ure5b820'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3orcejq02s80195s7i2fqb6', secret: 'cj3orcejq02s80195s7i2fqb6'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3orchw302sl0195uc14n690', secret: 'cj3orchw302sl0195uc14n690'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3orcjy402so0195a1wlp8un', secret: 'cj3orcjy402so0195a1wlp8un'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3orcnb102sc0195trzvbup7', secret: 'cj3orcnb102sc0195trzvbup7'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3orcpov02ss0195ek2uk4hq', secret: 'cj3orcpov02ss0195ek2uk4hq'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3orcsm702sv0195o2v6tjva', secret: 'cj3orcsm702sv0195o2v6tjva'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3orcw6e02sg0195j8d72s0q', secret: 'cj3orcw6e02sg0195j8d72s0q'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3orcyrd02sj019518qnwn5m', secret: 'cj3orcyrd02sj019518qnwn5m'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3ord0r002sz0195dq2zrfb0', secret: 'cj3ord0r002sz0195dq2zrfb0'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3ord35x02sn0195jj62j1f1', secret: 'cj3ord35x02sn0195jj62j1f1'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3ord68402t30195ivx8y699', secret: 'cj3ord68402t30195ivx8y699'}}
			]
		}
	}
	
	render() {
		if (this.props.data && this.props.data.loading) {
			return (<div className={this.props.className ? this.props.className : ""} style={this.props.style ? this.props.style : {}}>Loading</div>)
		}
		
		console.log(this.state.data.predefinedMemes,this.state.data.predefinedMemes.length);
		
		return (
			<div className={(this.props.className ? this.props.className : "") + ' memeSelect'} style={this.props.style ? this.props.style : {}}>
				<div className='memeList'>
					{this.state.data.predefinedMemes.map((meme)=>
						<div className='meme' style={{'backgroundImage': 'url(' + meme.file.url + ')', backgroundPosition: 'center', backgroundSize: 'cover', width: '128px', height: '128px'}} onClick={this.memeSelected.bind(this, meme)}></div>
					)}
				</div>
			</div>
		);
	}
	
	memeSelected(meme) {
		if (this.props.onSelect) {
			this.props.onSelect(meme);
		}
	}
}