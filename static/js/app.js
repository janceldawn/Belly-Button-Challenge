// url
url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// DISPLAY CHARTS

// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual
// Use sample_values as the values for the bar chart.
// Use otu_ids as the labels for the bar chart.
// Use otu_labels as the hovertext for the chart.

// create a function to call the charts
function charts(sampleobject) {

// Fetch json file data and console log it
    d3.json(url).then(function(data) {
        console.log(data);
    
// Initialised arrays
    let samples = data.samples;
    let id = samples.filter(name => name.id == sampleobject);
    let current_id = id[0];
    let otu_ids = current_id.otu_ids;
    let sample_values = current_id.sample_values;
    let otu_labels = current_id.otu_labels;
    
    console.log(current_id);
    
    let trace1 = {
        y: otu_ids.slice(0,10).map(row => `OTU ${row}`).reverse(),
        x: sample_values.slice(0, 10).reverse(),
        text: otu_labels.slice(0,10).reverse(),
        type: "bar",
        orientation: "h"
      };
    
    let barLayout = {
        title: "Top 10 Bacteria Cultures Found",
        margin: { t: 30, l: 150 }
      };

    Plotly.newPlot("bar", [trace1], barLayout);


// Create a bubble chart that displays each sample.
// Use otu_ids for the x values.
// Use sample_values for the y values.
// Use sample_values for the marker size.
// Use otu_ids for the marker colors.
// Use otu_labels for the text values.

    let trace2 = {
        x: otu_ids,
        y: sample_values,
        mode: 'markers',
        marker: {
            size: sample_values,
            color: otu_ids,
            colorscale: 'Earth'
    }
  };
  
    let layout = {
        xaxis: {
            title: 'OTU ID'
        }
  };
  
    Plotly.newPlot('bubble', [trace2], layout);

    });

};


// Display metadata i.e. Demographic info

// Create a function 
function buildMetadata(sample) {

    // Fetch json data file and console log it
    d3.json(url).then(function(data) {
        console.log(data);

    const resultArray = data.metadata.filter(sampleObj => sampleObj.id == sample);
    const result = resultArray[0]; // Assuming sample numbers are unique.

    // Use d3 to select the panel with id of `#sample-metadata`
    let PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    for (key in result){
      PANEL.append("h6").text(`${key.toUpperCase()}: ${result[key]}`);
    };

})

};


// Creating the Dropdown option

// Create a function to call 
function init() {

    d3.json(url).then(function(data) {
        console.log(data.names);
    
    // select the html element
    let dropdownMenu = d3.select("#selDataset");
    let sample_names = data.names;
    for (let i = 0; i < sample_names.length; i++) {
        dropdownMenu.append("option").text(sample_names[i]).property("value", sample_names[i]);
    }

    // Use the first sample from the list to build the initial plots
    let firstSample = data.names[0];
    console.log(firstSample);
    charts(firstSample);
    buildMetadata(firstSample);

    })

}

// This function is called when a dropdown menu item is selected
function optionChanged(new_sample_id) {
  

 charts(new_sample_id);
 buildMetadata(new_sample_id);

}

init();


