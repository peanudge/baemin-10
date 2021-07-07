// Event Delegator
export const delegate = (parent, event, selector, handler) => {
  const eventDelegator = (e) => {
    const potentialElements = parent.querySelectorAll(selector);
    for (const potentialElement of potentialElements) {
      if (potentialElement === e.target) {
        return handler.call(e.target, e);
      }
    }
  };
  parent.addEventListener(event, eventDelegator);
};
