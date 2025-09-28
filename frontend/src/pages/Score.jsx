import React, { useState, useEffect } from 'react';

const Score = ({ analysisResult, onAnalyzeAgain }) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  // Calculate score from different possible sources
  const getScoreFromResult = () => {
    if (!analysisResult) return 0;

    // Try API data first
    if (analysisResult.apiData) {
      const apiData = analysisResult.apiData;
      
      // Check for different score formats
      if (apiData.susceptibility_score !== undefined) {
        return Math.round(parseFloat(apiData.susceptibility_score) * 100);
      }
      if (apiData.Susceptibility_Score !== undefined) {
        return Math.round(parseFloat(apiData.Susceptibility_Score) * 100);
      }
      if (apiData.score !== undefined) {
        return Math.round(parseFloat(apiData.score) * 100);
      }
    }

    // Fallback to status-based scoring
    switch (analysisResult?.status) {
      case 'DANGER': return 85;
      case 'WARNING': return 55;
      case 'SAFE': return 25;
      default: return 0;
    }
  };

  // Mock analysis result for demonstration if none provided
  const mockResult = {
    status: 'WARNING',
    formData: {
      Slope_deg: 32,
      Elevation_m: 1250,
      Rock_Type: 'Granite',
      Latitude: 40.7128,
      Longitude: -74.0060
    },
    apiData: {
      susceptibility_score: 0.65,
      confidence: 0.87
    },
    timestamp: new Date().toISOString(),
    source: 'api'
  };

  const result = analysisResult || mockResult;
  const score = getScoreFromResult();
  const status = result?.status || 'UNKNOWN';

  // Animate score on component mount
  useEffect(() => {
    if (score > 0) {
      const timer = setTimeout(() => {
        const duration = 2000;
        const steps = 60;
        const increment = score / steps;
        let current = 0;

        const interval = setInterval(() => {
          current += increment;
          if (current >= score) {
            setAnimatedScore(score);
            clearInterval(interval);
          } else {
            setAnimatedScore(Math.floor(current));
          }
        }, duration / steps);

        return () => clearInterval(interval);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [score]);

  // Status configuration
  const getStatusConfig = (status, score) => {
    if (score >= 70) {
      return {
        status: 'DANGER',
        bgGradient: 'from-red-600 via-red-700 to-red-800',
        textColor: 'text-white',
        icon: '⚠️',
        title: 'HIGH RISK',
        message: 'Immediate safety measures required. Site poses significant hazard.',
        borderColor: 'border-red-500',
        shadowColor: 'shadow-red-500/25',
        progressColor: 'from-red-400 to-red-600',
        glowColor: 'shadow-red-500/50'
      };
    } else if (score >= 40) {
      return {
        status: 'WARNING',
        bgGradient: 'from-yellow-600 via-yellow-700 to-yellow-800',
        textColor: 'text-white',
        icon: '⚡',
        title: 'MEDIUM RISK',
        message: 'Caution advised. Monitor conditions and implement safety protocols.',
        borderColor: 'border-yellow-500',
        shadowColor: 'shadow-yellow-500/25',
        progressColor: 'from-yellow-400 to-yellow-600',
        glowColor: 'shadow-yellow-500/50'
      };
    } else {
      return {
        status: 'SAFE',
        bgGradient: 'from-green-600 via-green-700 to-green-800',
        textColor: 'text-white',
        icon: '✅',
        title: 'LOW RISK',
        message: 'Site conditions are within acceptable safety parameters.',
        borderColor: 'border-green-500',
        shadowColor: 'shadow-green-500/25',
        progressColor: 'from-green-400 to-green-600',
        glowColor: 'shadow-green-500/50'
      };
    }
  };

  const statusConfig = getStatusConfig(status, score);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-orange-400/10 to-red-400/10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-br from-blue-400/10 to-purple-400/10 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-br from-green-400/5 to-blue-400/5 animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 p-6 pt-20">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${statusConfig.progressColor} rounded-full mb-6 animate-pulse`}>
              <span className="text-3xl">{statusConfig.icon}</span>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Analysis Results
            </h1>
            <p className="text-xl text-gray-300">
              Mine site risk assessment completed
            </p>
          </div>

          {/* Main Result Card */}
          <div className={`bg-gradient-to-r ${statusConfig.bgGradient} ${statusConfig.textColor}  rounded-2xl mb-8 border ${statusConfig.borderColor} shadow-2xl ${statusConfig.shadowColor} backdrop-blur-sm transform transition-all duration-500 w-[10]`}>
            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                <div className="animate-pulse">
                  <span className="text-6xl">{statusConfig.icon}</span>
                </div>
              </div>
              <h2 className="text-4xl font-bold mb-4">{statusConfig.title}</h2>
              <p className="text-xl opacity-90 mb-8">{statusConfig.message}</p>
              
              {/* Score Display */}
              <div className="mb-8">
                <div className="text-8xl font-bold mb-4">
                  {animatedScore}
                  <span className="text-4xl opacity-75">/100</span>
                </div>
                <div className="text-2xl opacity-90">Risk Score</div>
              </div>

              {/* Progress Bar */}
              <div className="w-full max-w-md mx-auto mb-8">
                <div className="bg-white/20 rounded-full h-6 overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${statusConfig.progressColor} transition-all duration-2000 ease-out rounded-full ${statusConfig.glowColor}`}
                    style={{ 
                      width: `${animatedScore}%`,
                      boxShadow: '0 0 20px rgba(255,255,255,0.3)'
                    }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm mt-2 opacity-75">
                  <span>Low Risk</span>
                  <span>Medium Risk</span>
                  <span>High Risk</span>
                </div>
              </div>
            </div>
          </div>

          {/* Details Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Analysis Details Card */}
            <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-xl">📊</span>
                </div>
                <h3 className="text-2xl font-bold text-white">Analysis Details</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-slate-600">
                  <span className="text-gray-300">Data Source:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    result.source === 'api' ? 'bg-red-600 text-white' : 'bg-yellow-600 text-white'
                  }`}>
                    {result.source === 'api' ? 'ML Model' : 'Fallback Analysis'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-slate-600">
                  <span className="text-gray-300">Analysis Time:</span>
                  <span className="text-white">
                    {new Date(result.timestamp).toLocaleString()}
                  </span>
                </div>

                {result.apiData?.confidence && (
                  <div className="flex justify-between items-center py-2 border-b border-slate-600">
                    <span className="text-gray-300">Confidence:</span>
                    <span className="text-white">
                      {(result.apiData.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                )}

                {result.error && (
                  <div className="mt-4 p-4 bg-red-600/20 border border-red-500 rounded-xl">
                    <div className="flex items-center">
                      <span className="text-red-400 mr-2">⚠️</span>
                      <span className="text-red-300 text-sm">{result.error}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Key Factors Card */}
            <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-xl">🔍</span>
                </div>
                <h3 className="text-2xl font-bold text-white">Key Factors</h3>
              </div>
              
              <div className="space-y-4">
                {result.formData && (
                  <>
                    <div className="flex justify-between items-center py-2 border-b border-slate-600">
                      <span className="text-gray-300">Slope:</span>
                      <span className={`font-semibold ${
                        parseFloat(result.formData.Slope_deg) > 35 ? 'text-red-400' :
                        parseFloat(result.formData.Slope_deg) > 30 ? 'text-yellow-400' : 'text-green-400'
                      }`}>
                        {result.formData.Slope_deg}°
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center py-2 border-b border-slate-600">
                      <span className="text-gray-300">Elevation:</span>
                      <span className="text-white">{result.formData.Elevation_m}m</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-2 border-b border-slate-600">
                      <span className="text-gray-300">Rock Type:</span>
                      <span className="text-white">{result.formData.Rock_Type || 'Not specified'}</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-300">Location:</span>
                      <span className="text-white text-sm">
                        {parseFloat(result.formData.Latitude).toFixed(3)}, {parseFloat(result.formData.Longitude).toFixed(3)}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Recommendations Card */}
          <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700 rounded-2xl p-8 shadow-2xl mb-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mr-4">
                <span className="text-xl">💡</span>
              </div>
              <h3 className="text-2xl font-bold text-white">Recommendations</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Immediate Actions</h4>
                <ul className="space-y-2 text-gray-300">
                  {score >= 70 ? (
                    <>
                      <li className="flex items-center"><span className="mr-2">🔴</span>Evacuate non-essential personnel</li>
                      <li className="flex items-center"><span className="mr-2">🔴</span>Implement emergency protocols</li>
                      <li className="flex items-center"><span className="mr-2">🔴</span>Continuous monitoring required</li>
                    </>
                  ) : score >= 40 ? (
                    <>
                      <li className="flex items-center"><span className="mr-2">🟡</span>Enhanced safety protocols</li>
                      <li className="flex items-center"><span className="mr-2">🟡</span>Regular monitoring schedule</li>
                      <li className="flex items-center"><span className="mr-2">🟡</span>Restrict access as needed</li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-center"><span className="mr-2">🟢</span>Standard safety procedures</li>
                      <li className="flex items-center"><span className="mr-2">🟢</span>Routine monitoring sufficient</li>
                      <li className="flex items-center"><span className="mr-2">🟢</span>Normal operations approved</li>
                    </>
                  )}
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Long-term Planning</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center"><span className="mr-2">📋</span>Regular geological assessments</li>
                  <li className="flex items-center"><span className="mr-2">📋</span>Environmental monitoring system</li>
                  <li className="flex items-center"><span className="mr-2">📋</span>Staff training programs</li>
                  <li className="flex items-center"><span className="mr-2">📋</span>Emergency response planning</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={onAnalyzeAgain || (() => console.log('Navigate to /analyze'))}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl hover:from-orange-600 hover:to-red-600 hover:shadow-orange-500/25 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center text-lg"
            >
              <span className="mr-3 text-xl">🔄</span>
              Analyze New Site
            </button>
            
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl hover:from-blue-600 hover:to-blue-700 hover:shadow-blue-500/25 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center text-lg"
            >
              <span className="mr-3 text-xl">📋</span>
              {showDetails ? 'Hide' : 'Show'} Raw Data
            </button>
          </div>

          {/* Raw Data Display */}
          {showDetails && (
            <div className="mt-8 bg-slate-900/60 backdrop-blur-xl border border-slate-700 rounded-2xl p-8 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-4">Raw Analysis Data</h3>
              <pre className="text-sm text-gray-300 overflow-x-auto bg-slate-800/50 p-4 rounded-xl">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Score;