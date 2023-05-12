const scrollIntoViewWithInterupt = (el: Element | null, timeoutMS = 0) => {
  let scrollIntoView = true;

  function cancel() {
    scrollIntoView = false;
  }

  setTimeout(() => {
    if (scrollIntoView) {
      el?.scrollIntoView({ behavior: 'smooth' });
    }

    window.removeEventListener('scroll', cancel);
  }, timeoutMS);

  window.addEventListener('scroll', cancel, { once: true });
};

export default scrollIntoViewWithInterupt;
