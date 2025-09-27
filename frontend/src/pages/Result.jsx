import React, { useState } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { ResponsiveBar } from '@nivo/bar';

// This is a single, self-contained React component file.
// All components, hooks, logic, and styling are contained within this file.

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
const processDataForBarChart = (data, categoryKey) => {
  const counts = data.reduce((acc, item) => {
    const key = item[categoryKey] || 'N/A';
    if (!acc[key]) {
      acc[key] = { [categoryKey]: key, count: 0 };
    }
    acc[key].count += 1;
    return acc;
  }, {});
  return Object.values(counts);
};

// Main App component
const Result = () => {
  const [lineData, setLineData] = useState([]);
  const [tableData, setTableData] = useState(initialTableData);
  const [activeTab, setActiveTab] = useState('graph');
  const [lineChartOptions, setLineChartOptions] = useState({
    title: 'Rockfall Analysis: Rock Volume m3 vs slope deg',
    xLabel: 'slope_deg', // Default X-axis
    yLabel: 'Rock_Volume_m3' // Default Y-axis
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
    <div className="flex flex-col md:flex-row h-screen font-sans bg-gray-900 text-gray-100 p-4 items-start overflow-auto">
      
      {/* Sidebar for user inputs */}
      <div className="md:w-1/4 w-full bg-gray-800 p-6 rounded-2xl shadow-xl space-y-6 md:mr-4 mb-4 md:mb-0 md:sticky top-4">
        <h2 className="text-xl font-bold text-blue-400">Dashboard Controls</h2>

        {/* Line Chart Inputs */}
        <div className="space-y-4 ">
          <h3 className="text-lg font-semibold text-gray-200 border-b border-gray-700 pb-2">Line Chart Options</h3>
          <div>
            <label htmlFor="line-title" className="block text-sm font-medium text-gray-400 mb-1">Chart Title</label>
            <input
              id="line-title"
              type="text"
              name="lineChart.title"
              value={lineChartOptions.title}
              onChange={handleInputChange}
              className="w-full p-2 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <div>
            <label htmlFor="line-xlabel" className="block text-sm font-medium text-gray-400 mb-1">X-Axis</label>
            <select
              id="line-xlabel"
              name="lineChart.xLabel"
              value={lineChartOptions.xLabel}
              onChange={handleInputChange}
              className="w-full p-2 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
            >
              {axisOptions.map(key => (
                <option key={key} value={key}>{key.replace(/_/g, ' ')}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="line-ylabel" className="block text-sm font-medium text-gray-400 mb-1">Y-Axis</label>
            <select
              id="line-ylabel"
              name="lineChart.yLabel"
              value={lineChartOptions.yLabel}
              onChange={handleInputChange}
              className="w-full p-2 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
            >
               {axisOptions.map(key => (
                <option key={key} value={key}>{key.replace(/_/g, ' ')}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Bar Chart Inputs */}
        <div className="space-y-4 pt-6 ">
          <h3 className="text-lg font-semibold text-gray-200 border-b border-gray-700 pb-2">Bar Chart Options</h3>
          <div>
            <label htmlFor="bar-title" className="block text-sm font-medium text-gray-400 mb-1">Chart Title</label>
            <input
              id="bar-title"
              type="text"
              name="barChart.title"
              value={barChartOptions.title}
              onChange={handleInputChange}
              className="w-full p-2 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <div>
            <label htmlFor="bar-category" className="block text-sm font-medium text-gray-400 mb-1">Category Field</label>
            <select
              id="bar-category"
              name="barChart.categoryKey"
              value={barChartOptions.categoryKey}
              onChange={handleInputChange}
              className="w-full p-2 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
            >
              {Object.keys(initialTableData[0]).map(key => (
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
              className="w-full p-2 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
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
        </div>
      </div>

      {/* Main content area for charts and table */}
      <div className="flex-1 bg-gray-800 p-6 rounded-2xl shadow-xl space-y-6">
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
                xScale={{ type: 'linear', min: 'auto', max: 'auto' }}
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
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: lineChartOptions.xLabel.replace(/_/g, ' '),
                  legendOffset: 36,
                  legendPosition: 'middle',
                  format: ".2f"
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
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: barChartOptions.categoryKey.replace(/_/g, ' '),
                  legendPosition: 'middle',
                  legendOffset: 32
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
                    ticks: { line: { stroke: 'rgb(75 85 99)' }, text: { fill: 'rgb(156 163 175)' } }
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
                className="p-2 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div className="overflow-x-auto rounded-lg shadow-inner border border-gray-700">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                  <tr>
                    {Object.keys(tableData[0]).map(key => (
                      <th
                        key={key}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                      >
                        {key.replace(/_/g, ' ')}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {filteredTableData.map(row => (
                    <tr key={row.id} className="hover:bg-gray-700 transition-colors">
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

export default Result;

