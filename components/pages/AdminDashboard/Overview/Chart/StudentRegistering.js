import React from 'react'
import dynamic from 'next/dynamic'
const Line = dynamic(async () => await import('react-chartjs-2').Line, {
  ssr: false,
})

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'First dataset',
      data: [],
      fill: true,
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: 'rgba(75,192,192,1)',
    },
    {
      label: 'Second dataset',
      data: [],
      fill: false,
      borderColor: '#742774',
    },
  ],
}

const legend = {
  display: true,
  position: 'bottom',
  labels: {
    fontColor: '#323130',
    fontSize: 14,
  },
}

const options = {
  title: {
    display: true,
    text: 'Chart Title',
  },
  scales: {
    yAxes: [
      {
        ticks: {
          suggestedMin: 0,
          suggestedMax: 100,
        },
      },
    ],
  },
}

const StudentRegistering = () => {
  return (
    <div className='flex'>
      <Line data={data} legend={legend} options={options} />
    </div>
  )
}

export default StudentRegistering
