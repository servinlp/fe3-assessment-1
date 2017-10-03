
const svg = d3.select( 'svg' ),
	g = svg.append( 'g' ),
	margin = 40,
	WIDTH = 700,
	HEIGHT = 300,
	parseTime = d3.timeParse( '%Y%m%d' )

console.log( svg )

svg.attr( 'width', WIDTH + ( margin * 2 ) )
svg.attr( 'height', HEIGHT + ( margin * 2 ) )

const x = d3.scaleTime().rangeRound( [0, WIDTH] ),
	y = d3.scaleLinear().rangeRound( [HEIGHT, 100] ),
	line = d3.line()
		.x( d => x( d.date ) )
		.y( d => y( d.temp ) )

d3.csv( 'temperature.csv', function( d ) {

	d.date = parseTime( d.date )
	d.temp = parseInt( d.temp )
	return d

}, function( d ) {

	x.domain( d3.extent( d, data => data.date ))
	y.domain( d3.extent( d, data => data.temp ))

	g.append( 'g' )
		.attr( 'transform', `translate(${margin}, ${HEIGHT})` )
		.call( d3.axisBottom( x ) )
		.append( 'text' )
		.attr( 'fill', '#000' )
		.attr( 'y', 6 )
		.attr( 'dy', '0.71em' )
		.attr( 'text-anchor', 'end' )
		.text( 'Year' )
		.attr( 'transform', `translate( 30, 15 )` )

	g.append( 'g' )
		.attr( 'transform', `translate(${margin}, 0)` )
		.call( d3.axisLeft( y ) )
		.append( 'text' )
		.attr( 'fill', '#000' )
		.attr( 'y', 6 )
		.attr( 'dy', '0.71em' )
		.attr( 'text-anchor', 'end' )
		.text( 'Temperature' )
		.attr( 'transform', `rotate(-90) translate( ${-HEIGHT + 60}, -40 )` )

	g.append( 'path' )
		.datum( d )
		.attr( 'transform', `translate(${margin}, 0)` )
		.attr( 'fill', 'none' )
		.attr( 'stroke', 'steelblue' )
		.attr( 'stroke-linejoin', 'round' )
		.attr( 'stroke-linecap', 'round' )
		.attr( 'stroke-width', 1.5 )
		.attr( 'd', line )

})
