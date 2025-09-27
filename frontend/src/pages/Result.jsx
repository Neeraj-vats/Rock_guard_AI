import React, { useState, useEffect } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { ResponsiveBar } from '@nivo/bar';

// This is a single, self-contained React component file.
// All components, hooks, logic, and styling are contained within this file.

<<<<<<< Updated upstream
// Embed the CSV data directly as a multi-line string to avoid fetch errors
const ROCKFALL_CSV_DATA = `Slope_deg,Distance_to_fault_km,Rock_Type,Soil_Type,Rock_Volume_m3,Season,Prior_Events,Impact_Level
13.63796872015715,14.955506204291646,Shale,Loamy,3.151006323755762,Winter,4,Medium
10.252982127224604,25.47487405426295,Granite,Clay,2.713143807058176,Spring,4,High
12.58665597521575,32.197073339941646,Granite,Sandy,3.51530282222726,Winter,4,High
31.041916799793977,49.608765368303736,Basalt,Silty,0.7179355442090325,Spring,3,High
53.64937123746015,34.7687996550717,Limestone,Rocky,0.5986406624154776,Winter,0,Low
22.007140958632617,8.28079270259593,Granite,Clay,0.2067360180076877,Winter,3,Medium
12.424710832769932,44.80172862814055,Granite,Clay,0.1109120803447388,Spring,3,Low
33.91938877376677,19.177895960698848,Limestone,Clay,0.6017049189833731,Winter,0,Medium
15.412530250049986,12.73465802484055,Shale,Loamy,1.971687952368728,Summer,4,Medium
20.323748965005485,46.41114371407286,Sandstone,Clay,3.0261966788732364,Winter,2,High
59.72641628278882,33.50177524463798,Limestone,Clay,2.824236046394752,Winter,4,Medium
32.54877379796033,26.471415286595228,Sandstone,Rocky,1.2057790899039322,Winter,1,Medium
66.44186411545674,13.208151433293887,Limestone,Silty,2.3739777934440026,Summer,2,Medium
61.12140640306161,16.516089311654877,Basalt,Sandy,0.6970725206456073,Autumn,0,Medium
23.007559196963286,2.0292850383307613,Shale,Loamy,1.2263054325419997,Winter,3,High
16.489709210080644,14.654763363063548,Limestone,Silty,1.1517409249673902,Spring,3,Medium
30.33967980302324,40.1983084325251,Basalt,Clay,2.946328225574921,Winter,3,Medium
56.88720888995346,26.79092461525916,Shale,Sandy,0.729112260682052,Spring,1,Low
19.04369168972622,12.37894371343753,Sandstone,Clay,2.3920970879586226,Winter,3,High
45.89426915152589,32.30233639832565,Granite,Loamy,2.3087094254471746,Winter,1,Medium
46.90300451557022,14.249219665792942,Limestone,Clay,3.6158586483525287,Summer,2,High
52.27091220499036,44.91264350198086,Basalt,Silty,0.3013233866164223,Autumn,1,Low
34.03210343764506,18.049448834032074,Shale,Sandy,1.0712953255928882,Winter,4,Medium
12.000300264669818,48.21634515152345,Sandstone,Loamy,0.7818967923761741,Winter,1,Low
15.011246755498877,32.48206198888046,Granite,Clay,0.8576423985392078,Summer,2,High
27.02640156942636,18.784400780447334,Limestone,Silty,3.2081545625129184,Autumn,3,Medium
19.66440263690623,30.347990184404738,Basalt,Sandy,0.6120539824285819,Winter,1,Low
44.37568153130283,23.36372134548028,Shale,Clay,0.9250007204953924,Spring,3,Low
50.60940560241951,19.296561162124597,Sandstone,Rocky,1.0371457497262078,Summer,4,High
60.70617650532159,38.61805720760636,Granite,Loamy,3.585799797384218,Winter,2,Medium
14.374667258380388,41.40106202517551,Limestone,Clay,2.784949510006399,Autumn,1,Medium
21.439775367677894,36.57444141639893,Basalt,Silty,1.528392171120023,Winter,0,High
38.83515091773413,44.97495574384951,Shale,Sandy,0.8926949666014287,Spring,3,Low
42.36195537500589,17.411641323719016,Sandstone,Clay,0.5694665476106653,Summer,2,Medium
57.2990640478144,37.66982455088277,Granite,Loamy,0.20781702891392687,Winter,1,Low
22.09459585640329,18.99127521033284,Limestone,Silty,1.0828859344465498,Autumn,4,Medium
58.82881944521748,34.50291942468352,Basalt,Sandy,3.469599669677332,Winter,0,High
42.24765793012675,20.730248259160533,Shale,Clay,1.8601550993079946,Winter,3,Medium
39.46781295982263,28.846506450259838,Sandstone,Rocky,0.596041796120409,Spring,4,Low
51.57945037302306,17.58572110292723,Granite,Loamy,0.3013352709190184,Winter,2,Medium
19.00636884693892,30.04631627056689,Limestone,Clay,3.428574185208573,Autumn,1,High
15.932918805721997,42.5312351225514,Basalt,Silty,1.4886616584210632,Winter,2,Medium
34.00424694464525,18.88726830536427,Shale,Sandy,0.40058252274438515,Spring,1,Low
42.607212459173926,38.25845016629983,Sandstone,Clay,0.5376511195724268,Summer,3,Medium
59.13689196324884,13.43232147775535,Granite,Loamy,2.22276537829986,Winter,0,Medium
29.5668461142566,41.31294875704907,Limestone,Silty,2.697087850849202,Autumn,2,High
21.432840742183354,23.376841285406797,Basalt,Sandy,1.751680196200234,Winter,3,Medium
17.84360341703274,33.52737674720612,Shale,Clay,0.4373188554790089,Spring,4,Low
33.20815148008436,44.75706240228384,Sandstone,Rocky,0.12932371408849764,Summer,1,Low
49.23190479101155,20.089849540026367,Granite,Loamy,0.7259648943891461,Winter,2,Medium
55.33618116517173,15.68817684042851,Limestone,Silty,3.220138541880908,Autumn,3,High
40.45785025776413,29.98042459740268,Basalt,Sandy,0.6698668571871587,Winter,0,Low
19.04369168972622,12.37894371343753,Shale,Clay,2.3920970879586226,Spring,3,High
15.932918805721997,42.5312351225514,Sandstone,Silty,1.4886616584210632,Winter,2,Medium`;


