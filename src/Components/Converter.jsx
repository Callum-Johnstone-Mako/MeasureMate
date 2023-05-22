import React, { Component } from 'react'

const categories = {
  volume: {
    baseUnit: 'litre',
    units: {
      litre: 1,
      millilitre: 0.001,
      gallon: 3.78541,
      cups: 0.236588,
      ounces: 0.0295735,
      fluid_ounces: 0.0295735,
      tablespoons: 0.0147868,
      teaspoons: 0.00492892,
      grams: 0.001, // assuming water for simplicity
      milligrams: 0.000001, // assuming water for simplicity
    },
  },
  length: {
    baseUnit: 'meter',
    units: {
      meter: 1,
      centimeter: 0.01,
      kilometer: 1000,
      inch: 0.0254,
      foot: 0.3048,
      yard: 0.9144,
      mile: 1609.34,
    },
  },
  temperature: {
    baseUnit: 'celsius',
    units: {
      celsius: 1,
      fahrenheit: 1,
    },
  },
}

class Converter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      category: 'volume',
      amount: '',
      inputUnit: 'cups',
      outputUnit: 'ounces',
      result: '',
    }
  }

  handleCategoryChange = (event) => {
    const category = event.target.value
    const inputUnit = Object.keys(categories[category].units)[0]
    this.setState({ category, inputUnit, outputUnit: inputUnit }, () => {
      this.convert(
        this.state.amount,
        this.state.inputUnit,
        this.state.outputUnit
      )
    })
  }

  handleAmountChange = (event) => {
    const amount = event.target.value
    this.convert(amount, this.state.inputUnit, this.state.outputUnit)
  }

  handleInputUnitChange = (event) => {
    const inputUnit = event.target.value
    this.convert(this.state.amount, inputUnit, this.state.outputUnit)
  }

  handleOutputUnitChange = (event) => {
    const outputUnit = event.target.value
    this.convert(this.state.amount, this.state.inputUnit, outputUnit)
  }

  convert = (value, fromUnit, toUnit) => {
    let result
    value = Number(value)

    if (this.state.category === 'temperature') {
      if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
        result = (value * 9) / 5 + 32
      } else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
        result = ((value - 32) * 5) / 9
      } else {
        result = value
      }
    } else {
      const fromFactor = categories[this.state.category].units[fromUnit]
      const toFactor = categories[this.state.category].units[toUnit]
      const baseValue = value * fromFactor
      result = baseValue / toFactor
    }

    if (!isNaN(result)) {
      this.setState({
        amount: value,
        inputUnit: fromUnit,
        outputUnit: toUnit,
        result: result.toFixed(2),
      })
    }

    this.setState({
      amount: value,
      inputUnit: fromUnit,
      outputUnit: toUnit,
      result: result.toFixed(2),
    })
  }

  render() {
    return (
      <div>
        <h1>MeasureMate</h1>
        <label>
          Category:
          <select
            value={this.state.category}
            onChange={this.handleCategoryChange}
          >
            {Object.keys(categories).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <label>
          From:
          <select
            value={this.state.inputUnit}
            onChange={this.handleInputUnitChange}
          >
            {Object.keys(categories[this.state.category].units).map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </label>
        <label>
          To:
          <select
            value={this.state.outputUnit}
            onChange={this.handleOutputUnitChange}
          >
            {Object.keys(categories[this.state.category].units).map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </label>
        <label>
          Amount:
          <input
            type="number"
            value={this.state.amount}
            onChange={this.handleAmountChange}
          />
          {this.state.amount && ' ' + this.state.inputUnit}
        </label>

        <label>
          Result:
          <input
            type="text"
            value={
              this.state.result &&
              this.state.result + ' ' + this.state.outputUnit
            }
            readOnly
          />
        </label>
      </div>
    )
  }
}

export default Converter
