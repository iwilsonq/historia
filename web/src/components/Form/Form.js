import React from 'react'

export class Form extends React.Component {
  handleSubmit = event => {
    event.preventDefault()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} {...this.props}>
        {this.props.children}
      </form>
    )
  }
}