// Function to process and sort data for the bar chart
=======
// Mock data for the table and bar chart (inspired by the provided image)
const initialTableData = [
  { "id": 0, "slope_deg": 13.637969, "distance_to_fault_km": 14.955506, "Rock_Type": "Shale", "Soil_Type": "Loamy", "Rock_Volume_m3": 3.151006, "Season": "Winter", "Prior_Events": 4, "Impact_Level": "Medium" },
  { "id": 1, "slope_deg": 10.252982, "distance_to_fault_km": 25.474874, "Rock_Type": "Granite", "Soil_Type": "Clay", "Rock_Volume_m3": 2.713144, "Season": "Spring", "Prior_Events": 4, "Impact_Level": "High" },
  { "id": 2, "slope_deg": 12.586656, "distance_to_fault_km": 32.197073, "Rock_Type": "Granite", "Soil_Type": "Sandy", "Rock_Volume_m3": 3.515303, "Season": "Winter", "Prior_Events": 4, "Impact_Level": "High" },
  { "id": 3, "slope_deg": 31.041917, "distance_to_fault_km": 49.608765, "Rock_Type": "Basalt", "Soil_Type": "Silty", "Rock_Volume_m3": 0.717936, "Season": "Spring", "Prior_Events": 3, "Impact_Level": "High" },
  { "id": 4, "slope_deg": 53.649371, "distance_to_fault_km": 34.768800, "Rock_Type": "Limestone", "Soil_Type": "Rocky", "Rock_Volume_m3": 0.598641, "Season": "Winter", "Prior_Events": 0, "Impact_Level": "Low" },
];

// Options for the axes dropdowns, derived from numerical data keys
const axisOptions = ["slope_deg", "distance_to_fault_km", "Rock_Volume_m3", "Prior_Events"];


// Function to process data for the bar chart based on the selected column
>>>>>>> Stashed changes
const processDataForBarChart = (data, categoryKey) => {
  const counts = data.reduce((acc, item) => {
    const key = item[categoryKey] || 'N/A';
    if (!acc[key]) {
      acc[key] = { [categoryKey]: key, count: 0 };
    }
    acc[key].count += 1;
    return acc;
  }, {});
  // Sort the data by count in descending order
  const sortedData = Object.values(counts).sort((a, b) => b.count - a.count);
  return sortedData;
};

