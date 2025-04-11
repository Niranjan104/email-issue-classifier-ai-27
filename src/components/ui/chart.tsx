
import React from 'react';

// Simplified area chart component
export function AreaChart({ 
  data, 
  categories,
  height = '100%',
  width = '100%',
  color = '#10b981'
}: {
  data: number[];
  categories: string[];
  height?: string;
  width?: string;
  color?: string;
}) {
  // Calculate the maximum value for scaling
  const maxValue = Math.max(...data) || 1;
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((value / maxValue) * 100);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div style={{ height, width }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Line */}
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2"
        />
        
        {/* Area under the line */}
        <polygon
          points={`0,100 ${points} 100,100`}
          fill={`${color}20`}
        />
      </svg>
    </div>
  );
}

// Simplified pie chart component
export function PieChart({ 
  data, 
  categories,
  colors = ['#10b981', '#f87171'],
  height = '100%',
  width = '100%'
}: {
  data: number[];
  categories: string[];
  colors?: string[];
  height?: string;
  width?: string;
}) {
  // Calculate total for percentages
  const total = data.reduce((sum, value) => sum + value, 0) || 1;
  
  // Generate arcs
  let startAngle = 0;
  const arcs = data.map((value, index) => {
    const percentage = value / total;
    const angle = percentage * 360;
    const endAngle = startAngle + angle;
    
    // Convert to radians for calculations
    const startRad = (startAngle - 90) * (Math.PI / 180);
    const endRad = (endAngle - 90) * (Math.PI / 180);
    
    // Calculate arc path
    const radius = 50;
    const centerX = 50;
    const centerY = 50;
    
    // Determine if angle is large arc (> 180 degrees)
    const largeArcFlag = angle > 180 ? 1 : 0;
    
    // Calculate start and end points
    const startX = centerX + radius * Math.cos(startRad);
    const startY = centerY + radius * Math.sin(startRad);
    const endX = centerX + radius * Math.cos(endRad);
    const endY = centerY + radius * Math.sin(endRad);
    
    // Create arc path
    const path = `M ${centerX},${centerY} L ${startX},${startY} A ${radius},${radius} 0 ${largeArcFlag},1 ${endX},${endY} Z`;
    
    const arc = {
      path,
      color: colors[index % colors.length]
    };
    
    startAngle = endAngle;
    return arc;
  });

  return (
    <div style={{ height, width }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100">
        {arcs.map((arc, index) => (
          <path key={index} d={arc.path} fill={arc.color} />
        ))}
      </svg>
    </div>
  );
}

// Simplified bar chart component
export function BarChart({ 
  data, 
  categories,
  colors = ['#10b981'],
  height = '100%',
  width = '100%'
}: {
  data: number[];
  categories: string[];
  colors?: string[];
  height?: string;
  width?: string;
}) {
  // Calculate the maximum value for scaling
  const maxValue = Math.max(...data) || 1;
  
  // Calculate bar width and spacing
  const barCount = data.length;
  const barSpacing = 10;
  const totalBarWidth = 100 - (barSpacing * (barCount - 1));
  const barWidth = totalBarWidth / barCount;

  return (
    <div style={{ height, width }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        {data.map((value, index) => {
          const barHeight = (value / maxValue) * 100;
          const x = index * (barWidth + barSpacing);
          const y = 100 - barHeight;
          
          return (
            <rect
              key={index}
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              fill={colors[index % colors.length] || colors[0]}
              rx={2}
            />
          );
        })}
      </svg>
    </div>
  );
}
