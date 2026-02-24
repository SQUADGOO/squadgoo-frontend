import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import Card from '../common/Card';

const ChartWidget = ({ title, type, data, options = {} }) => {
  const chartRef = useRef(null);
  const canvasRef = useRef(null);
  
  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      
      if (chartRef.current) {
        chartRef.current.destroy();
      }
      
      chartRef.current = new Chart(ctx, {
        type: type,
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          ...options
        }
      });
    }
    
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data, type, options]);
  
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-800">{title}</h3>
        <select className="text-sm border border-gray-300 rounded-lg px-3 py-1">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
        </select>
      </div>
      <div className="h-72">
        <canvas ref={canvasRef}></canvas>
      </div>
    </Card>
  );
};

export default ChartWidget;
