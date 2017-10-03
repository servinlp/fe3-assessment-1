
const svg = d3.select( 'svg' ), // basicly querySelector maar dan met eigen methods
	g = svg.append( 'g' ), // appendChild + document.createElement
	margin = 40,
	WIDTH = 700,
	HEIGHT = 300,
	parseTime = d3.timeParse( '%Y%m%d' ) // Date in csv file omzetten naar een normaal new Date()

svg.attr( 'width', WIDTH + ( margin * 2 ) ) // .attr is basicly setAttribute
svg.attr( 'height', HEIGHT + ( margin * 2 ) )

const x = d3.scaleTime().rangeRound( [0, WIDTH] ), // Zet de range en zeg dat dit om tijd gaat
	y = d3.scaleLinear().rangeRound( [HEIGHT, 100] ),
	line = d3.line() // Voor de lijn, vertel op welke plek welke data moet komen voor straks
		.x( d => x( d.date ) ) // X as is dus voor de jaren
		.y( d => y( d.temp ) ) // Y as is dus voor de temperatuur

d3.csv( 'temperature.csv', function( d ) { // Inladen van data

	d.date = parseTime( d.date ) // Zet de date om naar new Date() Zoals op regel 7 beschreven
	d.temp = parseInt( d.temp ) // String naar Int
	return d

}, function( d ) {

	x.domain( d3.extent( d, data => data.date ) ) // Zet data in op de axis
	y.domain( d3.extent( d, data => data.temp ) )

	g.append( 'g' ) // Maak nieuwe g (group) aan
		.attr( 'transform', `translate( ${margin}, ${HEIGHT} )` )
		.call( d3.axisBottom( x ) ) // Zet de juiste datums er in
		.append( 'text' ) // Voeg de tekst toe die Verteld wat het is
		.attr( 'fill', '#000' )
		.attr( 'y', 6 )
		.attr( 'dy', '0.71em' )
		.attr( 'text-anchor', 'end' )
		.text( 'Year' )
		.attr( 'transform', 'translate( 30, 15 )' )

	g.append( 'g' )
		.attr( 'transform', `translate( ${margin}, 0 )` )
		.call( d3.axisLeft( y ) ) // Zet de juiste temperaturen er in
		.append( 'text' ) // Voeg de tekst toe die Verteld wat het is
		.attr( 'fill', '#000' )
		.attr( 'y', 6 )
		.attr( 'dy', '0.71em' )
		.attr( 'text-anchor', 'end' )
		.text( 'Temperature' )
		.attr( 'transform', `rotate( -90 ) translate( ${-HEIGHT + 60}, -40 )` )

	g.append( 'path' ) // De daadwerkelijke lijn van de grafiek
		.datum( d )
		.attr( 'transform', `translate( ${margin}, 0 )` )
		.attr( 'fill', 'none' )
		.attr( 'stroke', 'steelblue' )
		.attr( 'stroke-linejoin', 'round' )
		.attr( 'stroke-linecap', 'round' )
		.attr( 'stroke-width', 1.5 )
		.attr( 'd', line )

})
