import React from 'react';

interface Props {
  radius: number
  stroke: number
  progress: number
  totalProgress: number
}

export const ProgressRingr: React.FC<Props> = ({ radius, stroke, progress, totalProgress }) => {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset =
    circumference - (progress / totalProgress) * circumference;

  return (
    <svg height={radius * 2} width={radius * 2}>
      <circle
        stroke="currentColor"
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={`${circumference} ${circumference}`}
        style={{ strokeDashoffset }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
    </svg>
  );
};
