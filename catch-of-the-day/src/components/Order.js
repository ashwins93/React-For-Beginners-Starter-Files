import React, { Component } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";

import { formatPrice } from "../helpers";

class Order extends Component {
  static propTypes = {
    order: PropTypes.object,
    fishes: PropTypes.object,
    deleteFromOrder: PropTypes.func,
  };

  renderOrder = key => {
    const fish = this.props.fishes[key];
    if (!fish) return null;
    const count = this.props.order[key];
    if (fish.status !== "available") {
      return (
        <CSSTransition
          key={key}
          classNames="order"
          timeout={{ enter: 500, exit: 500 }}
        >
          <li key={key}>
            Sorry {fish ? fish.name : "fish"} is no longer available
          </li>
        </CSSTransition>
      );
    }
    return (
      <CSSTransition
        key={key}
        classNames="order"
        timeout={{ enter: 250, exit: 300 }}
      >
        <li key={key}>
          <span>
            <TransitionGroup className="count" component="span">
              <CSSTransition
                classNames="count"
                timeout={{ enter: 500, exit: 500 }}
                key={count}
              >
                <span>{count}</span>
              </CSSTransition>
            </TransitionGroup>
            lbs {fish.name}
            {formatPrice(count * fish.price)}
          </span>
          <button onClick={() => this.props.deleteFromOrder(key)}>
            &times;
          </button>
        </li>
      </CSSTransition>
    );
  };

  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((acc, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === "available";
      if (isAvailable) return acc + count * fish.price;
      return acc;
    }, 0);
    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <TransitionGroup component="ul" className="order">
          {orderIds.map(this.renderOrder)}
        </TransitionGroup>
        <div className="total">
          Total:
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}

export default Order;
