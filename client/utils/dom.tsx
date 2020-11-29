export const hasTouchSupport =
    "ontouchstart" in window || (window.DocumentTouch && document instanceof window.DocumentTouch)
