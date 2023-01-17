const { axisBottom,
        axisLeft, 
        extent, 
        max, 
        scaleLinear, 
        scaleOrdinal, 
} = d3

export const scatterplot = () => {
    
    let width
    let height
    let data
    let xValues
    let yValues
    let colorValues
    let margin
    let radius
    
    const my = (selection) => {

        const xScale = scaleLinear().domain([0,max(data, xValues)])
                            .range([margin.left,width - margin.right])
        const yScale = scaleLinear().domain(extent(data, yValues))
                                    .range([height - margin.bottom,margin.top])
        const colorScale = scaleOrdinal().domain(data, colorValues)
                                        .range(['#E6842A', '#137B80', '#8E6C8A'])

        const xAxis = axisBottom(xScale)
        const yAxis = axisLeft(yScale)

        const marks = data.map((d) => ({
            x:xScale(xValues(d)),
            y:yScale(yValues(d)),
            color:colorScale(d.species),
        }))

        selection.selectAll('circle')
                    .data(marks)
                    .join('circle')
                    .attr('cx', d => d.x)
                    .attr('cy', d => d.y)
                    .attr('fill', d => d.color)
                    .attr('r', radius)

        selection.append('g').call(xAxis)
                        .attr("transform", `translate(0,${height - margin.bottom})`)

        selection.append('g').call(yAxis)
                        .attr("transform", `translate(${margin.left},0)`)
    }

    my.width = function(_) {
        return arguments.length ? (width = +_, my) : width
    }

    my.height = function(_) {
        return arguments.length ? (height = +_, my) : height
    }

    my.data = function(_) {
        return arguments.length ? (data = _, my) : data
    }

    my.xValues = function(_) {
        return arguments.length ? (xValues = _, my) : xValues
    }

    my.yValues = function(_) {
        return arguments.length ? (yValues = _, my) : yValues
    }

    my.margin = function(_) {
        return arguments.length ? (margin = _, my) : margin
    }

    my.radius = function(_) {
        return arguments.length ? (radius = +_, my) : radius
    }

    my.colorValues = function(_) {
        return arguments.length ? (colorValues = +_, my) : colorValues
    }

    return my
}