// Main App component
<<<<<<< Updated upstream
const App = () => {
  const [lineData, setLineData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [activeTab, setActiveTab] = useState('graph');
  const [lineChartOptions, setLineChartOptions] = useState({
    title: 'Rock Volume vs. Distance to Fault',
    xLabel: 'Distance to Fault (km)',
    yLabel: 'Rock Volume (m³)'
=======
const Result = () => {
  const [lineData, setLineData] = useState([]);
  const [tableData, setTableData] = useState(initialTableData);
  const [activeTab, setActiveTab] = useState('graph');
  const [lineChartOptions, setLineChartOptions] = useState({
    title: 'Rockfall Analysis: Rock Volume m3 vs slope deg',
    xLabel: 'slope_deg', // Default X-axis
    yLabel: 'Rock_Volume_m3' // Default Y-axis
>>>>>>> Stashed changes
  });
  const [barChartOptions, setBarChartOptions] = useState({
    title: 'Rock Type Distribution',
    categoryKey: 'Rock_Type',
    yLabel: 'Count'
  });
  const [tableFilter, setTableFilter] = useState('');
  const [geminiSummary, setGeminiSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userQuery, setUserQuery] = useState('What do these graphs tell me about potential rockfall risks?');


  // --- EFFECT TO UPDATE LINE CHART DATA WHEN OPTIONS CHANGE ---
  React.useEffect(() => {
    if (tableData.length > 0 && lineChartOptions.xLabel && lineChartOptions.yLabel) {
        const sortedData = [...tableData].sort((a, b) => a[lineChartOptions.xLabel] - b[lineChartOptions.xLabel]);
        const chartData = [{
            id: `${lineChartOptions.yLabel} vs ${lineChartOptions.xLabel}`,
            data: sortedData.map(d => ({
                x: d[lineChartOptions.xLabel],
                y: d[lineChartOptions.yLabel]
            }))
        }];
        setLineData(chartData);
    }
  }, [tableData, lineChartOptions.xLabel, lineChartOptions.yLabel]);

  // --- EFFECT TO DYNAMICALLY UPDATE THE CHART TITLE ---
  React.useEffect(() => {
    if (lineChartOptions.xLabel && lineChartOptions.yLabel) {
      const newTitle = `Rockfall Analysis: ${lineChartOptions.yLabel.replace(/_/g, ' ')} vs ${lineChartOptions.xLabel.replace(/_/g, ' ')}`;
      setLineChartOptions(prev => ({ ...prev, title: newTitle }));
    }
  }, [lineChartOptions.xLabel, lineChartOptions.yLabel]);


  // Effect to parse the embedded CSV data on component mount
  useEffect(() => {
    const parseCsvString = (csvString) => {
      const lines = csvString.split('\n');
      const headers = lines[0].split(',').map(h => h.trim());
      const parsedData = lines.slice(1)
        .filter(line => line.trim() !== '')
        .map(line => {
          const values = line.split(',');
          const row = {};
          headers.forEach((header, i) => {
            row[header] = values[i] ? values[i].trim() : '';
          });
          return row;
        });
      return parsedData;
    };

    const parsedData = parseCsvString(ROCKFALL_CSV_DATA);
    setTableData(parsedData);
    
    // Prepare data for the line chart
    const lineChartPreparedData = [{
      id: 'Rockfall Events',
      data: parsedData.map(d => ({
        x: parseFloat(d.Distance_to_fault_km),
        y: parseFloat(d.Rock_Volume_m3)
      })).filter(d => !isNaN(d.x) && !isNaN(d.y)),
    }];
    setLineData(lineChartPreparedData);

  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('lineChart')) {
      const field = name.split('.')[1];
      setLineChartOptions(prev => ({ ...prev, [field]: value }));
    } else if (name.startsWith('barChart')) {
      const field = name.split('.')[1];
      setBarChartOptions(prev => ({ ...prev, [field]: value }));
    }
  };

  const filteredTableData = tableData.filter(row =>
    Object.values(row).some(value =>
      String(value).toLowerCase().includes(tableFilter.toLowerCase())
    )
  );

  const barChartData = processDataForBarChart(filteredTableData, barChartOptions.categoryKey);

  const generateChartAnalysis = async () => {
    setIsLoading(true);
    setGeminiSummary('');

<<<<<<< Updated upstream
    // Prepare the prompt for the LLM
    const systemPrompt = "You are a data analyst. Your task is to provide a concise, single-paragraph summary of a given dataset. Focus on key trends, anomalies, and relationships between variables. Your tone should be informative and professional.";
    const userQuery = `Summarize the following data table in a single paragraph:\n\n${JSON.stringify(tableData, null, 2)}`;
=======
    const systemPrompt = "You are an expert geological data analyst. Your task is to interpret data visualizations for a user. Given the context of a line chart and a bar chart, and a user's question, provide a detailed explanation. First, explain the insights in simple, layman's terms. Then, provide a more detailed explanation in technical terms for an expert audience. Use markdown for formatting.";
    
    const promptForAI = `
      Here is the current context of my data dashboard for rockfall prediction in mines:
      1.  **Line Chart Analysis:**
          * I am visualizing the relationship between **'${lineChartOptions.xLabel.replace(/_/g, ' ')}'** (on the X-axis) and **'${lineChartOptions.yLabel.replace(/_/g, ' ')}'** (on the Y-axis).
      2.  **Bar Chart Analysis:**
          * I am displaying a count distribution for the category: **'${barChartOptions.categoryKey.replace(/_/g, ' ')}'**.
          * The counts for each item in this category are: ${JSON.stringify(barChartData)}.
      Based on this dashboard context, please provide a two-part analysis for my question:
      **My Question: "${userQuery}"**
    `;
>>>>>>> Stashed changes
    
    const payload = {
      contents: [{ parts: [{ text: promptForAI }] }],
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      },
    };
    
    const apiKey = "";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      const text = result?.candidates?.[0]?.content?.parts?.[0]?.text || "Could not generate analysis. Please try again.";
      setGeminiSummary(text);

    } catch (error) {
      console.error('Error fetching data from Gemini API:', error);
      setGeminiSummary("Failed to generate analysis. Please check your network connection or try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
<<<<<<< Updated upstream
    <div className="flex flex-col md:flex-row h-screen font-sans bg-gray-950 text-gray-100 p-4 items-start">
      
      {/* Sidebar for user inputs */}
      <div className="md:w-1/4 w-full bg-gray-900 p-6 rounded-2xl shadow-xl space-y-6 md:mr-4 mb-4 md:mb-0">
=======
    <div className="flex flex-col md:flex-row h-screen font-sans bg-gray-900 text-gray-100 p-4 items-start overflow-auto">
      
      {/* Sidebar for user inputs */}
      <div className="md:w-1/4 w-full bg-gray-800 p-6 rounded-2xl shadow-xl space-y-6 md:mr-4 mb-4 md:mb-0 md:sticky top-4">
>>>>>>> Stashed changes
        <h2 className="text-xl font-bold text-blue-400">Dashboard Controls</h2>

        {/* Line Chart Inputs */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-200 border-b border-gray-700 pb-2">Line Chart Options</h3>
          <div>
            <label htmlFor="line-title" className="block text-sm font-medium text-gray-400 mb-1">Chart Title</label>
            <input
              id="line-title"
              type="text"
              name="lineChart.title"
              value={lineChartOptions.title}
              onChange={handleInputChange}
              className="w-full p-2 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <div>
            <label htmlFor="line-xlabel" className="block text-sm font-medium text-gray-400 mb-1">X-Axis</label>
            <select
              id="line-xlabel"
              name="lineChart.xLabel"
              value={lineChartOptions.xLabel}
              onChange={handleInputChange}
<<<<<<< Updated upstream
              className="w-full p-2 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:border-blue-500 transition-colors"
            />
=======
              className="w-full p-2 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
            >
              {axisOptions.map(key => (
                <option key={key} value={key}>{key.replace(/_/g, ' ')}</option>
              ))}
            </select>
>>>>>>> Stashed changes
          </div>
          <div>
            <label htmlFor="line-ylabel" className="block text-sm font-medium text-gray-400 mb-1">Y-Axis</label>
            <select
              id="line-ylabel"
              name="lineChart.yLabel"
              value={lineChartOptions.yLabel}
              onChange={handleInputChange}
<<<<<<< Updated upstream
              className="w-full p-2 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:border-blue-500 transition-colors"
            />
=======
              className="w-full p-2 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
            >
               {axisOptions.map(key => (
                <option key={key} value={key}>{key.replace(/_/g, ' ')}</option>
              ))}
            </select>
>>>>>>> Stashed changes
          </div>
        </div>

        {/* Bar Chart Inputs */}
        <div className="space-y-4 pt-6">
          <h3 className="text-lg font-semibold text-gray-200 border-b border-gray-700 pb-2">Bar Chart Options</h3>
          <div>
            <label htmlFor="bar-title" className="block text-sm font-medium text-gray-400 mb-1">Chart Title</label>
            <input
              id="bar-title"
              type="text"
              name="barChart.title"
              value={barChartOptions.title}
              onChange={handleInputChange}
              className="w-full p-2 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <div>
            <label htmlFor="bar-category" className="block text-sm font-medium text-gray-400 mb-1">Category Field</label>
            <select
              id="bar-category"
              name="barChart.categoryKey"
              value={barChartOptions.categoryKey}
              onChange={handleInputChange}
              className="w-full p-2 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:border-blue-500 transition-colors"
            >
              {Object.keys(tableData[0] || {}).map(key => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="bar-ylabel" className="block text-sm font-medium text-gray-400 mb-1">Y-Axis Label</label>
            <input
              id="bar-ylabel"
              type="text"
              name="barChart.yLabel"
              value={barChartOptions.yLabel}
              onChange={handleInputChange}
              className="w-full p-2 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Gemini API Section */}
        <div className="space-y-4 pt-6">
          <h3 className="text-lg font-semibold text-gray-200 border-b border-gray-700 pb-2">Data Insights ✨</h3>
          <div>
            <label htmlFor="user-query" className="block text-sm font-medium text-gray-400 mb-1">Your Question</label>
            <textarea
              id="user-query"
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              className="w-full p-2 h-24 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Ask about the charts..."
            />
          </div>
          <button
            onClick={generateChartAnalysis}
            className="w-full p-3 rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors font-bold disabled:bg-gray-500 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate Chart Analysis ✨'}
          </button>
<<<<<<< Updated upstream
          {geminiSummary && (
            <div className="bg-gray-800 p-4 rounded-lg text-sm text-gray-300 shadow-inner">
              <p>{geminiSummary}</p>
            </div>
          )}
=======
>>>>>>> Stashed changes
        </div>
      </div>

      {/* Main content area for charts and table */}
<<<<<<< Updated upstream
      <div className="flex-1 bg-gray-950 p-6 rounded-2xl shadow-xl space-y-6">
=======
      <div className="flex-1 bg-gray-800 p-6 rounded-2xl shadow-xl space-y-6">
>>>>>>> Stashed changes
        {/* Tabs for switching between Graph and Table view */}
        <div className="flex justify-center mb-4 border-b-2 border-gray-700">
          <button
            onClick={() => setActiveTab('graph')}
            className={`flex items-center space-x-2 px-6 py-2 transition-all duration-300 rounded-t-lg font-medium ${
              activeTab === 'graph' ? 'text-blue-400 border-b-4 border-blue-400' : 'text-gray-400 hover:text-blue-300'
            }`}
          >
            <span className="text-xl">📊</span>
            <span>Graph View</span>
          </button>
          <button
            onClick={() => setActiveTab('table')}
            className={`flex items-center space-x-2 px-6 py-2 transition-all duration-300 rounded-t-lg font-medium ${
              activeTab === 'table' ? 'text-blue-400 border-b-4 border-blue-400' : 'text-gray-400 hover:text-blue-300'
            }`}
          >
            <span className="text-xl">📋</span>
            <span>Table View</span>
          </button>
        </div>

        {/* Conditional rendering based on the active tab */}
        {activeTab === 'graph' && (
          <div className="space-y-6">
            <div className="w-full h-[400px] bg-gray-900 rounded-xl p-4 shadow-inner">
              <h3 className="text-center text-lg font-bold mb-2">{lineChartOptions.title}</h3>
              <ResponsiveLine
                data={lineData}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
<<<<<<< Updated upstream
                xScale={{ type: 'linear', min: 0, max: 'auto' }}
=======
                xScale={{ type: 'linear', min: 'auto', max: 'auto' }}
>>>>>>> Stashed changes
                yScale={{
                  type: 'linear',
                  min: 'auto',
                  max: 'auto',
                  stacked: false,
                  reverse: false
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  orient: 'bottom',
                  tickSize: 0,
                  tickPadding: 0,
                  tickRotation: 0,
                  legend: lineChartOptions.xLabel.replace(/_/g, ' '),
                  legendOffset: 36,
                  legendPosition: 'middle',
<<<<<<< Updated upstream
                  tickValues: [],
=======
                  format: ".2f"
>>>>>>> Stashed changes
                }}
                axisLeft={{
                  orient: 'left',
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: lineChartOptions.yLabel.replace(/_/g, ' '),
                  legendOffset: -50,
                  legendPosition: 'middle',
                  format: ".2f"
                }}
                pointSize={8}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                  {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                      {
                        on: 'hover',
                        style: {
                          itemBackground: 'rgba(0, 0, 0, .03)',
                          itemOpacity: 1
                        }
                      }
                    ]
                  }
                ]}
                colors={{ scheme: 'set2' }}
                theme={{
                  background: 'rgb(17 24 39)',
                  textColor: 'rgb(243 244 246)',
                  axis: {
                    domain: { line: { stroke: 'rgb(75 85 99)' } },
                    ticks: { line: { stroke: 'rgb(75 85 99)' }, text: { fill: 'rgb(156 163 175)' } },
                    legend: { text: { fill: 'rgb(156 163 175)' } }
                  },
                  grid: { line: { stroke: 'rgb(55 65 81)', strokeDasharray: '4 4' } },
                  tooltip: {
                    container: { background: 'rgb(17 24 39)', color: 'rgb(243 244 246)', fontSize: 14, borderRadius: 8, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }
                  }
                }}
              />
            </div>

            <div className="w-full h-[400px] bg-gray-900 rounded-xl p-4 shadow-inner mt-6">
              <h3 className="text-center text-lg font-bold mb-2">{barChartOptions.title}</h3>
              <ResponsiveBar
                data={barChartData}
                keys={['count']}
                indexBy={barChartOptions.categoryKey}
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                colors={{ scheme: 'category10' }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  tickSize: 0,
                  tickPadding: 0,
                  tickRotation: 0,
                  legend: barChartOptions.categoryKey.replace(/_/g, ' '),
                  legendPosition: 'middle',
                  legendOffset: 32,
                  tickValues: [],
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: barChartOptions.yLabel,
                  legendPosition: 'middle',
                  legendOffset: -40
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                theme={{
                  background: 'rgb(17 24 39)',
                  textColor: 'rgb(243 244 246)',
                  axis: {
                    domain: { line: { stroke: 'rgb(75 85 99)' } },
                    ticks: { line: { stroke: 'rgb(75 85 99)' }, text: { fill: 'rgb(156 163 175)' } },
                    legend: { text: { fill: 'rgb(156 163 175)' } }
                  },
                  grid: { line: { stroke: 'rgb(55 65 81)', strokeDasharray: '4 4' } },
                  tooltip: {
                    container: { background: 'rgb(17 24 39)', color: 'rgb(243 244 246)', fontSize: 14, borderRadius: 8, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }
                  }
                }}
              />
            </div>
          </div>
        )}

        {activeTab === 'table' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-200">Data Table</h3>
              <input
                type="text"
                placeholder="Filter table..."
                value={tableFilter}
                onChange={(e) => setTableFilter(e.target.value)}
                className="p-2 rounded-lg bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div className="rounded-lg shadow-inner overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-900">
                  <tr>
                    {Object.keys(tableData[0] || {}).map(key => (
                      <th
                        key={key}
                        className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-700"
                      >
                        {key.replace(/_/g, ' ')}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-gray-950 divide-y divide-gray-800">
                  {filteredTableData.map((row, rowIndex) => (
                    <tr key={rowIndex} className="hover:bg-gray-800 transition-colors">
                      {Object.values(row).map((value, index) => (
                        <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-left">
                          {String(value)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* --- MOVED: Gemini Summary Display --- */}
        {geminiSummary && (
          <div className="space-y-4 pt-6">
              <h3 className="text-lg font-semibold text-gray-200 border-b border-gray-700 pb-2">Generated Analysis ✨</h3>
              <div className="bg-gray-900 p-6 rounded-lg text-sm text-gray-300 shadow-inner">
                  <p style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                      {geminiSummary}
                  </p>
              </div>
          </div>
        )}
      </div>
    </div>
  );
};

<<<<<<< Updated upstream
export default App;
=======
export default Result;

>>>>>>> Stashed changes
