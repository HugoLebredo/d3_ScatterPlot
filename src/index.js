const { csv, select } = d3

import {scatterplot} from './scatterplot.js'

const width = window.innerWidth;
const height = window.innerHeight;
const margin = {top:10, right:10, bottom: 30, left:40}
const radius = 5

const parseRow = (d) => {
    d.sepal_length = +d.sepal_length;
    d.sepal_width = +d.sepal_width;
    d.petal_length = +d.petal_length;
    d.petal_width = +d.petal_width;
    return d;
};

const main = async (url) =>  {

    const data = await csv(url, parseRow)

    svg.call(
        scatterplot()
            .width(width)
            .height(height)
            .data(data)
            .xValues(d => d.petal_length)
            .yValues(d => d.sepal_width)
            .colorValues(d => d.species)
            .margin(margin)
            .radius(radius)
            (svg)
        )

}

const csvUrl = [
    'https://gist.githubusercontent.com/',
    'curran/', // User
    'a08a1080b88344b0c8a7/', // Id of the Gist
    'raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/', // commit
    'iris.csv', // File name
].join('');

console.log(d3)

const svg = select('body').append('svg')
                    .attr('width', width)
                    .attr('height',height)


main(csvUrl)
