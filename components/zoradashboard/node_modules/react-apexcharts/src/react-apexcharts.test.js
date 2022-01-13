import React from 'react'
import ReactDOM from 'react-dom'
import Chart from './react-apexcharts.jsx'

const props = {
  options: {
    xaxis: {
      categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }
  },
  series: [{
    data: [30, 40, 25, 50, 49, 21, 70, 51]
  }],
}

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Chart {...props}/>, div)
  ReactDOM.unmountComponentAtNode(div);
})
