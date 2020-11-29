declare global {
    interface Window {
        DocumentTouch:any;
    }
}

export const hasTouchSupport =
    'ontouchstart' in window || (window.DocumentTouch && document instanceof window.DocumentTouch);
